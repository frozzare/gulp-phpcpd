'use strict';

/**
 * Require modules.
 */

var gutil   = require('gulp-util');
var through = require('through2');
var exec    = require('child_process').exec;

/**
 * PHPCPD default options.
 */

var defaults = {
	bin:          'phpcpd',
	exclude:      false,
	minLines:     5,
	minTokens:    70,
	names:        '*.php',
	namesExclude: false,
	reportFile:   false,
	quiet:        false,
	verbose:      false
};

/**
 * Merge two objects into one object.
 *
 * @param {object} obj1
 * @param {object} obj2
 *
 * @return {object}
 */

function merge(obj1, obj2) {
	var obj3 = {};
	obj2 = obj2 || {};

	for (var key in obj1) {
		obj3[key] = obj1[key];

		if (obj2[key] !== undefined) {
			obj3[key] = obj2[key];
		}
	}

	return obj3;
}

/**
 * Build command.
 *
 * @param {object} options
 * @param {string} dir
 *
 * @return string
 */

function buildCommand(options, dir) {
	var cmd = options.bin;

	if (options.reportFile) {
		cmd += ' --log-pmd ' + options.reportFile;
	}

	cmd += ' --min-lines ' + options.minLines;
	cmd += ' --min-tokens ' + options.minTokens;

	if (options.exclude instanceof Array) {
		for (var i = 0, l = options.exclude; i < l; i++) {
			cmd += ' --exclude ' + options.exclude[i];
		}
	} else {
		cmd += ' --exclude ' + options.exclude;
	}

	cmd += ' --names \"' + options.names + '\"';

	if (options.namesExclude) {
		cmd += ' --names-exclude \"' + options.namesExclude + '\"';
	}

	if (options.quiet) {
		cmd += ' --quiet';
	}

	if (options.verbose) {
		cmd += ' --verbose';
	}

	return cmd + ' ' + dir;
}

/**
 * Export Gulp PHPCD module.
 *
 * @param {object} options
 *
 * @return {object}
 */

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-phpcpd', 'Streaming not supported'));
			return;
		}

		options = merge(defaults, options);

		var self = this;
		var cmd  = buildCommand(options, file.base);

		exec(cmd, function (error, stdout, stderr) {
			if (stderr) {
				self.emit('error', new gutil.PluginError('gulp-phpcpd', stderr));
			} else if (stdout) {
				gutil.log(stdout);
			}
		});
	});
};
