const path = require('path');

module.exports = {
    e2e: {
        options: {
            configFile: path.join(process.cwd(), 'e2e', 'protractor.config.js'),
            keepAlive: true,
            noColor: false,
            webdriverManagerUpdate: true
            
            // For future use with browsers other than Chrome. Assumes local execution of 'webmanager-driver update'.
            //seleniumServerJar: path.join(process.cwd(), 'node_modules', 'protractor', 'node_modules', 'webdriver-manager', 'selenium', 'selenium-server-standalone-3.4.0.jar')
        }
    }
};