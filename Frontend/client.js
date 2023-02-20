import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const createPost = () => {
    axios.post('http://localhost:5000/posts', { title, body })
    .then(response => setPosts([...posts, response.data]))
    .catch(error => console.error(error));
};

const deletePost = (postId) => {
  axios.delete(`http://localhost:5000/posts/${postId}`)
    .then(response => setPosts(posts.filter(post => post._id !== response.data._id)))
    .catch(error => console.error(error));
};

const createComment = (postId, commentBody) => {
  const updatedPosts = posts.map(post => {
    if (post._id === postId) {
      return { ...post, comments: [...post.comments, { body: commentBody, date: Date.now() }] };
    } else {
      return post;
    }
  });

  setPosts(updatedPosts);

  axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
    .catch(error => console.error(error));
};

const createNestedComment = (postId, commentIndex, commentBody) => {
  const updatedPosts = posts.map(post => {
    if (post._id === postId) {
      const updatedComments = [...post.comments];
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        comments: updatedComments[commentIndex].comments.filter((_, index) => index !== nestedCommentIndex)
        };
        return { ...post, comments: updatedComments };
        } else {
        return post;
        }
        });
        setPosts(updatedPosts);

axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
  .catch(error => console.error(error));
};

const editPost = (postId, updatedBody) => {
const updatedPosts = posts.map(post => {
  if (post._id === postId) {
    return { ...post, body: updatedBody };
  } else {
    return post;
  }
});

setPosts(updatedPosts);

axios.put(`http://localhost:5000/posts/${postId}`, { body: updatedBody })
  .catch(error => console.error(error));
};

const editComment = (postId, commentIndex, updatedBody) => {
const updatedPosts = posts.map(post => {
  if (post._id === postId) {
    const updatedComments = [...post.comments];
    updatedComments[commentIndex] = { ...updatedComments[commentIndex], body: updatedBody };
    return { ...post, comments: updatedComments };
  } else {
    return post;
  }
});

setPosts(updatedPosts);

axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
  .catch(error => console.error(error));
};

const editNestedComment = (postId, commentIndex, nestedCommentIndex, updatedBody) => {
const updatedPosts = posts.map(post => {
  if (post._id === postId) {
    const updatedComments = [...post.comments];
    updatedComments[commentIndex] = {
      ...updatedComments[commentIndex],
      comments: updatedComments[commentIndex].comments.map((comment, index) => {
        if (index === nestedCommentIndex) {
          return { ...comment, body: updatedBody };
        } else {
          return comment;
        }
      })
    };
    return { ...post, comments: updatedComments };
  } else {
    return post;
  }
});

setPosts(updatedPosts);

axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
  .catch(error => console.error(error));
};

const deleteComment = (postId, commentIndex) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        const updatedComments = post.comments.filter((comment, index) => index !== commentIndex);
        return { ...post, comments: updatedComments };
      } else {
        return post;
      }
    });

    setPosts(updatedPosts);

    axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
      .catch(error => console.error(error));
  };

  const deleteNestedComment = (postId, commentIndex, nestedCommentIndex) => {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        const updatedComments = [...post.comments];
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          comments: updatedComments[commentIndex].comments.filter((comment, index) => index !== nestedCommentIndex)
        };
        return { ...post, comments: updatedComments };
      } else {
        return post;
      }
    });

    setPosts(updatedPosts);

    axios.put(`http://localhost:5000/posts/${postId}`, { comments: updatedPosts.find(post => post._id === postId).comments })
      .catch(error => console.error(error));
  };}
  