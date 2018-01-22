const express = require("express");

module.exports = function() {
    // root route
    const index = function(req, res, next) {
        res.send("Express App !");
    }


    // readconfig route

    const readconfig = function(req, res, next) {
        // get config data from mongodb

        res.send("readconfig");
    }

    
    // writeconfig route
    const writeconfig = function(req, res, next) {
        // write config data to mongodb

        res.send('writeconfig');
    }










    return {
        index,
        readconfig,
        writeconfig
    }
}