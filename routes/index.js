const {parseMessages} = require("../public/javascripts/messageParser");
const express = require('express');
const router = express.Router();
const db = require("../db/queries");


/* GET home page. */
router.get('/', async function(req, res) {
  const messages = await db.getAllMessages();
  const parsedMessages = parseMessages(messages);
  res.render('index', {messages: parsedMessages});
});

router.get("/new", function(req, res){
  res.render("newMessage");
});

router.post("/new", async function(req, res){
  
  const newMessage = Object.assign({date: new Date()}, req.body);
  await db.addMessage(newMessage);
  res.redirect("/");
});

router.get("/messages/:index", async function(req, res){
  const index = req.params.index;
  const message = await db.getMessageById(index);
  console.log(message);
  res.render("details", {message});
})

module.exports = router;
