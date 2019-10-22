const Application = require('spectron').Application;
const assert = require('assert');
//const Promise = require('bluebird');
/*const electronPath = require('electron');// Require Electron from the binaries included in node_modules.
*/
const path = require('path');

// Sleep Function
const sleep = time => new Promise(r => setTimeout(r, time));

// construct path
const baseDir = path.join(__dirname, '..');
const electronBinary = path.join(baseDir, 'node_modules', '.bin', 'electron')

describe('Application launch', function () {
  this.timeout(10000);

  const app = new Application({
  	path: electronBinary,
  	args: [baseDir],
  });

  // init method, (beforeEach() for each test)
  before(() => app.start());

  after(() => app.stop());

  it('Shows initial window', async () => {
  	const count = await app.client.getWindowCount();
  	assert.equal(count, 1);
  })

  it('Allows Login Submission', async () => {
  	// enter username field
  	await app.client.setValue("#username", "edmund");

  	// enter password field
  	await app.client.setValue("#password", "qwerty");

  	//await sleep(3000)

  	await app.client.click('#login');
  })

  it('Transitions to the cashier POS page', async () => {
  	await sleep(4000);

  	// switch frame to the iframe (based on id)
    app.client.frame("cashierFrame");

  	const page_name = await app.client.getHTML("title");
  	assert.equal(page_name, '<title id="title">RPi Point of Sale - Cashier Default Window</title>');
  })
});