const requireDir = require('require-dir');
const controllers = requireDir(process.env.SERVICE_CONTROLLER_DIR);

module.exports = {

  /**
   * Get all valid route handlers coming from every controller file
   * @return {Array} List of valid property handlers (functions)
   */
  routes: function getRoutes() {
    return Object
      .keys(controllers)
      .map(controller => controllers[controller])
      .filter(controller => typeof controller === 'function');
  }
};
