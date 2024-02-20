const axios = require('axios');  

async function CurrenciesConversionSingle (amount, fromCurrency, toCurrency){
    try {
        const myExchangeRate = await _exchangeRate(fromCurrency, toCurrency);
        if (_exchangeRate !=NaN) {
            const convertedAmount = amount * myExchangeRate;
            return convertedAmount, myExchangeRate;
            //console.log("convertedAmount : ", convertedAmount);
        }
        
    } catch (error) {
        console.error('Error while converting amount to another currency : ', error);
        throw new Error('Error while converting amount to another currency.');
    }

}

async function _exchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency && toCurrency) {
        try {
            const API_KEY = 'T1O28Y9UD7IG65ZS'; // Replace this with your Alpha Vantage API key
            const apiUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`;

            const response = await axios.get(apiUrl); // Corrected typo here
            const exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            return exchangeRate;
        } catch (error) {
            console.error(`Error while getting exchange rate from ${fromCurrency} to ${toCurrency}`, error);
            throw new Error(`Error while getting exchange rate from ${fromCurrency} to ${toCurrency}.`);
        }
    } else {
        throw new Error(`No currency provided.`);
    }
}

        
module.exports = CurrenciesConversionSingle