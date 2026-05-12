const {body, validationResult, matchedData} = require("express-validator");
const db = require("../db/queries");
const {parseMessages} = require("../public/javascripts/messageParser");

/**
 * Validation Chain for query parameters sent through user form
 * @returns array of validating functions
 */
const validationChain = () => { 
    // Using an anonymous function is advised by the express-validator docs
    return [ 
        body("username").trim().notEmpty().isAlphanumeric().withMessage("Username can be alphanumeric only")
        .isLength({min: 1, max: 25}).withMessage("Userame can be between 1 and 25 chars only"),

        body("message").trim().notEmpty().withMessage("Cannot send empty message")
        .isLength({min: 2, max: 1200}).withMessage("Message can be 1200 chars at most and 2 chars at least")  
    ]
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getIndex = async(req, res) => {
    const messages = await db.getAllMessages();
    const parsedMessages = parseMessages(messages);
    console.log(parsedMessages);
    res.render("index", {messages: parsedMessages});
}

exports.messageFormGet = (req, res) => {
    res.render("newMessage");
}

exports.messageFormPost = [
    validationChain(),
    async (req, res) => {
        const errors = validationResult(req);
        console.log(errors.array());
        if(!errors.isEmpty()){
            return res.status(400).render("newMessage", {errors: errors.array()});
        }
        const message = {...matchedData(req), date: new Date()};
        await db.addMessage(message);
        res.redirect("/");
    }
];

exports.messageDetailsGet = async(req, res) => {
    const msgId = req.params.id;
    const message = await db.getMessageById(msgId);
    res.render("details", {message});
}