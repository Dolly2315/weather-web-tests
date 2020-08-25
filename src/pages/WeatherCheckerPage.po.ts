import { browser, by, element } from 'protractor';


import {
    BrowserUtil
} from './../utils/';

export class WeatherCheckerPage extends BrowserUtil {

    public async navigateTo() {
        browser.ignoreSynchronization = true;
        await browser.get(browser.params.baseUrl);
    }


    public async submitPostCodeDetails(postcode:string) {
        await this.navigateTo();
        await this.mouseMoveAndWrite(element(by.name('address')), postcode);
        await this.waitForElementToBeVisibleAndClick(element(by.css('[class="submit_3"]')));
    }

    public async getErrorMessage() {
        return await this.waitForElementToBeVisibleAndGetText(element(by.css('h1')));
    }

    public async checkWeatherDetailsIsDisplayed() {
        return await this.waitForElementToBeVisibleAndGetText(element(by.css('[class="tableHeader"]')));
    }

    $getWeatherHeaders(){
        return element.all(by.css('th'));
    }

    $getWeatherValue(){
        return element.all(by.css('tr'));
    }

    public async checkPropertyIsPresent(weatherProperty:string): Promise<boolean> {
        var rows =  await this.$getWeatherHeaders();
        for (let row_header of rows) {
            let text = await this.waitForElementToBeVisibleAndGetText(row_header);
            var value = text.split(":");
            if(value[0]==weatherProperty){
                return true;
            }
        }
        return false;
    }

    public async checkAllPropertyContainsValue(): Promise<boolean> {
        var rows =  await this.$getWeatherValue();
        for (let row_value of rows) {
            let text = await this.waitForElementToBeVisibleAndGetText(row_value);
            var value = text.split(":");
            if(value[1]==""){
                return false;
            }
        }
        return true;
    }

    public async getTimeFromWeatherDetails() {
        let text = await this.waitForElementToBeVisibleAndGetText(element.all(by.css('tr')).get(0));
        var time = text.split("Time:");  //Get the value of weather property Time
        return time[1];
    }
}
