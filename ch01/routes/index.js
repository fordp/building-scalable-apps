module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req, res){
    res.cookie('IndexCookie', 'This was set from Index');
    res.render('index', {
        title: 'Indexxx'
        // cookie: JSON.stringify(req.cookies),
        // session: JSON.stringify(req.session),
        // signedCookie: JSON.stringify(req.signedCookies)
    });
}

function login(req, res){
    // res.send('Login');
    res.render('login', {title: 'Login'});
}

function loginProcess(req, res){
    // res.redirect('/');
    console.log(req.body);
    res.send(req.body.username + ' ' + req.body.password);
}

function chat(req, res){
    // res.send('Chat');
    res.render('chat', {title: 'Chat'});
}
