#!/usr/bin/env bash

set -eu

# without bridge
function install() {
    mkdir -p mapnik-versions/v$1
    (cd mapnik-versions/v$1 && mkdir node_modules && npm install mapnik@$1)
}

install $@