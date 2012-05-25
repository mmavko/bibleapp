({
  appDir: "./application",
  baseUrl: "scripts",
  dir: "./application-build",
  paths: {
    app: "../app",
    lib: "../lib",
    //Switch the mappings for cs and csBuild so the built
    //version of the cs plugin is super small.
    cs: 'csBuild',
    csBuild: 'cs'
  },
  modules: [
    {
      name: 'main',
      exclude: ['CoffeeScript']
    }
  ]
})
