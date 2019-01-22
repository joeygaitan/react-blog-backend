const model = require('../models/blogs')

const getAll = (req,res,next) => {
    const data = model.getAll()

    if(data.error){
        return next({status: 404, message: `blogs not found`, error: data.error})
    }

    res.status(200).json(data)
}

const getOne = (req,res,next)=> {
    const data = model.getOne(req.params.id)

    if(data.error){
        return next({status: 404, message: `blog not found`, error: data.error})
    }

    res.status(200).json(data)
}

const create = (req,res,next) => {
    const data = model.create(req.body)

    if(data.error){
        return next({status:404, message: `failed to create blog`, error: data.error})
    }

    res.status(201).json(data)
}

const update = (req,res,next) => {
    const data = model.update(req.params.id, req.body)
    if(data.error){
        return next({status: 404, message: `failed to update blog`, error: data.error})
    }

    res.status(200).json(data)
}

const remove = (req,res,next)=>{
    const data = model.remove(req.params.id)

    if(data.error){
        return next({status: 404, message: `failed to delete blog`, error: data.error})
    }

    res.status(200).json(data)
}

module.exports = { getAll, getOne, create, update, remove }