/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(db) {
    return (function(req, res) {
        var userName = req.body.username;
        var password = req.body.password;
        var collection = db.get('users');
        collection.find({'username': userName}, {}, function(e, docs) {
            if (docs.length === 0) {
                docs = [ { "username": "Invalid User" } ];
            }
            res.send(docs[0]);
        });
    })
}