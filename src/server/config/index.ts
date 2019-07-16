export default require(`./${process.env.NODE_ENV}`).default;


nconf.env({
    separator: '__',
    parseValues: true
  });