const {Builder, By, Key, until} = require('selenium-webdriver');

let driver = new Builder()
              .forBrowser('chrome')
              .build();

driver.get('http://localhost:3000/index/index');
driver.findElement(By.id('thumb')).click();
const _animation = driver.findElement(By.id('animation'))
driver.wait(_animation.isDisplayed(), 1000);
// driver.quit();
