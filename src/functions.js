var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome.js');
const { By, Key } = webdriver;

async function startAutomation() {
  var driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--incognito'))
    .build();

  driver.get('http://ubereats.com/login-redirect/');
  const phoneInput = await driver.findElement(webdriver.By.id("PHONE_NUMBER_or_EMAIL_ADDRESS"))
  await phoneInput.sendKeys("6462383031")
  const submitButton = await driver.findElement(webdriver.By.id("forward-button"))
  await submitButton.click()
}

module.exports = {startAutomation}
