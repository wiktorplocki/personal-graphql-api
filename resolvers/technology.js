const Technology = require('../models/technology');

const technologies = async () => {
  try {
    const technologies = await Technology.find();
    return technologies.map(tech => {
      return {
        ...tech._doc,
        _id: tech.id
      };
    });
  } catch (err) {
    throw err;
  }
};

const createTechnology = async args => {
  const technology = new Technology({ label: args.technologyInput.label });
  try {
    const result = await technology.save();
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { technologies, createTechnology };
