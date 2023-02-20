const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017/post-app', { useNewUrlParser: true });

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

app.post('/posts', (req, res) => {
  const post = new Post(req.body);
  post.save((err, savedPost) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(savedPost);
    }
  });
});

app.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(posts);
    }
  });
});

app.put('/posts/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(updatedPost);
    }
  });
});

app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(deletedPost);
    }
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
