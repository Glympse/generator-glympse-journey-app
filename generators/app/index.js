'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var GitHubApi = require('github');
var path = require('path');
var url = require('url');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


var env = process.env;
var githubOptions = { version: '3.0.0' };
var proxy = env.http_proxy || env.HTTP_PROXY || env.https_proxy || env.HTTPS_PROXY || null;
var emptyGithubRes = { name: '', email: '', html_url: '' };

if (proxy)
{
	var proxyUrl = url.parse(proxy);
	githubOptions.proxy = { host: proxyUrl.hostname, port: proxyUrl.port };
}

var github = new GitHubApi(githubOptions);

if (process.env.GITHUB_TOKEN)
{
	github.authenticate({ type: 'oauth', token: process.env.GITHUB_TOKEN });
}

var githubUserInfo = function (name, cb, log)
{
	github.user.getFrom({
		user: name
	}, function (err, res)
	{
		if (err) {
			log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
			res = emptyGithubRes;
		}

		cb(JSON.parse(JSON.stringify(res)));
	});
};

module.exports = yeoman.generators.Base.extend(
{
	prompting: function()
	{
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the swanky ' + chalk.red('JourneyApp') + ' generator!'));

		var prompts = [{
			type: 'input',
			name: 'projName',
			message: 'App name (creates directory under current directory)',
			default: this.appname
		},
		{
			type: 'input',
			name: 'githubUser',
			message: 'Would you mind telling me your username on GitHub?',
			default: 'someuser'
		}];

		this.prompt(prompts, function(props)
		{
			this.appname = props.projName;
			this.githubUser = props.githubUser;
			this.props = props;	// To access props later use this.props.someOption;
			
			done();
			
		}.bind(this));
	},
	
	configuring:
	{
		enforceFolderName: function()
		{
			if (this.appname !== _.last(this.destinationRoot().split(path.sep)))
			{
				this.destinationRoot(this.appname);
			}

			this.config.save();
		},

		userInfo: function()
		{
			var done = this.async();
			githubUserInfo(this.githubUser, function(res)
			{
				this.realname = res.name;
				this.email = res.email;
				this.githubUrl = res.html_url;
				done();
			}.bind(this), this.log);
		}
	},
	
	writing:
	{
		app: function()
		{
			this.fs.copy(this.templatePath('app'), this.destinationPath('app'));
			this.fs.copy(this.templatePath('grunt'), this.destinationPath('grunt'));
    	},
		
		projectfiles: function()
		{
			this.template('_bower.json', 'bower.json');
			this.template('_frag.end', 'frag.end');
			this.template('_frag.start', 'frag.start');
			this.template('_Gruntfile.js', 'Gruntfile.js');
			this.template('_package.json', 'package.json');
			this.template('_README.md', 'README.md');
			this.template('bowerrc', '.bowerrc');
			this.template('editorconfig', '.editorconfig');
			this.template('eslintrc', '.eslintrc');
			this.template('gitignore', '.gitignore');
			this.template('jscsrc', '.jscsrc');
		}
	},

	install: function()
	{
		this.installDependencies();
	}
});
