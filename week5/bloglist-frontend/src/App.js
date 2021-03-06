import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showAll: true,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'invalid username and/or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

toggleVisible = () => {
  this.setState({ showAll: !this.state.showAll })
}





  render() {
    const loginForm = () => ( 
      <div>
        <h2>Log in to application</h2>
          <form onSubmit={this.login}>
          <div>
            username:
            <input 
              type="text"
              name="username"
              value={this.state.username} 
              onChange={this.handleLoginFieldChange} />
          </div>
          <div> password:
            <input 
              type="password"
              name="password" 
              value={this.state.password} 
              onChange={this.handleLoginFieldChange} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>  
    )
    
    const blogsList = () => (
      <div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>  
    )

    return (
      <div>
        { this.state.user === null ?
          loginForm() :
          <div>
            <h2>Blogs</h2>
            <p>{this.state.user.name} logged in</p>
            {blogsList()}
          </div>
        }
      </div>
    );
  }
}

export default App;
