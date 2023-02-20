const { MongoClient } = require("mongodb");

class MongoStorage extends Storage {

    validate_registry = function (firstName, lastName) {
        MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
            crsr = db.collection("alumni").findOne()
            crsr.each((err, doc) => {
                console.log(doc)
            })
        })
    }


}