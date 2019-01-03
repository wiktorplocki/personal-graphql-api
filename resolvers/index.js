const technologyResolver = require('./technology');
const projectResolver = require('./project');
const authResolver = require('./auth');

const rootResolver = {
  ...authResolver,
  ...technologyResolver,
  ...projectResolver
};

module.exports = rootResolver;
