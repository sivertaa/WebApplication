var assert = require('assert');
var dateService = require('../services/date-service');

describe('date-service', function() {
    describe('#parse()', function() {
        it('parses dates correctly', function() {
            assert.equal('12 June at 7:00pm', dateService.parse('2012-06-12T19:00:00+0100'));
            assert.equal('1 January at 1:00am', dateService.parse('2016-01-01'));
            assert.equal('30 July at 11:00pm', dateService.parse('2015-07-31T00:00:00+0200'));
            assert.equal('20 September at 12:45am', dateService.parse('2015-09-19T23:45:00+0000'));
            assert.equal('31 December at 11:30pm', dateService.parse('2018-01-01T06:30:00+0800'));
        });
    });
});