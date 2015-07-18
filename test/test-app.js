'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('glympse-journey-app:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ projName: 'testapp', githubUser: 'j5kay' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'frag.end',
      'frag.start',
      'Gruntfile.js',
      'package.json',
      'README.md',
      '.bowerrc',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.jscsrc',
    ]);
  });
});
