const express = require("express");

module.exports = function(models) {
    // root route
    const index = function(req, res, next) {

        res.send("Express App !");
    }


    // readconfig route

    const readconfig = function(req, res, next) {
        // get config data from mongodb
        models.myconfig.find({}, function (err, results) {
            if (err){
              return next(err);
            }
            //console.log(err);
            //console.log(results);
  
            res.json(results);
  
          })
        // res.send("readconfig");
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb
        var conf = req.body;
        models.myconfig.create(conf, function (err, results) {
            if (err){
              return next(err);
            }
            //console.log(err);
            //console.log(results);
  
            res.json(results);
  
          })
        // res.send('writeconfig');
    }










    return {
        index,
        readconfig,
        writeconfig
    }
}