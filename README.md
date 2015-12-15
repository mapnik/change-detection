## Change detection of node-mapnik differences

[![Build Status](https://travis-ci.org/mapnik/change-detection.svg?branch=master)](https://travis-ci.org/mapnik/change-detection)

This repo offers scripts to help quickly test code against any node-mapnik release.

### Usage

Install a node-mapnik version:

```sh
./install.sh 3.4.11
```

Then test a given script using that version:

```sh
node runner.js mapnik-versions/v3.4.11 ./color.js
```

Current expectation of that test script, for example, is to throw an error like: `Error: Failed to parse color: "#ffffff 50"` which did not happen with versions of node-mapnik before `v3.4.8`.
