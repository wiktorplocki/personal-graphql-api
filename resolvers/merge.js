const Technology = require('../models/technology');
const Project = require('../models/project');

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

const singleTechnology = async techId => {
  try {
    const technology = await Technology.findById(techId);
    return {
      ...technology._doc,
      _id: technology.id
    };
  } catch (err) {
    throw err;
  }
};

const projects = async () => {
  try {
    const projects = await Project.find();
    return projects.map(project => transformProjects(project));
  } catch (err) {
    throw err;
  }
};

const singleProject = async projectId => {
  try {
    const project = await Project.findById(projectId);
    return transformProjects(project);
  } catch (err) {
    throw err;
  }
};

const addTechnologiesToProject = async (projectId, technologies) => {
  try {
    const foundProject = await Project.findById(projectId);
    await technologies.forEach(label => {
      const foundTech = Technology.findOne({ label });
      if (!foundTech) {
        throw new Error('Technology specified not found!');
      }
      return foundProject.technologies.push(foundTech);
    });
    await foundProject.save();
  } catch (err) {
    throw new Error(err);
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
