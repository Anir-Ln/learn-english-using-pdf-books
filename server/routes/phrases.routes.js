const express = require('express')
const router = express.Router()
const phrasesService = require('../services/phrases.service')
const phraseValidator = require('../middleware/phrasevalidator')

// get phrases
router.get("/", (req, res, next) => {
  const by = req.query?.by
  console.log("phrases get all endpoint [by=" + by + "]");
  try {
    let data = phrasesService.getAll()
    if (by === 'text') {
      let temp = {}
      data.forEach(item => {
        const {text, ...others} = item
        temp[text.replace(/\r?\n|\r/g, "")] = others
      })
      data = temp
    }

    res.json(data)

  } catch(err) {
    console.log("error while getting phrases ", err.message);
    next(err)
  }
})

router.post("/", phraseValidator.validateCreate, (req, res, next) => {
  console.log("phrases post endpoint");
  try {
    res.json(phrasesService.save(req.body))
  } catch(err) {
    console.log("error while posting a phrase ", err.message);
    next(err)
  }
})

module.exports = router