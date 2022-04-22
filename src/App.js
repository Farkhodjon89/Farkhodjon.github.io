import './App.css';
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import {useState, useEffect} from "react";
import axios from "axios";


function App() {
  const [firstAmount, setFistAmount] = useState(0)
  const [secondAmount, setSecondAmount] = useState(0)
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('UAH')
  const [exchangeRates, setExchangeRates] = useState([])


  useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=7afbd69c2d55b667cba7063324547723')
        .then(response => {
          setExchangeRates(response.data.rates)
        })

  }, [])

  useEffect(() => {
    if (!!exchangeRates) {
      function initialValue() {
        calculateFirstAmount(1);
      }
      initialValue();
    }
  }, [exchangeRates]);

  const calculateFirstAmount = (firstAmount) => {
    setSecondAmount(firstAmount * exchangeRates[currency2] / exchangeRates[currency1])
    setFistAmount(firstAmount)
  }
  const calculateSecondAmount = (secondAmount) => {
    setFistAmount(secondAmount * exchangeRates[currency1] / exchangeRates[currency2])
    setSecondAmount(secondAmount)
  }
  const calculateCurrency1 = (currency1) => {
    setSecondAmount(firstAmount * exchangeRates[currency2] / exchangeRates[currency1])
    setCurrency1(currency1)
  }
  const calculateCurrency2 = (currency2) => {
    setFistAmount(secondAmount * exchangeRates[currency1] / exchangeRates[currency2])
    setCurrency2(currency2)
  }

  return (
      <div className="App">
        <h1>Конвертер валют</h1>
        <CurrencyConverter
            amount={firstAmount}
            currentCurrency={currency1}
            currencies={Object.keys(exchangeRates)}
            onAmountChange={calculateFirstAmount}
            onCurrencyChange={calculateCurrency1}
        />
        <CurrencyConverter
            amount={secondAmount}
            currentCurrency={currency2}
            currencies={Object.keys(exchangeRates)}
            onAmountChange={calculateSecondAmount}
            onCurrencyChange={calculateCurrency2}

        />
      </div>
  );
}

export default App;
