
const dummy = (blogs) => {
    return 1
}

const totalLikes = (arrayOfBlogs) => {
    let total = 0
    arrayOfBlogs.forEach(function(blog) { 
            total += blog.likes
        }
    )
    return total
}

const favoriteBlog = (arrayOfBlogs) => {
    const sortedBlogs = arrayOfBlogs.sort(function(obj1, obj2) {
        return obj1.likes - obj2.likes
    })
    return sortedBlogs[sortedBlogs.length - 1]
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }