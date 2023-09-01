#!/bin/bash

copy_and_clean() {
  source_dir="$1"
  destination_dir="$2"

  if [ -d "$source_dir" ]; then
    mkdir -p "$destination_dir"
    cp -r "$source_dir"/* "$destination_dir"
    rm -rf "$source_dir"
  fi
}

copy_and_clean "./backend/build" "./build/backend/"
mkdir -p "./build/shared/"
cp -r "./shared/build" "./build/shared/"
mkdir -p "./build/backend/public"
copy_and_clean "./frontend/build" "./build/backend/public"

# Copy package files
cp "package.json" "package-lock.json" "./build/"
