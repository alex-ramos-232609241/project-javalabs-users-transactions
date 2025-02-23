module.exports = {
    LIST_TRANSACTIONS: 'SELECT * FROM ::transactions WHERE user_id=:user_id;',
    SAVE_TRANSACTIONS: 'INSERT INTO ::transactions (user_id,amount, type ) VALUES (:user_id, :amount, :type) returning *;',
    EXISTS_USER_EMAIL: `SELECT * FROM users WHERE email=:email;`,
}