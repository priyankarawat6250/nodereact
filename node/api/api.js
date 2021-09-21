var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/findawk";
const dbName = "findawk";

module.exports={
    
find_one_data(collection_name,find_data){
    return new Promise((resolve,reject)=>{
            MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            var dbo = db.db(dbName);
            dbo.collection(collection_name).findOne(find_data, function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

 find_all_data(collection_name,find_data){
    /*MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).find(find_data).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            return result
        });
    });*/
    
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).find(find_data).toArray(function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

 find_and_update_data(collection_name,find_data,update_data){
    /*MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).findOneAndUpdate(find_data,update_data,function(err, result) {
            if (err) throw err;
            db.close();
            return result
        });
    });*/
    
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).findOneAndUpdate(find_data,update_data,function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

 update_one_data(collection_name,find_data,update_data){
    /*MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).updateOne(find_data,update_data, function(err, result) {
            if (err) throw err;
            db.close();
            return result
        });
    });*/
    
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).updateOne(find_data,update_data, function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

insert_one_data(collection_name,insert_data){
    /*MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).insertOne(insert_data, function(err, result) {
            if (err) throw err;
            db.close();
            return result
        });
    });*/

    return new Promise((resolve,reject)=>{
        MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).insertOne(insert_data, function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

 delete_one_data(collection_name,delete_data){
    /*MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).deleteOne(delete_data, function(err, result) {
            if (err) throw err;
            db.close();
            return result
        });
    });*/
    
    return new Promise((resolve,reject)=>{
        MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var dbo = db.db(dbName);
        dbo.collection(collection_name).deleteOne(delete_data, function(err, result) {
                if(err)
                {
                    console.log("error in api main",err);
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    });
},

    aggregate_lookup(collection_name,from_field_data,local_field_data,foreign_field_data,as_data){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                var dbo = db.db(dbName);
                dbo.collection(collection_name).aggregate([
                    { $lookup:
                        {
                        from: from_field_data,
                        localField: local_field_data,
                        foreignField: foreign_field_data,
                        as: as_data
                        }
                    }
                    ]).toArray(function(err, result) {
                        if (err) throw err;
                        db.close();
                        return result;
                });
            });
        });
    },
    
    // get total count of data (Collection)
    collectionCount(clName,filter){
        
        return new Promise((resolve,reject)=>{
                MongoClient.connect(url, function(err, db){
                assert.equal(null, err);
                var dbo = db.db(dbName);
                dbo.collection(clName).find(filter).count(function(err, count) {   
                    if(err)
                    {
                        console.log("error in api main",err);
                        reject(err);
                    }
                    else{
                        resolve(count);
                    }
                });
            });
        });
    },
    
    
    collectionCountWithAggregate(clName,filter,scndCollection,localField,foreignField,match){
        
        return new Promise((resolve,reject)=>{
            MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                var dbo = db.db(dbName);
                    dbo.collection(clName).aggregate([
                        
                        { "$match": filter },
                        
                        {
                        '$lookup': {
                              'from': scndCollection, 
                              'localField': localField, 
                              'foreignField': foreignField, 
                              'as': 'data'
                            }
                        },
                        
                        { "$match": match },
                    
                    ]).toArray(function(err, result) {
                        
                        if(err)
                        {
                            console.log("error in api main",err);
                            reject(err);
                        }
                        else{
                            resolve(result.length);
                        }
                    });
            });
        });
    }

};