/**
 * Created by mathe_000 on 8/5/2014.
 */

exports.characterCreate = function(req, res){
    res.render('characterCreate', { title: 'Character Creator' });
};

exports.getRaces = function(db) {
    return (function(req, res) {
        var ruleSet = req.body.ruleSet;
        var collection = db.get(ruleSet + "_races");
        collection.find({}, {}, function(e, docs) {
            res.send(docs);
        });
    });
}