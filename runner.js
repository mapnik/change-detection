var path = require('path');
var fs = require('fs');

var submodules_directory = path.join(process.argv[2],'node_modules');

if (!fs.existsSync(submodules_directory)) {
    console.log('file does not exist',submodules_directory);
    process.exit(1)
}

submodules_directory = path.resolve(submodules_directory);

var mapnik_modules = Object.keys(require.cache).filter(function(p) {
    return (p.indexOf('mapnik.js') > -1);
});

if (mapnik_modules.length > 1) {
    console.log('duplicate mapnik modules encountered',mapnik_modules);
    process.exit(1);
}

var test_script = require(process.argv[3]);
console.log(test_script(submodules_directory+'/mapnik'));
