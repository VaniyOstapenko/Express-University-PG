function isValidById(req, res, next) {
  const { id } = req.params;

  if (isNaN(id)) throw new Error('id должен быть числом');
  if (id < 1) throw new Error('id не может быть меньше 0 или равно');

  next();
}

function isValidBody(req, res, next) {
  const { birth, city, age, name, surname } = req.body;

  if (!birth) throw new Error('empty');
  if (!city) throw new Error('empty');
  if (!age) throw new Error('empty');
  if (!name) throw new Error('empty');
  if (!surname) throw new Error('empty');

  next();
}

module.exports = { isValidById, isValidBody };
