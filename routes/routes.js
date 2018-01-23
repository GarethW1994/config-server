const express = require("express");

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
            //console.log(results);
  
            res.json(results);
  
          })
        // res.send("readconfig");
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb
        var conf = req.body;
        // models.myconfig.create(conf, function (err, results) {
        //     if (err){
        //         if(err.code ==11000){
        //             models.myconfig.findOne({
        //                 adminAccount: conf.adminAccount
        //             }, function(err, updatedresults){
        //                 if(err){
        //                     return next(err);
        //                 }else{
        //                     updatedresults.conf = conf;
        //                     updatedresults.save();
        //                     console.log(updatedresults)
        //                     res.redirect("/readconfig")
        //                 }
        //             })
        //         }
              
        //     }
        //     //console.log(err);
        //     //console.log(results);
  
            
  
        //   })

        models.myconfig.update({
			adminAccount: conf.adminAccount
		}, {
			modules: conf.modules
		}, function (options, callback) {
			console.log(callback);
        });
        // res.send('writeconfig');
        // res.json(results);
    }

    return {
        index,
        readconfig,
        writeconfig
    }
}