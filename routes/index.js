var express = require('express');
var router = express.Router();

/* GET thanks page. */
router.get('/thanks', function(req, res) {
    
  res.render('thanks', { title: 'Thank You!' });
});

/* GET main index page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Photo Task'});
});


/* POST to Index page */
router.post('/index', function(req, res) {
    
    // Set our internal DB variable
    var db = req.db;

    //form values, from name attributes
    var participantID = req.body.participantID;
    var trait = req.body.trait;
    var numPhotos = req.body.numPhotos;
    var selectedURL = req.body.selectedURL;

    // Set our collection
    var participants = db.get('studyParticipants');

    // Submit to the DB
    participants.insert({
        "participantID" : participantID,
        "trait" : trait,
        "numPhotos" : numPhotos,
        "photo" : selectedURL

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("thanks");
        }
    });
});

/* GET showPhotos page */
router.get('/allphotos', function(req, res) {
    
    // Set our internal DB variable
    var db = req.db;
    var participants = db.get('studyParticipants');
    participants.find({}, {}, function(e, docs){
        res.render('allphotos', {
            "allphotos" : docs
        });
    });
});



module.exports = router;
