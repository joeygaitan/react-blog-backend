const express = require('express')
const router = express.Router()
const interFaceController = require('../controllers/blogs')

router.get('/', interFaceController.getAll)

router.get('/:id', interFaceController.getOne)

router.post('/', interFaceController.create)

router.put('/:id', interFaceController.update)

router.delete('/:id', interFaceController.remove)

module.exports = router