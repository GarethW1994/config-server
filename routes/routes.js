const express = require("express");
const fs = require("fs");



module.exports = function(models) {
    // root route
    const index = function(req, res, next) {

        res.send("Express App !");
    }
    // readconfig route

    const readconfig = async function(req, res, next) {
        models.myconfig.find({}, function(err, data) {
            if (err) throw err;
        })
            .then(function(data) {
                res.json(data[0].config[0]);
            })
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb
        var conf = req.body;
        //creating new Admin acount
        models.myconfig.update({config : conf}, function (err, results) {
            if (err) throw err;
                
          }) 
            .then(function(results) {
                models.myconfig.find({}, function(err, data) {
                    if (err) throw err;
                }) 
                 .then(function(data) {

                    res.json(data[0]);
                 })
            })
    } 

    return {
        index,
        readconfig,
        writeconfig
    }
}