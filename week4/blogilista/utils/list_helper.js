
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

const mostBlogs = (arrayOfBlogs) => {
    let counted = []
    let final = []
    arrayOfBlogs.forEach(blog => counted.push(blog.author))

    counted.forEach(function(x) {
        var obj = {"author": x, "blogs": ((final[x] || 0)+1)}
    });    
    console.log(counted)

    // arrayOfBlogs.forEach(blog => counted.push({"author": blog.author, "blogs": 0}))
}


const mostLikes = (arrayOfBlogs) => {
    let counted = []
    let final = []
    arrayOfBlogs.forEach(blog => counted.push({"author": blog.author, "likes": blog.likes}))

    counted.forEach(function(x) {
        var obj = {"author": x, "likes": ((final[x] || 0)+1)}
    });    
    console.log(counted)

    // arrayOfBlogs.forEach(blog => counted.push({"author": blog.author, "blogs": 0}))
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}