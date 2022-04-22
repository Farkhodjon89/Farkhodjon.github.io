import React from 'react';
import PropTypes from 'prop-types';
import s from './CurrencyConverter.module.css'

const CurrencyConverter = ({amount, currentCurrency, currencies, onCurrencyChange, onAmountChange}) => {

  return (
      <div className={s.currencyWrapper}>
        <input type="text" value={amount} onChange={e => onAmountChange(e.target.value)}/>
        <select value={currentCurrency} onChange={e => onCurrencyChange(e.target.value)}>
          {currencies.map((currency) => (
              <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
  );
};

CurrencyConverter.propTypes = {
  amount: PropTypes.number.isRequired,
  currentCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired
}

export default CurrencyConverter;