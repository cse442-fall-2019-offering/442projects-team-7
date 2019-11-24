# Electron Login

This is a simple login UI using Electron. The UI design portion is extremely simple due to the fact that Electron utilizes HTML and CSS for visual elements, and the future implementation of underlying features will be rather easy thanks to the versatility of JavaScript.

# Environment Setup for Development

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

You're all set. `npm start` in the /system directory will launch the login UI.

# Environment Setup for RPi

Create a separate non-root user to do this, as npm does not like running as root. Plus it's just a bad idea security wise.

Node install for Raspian:

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs
```

Verify successful installation with `node -v` and `npm -v`. My install did not correctly install NPM. If that happens to you:

```bash
curl -L https://npmjs.org/install.sh | sudo sh
```

Install Node Version Manager:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

Now, just clone the repo and in the /system path, execute the following:

Install Node version 10.17.0 LTS (this will also select it for use):

```bash
nvm install v10.17.0
```

```bash
npm install
```

Add SQLite + Bluebird

```bash
npm install --save --build-from-source sqlite3
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

You're all set. `npm start` in the /system directory will launch the login UI.

To set up production environment:

- Hide taskbar
- Make desktop black
- Remove or hide any icons on desktop
- Auto start pos_boot.sh by adding it to /etc/xdg/lxsession/LXDE-pi/autostart

# Deployment for Raspberry Pi

Download our RPiPOS 64GB SD card image from https://buffalo.box.com/s/48lgw6pghu009hxyvn3icgu8yqp5gvoi and clone it to an SD card with Rufus.
When the Pi boots, it will automatically start the RPiPOS system.
