#!/bin/bash

sudo apt update

sudo apt upgrade

sudo apt install nodejs

sudo apt install npm 

sudo apt install curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 14.8.0

sudo apt-get install libnss3-dev

sudo apt-get install libatk-bridge2.0-0

sudo apt-get install -y libcups2-dev

sudo apt-get install -y libxkbcommon-x11-0

sudo apt-get install -y libgtk-3-0

sudo apt-get install -y libgbm-dev

sudo apt-get install -y libx11-xcb-dev

npm install

npm install pm2 -g

npm install puppeteer

sudo apt-get install chromium-browser

sed -i 'config.key = "$1"' ./config.js

pm2 start npm -- start


