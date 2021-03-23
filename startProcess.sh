#!/bin/bash
cd /var/SiteBuilderWebsocket

git checkout package-lock.json

if [ "$PRODUCTION" = "true" ] ; then
 echo "its prod"
else
 echo "its dev"
 git checkout develop
fi

git pull
rm package-lock.json
npm install

echo $1

r1=$(ps aux | grep $1.js | grep -v grep)

if [ $r1 != ""]
then
  cd /var/SiteBuilderWebsocket && pm2 start $1.config.js
else
  echo "111"
fi
