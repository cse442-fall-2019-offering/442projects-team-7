#!/bin/bash

npm install
process_id=$!
npm install --save sqlite3
wait $process_id
npm install --save bluebird
wait $process_id
npm install --save-dev electron-builder
wait $process_id
npm run postinstall
wait $process_id
npm install electron --save-dev
wait $process_id

npm start
