/**
 * Created by mathe_000 on 8/5/2014.
 */

exports.characterCreate = function(req, res){
    res.render('characterCreate', { title: 'Character Creator' });
};

exports.getRaces = function(db) {
    return (function(req, res) {
        var collection = db.get("dndv4_races");
        collection.find({}, {"sort": "name"}, function(e, docs) {
            res.send(docs);
        });
    });
}

exports.getClasses = function(db) {
    return (function(req, res) {
        var collection = db.get("dndv4_classes");
        collection.find({}, {"sort": "name"}, function(e, docs) {
            res.send(docs);
        });
    });
}

exports.saveCharacterTemplate = function(db) {
    return (function(req, res) {
        var character = req.body;
        var collection = db.get("characters");
        if (character._id) {
            collection.update({ "_id": character._id}, character, {}, function(e, docs) {
                res.send(docs);
            });
        } else {
            collection.insert(character, {}, function(e, docs) {
                res.send(docs);
            });
        }
    })
}