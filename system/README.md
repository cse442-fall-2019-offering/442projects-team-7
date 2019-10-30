# Electron Login

This is a simple login UI using Electron. The UI design portion is extremely simple due to the fact that Electron utilizes HTML and CSS for visual elements, and the future implementation of underlying features will be rather easy thanks to the versatility of JavaScript.

# Environment Setup

Should be the same for both Linux and Windows once you have Node installed, but it didn't work for me on Windows.

Node install for Debian based (i.e. Ubuntu):

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs
```

Verify successful installation with `node -v` and `npm -v`. My install did not correctly install NPM. If that happens to you:

```bash
curl -L https://npmjs.org/install.sh | sudo sh
```

Now, just clone the repo and in the /login path, execute the following:

(If you're feeling lucky, type "sh setup.sh" to do it all for you)

```bash
npm install
```


Add SQLite + Bluebird

```bash
npm install --save sqlite3
```

```bash
npm install --save bluebird
```

```bash
npm install --save-dev electron-builder
```

in package.json: `"postinstall": "electron-builder install-app-deps"`

in shell:

```bash
npm run postinstall
```

(Note: if `npm start` doesn't work after this, explicitly install Electron:)
```bash
npm install electron --save-dev
```

You're all set. `npm start` in the /login directory will launch the login UI.
