var express = require('express');
var router = express.Router();
const moment = require('moment')
const Trip = require('../models/trips')

/* GET users listing. */
router.get('/trips', (req, res, next) => {
  Trip.find().then(data => {
    res.json({trips: data})
  })
});

// router.get('/selec', (req, res) => {
//     Trip.findOne({departure: req.body.departure}).then(data => {
//         res.json({departure: data})
//     })
// })

router.post('/selec', (req, res) => {
    if(!req.body.departure || !req.body.arrival){
        res.json({result: false, error: 'Il manque un élément'})
        return
    }

    Trip.find({departure: req.body.departure, arrival: req.body.arrival}).then(data => {
        // data.date = moment(data.date).format('YYYY');
        if(data && data.length > 0){
            data.forEach(trip => {
                trip.date = moment(trip.date).format('YYYY');
            });
            res.json({data})
        } else{
            res.json({result: false, error: `Ce trajet n'est pas disponible`})
        }
    })

})



module.exports = router;
