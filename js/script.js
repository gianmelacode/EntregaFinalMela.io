// Arrays
const currencies = ["ARS", "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "HKD", "NZD", "SGD"];

// Variables
let selectedCurrencyOne = "USD";
let selectedCurrencyTwo = "EUR";
let exchangeRate;

// Elementos del DOM
const currencyOneEl = document.getElementById("currency-one");
const amountOneEl = document.getElementById("amount-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountTwoEl = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swapBtn = document.getElementById("swap");

// Objetos
const exchangeRateObj = {
  base: "",
  date: "",
  rates: {}
};

// Local Storage
localStorage.setItem("currencies", JSON.stringify(currencies));

// JSON
const exchangeRateJSON = { "base": "", "date": "", "rates": {} };

// Fetch, cambios, Rates y Update de DOM
function calculate() {
  selectedCurrencyOne = currencyOneEl.value;
  selectedCurrencyTwo = currencyTwoEl.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${selectedCurrencyOne}`)
  .then((res) => res.json())
  .then((data) => {
    exchangeRate = data.rates[selectedCurrencyTwo];
    rateEl.innerText = `1 ${selectedCurrencyOne} = ${exchangeRate} ${selectedCurrencyTwo}`;
    amountTwoEl.value = (amountOneEl.value * exchangeRate).toFixed(2);
    Swal.fire("Eleccion exitosa");
    })
  .catch((error) => {
    console.log(error);
  });
}

// Eventos
currencyOneEl.addEventListener("change", calculate);
amountOneEl.addEventListener("input", calculate);
currencyTwoEl.addEventListener("change", calculate);
amountTwoEl.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = temp;
  calculate();
});

calculate();
