var fs = require('fs');
var assert = require('assert');

module.exports = function(mapnik_path) {
    var mapnik = require(mapnik_path);

    var parent = new mapnik.VectorTile(14,4957,6059);
    parent.setData(fs.readFileSync('./data/local-parent.mvt'));
    assert.ok(parent.getData().length == 150641);

    var vt;
    var opts;
    var max_extent = [-20037508.34,-20037508.34,20037508.34,20037508.34 ];

    if (+mapnik.version.split('.')[0] != 3) {
        throw new Error("only supports node-mapnik >= 3.4.x");
    } else {
        if (+mapnik.version.split('.')[1] == 5) { // 3.5.x
            // bug workaround (should be handled better in mapnik-vt)
            parent.bufferSize = 255*16;
            vt = new mapnik.VectorTile(15,9915,12119,{buffer_size: 255*16});
            opts = {
                max_extent: max_extent
            };
        } else if (+mapnik.version.split('.')[1] == 4) {  // 3.4.x
            vt = new mapnik.VectorTile(15,9915,12119);
            opts = {
                buffer_size: 255,
                tolerance: 1,
                max_extent: max_extent
            };
        } else {
            throw new Error("only supports node-mapnik >= 3.4.x");
        }
    }

    console.time('comp');
    vt.composite([parent],opts);
    console.timeEnd('comp');

    var features = JSON.parse(vt.toGeoJSON('__all__')).features;
    var found_expected_feature_in_buffered_extent = false;
    assert.ok(features.length == 3655);
    features.forEach(function(f) {
        if (f.properties.name == 'Boston') {
            found_expected_feature_in_buffered_extent = true;
        }
    })
    assert.ok(found_expected_feature_in_buffered_extent);
    if (process.env.DEBUG) {
        fs.writeFileSync('out-'+mapnik.version+'.geojson',vt.toGeoJSON('poi_label'))
    }
    return found_expected_feature_in_buffered_extent;
}

