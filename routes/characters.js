/**
 * Created by Matt on 4/29/2014.
 */

exports.characters = function(req, res){
    res.render('characters', { title: 'Characters' });
};

exports.getCharacterList = function(db) {
    return (function(req, res) {
        var username = req.body.username;
        var collection = db.get('characters');
        collection.find({"username": username}, {}, function(e, docs) {
            res.send(docs);
        });
    });
};

exports.getCharacter = function(db) {
    return (function(req, res) {
        var characterId = req.body.id;
        db.get('characters').findOne({"_id": characterId}, {}, function(e, docs) {
            res.send(docs);
        });
    });
}