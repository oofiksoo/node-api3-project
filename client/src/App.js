import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [values, setValues] = useState({
    title: "",
    contents: ""
  });

  useEffect(() => {
    const getPosts = () => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setPosts(res.data);
        //axios.get(`http://ctfjmg01:4000/api/posts/${id}/comments`).then(res => {
        //  setComments(res.data);
        // });
      });
    };
    getPosts();
  }, []);
  const addPost = () => {
    console.log(values);
    axios.post("http://ctfjmg01:4000/api/users", values).then(res => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setPosts(res.data);
      });
    });
  };
  const deletepost = id => {
    axios.delete(`http://ctfjmg01:4000/api/users/${id}`).then(res => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setPosts(res.data);
      });
    });
  };
  const onChange = e => {
    const chng = e.target.value;
    setValues({
      ...values,
      [e.target.name]: chng
    });
  };
  return (
    <div className="App">
      <h1>Add Post:</h1>
      <div className="addPost">
        <p> Title: </p>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={onChange}
        ></input>
        <p> Contents: </p>
        <input
          type="text"
          id="contents"
          name="contents"
          value={values.contents}
          onChange={onChange}
        ></input>
        <button onClick={() => addPost()}> Add </button>
      </div>
      <h1> Current Posts: </h1>
      <div className="postBox">
        {posts.map(post => (
          <div className="postCard" key={post.id}>
            <h3> {post.title} </h3> <p> {post.contents} </p>
            <button onClick={() => deletepost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
