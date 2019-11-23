const BucketRepository = require("../repositories/BucketRepository");

module.exports = {
  create: function(req, res) {
    // payload for creating Bucket
    const payload = {
      bucketName: req.body.bucketName,
      user: req.user.id
    };

    BucketRepository.create(payload)
      .then(result => {
        res.send({
          status: true,
          message: "Bucket is created.",
          bucket: result
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

  getBucketData: function(req, res) {
    BucketRepository.find(req.params.bucketId)
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
      });
    });
  },

  getBucketList: function(req, res) {
    const userId = req.user.id;
    BucketRepository.all(userId)
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
        });
      });
  },

  updateBucket: function(req, res) {
    const userId = req.user.id;
    const data = { ...req.body };
    BucketRepository.updateBucket(data, userId, req.app.db)
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
        });
      });
  }
};
