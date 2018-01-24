const express = require("express");
const fs = require("fs");
const Models = require('../models');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/config-server';
const models = Models(mongoURL);

const defualt_config = function () {

    // const filePath = ''
    fs.readFile('./config.json', 'utf8', function (err, data) {
        if (err) throw err;

        var obj = JSON.parse(data);

        models.myconfig.find({}, function (err, config) {
            if (err) throw err;
        })
            .then(function (config) {
                if (config[0] !== 'undefined') {
                    console.log('... addding default config data ...');

                    
                } else {
                    console.log('... database already has data ...')
                }
            })
    });
}(async function(){});