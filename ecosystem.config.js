module.exports = {
  deploy: {
    india: {
      key: "~/Downloads/automation-test-mumbai.pem",
      user: "ubuntu",
      host: ["65.0.184.26"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": "pm2 delete test-server",
      "post-setup":
        "npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        "npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    sydney: {
      key: "~/Downloads/automation-test-sydney.pem",
      user: "ubuntu",
      host: ["3.26.117.51"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    tokyo: {
      key: "~/Downloads/automation-test-tokyo.pem",
      user: "ubuntu",
      host: ["35.77.74.17"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    uae: {
      key: "~/Downloads/automation-test-web3auth.pem",
      user: "ubuntu",
      host: ["3.28.240.235"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    ireland: {
      key: "~/Downloads/automation-test-ireland.pem",
      user: "ubuntu",
      host: ["34.241.62.34"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    brazil: {
      key: "~/Downloads/automation-test-brazil.pem",
      user: "ubuntu",
      host: ["18.231.195.96"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    canada: {
      key: "~/Downloads/automation-tests-canada.pem",
      user: "ubuntu",
      host: ["35.183.205.255"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    capetown: {
      key: "~/Downloads/automation-test-africa.pem",
      user: "ubuntu",
      host: ["13.244.110.176"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
    frankfurt: {
      key: "~/Downloads/automation-test-frankfurt.pem",
      user: "ubuntu",
      host: ["18.192.116.174"],
      ref: "origin/main",
      repo: "https://github.com/arch1995/mpc-automation-tests.git",
      path: "/home/ubuntu/pm2-tests",
      "pre-setup": ". /home/ubuntu/.nvm/nvm.sh && pm2 delete test-server",
      "post-setup":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && touch .env && echo 'BASIC_AUTH_PASSWORD=aaddwedsdasd' > .env && echo APP_URL=https://bucolic-belekoy-37faa5.netlify.app >> .env && npm run build && pm2 start ./dist/index.js --name test-server",
      "post-deploy":
        ". /home/ubuntu/.nvm/nvm.sh && npm install && npm run bootstrap && cd packages/express-server && npm run build && pm2 reload test-server",
    },
  },
};
