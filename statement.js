// import createStatementData from './createStatementData.js';
const createStatementData = require('./createStatementData');

function statement (invoice, plays) {
    return renderPlainText(createStatementData.createStatementData(invoice, plays));
}

function renderPlainText (data) {
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            { style: "currency", currency: "USD",
                minimumFractionDigits: 2 }).format(aNumber);
    }

    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
// print line for this order
        result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`
        ;
    }
    result += `Amount owed is ${usd(data.totalAmount/100)}\n`;
    result += `You earned ${(data.totalVolumeCredits)} credits\n`;
    return result;
}

module.exports = {
    statement
}