const express = require("express");
const fs = require("fs");
const Models = require('../models');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/config-server';
const models = Models(mongoURL);

async function importConfigData() {

    // const filePath = ''
    fs.readFile('./config.json', 'utf8', function (err, data) {
        if (err) throw err;

        var configObject = JSON.parse(data);

        models.myconfig.find({}, function (err, config) {
            if (err) throw err;
        })
            .then(function (config) {
                console.log(config)
                if (config.length == 0) {
                    console.log('... addding default config data ...');

                    //creating new Admin acount
                    models.myconfig.create(configObject, function (err, results) {
                        if (err) throw err;

                        console.log("Result", results);
                        console.log("Successfully added default config data.");
                    });
                } else {
                    console.log('... database already has data ...')
                }
            })
    });
}(async function () { });