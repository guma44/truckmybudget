export const formatMoney = (number) => {
    return number.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
  }
  