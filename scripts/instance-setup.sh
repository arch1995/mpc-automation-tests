sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm install 16.17.1

git clone https://github.com/arch1995/mpc-automation-tests.git
cd mpc-automation-tests
npm i && npm run bootstrap

cd packages/express-server
touch .env
echo "BASIC_AUTH_PASSWORD=aaddwedsdasd" > .env
echo "APP_URL=https://bucolic-belekoy-37faa5.netlify.app" >> .env

npm install -g pm2
sudo apt-get install -y ca-certificates \
fonts-liberation \
libasound2 \
libatk-bridge2.0-0 \
libatk1.0-0 \
libc6 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libexpat1 \
libfontconfig1 \
libgbm1 \
libgcc1 \
libglib2.0-0 \
libgtk-3-0 \
libnspr4 \
libnss3 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libstdc++6 \
libx11-6 \
libx11-xcb1 \
libxcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxext6 \
libxfixes3 \
libxi6 \
libxrandr2 \
libxrender1 \
libxss1 \
libxtst6 \
lsb-release \
wget \
xdg-utils

npm run build
pm2 start ./dist/index.js --name test-server



git clone https://github.com/arch1995/mpc-automation-tests.git
cd mpc-automation-tests
npm i && npm run bootstrap

cd packages/express-server
touch .env
echo "BASIC_AUTH_PASSWORD=aaddwedsdasd" > .env
echo "APP_URL=https://bucolic-belekoy-37faa5.netlify.app" >> .env

npm install -g pm2
sudo apt-get install -y ca-certificates \
fonts-liberation \
libasound2 \
libatk-bridge2.0-0 \
libatk1.0-0 \
libc6 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libexpat1 \
libfontconfig1 \
libgbm1 \
libgcc1 \
libglib2.0-0 \
libgtk-3-0 \
libnspr4 \
libnss3 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libstdc++6 \
libx11-6 \
libx11-xcb1 \
libxcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxext6 \
libxfixes3 \
libxi6 \
libxrandr2 \
libxrender1 \
libxss1 \
libxtst6 \
lsb-release \
wget \
xdg-utils

npm run build
pm2 start ./dist/index.js --name test-server



