module.exports = function override(config, env) {
  config.module.rules = config.module.rules.filter(rule => {
      return !(
          rule.test &&
          rule.test.toString().includes("scss")
      );
  });
  return config;
};
