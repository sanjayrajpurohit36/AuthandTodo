const BucketRepository = require("../repositories/BucketRepository");

module.exports = {
  create: function(req, res) {
    // payload for creating Bucket
    const payload = {
        "bucketName": req.body.bucketName       
    } 

    const userId = req.user.id
    BucketRepository.createBucket(payload, userId, req.app.db)
      .then(result => {
        res.send({
            status: true,
            message: "Bucket is created." 
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          status: false,
          message
        });
      });
  },

  getBucketData: function (req, res) { 

  },


  getBucketList: function (req, res) {
    const userId  = req.user.id;
    // const pageNo = req.params.pageNo;
    // const limit = req.params.limit
    // const from = pageNo * limit
    BucketRepository.getBucket(userId, req.app.db)
        .then(result => {
            res.send({
                status: true,
                data: result
            });
        })
        .catch(message => {
            res.status(422);
            res.send({
                status: false,
                message: "no list found"
            })

        })
  },
  
  updateBucket: function (req, res) {
    const userId = req.user.id; 
    const data =  {...req.body};
    BucketRepository.updateBucket(data, userId ,req.app.db)
        .then(result => {
            res.send({
                status: true,
                data: result
            });
        })
        .catch(message => {
            res.status(422);
            res.send({
                status: false,
                message: "no list found"
            })

        })
  },

};
