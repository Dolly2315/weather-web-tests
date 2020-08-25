import {WeatherCheckerPage} from '../pages/WeatherCheckerPage.po';
import {UtilFunctions} from '../utils/utility';
describe('Validate all the tests', () => {
    let weatherCheckerPage =new WeatherCheckerPage();
    let utility = new UtilFunctions();

    describe('On entering invalid post code', () => {
        const parameters = [
        {postcode:"EC1A 1BB"},
        {postcode:"E92P"},
        ];
        parameters.forEach((parameter) =>{
            it('It gives error as invalid post code', async() => {
                await weatherCheckerPage.submitPostCodeDetails(parameter.postcode);
                expect(await weatherCheckerPage.getErrorMessage()).toEqual("Invalid postcode.");
            });
        });
    });

    describe('On entering non existing post code', () => {
        it('It gives error post code not found', async() => {
            await weatherCheckerPage.submitPostCodeDetails("B99 9AA");
            expect(await weatherCheckerPage.getErrorMessage()).toEqual("Unable to find the postcode.");
        });
    });

    describe('On entering valid post code', () => {
        beforeAll(async () => {
            await weatherCheckerPage.submitPostCodeDetails("W6 0NW");
            expect(await weatherCheckerPage.checkWeatherDetailsIsDisplayed()).toEqual("Weather details");
        });

        it('Time property field displays current time', async() => {
            expect (await weatherCheckerPage.getTimeFromWeatherDetails()).toContain(await utility.getCurrentDateTimeInDDMMYY());
        });

        it('Mandatory weather property fields time , temperature, humidity are present', async() => {
            expect (await weatherCheckerPage.checkPropertyIsPresent("Time")).toEqual(true, 'Time field is not present');
            expect (await weatherCheckerPage.checkPropertyIsPresent("Temperature")).toEqual(true, 'Temperature field is not present');
            expect (await weatherCheckerPage.checkPropertyIsPresent("Humidity")).toEqual(true, 'Humidity field is not present');
        });

        it('Only those property are present which contains value', async() => {
            expect (await weatherCheckerPage.checkAllPropertyContainsValue()).toEqual(true,'All weather property does not contain value');
        });

    });

});