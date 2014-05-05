/**
 * Created by Matt on 4/29/2014.
 */

exports.characters = function(req, res){
    res.render('characters', { title: 'Characters' });
};

exports.getCharacterList = function(req, res) {
    return (function(req, res) {
        var username = req.body.username;
        var collection = db.get('characters');
        collection.find({"username": username}, {}, function(e, docs) {
            res.send(docs);
        });
    });
};