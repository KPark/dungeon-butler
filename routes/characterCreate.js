/**
 * Created by mathe_000 on 8/5/2014.
 */

exports.characterCreate = function(req, res){
    res.render('characterCreate', { title: 'Character Creator' });
};

exports.newCharacter = function(db) {
    return (function(req, res) {
        var userId = req.body.userId;
        var collection = db.get("characters");
        var userCollection = db.get("users");
        var user;
        userCollection.findOne({'username': userId}, function(err, document) {
            user = document;
            var newCharacterRecord = { userId: user._id, name: 'New Character' };
            collection.insert(newCharacterRecord, {}, function(e, docs) {
                res.send(docs._id);
            });
        });
    })
}

exports.getRaces = function(db) {
    return (function(req, res) {
        var collection = db.get("dndv4_races");
        collection.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    });
}