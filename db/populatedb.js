const {Client} = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS messages(
               id INTEGER GENERATED ALWAYS AS IDENTITY,
               username VARCHAR (25),
               message VARCHAR (1200),
               date DATE
               );
               INSERT INTO messages (username, message, date)
               VALUES
                    ('alice92', 'Hey everyone! Just joined this platform, excited to connect!', '2024-01-15'),
                    ('bob_the_dev', 'Has anyone tried the new React 19 features? Game changer!', '2024-02-03'),
                    ('sara.m', 'Good morning! Coffee in hand, ready to code ☕', '2024-02-14'),
                    ('techguru99', 'Just pushed a major refactor. Fingers crossed the tests pass 🤞', '2024-03-01'),
                    ('luna_writes', 'Anyone have recommendations for good tech podcasts?', '2024-03-22'),
                    ('devdave', 'PSA: Remember to back up your databases before running migrations!', '2024-04-10'),
                    ('codeNewbie', 'Finally fixed that bug that has been haunting me for 3 days. Victory!!', '2024-04-28'),
                    ('alice92', 'Just hit 100 contributions on GitHub this year 🎉', '2024-05-05'),
                    ('bob_the_dev', 'Hot take: tabs are better than spaces. Fight me.', '2024-05-17'),
                    ('mr_pixel', 'Spent all day on a CSS centering issue. I need a vacation.', '2024-06-02'),
                    ('sara.m', 'Deployed to production on a Friday. Living dangerously 😬', '2024-06-21'),
                    ('techguru99', 'TypeScript has ruined me. I cannot write plain JS anymore.', '2024-07-04'),
                    ('luna_writes', 'Writing documentation is an art form. Underrated skill.', '2024-07-19'),
                    ('devdave', 'Our API response times dropped by 40% after caching. Huge win.', '2024-08-08'),
                    ('codeNewbie', 'Started learning SQL this week. WHERE have you been all my life?', '2024-09-01');`

async function main(){
    console.log("... seeding");
    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done");
}

main();