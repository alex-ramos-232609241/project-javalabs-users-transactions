module.exports = {
    LIST_TRANSACTIONS: 'SELECT * FROM ::transactions WHERE user_id=:user_id;',
    SAVE_TRANSACTIONS: 'INSERT INTO ::transactions (user_id,amount, type ) VALUES (:user_id, :amount, :type) returning *;',
    EXISTS_USER_EMAIL: `SELECT * FROM users WHERE id=:user_id;`,
    BALANCE_TRANSACTIONS: `SELECT
    COALESCE(
        SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'withdrawal' THEN amount ELSE 0 END),
        0
     ) AS balance
    FROM transactions
    WHERE user_id = :user_id;`
}