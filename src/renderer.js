var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome.js');
require('dotenv').config();

const Button = document.querySelector(".startAutomate")
Button.addEventListener("click", () => {
  startAutomation()
})

//FIRST_NAME LAST_NAME FORWARD-BUTTON OR ID , LEGAL_ACCEPT_TERMS

async function startAutomation(phone) {
  var driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments('--incognito'))
    .build();
  console.log("Directing to Uber Eats Register...")
  driver.get('http://ubereats.com/login-redirect/');
  const phoneInput = await driver.findElement(webdriver.By.id("PHONE_NUMBER_or_EMAIL_ADDRESS"))
  await phoneInput.sendKeys("6462383031")
  console.log("Inputting Phone...")
  const submitButton = await driver.findElement(webdriver.By.id("forward-button"))
  console.log("Submitting...")
  await submitButton.click()
  console.log("Waiting for Code...")
}

async function grabNumber() {
  const data = {
    services: ['UBER/UBER EATS']
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-API-Key': process.env.API_KEY
    },
    body: JSON.stringify(data)
  };
  
  fetch('https://app.truverifi.com/api/line/changeService', options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

async function retrieveCode() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-API-Key': process.env.API_KEY
    }
  };
  
  let response = await fetch('https://app.truverifi.com/api/line', options)
    .then(res => res.json())
    .then(data => {
      return data.sms[0]["text"].replaceAll('.', '').split(" ")[4]
    })
    .catch(error => {
      console.error(error);
    });
  return response
}