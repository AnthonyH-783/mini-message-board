const pool = require("./pool");

 async function getAllMessages(){
    const {rows} = await pool.query(`SELECT * FROM messages;`);
    return rows;
}

async function getMessageById(id){
    const {rows} = await pool.query(`SELECT * FROM messages WHERE id = $1;`, [id]);
    return rows[0];
}

async function addMessage({username, message, date}){
    const SQL = `INSERT INTO messages (username, message, date)
                 VALUES ($1, $2, $3);
                 `
    await pool.query(SQL, [username, message, date]);
}

module.exports = {getAllMessages, getMessageById, addMessage};

