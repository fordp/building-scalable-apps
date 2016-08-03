var express = require('express'),
    partials = require('express-partials'),
    app = express(),
    routes = require('./routes'),
    errorHandlers = require('./middleware/errorhandlers'),
    log = require('./middleware/log'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    bodyParser = require('body-parser'),
    util = require('./middleware/utilities'),
    csrf = require('csurf');

app.set('view engine', 'ejs');
app.set('view options', {defaultLayout: 'layout'});

app.use(partials());
app.use(log.logger);
app.use(express.static(__dirname + '/static'));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore(
        {url: 'redis://localhost'})
}));
app.use(function(req, res, next){
    if (req.session.pageCount)
        req.session.pageCount++;
    else
        req.session.pageCount = 1;
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/account/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
app.get('/error', function(req, res, next){
    next(new Error('A contrived error'));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);
console.log("App server running on port 3000");

