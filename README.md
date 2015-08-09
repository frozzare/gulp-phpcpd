# gulp-phpcpd [![Build Status](https://travis-ci.org/frozzare/gulp-phpcpd.svg?branch=master)](https://travis-ci.org/frozzare/gulp-phpcpd)

> Gulp plugin for running [PHP Copy/Paste Detector (PHPCPD)](https://github.com/sebastianbergmann/phpcpd)

## Install

```
$ npm install --save-dev gulp-phpcpd
```


## Usage

```js
var gulp   = require('gulp');
var phpcpd = require('gulp-phpcpd');

gulp.task('default', function () {
	return gulp.src('/path/to/src/*/**.php')
		.pipe(phpcpd());
});
```

## API

### phpcpd(options)

#### options

##### bin

Type: `string`
Default: `phpcpd`

The binary name if it is in your path or the full path if not.

##### exclude

Type: `string`
Default: `false`

Exclude `<dir>` from code analysis. Also supports `array` syntax for excluding multiple directories.

##### minLines

Type: `number`
Default: `5`

Minimum number of identical lines.

##### minTokens

Type: `number`
Default: `70`

The binary name if it is in your path or the full path if not.

##### names

Type: `string`
Default: `*.php`

A comma-separated list of file names to check.

##### namesExclude

Type: `string`
Default: `false`

A comma-separated list of file names to exclude.

##### quiet

Type: `boolean`
Default: `false`

Only print the final summary.

##### reportFile

Type: `string`
Default: `false`

Set a path and filename here to write to a file, otherwise it will write to stdout.

##### verbose

Type: `boolean`
Default: `false`

Print duplicated code.

## License

MIT © [Fredrik Forsmo](http://forsmo.me)
