const { Builder, By, Key, until } = require('selenium-webdriver');

class OnlineStoreTest {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async searchProduct(keyword) {
        try {
            await this.driver.get('https://edostavka.by/');
            
            const acceptButton = await this.driver.findElement(By.xpath('//*[@id="main_search_field"]/div/div/form/div/input'));
            await acceptButton.sendKeys(keyword);

            await this.driver.sleep(2000);

            const coockieButton = await this.driver.findElement(By.xpath('/html/body/div[6]/div/div[2]/div/div[3]/button[2]'));

            await coockieButton.click();
            await acceptButton.click();
            
            await acceptButton.sendKeys(Key.RETURN);

            await this.driver.sleep(5000);


            console.log('Перешли');
    
            await this.driver.sleep(2000);
    
            const element = await this.driver.findElement(By.xpath('//*[@id="__next"]/div[2]/div/div[2]/div/div[2]/div[3]/div/div[1]/div[4]/a'));
            const text = await element.getText();

            if (text.includes(keyword)) {
                return true;
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return null;
        }
    }
    
    
    async close() {
        try {
            await this.driver.quit(); 
        } catch (error) {
            console.error('Произошла ошибка при закрытии браузера:', error);
        }
    }
}

(async () => {
    const onlineStoreTest = new OnlineStoreTest();
    const searchResult = await onlineStoreTest.searchProduct('Greenfield');
    console.log(searchResult);
    await onlineStoreTest.close(); 
})();
