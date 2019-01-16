const technologyResolver = require('./technology');
const projectResolver = require('./project');
const blogResolver = require('./blog');
const authResolver = require('./auth');

const rootResolver = {
  ...authResolver,
  ...technologyResolver,
  ...projectResolver,
  ...blogResolver
};

module.exports = rootResolver;
