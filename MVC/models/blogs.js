const file = require('./filesync')
const blogs = require('./data/blogs')
const shortid = require('shortid')

function getAll(){
    const blogs = file.filesync('read', '/blogs.json')
    const error = []

    if(!blogs){
        error.push('no blogs found')
        return { error }
    }

    return blogs
}

function getOne(id){
    const blogs = file.filesync('read', '/blogs.json')
    const error = []
    const blog = blogs.find(blog => blog.id == id)

    if(!blog){
        error.push(`blog was not found`)
        return { error }
    }

    return blog
}

function create(body){
    const blogs = file.filesync('read', '/blogs.json')
    const { header, desc } = body
    const error = []
    
    if(!header && !desc){
        error.push(`please add required information`)
        return { error }
    }

    const blog = {
        "id":shortid.generate(),
        "header": header,
        "desc": desc
    }
    blogs.push(blog)
    file.filesync('write', '/blogs.json', blogs)

    return blog
}

function update(id, body){
    const blogs = file.filesync('read', '/blogs.json')
    const blog = blogs.find(blog=>blog.id == id)
    const { header, desc } = body
    const error = []

    if(!blog){
        error.push('the blog you wanted to update was not found')
        return { error }
    }

    blog.header = header
    blog.desc = desc
    file.filesync('write', './blogs.json', blogs)

    return blog
}

function remove(id){
    const blogs = file.filesync('read' , './blogs.json')
    const blog = blogs.find(blog=>blog.id == id)
    const index = blogs.findIndex(blog=>blog.id === id)
    const error = []
    if(!blog){ 
        error.push('the blog that you wanted to delete was not found')
        return { error }
    }

    blogs.splice(index, 1)
    file.filesync('write', './blogs.json', blogs)

    return blogs
}

module.exports = { getAll, getOne, create, update, remove }