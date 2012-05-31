require({
    paths: {
      app: "/app",
      lib: "/lib"
    }
  }, [
    'cs!app/index',
    'lib/jquery.xxspubsub',
    'lib/tmpl',
    'lib/debounce',
    'lib/prefixfree'
  ], function(app) {
    app.run();
  }
);
