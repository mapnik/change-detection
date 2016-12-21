#!/usr/bin/env bash

set -eu
set -o pipefail

# without bridge
function install() {
    mkdir -p mapnik-versions/v$1
    (cd mapnik-versions/v$1 && mkdir -p node_modules && npm install mapnik@$1)
}

install $@