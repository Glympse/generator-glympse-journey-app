// Copies remaining files to places other tasks can use
module.exports = {
  dev: {
    options: {
      style: 'expanded'
    },
    files: [{
        expand: true,
        cwd: '<%= config.app %>/css/scss',
        src: ['*.scss'],
        dest: '<%= config.app %>/css',
        ext: '.css'
    }]
  }
};

