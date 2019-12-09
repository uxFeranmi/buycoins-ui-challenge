/* 
 * ✅ Use the Coinlore API (Coins) 
 *    https://www.coinlore.com/cryptocurrency-data-api
 * 
 *    Get 10 coins per "page"
 */

let currentPage = 0;

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

const updateTable = async () => {
  const {data} = await getData(currentPage);
  if (!data)
    return window.alert('Something went wrong. Please try again.');
  
  const tbody = document.querySelector('tbody');
  
  let tr = document.createElement('tr');
  let coin = document.createElement('td'); 
  let code = document.createElement('td');
  let price = document.createElement('td');
  let supply = document.createElement('td');

  coin.textContent = data[i].name;
  tr.appendChild(coin);
     
  tbody.appendChild(tr);
};

document.onload = updateTable;