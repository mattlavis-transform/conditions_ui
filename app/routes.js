const express = require('express')
const axios = require('axios')
const router = express.Router()
const Commodity = require('./classes/commodity.js');

// Add your routes here - above the module.exports line

var prefix = 'http://127.0.0.1:5000/commodities/';
// var prefix = 'https://comm-code-history.herokuapp.com/commodities/';

// Get a commodity
router.get(['/commodities/:goods_nomenclature_item_id/'], function (req, res) {
    var goods_nomenclature_item_id = req.params["goods_nomenclature_item_id"];
    var url = prefix + goods_nomenclature_item_id;
    axios.get(url)
        .then((response) => {
            var commodity = new Commodity(response)
            res.render('commodities', {
                'commodity': commodity
            });
        });
});

// Get a commodity STWGS test
router.get(['/stwgs/:goods_nomenclature_item_id/'], function (req, res) {
    var goods_nomenclature_item_id = req.params["goods_nomenclature_item_id"];
    var url = prefix + goods_nomenclature_item_id;
    axios.get(url)
        .then((response) => {
            var commodity = new Commodity(response)
            res.render('stwgs', {
                'commodity': commodity
            });
        });
});

module.exports = router
