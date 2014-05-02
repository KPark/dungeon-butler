var passwordHash = require('password-hash');

exports.index = function(req, res){
  res.render('index', { title: 'Dungeon Butler' });
};

exports.login = function(db) {
    return (function(req, res) {
        var userName = req.body.username;
        var password = req.body.password;
        var hashedPassword = passwordHash.generate(req.body.password);
        var collection = db.get('users');
        collection.find({'username': userName}, {}, function(e, docs) {
            if (docs.length === 0) {
                docs = [ { "username": "Invalid Username / Password" } ];
            } else {
                var isPasswordValid = passwordHash.verify(password, docs[0].password);
                if (!isPasswordValid) {
                    docs = [ { "username": "Invalid Username / Password" } ];
                }
            }
            res.send(docs[0]);
        });
    });
}

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
}