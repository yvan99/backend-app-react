import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import httpService from "./services/httpService";
import config from './config.json'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    // PENDING
    // data is the name of the object of the API
    const { data: posts } = await httpService.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: sendPost } = await httpService.post(config.apiEndPoint, obj);
    const posts = [sendPost, ...this.state.posts];
    this.setState({ posts });
    // console.log("Add");
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await httpService.put(config.apiEndPoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    //await httpService.patch(`${config.apiEndPoint}/${post.id,{title:post.title}}`)
    // console.log("Update", post);
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await httpService.delete('dd'+config.apiEndPoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      this.setState({ posts: originalPosts });
      if (ex.response && ex.response.status === 404) {
        alert("Post have been deleted");
        this.setState({ posts: originalPosts });
      }
    }

    //console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
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
            {this.state.posts.map((post) => (
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
