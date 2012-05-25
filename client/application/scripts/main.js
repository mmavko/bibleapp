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
  ], function(app) {
    app.run();
  }
);
