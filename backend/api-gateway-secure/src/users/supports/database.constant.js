module.exports = {
    LIST_USERS: 'SELECT * FROM ::users;',
    SAVE_USERS: `INSERT INTO ::users (
        name,
        email
        ) VALUES (
        :name,
        :email
        ) returning *;`,
    EXISTS_USER_EMAIL: `SELECT * FROM users WHERE email=:email;`,
}
