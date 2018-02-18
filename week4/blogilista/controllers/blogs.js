const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
      const blogs = await Blog.find({})
      response.json(blogs)
    } catch (exception) {
      response.status(400).json({error: 'priipraa'})
    }
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

  blogsRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      response.status(400).send({ error: 'malformatted id' })
    }
  })

  // blogsRouter.put('/:id', (request, response) => {
  //   const body = request.body
  
  //   const blog = {
  //     _id: blog._id,
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes,
  //     __v: blog.__v
  //   }
  
  //   Blog
  //     .findByIdAndUpdate(request.params.id, blog, { new: true })
  //     .then(updateBlog => {
  //       response.json(Blog.format(updateBlog))
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       response.status(400).send({ error: 'malformatted id' })
  //     })
  // })

  module.exports = blogsRouter