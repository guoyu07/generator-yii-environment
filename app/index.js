'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var YiiEnvironmentGenerator = module.exports = function YiiEnvironmentGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YiiEnvironmentGenerator, yeoman.generators.Base);

YiiEnvironmentGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'Would you like to tell me the name of the app? The name will be used for the vhost (%name%.dev)'
    },
    {
      name: 'webserver',
      message: 'which webserver do you want to use? (apache2/nginx)',
      default: "nginx"
    },
    {
      name: 'indent',
      message: 'which space indent you want to use? (2/4/tab)',
      default: "4"
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.webserver = props.webserver;

    cb();
  }.bind(this));
};

YiiEnvironmentGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
};

YiiEnvironmentGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
