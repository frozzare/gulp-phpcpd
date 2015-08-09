'use strict';

/**
 * Require modules.
 */

var gutil       = require('gulp-util');
var through     = require('through2');
var exec        = require('child_process').exec;
var objectMerge = require('object-merge');

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

    options = objectMerge(defaults, options || {});
    var cmd = buildCommand(options, file.base);

    exec(cmd, function (error, stdout, stderr) {
      if (stderr) {
        cb(new gutil.PluginError('gulp-phpcpd', stderr));
        return;
      } else if (stdout) {
        gutil.log(stdout);
      }
    });
  });
};
