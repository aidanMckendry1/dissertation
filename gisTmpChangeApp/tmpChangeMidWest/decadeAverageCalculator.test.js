const calculator = require('./controllers/calculateDecadeAverage')

const validJsonParam = [{"_id":"64318dc5bba351b1108008b7","State":"Arizona","Year":1901,"Jan":10,"Feb":10,"Mar":10,"Apr":10,"May":10,"Jun":10,"Jul":10,"Aug":10,"Sep":10,"Oct":10,"Nov":10,"Dec":10,"Annual":10}]
const invalidJsonParam = [{"_id":"64318dc5bba351b1108008b7","State":"Arizona","Year":1901,"Annual":10}]
const nullParam = ""
const validMonthParam = "Jan"
const invalidMonthParam = "xxx"

test('calculate decade average temperature should result in the correct average from json', () => {
    expect(calculator.calculateDecadeAverage(validJsonParam)).toBe(10);
});

test('calculate decade average temperature with invalid json should result error', () => {
    expect(calculator.calculateDecadeAverage(invalidJsonParam)).toBe(NaN);
});

test('calculate decade average temperature with invalid json should result error', () => {
    expect(calculator.calculateDecadeAverage(nullParam)).toBe(false);
});

test('calculate decade average temperature with invalid json should result error', () => {
  expect(calculator.checkMonthIsValid(validMonthParam)).toBe(true);
});


test('calculate decade average temperature with invalid json should result error', () => {
  expect(calculator.checkMonthIsValid(invalidMonthParam)).toBe(false);
});

test('calculate decade average temperature with invalid json should result error', () => {
  expect(calculator.checkMonthIsValid(nullParam)).toBe(false);
});
