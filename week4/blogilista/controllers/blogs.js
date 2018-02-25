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
      const body = request.body
      const user = await User.findById(body.userId)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })

      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedNote._id)
      await user.save()

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