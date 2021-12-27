import React, { Component } from "react";
import axios from 'axios'
import "./App.css";

axios.interceptors.response.use(null, error => {
  console.log('INTERCEPTOR CALLED ')
  return Promise.reject(error);
})

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {

    // const promise = axios.get('https://jsonplaceholder.typicode.com/posts')
    // const data = await promise;

    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    const { data: posts } = await axios.get(apiEndpoint)
    this.setState({ posts })
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' }

    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts]
    this.setState({ posts })
  };

  handleUpdate = async post => {
    post.title = "UPDATED"
    await axios.put(apiEndpoint + '/' + post.id, post)  //put - entire object
    //axios.patch(apiEndpoint + '/' + post.id, { title: post.title })    //some props

    const posts = [...this.state.posts]
    const index = posts.indexOf(post)
    posts[index] = { ...post }
    this.setState({ posts })
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts })

    try {
      await axios.delete(apiEndpoint + '/33fds215')

    } catch (ex) {
      console.log('handle delete catch block...')

      //ex.request
      //ex.response

      //Expected(404: not found, 400: bad request)  - CLIENT ERRORS
      // - Display a specific error message
      if (ex.response && ex.response.status === 404) {
        alert('This post has already been deleted')
      }
      //Unexpected (network down, server down, db down, bug)
      // - Log them
      // - Display a generic and friendly error message  
      else {
        console.log('Logging the error', ex)
        alert("An unexpected error occurred. ")
      }


      this.setState({ posts: originalPosts })
    }




  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;