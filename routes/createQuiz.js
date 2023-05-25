const express = require('express');
const router  = express.Router();

//Load homepage
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;


const express = require ('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('createQuiz');
});

module.exports = router;
