const express = require("express");
const messageRouter = express.Router();

messageRouter.get("/", (req, res) => {
    res.render("newMessage");
});

module.exports = messageRouter;
