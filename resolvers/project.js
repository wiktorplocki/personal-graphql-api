const Project = require('../models/project');
const Technology = require('../models/technology');
const { transformProjects } = require('../resolvers/merge');

const projects = async () => {
  try {
    const projects = await Project.find();
    return projects.map(project => transformProjects(project));
  } catch (err) {
    throw err;
  }
};

const createProject = async args => {
  const project = new Project({
    name: args.projectInput.name,
    client: args.projectInput.client,
    description: args.projectInput.description,
    technologies: []
  });
  let createdProject;
  try {
    const result = await project.save();
    createdProject = transformProjects(result);
    return createdProject;
  } catch (err) {
    throw err;
  }
};

const addTechnologiesToProject = async args => {
  console.log(args);
  try {
    const foundProject = await Project.findById(args.projectId);
    if (!foundProject) {
      throw new Error('Project not found!');
    }
    await args.techToProjectInput.map(label => {
      console.log(label);
      const foundTech = Technology.findOne({ label });
      if (!foundTech) {
        throw new Error('Technology specified not found!');
      }
      console.log(foundProject.technologies);
      return foundProject.technologies.push(foundTech);
    });
    await foundProject.save();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { projects, createProject, addTechnologiesToProject };
