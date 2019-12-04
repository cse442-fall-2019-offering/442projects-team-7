#!/bin/bash

npm install
process_id=$!
npm install --save sqlite3@4.1.0
wait $process_id
npm install --save bluebird@3.7.1
wait $process_id
npm install --save-dev electron-builder@21.2.0
wait $process_id
npm run postinstall
wait $process_id
npm install electron@6.0.12 --save-dev
wait $process_id
npm install --save-dev spectron@8.0.0
wait $process_id
npm install --save-dev mocha@6.2.0
wait $process_id

npm start
