#!/bin/bash

export USER_ID="$USER_ID"

export VIDEO_ID="$VIDEO_ID"

export OBJECT_URI="$OBJECT_URI"

mkdir -p videos

curl -L "$OBJECT_URI" -o /home/app/videos/original.mp4

exec node script.js