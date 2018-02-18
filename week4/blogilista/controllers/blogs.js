const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', async (request, response) => {
    try {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch (exception) {
      response.status(400).json({error: 'priipraa'})
    }
  })
  

  module.exports = blogsRouter