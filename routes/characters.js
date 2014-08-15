/**
 * Created by Matt on 4/29/2014.
 */

exports.characters = function(req, res){
    res.render('characters', { title: 'Characters' });
};

exports.getCharacterList = function(db) {
    return (function(req, res) {
        var username = req.body.userId;
        var collection = db.get('characters');
        collection.find({"userId": username}, {}, function(e, docs) {
            console.log(docs);
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