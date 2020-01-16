import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers]
  const [values, setValues] = useState({
    text: ""
  });

  useEffect(() => {
    const getPosts = () => {
      axios.get("http://ctfjmg01:4000/api/posts").then(res => {
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
    axios.post("http://ctfjmg01:4000/api/posts", values).then(res => {
      axios.get("http://ctfjmg01:4000/api/posts").then(res => {
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
        <p> Texte: </p>
        <input
          type="text"
          id="text"
          name="title"
          value={values.text}
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
