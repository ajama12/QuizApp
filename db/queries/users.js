const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserByEmail = function(email) {
  return db
    .query(`SELECT *
    FROM users
    WHERE email = $1`, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getUserById = function(id) {
  return db
    .query(`SELECT *
    FROM users
    WHERE id = $1`, [id])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const addUser = function(username, password, email) {
  return db
    .query(`INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3) RETURNING *`, [username, password, email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = { getUsers, getUserByEmail, getUserById, addUser };


