const Technology = require('../models/technology');

const technologies = async techIds => {
  try {
    const technologies = await Technology.find({ _id: { $in: techIds } });
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

const transformProjects = project => {
  return {
    ...project._doc,
    _id: project.id,
    technologies: technologies.bind(this, project._doc.technologies)
  };
};

module.exports = { transformProjects };
