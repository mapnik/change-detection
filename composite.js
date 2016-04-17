var fs = require('fs');

module.exports = function(mapnik_path) {
    var mapnik = require(mapnik_path);
    mapnik.register_default_input_plugins();
    var vt = new mapnik.VectorTile(15,30300,18986);
    vt.setData(fs.readFileSync('./image.mvt'));
    var vt_target = new mapnik.VectorTile(18,242403,151893,{buffer_size:0});
    console.time('comp');
    vt_target.composite([vt],{buffer_size:0,strictly_simple:false});
    console.timeEnd('comp');
    return JSON.parse(vt_target.toGeoJSON('__all__')).features.length;
}

