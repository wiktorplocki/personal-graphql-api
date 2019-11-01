const Project = require('../models/project');
const Technology = require('../models/technology');
const { transformProjects } = require('../resolvers/merge');

const projects = async () => await Project.find().map(transformProjects);

const singleProject = async args => {
  try {
    const project = await Project.findById(args.projectId);
    if (!project) {
      throw new Error('Project does not exist!');
    }
    return transformProjects(project);
  } catch (err) {
    throw new Error(err);
  }
};

const createProject = async args => {
  const project = new Project({
    name: args.projectInput.name,
    client: args.projectInput.client,
    description: args.projectInput.description,
    link: args.projectInput.link,
    technologies: []
  });
  if (!project) {
    throw new Error('Project could not be created!');
  }
  return transformProjects(await project.save());
};

const updateProject = async args => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      args.projectId,
      args.projectUpdateInput,
      { multi: true }
    );
    if (!updatedProject) {
      throw new Error('Project not found!');
    }
    await updatedProject.save();
    return transformProjects(updatedProject);
  } catch (err) {
    throw new Error(err);
  }
};

const removeProject = async args => {
  try {
    const deletedProject = await Project.findByIdAndDelete(args.projectId);
    if (!deletedProject) {
      throw new Error('Project does not exist!');
    }
    return transformProjects(deletedProject);
  } catch (err) {
    throw new Error(err);
  }
};

const addTechnologyToProject = async args => {
  try {
    const foundProject = await Project.findById(args.projectId);
    if (!foundProject) {
      throw new Error('Project not found!');
    }
    const foundTech = await Technology.findOne({
      label: args.techToProjectInput
    });
    if (!foundTech) {
      throw new Error('Technology not found!');
    }
    await foundProject.update({
      $push: { technologies: foundTech }
    });
    const result = await foundProject.save();
    return transformProjects(result);
  } catch (err) {
    throw new Error(err);
  }
};

// const removeTechnologiesFromProject = async args => {
//   try {
//     const foundProject = await Project.findById(args.projectId);
//     if (!foundProject) {
//       throw new Error('Project not found!');
//     }
//     await args.techToProjectInput.forEach(label =>
//       Technology.findOne({ label })
//         .then(result =>
//           Project.updateOne(foundProject, {
//             $pull: { technologies: { label: { $in: result.label } } }
//           })
//         )
//         .catch(err => {
//           throw new Error(err);
//         })
//     );
//     await foundProject.save();
//     return transformProjects(foundProject);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// iterate over list of technologies on a project, search for matches among ids of existing technologies

const addTechnologiesToProject = async args => {
  try {
    const foundProject = await Project.findById(args.projectId);
    if (!foundProject) {
      throw new Error('Project not found!');
    }
    let updatedProject;
    if (args.techToProjectInput) {
      args.techToProjectInput.forEach(label => {
        Technology.findOne({ label }).then(result => {
          updatedProject = foundProject.update({
            $push: { technologies: result }
          });
        });
      });
      await updatedProject.save();
      return transformProjects(updatedProject);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const removeTechnologiesFromProject = async args => {
  try {
    const foundProject = await Project.findById(args.projectId);
    if (!foundProject) {
      throw new Error('Project not found!');
    }
    if (foundProject.technologies && foundProject.technologies.length > 0) {
      foundProject.technologies.forEach(tech => {
        Technology.findById(tech).then(result => {
          if (args.techToProjectInput.includes(result.label)) {
            Project.findByIdAndUpdate(foundProject.id, {
              $pull: { technologies: result._id }
            }).then(res => res);
          } else {
            throw new Error('Technology specified not found in this project!');
          }
        });
      });
    } else {
      throw new Error('Project does not have any technologies attached!');
    }
    return transformProjects(foundProject);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  projects,
  singleProject,
  createProject,
  updateProject,
  removeProject,
  addTechnologyToProject,
  addTechnologiesToProject,
  removeTechnologiesFromProject
};
