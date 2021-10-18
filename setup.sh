#!/bin/bash

KEY=$1
NAME=$2

sudo apt update

sudo apt upgrade

sudo apt install nodejs

sudo apt install -y npm

sudo apt install curl

sudo apt install vim

if [ ! -d ~/.nvm ]; then
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
  source ~/.nvm/nvm.sh
  source ~/.profile
  source ~/.bashrc
  nvm install 14.8.0
  npm install
  npm run front
fi

sudo apt-get install libnss3-dev

sudo apt-get install libatk-bridge2.0-0

sudo apt-get install -y libcups2-dev

sudo apt-get install -y libxkbcommon-x11-0

sudo apt-get install -y libgtk-3-0

sudo apt-get install -y libgbm-dev

sudo apt-get install -y libx11-xcb-dev

git clone https://github.com/syphecoding/autobumper

cd autobumper

npm install

npm install pm2 -g

npm install puppeteer

sudo apt-get install chromium-browser

sed -i.old "1s;^;var config = {}\nconfig.key = '$1'\n;" ./config.js

pm2 start npm --name "$2" -- start