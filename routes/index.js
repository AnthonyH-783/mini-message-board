const express = require('express');
const router = express.Router();
const db = require("../db/queries");
const messageController = require("../controllers/messageController");


// Home Page
router.get('/', messageController.getIndex);

// Getting message submission form
router.get("/new", messageController.messageFormGet);

// Adding new messssages
router.post("/new", messageController.messageFormPost);

// Looking up message details
router.get("/messages/:id", messageController.messageDetailsGet);

module.exports = router;
