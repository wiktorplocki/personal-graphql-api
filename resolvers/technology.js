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
    throw new Error(err);
  }
};

const singleTechnology = async args => {
  try {
    const technology = await Technology.findById(args.techId);
    if (!technology) {
      throw new Error('Specified technology does not exist!');
    }
    return {
      ...technology._doc,
      _id: technology.id
    };
  } catch (err) {
    throw new Error(err);
  }
};

const createTechnology = async args => {
  const technology = new Technology({ label: args.technologyInput.label });
  try {
    const result = await technology.save();
    return { ...result._doc, _id: result.id };
  } catch (err) {
    throw new Error(err);
  }
};

const updateTechnology = async args => {
  try {
    const updatedTechnology = await Technology.findByIdAndUpdate(
      args.techId,
      args.technologyInput
    );
    if (!updatedTechnology) {
      throw new Error('No technology found!');
    }
    await updatedTechnology.save();
    return { ...updatedTechnology._doc, _id: updatedTechnology.id };
  } catch (err) {
    throw new Error(err);
  }
};

const removeTechnology = async args => {
  try {
    const deletedTech = await Technology.findByIdAndDelete(args.techId);
    if (!deletedTech) {
      throw new Error('Specified technology does not exist!');
    }
    return {
      ...deletedTech._doc,
      _id: deletedTech.id
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  technologies,
  singleTechnology,
  createTechnology,
  updateTechnology,
  removeTechnology
};
