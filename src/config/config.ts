import { browser} from 'protractor';

exports.config = {
        directConnect: true,
        framework: 'jasmine2',

        capabilities: {
            maxInstances: 1,
            browserName: 'chrome'
        },

        // options for Jasmine
        jasmineNodeOpts: {
            showColors: true,
            // Jasmine assertions timeout
            defaultTimeoutInterval: 150000
        },

        specs: ['./../../_out/specs/*.spec.js'],
        useAllAngular2AppRoots: true,
        onPrepare: async () => {
            browser.manage().timeouts().implicitlyWait(50000);
            browser.driver
                .manage()
                .window()
                .maximize();
        },
        params: {
            baseUrl: "https://serene-mountain-14043.herokuapp.com/"
        },
        plugins: [{
        package: 'protractor-screenshoter-plugin',
        screenshotPath: './reports',
        screenshotOnExpect: 'failure',
        screenshotOnSpec: 'none',
        withLogs: true,
        writeReportFreq: 'asap',
        clearFoldersBeforeTest: true
    }],

        onCleanup: () => {
            browser.close();
        }
    };