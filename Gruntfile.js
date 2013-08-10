module.exports = function(grunt) {
  // Hack for domains with '.' in them
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  grunt.initConfig({
    s3: grunt.file.readJSON('s3.json'),

    // Harp will handle our assets, this is just here to
    // enable livereload.
    watch: {
      options: { livereload: true }
    },

    // Runs harp server and livereload task in parallel
    parallel: {
      server: {
        options: { stream: true },
        tasks: [
          { cmd: 'harp', args: ['server', 'site'] },
          { grunt: true, args: ['watch'] }
        ]
      }
    },

    // Deploys to s3
    s3deploy: {
      options: {
        key: '<%= s3.key %>',
        secret: '<%= s3.secret %>',
        bucket: '<%= s3.bucket %>',
        access: 'public-read',
        connections: 5
      },
      site: {
        files: [{
          expand: true,
          cwd: 'site/www/',
          src: '**/*.*',
          dest: './'
        }]
      }
    },


    exec: {
      // Compiles harp assests
      harpCompile: { command: 'harp compile site' },
      // Deletes compiled harp assets
      harpCleanup: { command: 'rm -rf site/www' }
    }
  });

  // Load in plugins
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-awssum-deploy');
  grunt.loadNpmTasks('grunt-exec');

  // Friendly names for our tasks
  grunt.registerTask('server', 'parallel:server');
  grunt.registerTask('deploy', ['exec:harpCompile', 's3deploy:site', 'exec:harpCleanup']);

  // By default, run the server
  grunt.registerTask('default', ['server']);
};
