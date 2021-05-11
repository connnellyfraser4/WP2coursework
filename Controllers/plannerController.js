const plannerDA0 = require('../models/plannerModel');
const db = new plannerDA0();
const userDao = require('../models/userModel.js');



exports.show_login_page = function (req, res) {
    res.render("user/login");
};


exports.show_register_page = function (req, res) {
    res.render("user/register");
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        res.redirect('/login');
    });
}




exports.post_login = function (req, res) {
    response.redirect("/");
};


exports.logout = function (req, res) {
    req.logout();
    res.redirect("/");
};


exports.entries_list = function (req, res) {

    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Planner',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.show_user_entries = function (req, res) {
    let user = req.params.author;
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render('entries', {
                'title': 'Guest Book',
                'user': req.user,
                'entries': entries
            });
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
}



exports.show_login_page = function (req, res) {
    res.render('user/login', {
        'title': 'Guest Book'
    });
};


exports.show_new_entries = function (req, res) {
    res.render('newEntry', {
        'title': 'Guest Book',
        'user': req.user
    })
}

exports.post_new_entry = function (req, res) {

    if (!req.body.name) {
        response.status(400).send("Entries must have an author.");
        return;
    }
    db.addEntry(req.body.name, req.body.activity, req.body.duration);
    res.redirect('/');
}

exports.show_register_page = function (req, res) {
    res.render("user/register");
}


exports.landing_page = function (req, res) {
    db.init();
    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Planner',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}



exports.new_entry = function (req, res) {
    exports.show_new_entries = function (req, res) {
        res.render('newEntry', {
            'title': 'Guest Book'
        })
    }
}


