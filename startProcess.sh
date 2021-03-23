#!/bin/bash
cd /var/user1/node_wsserver

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

rm -rf node_modules/node_constants
git clone http://deploy:ghdf46kjashg3289@git.ttrace.ru/ttrace/node_constants.git
mv node_constants node_modules

echo $1

r1=$(ps aux | grep $1.js | grep -v grep)

if [ $r1 != ""]
then
  cd /var/user1/node_wsserver && pm2 start $1.config.js
else
  echo "111"
fi
