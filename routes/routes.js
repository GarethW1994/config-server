const express = require("express");
const fs = require("fs");



module.exports = function(models) {
    // root route
    const index = function(req, res, next) {

        res.send("Express App !");
    }
    // readconfig route

    const readconfig = async function(req, res, next) {
        // db.domain.find().sort({lastModifiedDate:-1}).limit(10)
        //db.market.find({}).sort({_id:-1}).limit(1)
        // get config data from mongodb

        let latestData = await models.myconfig.find({}).sort({_id: -1}).limit(1);

        var convertData = JSON.parse(latestData[0].config)
    

        res.json(convertData);
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb
        var conf = req.body;
        //creating new Admin acount
        models.myconfig.create({config : JSON.stringify(conf)}, function (err, results) {
            if (err) throw err;
                
            var configObj = JSON.parse(results.config)
            res.json(configObj);
          })
    } 

    return {
        index,
        readconfig,
        writeconfig
    }
}