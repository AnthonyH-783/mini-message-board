const {parseMessages} = require("../public/javascripts/messageParser");
const express = require('express');
const router = express.Router();
const db = require("../db/queries");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', async function(req, res) {
  const messages = await db.getAllMessages();
  const parsedMessages = parseMessages(messages);
  res.render('index', {messages: parsedMessages});
});

router.get("/new", function(req, res){
  res.render("newMessage");
});

router.post("/new", function(req, res){
  
  const newMessage = Object.assign({added: new Date()}, req.body);
  messages.push(newMessage);
  res.redirect("/");
});

router.get("/messages/:index", function(req, res){
  const index = req.params.index;
  res.render("details", {message: messages[index]});
})

module.exports = router;
