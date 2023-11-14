const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let booksPromise = new Promise((resolve,reject)=>{
    resolve(books);
  })
  booksPromise.then((ans)=>{
      res.send(JSON.stringify(ans,null,4));
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]);

  let myPromise1 = new Promise((resolve,reject) => {
    let isbn = req.params.isbn;
    resolve(books[isbn]);
  })
  myPromise1.then((list) => {
    res.send(list);
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let booksisbnPromise = new Promise((resolve,reject) => {
    let auth = req.params.author;
    let ids = Object.keys(books);
    let ans = ids.filter( id => (books[id].author === auth));
    resolve(books[ans]);
  })
  booksisbnPromise.then((ans) => {
    res.send(ans);
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let titlePromise = new Promise((resolve,reject) =>{
    let title = req.params.title;
    let ids = Object.keys(books);
    let ans = ids.filter( id => (books[id].title === title));
    resolve(books[ans]);
  })
  titlePromise.then((ans)=>{
      res.send(ans);
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
