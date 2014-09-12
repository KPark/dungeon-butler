/**
 * Created by mathe_000 on 8/5/2014.
 */

exports.characterCreate = function(req, res){
    res.render('characterCreate', { title: 'Character Creator' });
};

exports.powerSearch = function(req, res) {
    res.render('filters', { title: 'Power Search' });
}

exports.getRaces = function(db) {
    return (function(req, res) {
        var collection = db.get("dndv4_races");
        collection.find({}, {"sort": "name"}, function(e, docs) {
            res.send(docs);
        });
    });
};

exports.getClasses = function(db) {
    return (function(req, res) {
        var collection = db.get("dndv4_classes");
        collection.find({}, {"sort": "name"}, function(e, docs) {
            res.send(docs);
        });
    });
};

exports.saveCharacterTemplate = function(db) {
    return (function(req, res) {
        var character = req.body;
        var collection = db.get("characters");
        console.log(character);
        if (character._id) {
            collection.update({ "_id": character._id}, character, {}, function(e) {
                if (e != null) {
                    console.log("An error occurred while saving the character template: " + e);
                    console.log(character);
                    res.send("Unexpected Error");
                } else {
                    res.send({'_id': character._id});
                }
            });
        } else {
            collection.insert(character, {}, function(e, docs) {
                if (e != null) {
                    console.log("An error occurred while inserting the character template: " + e);
                    console.log(character);
                    res.send("Unexpected Error");
                } else {
                    console.log("Save successful: " + docs);
                    res.send(docs);
                }
            });
        }
    });
};

exports.deleteCharacter = function(db) {
    return (function(req, res) {
        var character = req.body;
        console.log(character);
        var collection = db.get("characters");
        collection.remove(character, function(err, result) {
            res.send({});
        })
    });
};

exports.getPowers = function(db) {
    return (function(req, res) {
        var powersFilter = req.body;
        var collection = db.get("dndv4_powers");
        collection.find({ "name": { $in: powersFilter }}, { "sort": { "type": 1, "name": 2 } }, function (e, docs) {
            res.send(docs);
        });
    });
};

exports.getPowersWithCriteria = function(db) {
    return (function(req, res) {
        var powersFilter = req.body;
        console.log(powersFilter);
        var collection = db.get("dndv4_powers");
        collection.find(powersFilter, function (e, docs) {
            res.send(docs);
        });
    });
};