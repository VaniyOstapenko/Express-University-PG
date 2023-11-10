const { getAllDataDB, getUserByIdDB, createUsersDB, updateUsersDB, deleteUsersDB } = require('../repository/user.repository');

async function getAllData() {
  const data = await getAllDataDB();
  if (!data.length) throw new Error('empty');
  return data;
}
async function getUserById(id) {
  const data = await getUserByIdDB(id);
  if (!data.length) throw new Error('id is not faund');
  return data;
}

async function createUsers(birth, city, age, name, surname) {
  const data = await createUsersDB(birth, city, age, name, surname);
  if (!data.length) throw new Error('object is not faund');
  return data;
}

async function updateUsers(id, birth, city, age, name, surname) {
  const data = await updateUsersDB(id, birth, city, age, name, surname);
  if (!data.length) throw new Error('id is not faund');
  return data;
}

async function deleteUsers(id) {
  const data = await deleteUsersDB(id);
  if (!data.length) throw new Error('id is not faund');
  return data;
}

module.exports = { getAllData, getUserById, createUsers, updateUsers, deleteUsers };
