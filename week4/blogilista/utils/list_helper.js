
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
  
  module.exports = {
    dummy, totalLikes
  }