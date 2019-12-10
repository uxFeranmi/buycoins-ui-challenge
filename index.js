/* 
 * ✅ Use the Coinlore API (Coins) 
 *    https://www.coinlore.com/cryptocurrency-data-api
 * 
 *    Get 10 coins per "page"
 */

/** Fetches the next page of coin data, 10 items per page.
 * @param {number} start The page number to get.
 */
const getData = async (start) => {
  try {
    console.log(start);
    // Start is the page number,
    // multiply by 10 to get start index for that page. (10 per page).
    const url = `https://api.coinlore.com/api/tickers/?start=${start*10}&limit=10`;

    let data = await fetch(url);
    data = await data.json();

    return data;
    //
  } catch (error) {
    console.error(error);
    return false;
  }
};

let currentPage = -1; // First page is page 0. This should be initialized to -1.

/** Renders the next page of coin data.
 * @param {boolean} previous Sets whether to get the previous page. Defaults to false.
 */
const nextPage = async (previous = false) => {
  // Calculate next/previous page index.
  let next = previous ? currentPage - 1 : currentPage + 1;

  // Prevent navigation to less that first page.
  if (next < 0) next = 0;

  const {data} = await getData(next);

  if (!data)
    return window.alert('Something went wrong. Please try again.');
  
  currentPage = next;
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  
  for (let coin of data) {
    let tr = document.createElement('tr');
    let name = document.createElement('td'); 
    let code = document.createElement('td');
    let price = document.createElement('td');
    let supply = document.createElement('td');

    name.textContent = coin.name;
    tr.appendChild(name);

    code.textContent = coin.symbol;
    tr.appendChild(code);

    price.textContent = '$'+coin.price_usd;
    tr.appendChild(price);

    supply.textContent = `${coin.tsupply} ${coin.symbol}`;
    tr.appendChild(supply);
    
    tbody.appendChild(tr);
  }   
};

window.onload = () => nextPage();

document
  .querySelector('.nav__button.is-next')
  .onclick = () => nextPage();
  
document
  .querySelector('.nav__button.is-previous')
  .onclick = () => nextPage(true); // Pass true to get previous page.
