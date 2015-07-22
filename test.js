'use strict';

/* global describe, it, done */

var assert = require('assert');
var gutil  = require('gulp-util');
var phpcpd = require('./');

it('should not thrown a error', function () {
	var stream = phpcpd();

	stream.on('end', function () {
		done(new Error('An error was not thrown before ending'));
	});

	stream.write(new gutil.File({
		base: __dirname,
		contents: new Buffer('')
	}));

	stream.end();
});
