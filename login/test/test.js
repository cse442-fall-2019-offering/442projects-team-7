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
  	await sleep(1000);

  	// switch frame to the iframe (based on id)
    app.client.frame("cashierFrame");

  	const page_name = await app.client.getHTML("title");
  	assert.equal(page_name, '<title id="title">RPi Point of Sale - Cashier Default Window</title>');
  })
  it('Add to the main POS table', async () => {

})

it('Pops up edit page', async () => {
	await sleep(1000);

	await app.client.click('#itemManip');
	const count = await app.client.getWindowCount();
	assert.equal(count, 2);
	await app.client.windowByIndex(1);
	await app.client.waitUntilWindowLoaded();
	assert.ok('#itemTable');
})

it('Edit pop up table(1)', async () => {
	await sleep(1000);
	await app.client.setValue("#itemSKU", "10012");
	await app.client.setValue("#itemDescription", "Tennis ball");
	await app.client.setValue("#itemUnitPrice", "5");
	await app.client.click("#row_1");
	await sleep(500);
	await app.client.click("#Edit");
	await sleep(500);
	await app.client.click("#row_1");
})

it('Edit pop up table(2)', async () => {
	await app.client.setValue("#itemSKU", "20015");
	await app.client.setValue("#itemDescription", "Hamster wheel");
	await app.client.setValue("#itemUnitPrice", "30");
	await app.client.click("#row_2");
	await sleep(500);
	await app.client.click("#Edit");
	await sleep(500);
	await app.client.click("#row_2");
})

it('Edit pop up table(3)', async () => {
	await app.client.setValue("#itemSKU", "30001");
	await app.client.setValue("#itemDescription", "Salmon bites");
	await app.client.setValue("#itemUnitPrice", "15");
	await app.client.click("#row_3");
	await sleep(500);
	await app.client.click("#Edit");
	await sleep(500);
	await app.client.click("#row_3");
})

it('Pop up delete', async () => {
	await sleep(500);
	await app.client.click("#row_3");
	await app.client.click("#Delete");
	await sleep(500);
	await app.client.click("#row_2");
	await app.client.click("#Delete");
	await sleep(500);
	await app.client.click("#row_1");
	await app.client.click("#Delete");
	await sleep(500);
})

it('Populate and delete', async () => {
	for(i=0; i<10; i++){
		await app.client.setValue("#itemSKU", "" + Math.floor(Math.random() * 10000));
		await app.client.setValue("#itemDescription", "" + Math.random().toString(36).substring(2, 10));
		await app.client.setValue("#itemUnitPrice", "" + Math.floor(Math.random() * 10));
		await app.client.click("#row_" + (i+1));
		await app.client.click("#Edit");
		await app.client.click("#row_" + (i+1));
	}

	for(i=0; i<10; i++){
		await sleep(200);
		await app.client.click("#row_1");
		await app.client.click("#Delete");
	}
	await sleep(1000);
})
});