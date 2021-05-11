const nedb = require('nedb');




class Planner {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }

    }

    init() {
        this.db.insert({
            name: 'Gary',
            Activity: 'football',
            duration: '1.5hrs',
            published: '2020-02-16',
        });

        console.log('db entry Robert inserted');
        this.db.insert({
            name: 'Robert',
            activity: 'Squash',
            duration: '2hrs',
            published: '2020-05-05',
        });

        console.log('db entry Robert inserted');

        this.db.remove({name: 'Robert'}, {}, function(err, docsRem){
            if(err){
                console.log('error deleting document Robert')
            } else {
                console.log(docsRem, 'document removed from database.')
            }
        })


        this.db.update({name: 'Gary'}, {$set:{activity:'Golf'}}, {}, function(err, numUp) {
            if(err){
            console.log('error updating documents')
        } else {
            console.log(numUp, 'documents updated')
        }
        })




    }
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }


    addEntry(name, activity, duration) {
        var entry = {
            name: name,
            activity: activity,
            duration: duration,
            published: new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', name);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

}




   /* getRobertsEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ name: 'Robert' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getRobertsEntries() returns: ', entries);
                }
            })
        })
    }*/






module.exports = Planner;