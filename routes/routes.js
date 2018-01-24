const express = require("express");
const fs = require("fs");



module.exports = function(models) {
    // root route
    const index = function(req, res, next) {

        res.send("Express App !");
    }
    // readconfig route

    const readconfig = function(req, res, next) {
        // get config data from mongodb
        models.myconfig.find({},{_id: 0,
            __v: 0}, function (err, results) {
            if (err){

              return next(err);
            }
            //console.log(err);
            console.log(results);
  
            res.json(results);
  
          })
        // res.send("readconfig");
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb
        var conf = req.body;
        //creating new Admin acount
        models.myconfig.create(conf, function (err, results) {
            if (err){
                if(err.code ==11000){
                    //updating the existing account
                    models.myconfig.update({
                        adminAccount: conf.adminAccount
                    }, {
                        modules: conf.modules,
                        accounts: conf.accounts
                    }, function (options, callback) {
                        console.log(callback);
                    })
                    .then(function(){
                        models.myconfig.find({}, function(err, config){
                            if (err) throw err;
            
                        })
                        .then(function(config){
                            res.redirect("/jde/get_config");
                        })
                    });
                }
              
            }else{
                res.json(results)
            }
  
          })
    }

    const initialize_config = function(req, res, next) {
        
    }


    return {
        index,
        readconfig,
        writeconfig,
        initialize_config
    }
}