const getHistoryByUserId = function(userId) {
  return pool
    .query(`SELECT *
    FROM history
    WHERE user_id = $1`, [userId])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
  };

