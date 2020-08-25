import {
    browser,
    ElementFinder,
    protractor,
    WebElement
} from 'protractor';

const until = protractor.ExpectedConditions;

/**
 * Utility class for commonly used Protractor.browser methods.
 */
export class BrowserUtil {

    // waits for the element to be clickable
    public async waitForElementToBeClickable(locator: ElementFinder, timeout = 5000) {
        await browser.wait(until.elementToBeClickable(locator), timeout, `Element ${locator.locator().toString()} not clickable`);
    }

    public async waitForElementToBeVisible(locator: ElementFinder, timeout = 5000) {
        await browser.wait(until.visibilityOf(locator), timeout, `Element ${locator.locator().toString()} not visible`);
    }

    // brings the element to focus and writes
    public async mouseMoveAndWrite(locator: ElementFinder | WebElement, text: string) {
        await browser.actions().mouseMove(locator).click().perform();
        await locator.clear();
        await locator.sendKeys('');
        await locator.sendKeys(`${text}`);
    }

    // waits for the element to be clickable and clicks
    public async waitForElementToBeVisibleAndClick(locator: ElementFinder, timeout = 5000) {
        await this.waitForElementToBeClickable(locator, timeout);
        return await locator.click();
    }

    // get text of the webelement
    public async waitForElementToBeVisibleAndGetText(locator: ElementFinder, timeout = 5000) {
        await this.waitForElementToBeVisible(locator, timeout);
        return await locator.getText();
    }
}


