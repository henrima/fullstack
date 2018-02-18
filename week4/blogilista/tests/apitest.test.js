const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, format, nonExistingId, blogsInTheDb } = require('./test_helper')


beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObjects.map(blog => blog.save()))
})

  test('blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInTheDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(n => n.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('a valid blog can be added ', async () => {
      const blogsAtStart = await blogsInTheDb()
      const newBlog = {
          _id: "5a422bc61b54a676234d17fd",
          title: "Peten paluu",
          author: "Pepe Willberg",
          url: "http://jesjes.com/ml",
          likes: 18,
          __v: 0
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')
    
      const blogsAfterOperation = await blogsInTheDb()
      const titles = blogsAfterOperation.map(r => r.title)
    
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
      expect(titles).toContain("Peten paluu")
    })

    test('if blog with no likes is added then likes are set to zero ', async () => {
      const newBlog = {
          _id: "5a422bc61b54a676234d17fe",
          title: "Peten paluu2",
          author: "Pepe Willberg",
          url: "http://jesjes.com/ml",
          __v: 0
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')
    
      const likesOfNew = response.body[response.body.length-1]
    
      expect(likesOfNew.likes).toBeDefined()
      expect(likesOfNew.likes).toBe(0)
    })

    test('title and url are required for new object', async () => {
      const newBlog = {
          _id: "5a422bc61b54a676234d17ff",
          author: "Pepe Willberg",
          likes: 5,
          __v: 0
      }

      const blogsAtStart = await blogsInTheDb()
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAfterOperation = await blogsInTheDb()

      const titles = blogsAfterOperation.map(blog => blog.title)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    describe('deletion of a blog', async () => {
      let addedBlog
  
      beforeAll(async () => {
        addedBlog = new Blog({
          title: "Peten poisto",
          author: "Pepe Willberg",
          url: "http://jesjes.com/ml",
          likes: 5
        })
        await addedBlog.save()
      })
  
      test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const blogsAtStart = await blogsInTheDb()
  
        await api
          .delete(`/api/blogs/${addedBlog._id}`)
          .expect(204)
  
        const blogsAfterOperation = await blogsInTheDb()
  
        const titles = blogsAfterOperation.map(blog => blog.title)
  
        expect(titles).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toEqual(blogsAtStart.length-1)
      })
    })

    // describe('update of a blog', async () => {
    //   let updatedBlog
  
    //   beforeAll(async () => {
    //     updatedBlog = new Blog({
    //       title: "Peten lisays",
    //       author: "Pepe Willberg",
    //       url: "http://jesjes.com/ml",
    //       likes: 5
    //     })
    //     await updatedBlog.save()
    //   })
  
    //   test('PUT /api/blogs/:id changes the object', async () => {
    //     const blogsAtStart = await blogsInTheDb()
    //     const updatedLikes = updatedBlog.likes + 1

    //     Blog
    //       .findByIdAndUpdate(updatedBlog._id, updatedBlog, { likes: updatedLikes } )
    //       .then(updatedNote => {
    //         response.json(formatNote(updatedNote))
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         response.status(400).send({ error: 'malformatted id' })
    //       })
          
    //     const blogsAfterOperation = await blogsInTheDb()
  
    //     const ids = blogsAfterOperation.map(blog => blog._id)
  
    //     expect(ids).not.toContain(updatedBlog._id)
    //     expect(updatedBlog.likes).toEqual(updatedLikes)
    //   })
    // })



afterAll(() => {
  server.close()
})