'use strict'
const mongoose = require('mongoose');
module.exports = function(mongoURL) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongoURL);

  const configSchema = mongoose.Schema({
    adminAccount: String,
    adminUser: String,
    modules: [
               {
                 id: String,
                 description: String,
                 active: Boolean,
                 comment: String,
                 versions: [
                             {
                              form: String,
                              version: String
                             },
                             {
                               form: String,
                               version: String
                              }
                           ]
                }
             ],

accounts: [
            {
              id: String,
              description: String,
              expiry: Date,
              environments: [
                              {
                                 ais: String,
                                 description: String,
                                 expiry: Date,
                                 modules: [
                                           {
                                            id: String,
                                            description: String,
                                            active: Boolean,
                                            expiry: Date,
                                            versions: Array
                                           }
                                          ],
                                users: [
                                         {
                                           id: String,
                                           modules: [
                                                       {
                                                        id: String,
                                                        description:String ,
                                                        active: Boolean
                                                       }
                                                      ]
                                            } 
                                        ] 
                               }
                            ]
 
            }
         ]    
        
  });

  configSchema.index({
    adminAccount : 1
  }, {
    unique: true
  });

  const myconfig = mongoose.model('configurations', configSchema);

  return {
    myconfig
  };
};