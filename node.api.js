export default pluginOptions => ({
  afterPrepareRoutes: async state => {
    // console.log('hello world', state.routes);
    return state;
  }
});
