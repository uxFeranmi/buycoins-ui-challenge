/* 
 * ✅ Use the Coinlore API (Coins) 
 *    https://www.coinlore.com/cryptocurrency-data-api
 * 
 *    Get 10 coins per "page"
 */

const getData = async (start) => {
  try {
    const url = `https://api.coinlore.com/api/tickers/?start=${start}&limit=10`;
    let data = await fetch(url);
    data = await data.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

let currentPage = 0;

const nextPage = async () => {
  console.log('Load!');
  const {data} = await getData(currentPage);
  if (!data)
    return window.alert('Something went wrong. Please try again.');
  
  currentPage++;
  const tbody = document.querySelector('tbody');
  
  for (let coin of data) {
    let tr = document.createElement('tr');
    let name = document.createElement('td'); 
    let code = document.createElement('td');
    let price = document.createElement('td');
    let supply = document.createElement('td');

    name.textContent = coin.name;
    tr.appendChild(coin);

    code.textContent = coin.symbol;
    tr.appendChild(code);

    price.textContent = '$'+coin.price_usd;
    tr.appendChild(price);

    supply.textContent = `${coin.tsupply} ${coin.symbol}`;
    tr.appendChild(supply);
    
    tbody.appendChild(tr);
  }
     
};

window.onload = nextPage;