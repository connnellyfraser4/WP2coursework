const express = require('express');
const router = express.Router();
const controller = require('../controllers/plannerController');
const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login');

router.get("/", controller.landing_page);
router.get('/entries', controller.entries_list);
router.get('/new-entry', controller.new_entry);
router.get('/new', ensureLoggedIn('/login'),
    controller.show_new_entries);
router.post('/new', ensureLoggedIn('/login'),
    controller.post_new_entry);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/login', controller.show_login_page);
router.post("/login", auth.authorize("/login"),
controller.post_login); 
router.get('/logout', controller.logout);

//router.get('/robert',controller.Roberts_entries);







router.get('/planner', function (req, res) {
    res.redirect('/Planner.html');
})
router.get('/new-entry', function (req, res) {
    res.redirect('/new-entry.html');
})

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})


module.exports = router;