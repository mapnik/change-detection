var path = require('path');
var fs = require('fs');

var path_arg = process.argv[2];
var test_script = require(process.argv[3]);

function check_for_dupes() {
    var mapnik_modules = Object.keys(require.cache).filter(function(p) {
        return (p.indexOf('mapnik.js') > -1);
    });

    if (mapnik_modules.length > 1) {
        console.log('duplicate mapnik modules encountered',mapnik_modules);
        process.exit(1);
    }
}

var require_path;

var path_arg = path.resolve(path_arg);

// pointing at local node-mapnik clone
if (fs.existsSync(path.join(path_arg,'lib/mapnik.js'))) {
    require_path = path.join(path_arg,'lib');
} else {
    var submodules_directory = path.join(path_arg,'node_modules');
    require_path = submodules_directory+'/mapnik';
}

if (!fs.existsSync(require_path)) {
    console.log('file does not exist',require_path);
    process.exit(1)
}

var temp_mapnik = require(require_path);

check_for_dupes();

console.log(test_script(require_path));

check_for_dupes();
