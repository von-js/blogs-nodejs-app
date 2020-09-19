const Blog = require('../models/blog.js');

// index function
const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => { 
      res.render('blogs/index', { blogs: result, title: 'All blogs' }); 
    })
    .catch((err) => {
      console.log(err)
    })
}

// blog details
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { blog: result, title: 'Blogs details' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

// blog create GET
const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create'});
};

// blog create POST
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
};

// blog delete
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    })
};

// exports functop to blogRoutes
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};