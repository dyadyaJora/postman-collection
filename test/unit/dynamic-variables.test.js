var _ = require('lodash'),
    dynamicVariables = require('../../lib/superstring/dynamic-variables'),
    expect = require('chai').expect;

describe('Dynamic variable', function () {
    it('should have all attributes', function () {
        _.forOwn(dynamicVariables, function (dynamicVariable) {
            expect(dynamicVariable).to.be.an('object');
            expect(dynamicVariable.description).to.be.a('string');
            expect(dynamicVariable.generator).to.be.a('function');
        });
    });

    it('should not be a duplicate', function () {
        var dynamicVariableSet = [];

        _.forOwn(dynamicVariables, function (dynamicVariable, name) {
            expect(dynamicVariableSet[name]).to.be.undefined;
            dynamicVariableSet[name] = dynamicVariable;
        });
    });


    describe('generator', function () {
        it('should return random data', function () {
            _.forOwn(dynamicVariables, function (variable) {
                expect(variable.generator()).to.not.be.undefined;
            });
        });
    });

    describe('$randomInt', function () {
        it('should return a random number', function () {
            expect(dynamicVariables.$randomInt.generator()).to.be.within(0, 1000);
        });
    });

    describe('$timeStamp', function () {
        it('should return a valid timestamp', function () {
            expect(dynamicVariables.$timestamp.generator()).to.be.a('number');
        });
    });

    describe('$guid', function () {
        it('should return a valid uuid', function () {
            expect(dynamicVariables.$guid.generator())
                .to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });
    });

    describe('$randomPhoneNumber', function () {
        it('returns a random phone number without extension', function () {
            var phone1 = dynamicVariables.$randomPhoneNumber.generator(),
                phone2 = dynamicVariables.$randomPhoneNumber.generator();

            expect(phone1.length).to.equal(12);
            expect(phone2.length).to.equal(12);
            expect(phone1).to.not.equal(phone2);
        });
    });

    describe('$randomLocale', function () {
        it('returns a random locale', function () {
            var locale1 = dynamicVariables.$randomLocale.generator(),
                locale2 = dynamicVariables.$randomLocale.generator();

            expect(locale1.length).to.be.at.least(2).and.at.most(3);
            expect(locale2.length).to.be.at.least(2).and.at.most(3);
            expect(locale1).to.not.equal(locale2);
        });
    });

    describe('$randomPhoneNumberExt', function () {
        it('returns a random phone number with extension', function () {
            var phone1 = dynamicVariables.$randomPhoneNumberExt.generator(),
                phone2 = dynamicVariables.$randomPhoneNumberExt.generator();

            expect(phone1.length).to.be.at.least(14);
            expect(phone2.length).to.be.at.least(14);
            expect(phone1).to.not.equal(phone2);
        });
    });

    describe('$randomWords', function () {
        it('returns some random numbers', function () {
            var words = dynamicVariables.$randomWords.generator(),
                wordsArray = words.split(' ');

            expect(words).to.not.be.null;
            expect(wordsArray.length).to.be.at.least(2);
        });
    });

    describe('$randomFilePath', function () {
        it('returns a file path', function () {
            var filePath = dynamicVariables.$randomFilePath.generator();

            expect(filePath).to.not.be.undefined;
            expect(filePath).to.not.be.null;
        });
    });

    describe('$randomDirectoryPath', function () {
        it('returns a directory path', function () {
            var directoryPath = dynamicVariables.$randomDirectoryPath.generator();

            expect(directoryPath).to.not.be.undefined;
            expect(directoryPath).to.not.be.null;
        });
    });
});
