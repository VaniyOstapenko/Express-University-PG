const pool = require('../db');

async function getAllDataDB() {
  const client = await pool.connect();
  const sql = `select * from users_info
        join users
        on users_info.id = users.info_id`;

  const result = (await client.query(sql)).rows;

  return result;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = `select * from users_info
    join users
    on users_info.id = users.info_id
    where users.id = $1`;

  const { rows } = await client.query(sql, [id]);

  return rows;
}

async function createUsersDB(birth, city, age, name, surname) {
  const client = await pool.connect();
  const sql_1 = `insert into users_info(birth,city,age) values
                   ($1, $2, $3) returning *`;
  const data_1 = (await client.query(sql_1, [birth, city, age])).rows;

  const sql_2 = `insert into users(name, surname, info_id) values
    ($1, $2, $3) returning *`;
  const data_2 = (await client.query(sql_2, [name, surname, data_1[0].id])).rows;

  return [{ ...data_1[0], ...data_2[0] }];
}

async function updateUsersDB(id, birth, city, age, name, surname) {
  const client = await pool.connect();
  const sql_1 = `update users_info set birth =$1, city =$2, age = $3
    where users_info.id =$4 returning *`;
  const data_1 = (await client.query(sql_1, [birth, city, age, id])).rows;

  const sql_2 = `update users set name = $1, surname = $2
    where info_id = $3 returning *`;
  const data_2 = (await client.query(sql_2, [name, surname, id])).rows;

  return [{ ...data_1[0], ...data_2[0] }];
}

async function deleteUsersDB(id) {
  const client = await pool.connect();
  const sql_1 = `delete from users where id=$1 returning *`;
  const data_1 = (await client.query(sql_1, [id])).rows;

  const sql_2 = `delete from users_info where id=$1 returning *`;
  const data_2 = (await client.query(sql_2, [id])).rows;

  return [{ ...data_1[0], ...data_2[0] }];
}

module.exports = { getAllDataDB, getUserByIdDB, createUsersDB, updateUsersDB, deleteUsersDB };
