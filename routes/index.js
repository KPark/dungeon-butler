var passwordHash = require('password-hash');

exports.index = function(req, res){
  res.render('index', { title: 'Dungeon Butler' });
};

exports.loginForm = function(req, res) {
    res.render('login', { title: 'Dungeon Butler' });
};

exports.login = function(db) {
    return (function(req, res) {
        var userName = req.body.username;
        var password = req.body.password;
        var sessionId = req.sessionID;

        var collection = db.get('users');
        if (userName == null) {
            collection.find({'sessionId': sessionId}, {}, function(e, docs) {
                if (docs.length !== 0) {
                    res.send(docs[0]);
                }
            });
        } else {
            collection.find({'username': userName}, {}, function (e, docs) {
                if (docs.length === 0) {
                    docs = [
                        { "username": "Invalid Username / Password" }
                    ];
                } else {
                    if (password != docs[0].password) {
                        docs = [
                            { "username": "Invalid Username / Password" }
                        ];
                    } else {
                        // Storing the active session ID on log-in so that it can be used to automatically log in the
                        // user at a later date.
                        collection.update({_id: docs[0]._id}, {$set: { sessionId: sessionId }});
                        docs[0].sessionId = sessionId;
                    }
                }
                res.send(docs[0]);
            });
        }
    });
};

exports.register = function(db) {
    return (function(req, res) {
        var userName = req.body.username;
        var password = req.body.password;
        var hashedPassword = passwordHash.generate(req.body.password);
        var newRecord = { username: userName, password: hashedPassword };
        var collection = db.get('users');
        collection.insert(newRecord, {}, function(e, docs) {
            console.log("Successfully inserted new user: " + docs[0]);
            res.send(docs[0]);
        });
    });
};