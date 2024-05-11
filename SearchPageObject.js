const { Builder, By, Key, until } = require('selenium-webdriver');

class OnlineStoreTest {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
        this.acceptButtonXPath = '//*[@id="main_search_field"]/div/div/form/div/input';
        this.cookieButtonXPath = '/html/body/div[6]/div/div[2]/div/div[3]/button[2]';
        this.productXPath = '//*[@id="__next"]/div[2]/div/div[2]/div/div[2]/div[3]/div/div[1]/div[4]/a';
    }

    async openHomePage() {
        await this.driver.get('https://edostavka.by/');
    }

    async acceptCookies() {
        await this.driver.wait(until.elementLocated(By.xpath(this.cookieButtonXPath)), 10000);
        const cookieButton = await this.driver.findElement(By.xpath(this.cookieButtonXPath));
        await cookieButton.click();
    }

    async searchForProduct(keyword) {
        await this.driver.wait(until.elementLocated(By.xpath(this.acceptButtonXPath)), 10000);
        const acceptButton = await this.driver.findElement(By.xpath(this.acceptButtonXPath));
        await acceptButton.sendKeys(keyword, Key.RETURN);
        await this.driver.sleep(5000); // Временное решение, лучше использовать ожидания
    }

    async isProductDisplayed(keyword) {
        await this.driver.wait(until.elementLocated(By.xpath(this.productXPath)), 10000);
        const element = await this.driver.findElement(By.xpath(this.productXPath));
        const text = await element.getText();
        return text.includes(keyword);
    }

    async closeBrowser() {
        await this.driver.quit();
    }
}

(async () => {
    const onlineStoreTest = new OnlineStoreTest();
    try {
        await onlineStoreTest.openHomePage();
        await onlineStoreTest.acceptCookies();
        await onlineStoreTest.searchForProduct('Greenfield');
        const searchResult = await onlineStoreTest.isProductDisplayed('Greenfield');
        console.log(searchResult);
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        await onlineStoreTest.closeBrowser();
    }
})();
