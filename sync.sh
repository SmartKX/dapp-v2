#!/bin/bash

# vars
user= # ssh user
host= # ssh host

source=dist # build target...
app=my-app # target on remote host, within /opt...

# init
ssh=$user@$host
path=/opt/$app/$source

# functions
error() {
    echo "Usage: $0 'all|build|files|package'"
    return 1
}

sync_build() {
    dir=build
    rsync -av --delete $source/$dir/ -e ssh $ssh:$path/$dir
}

sync_files() {
    rsync -av --delete --filter '-p .*' --filter '-p node_modules' --filter '-p data' --filter '-p package*' $source/ -e ssh $ssh:$path
    [[ $? -eq 0 ]] && sync_package || return $?
}

sync_package() {
    file=package.json
    ssh $ssh test -f $path/$file && echo 'Skipping '$file && return
    scp $source/$file $ssh:$path
}

# main
case "$1" in
    build)
        sync_build
        ;;
    files)
        sync_files
        ;;
    package)
        sync_package
        ;;
    all)
        sync_build && sync_files
        ;;
    *)
    error
esac

exit $?