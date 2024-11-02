export const FormatCurrency = (amount) => {
     return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
   };
   