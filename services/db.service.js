const mongoose = require('mongoose'),
    config = require('config'),
    mongoDbConfig = config.get('mongodb');

    mongoDBUrl = mongoDbConfig.url;
    console.log(mongoDBUrl);

    //mongoDBUrl ='mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb'; //Vikash Sir 

    //mongoDBUrl = 'mongodb+srv://root:admin@cluster0-qzwy9.mongodb.net/test?retryWrites=true&w=majority';    //mLab details

mongoose.connect(
    mongoDBUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(err){
        if(err) {
            console.log(err);
        } else{
            console.log("MongoDB is connected");
        }
    }
);