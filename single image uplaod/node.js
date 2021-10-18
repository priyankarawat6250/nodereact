var multer  = require('multer');
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./upload");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
  });
  
  var upload = multer({ storage : Storage }).single('file');



  exports.addservice = (req, res) => {      
        

        upload(req, res, function(err) { 
            console.log("indei") 
            var name = req.body.name;
            //var price = req.body.price;
                 
            console.log(req.file);
            var imgName = req.body.imagePath;
            try {
                imgName= req.file.filename;
            }
            catch(err) {
                console.log("image not found backend");
            }

            let values = [ [imgName], [name]] 
            if(parseInt(req.body.id) > 0){
                file.db.query('UPDATE services SET ? WHERE ?', [{ image:imgName, name: name }, { id: req.body.id }], function (err, result) {
                    if (err) throw err;
                        res.json({ message: 'Service Updated Successfully', code: 500, status: true, data: result });            
                    }) 
            }else{    
                file.db.query('INSERT INTO services (image,name) VALUES(?,?)', values, function(err, result) {
                    if (err) throw err;
                    res.json({ message: 'Service added Successfully !', code: 200 ,status: true});
                })
            }
        });

    }