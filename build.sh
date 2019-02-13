#!/bin/bash

# vars
source=src
target=dist # build target... 
app=main.js
format=iife
files="CNAME index.html"

# init
[[ -d $target ]] || mkdir -p $target

# functions
build_clean() {
    rm -rf $target
}

build_css() {
    css=$target/css
    [[ -d $css ]] && rm -rf $css/* || mkdir -p $css
    cp -R $source/css/* $css
}

build_files() {
    for file in $files; do
        cp $source/$file $target
    done
}

build_js() {
    js=$target/js
    [[ -d $js ]] || mkdir -p $js
    input=$source/js/$app
    output=$js/$app
    rollup -i $input -o $output -f $format
    sed -i 's/app\$1/app/g' $output
}

error() {
    echo "Usage: $0 'all|files|js|css|clean'"
    return 1
}

# main
case "$1" in
    clean)
        build_clean
        ;;
    css)
        build_css
        ;;
    files)
        build_files
        ;;
    js)
        build_js
        ;;
    all)
        build_js && build_css && build_files
        ;;
    *)
        error
esac

exit $?