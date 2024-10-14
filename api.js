
// API from CoinGecko - https://www.coingecko.com/en/api
let apiKEY = 'ADD YOUR KEY HERE';


//////////  Today's Date ////////////////////////////////////////////////////////////////////////////////////
let d = new Date();
let todayDate = d.toDateString();
//console.log(todayDate);
document.getElementById("todayDate").innerHTML = todayDate;


//////// Current Crypto Prices ///////////////////////////////////////////////////////////////////////////////

const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cchainlink%2Ccardano%2Cpolkadot&vs_currencies=usd';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKEY}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
          //console.log(json);

           // This Function Changes the Price to USD format
              let USDollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });

              JSON.stringify(json);

           // Raw Crypto Price   
              let bitcoinPrice = json.bitcoin.usd;
              let chainlinkPrice = json.chainlink.usd;
              let ethereumPrice = json.ethereum.usd;
              let cardanoPrice = json.cardano.usd;
              let polkadotPrice = json.polkadot.usd;

          // USD Format
              let btc = USDollar.format(bitcoinPrice);
              let eth = USDollar.format(ethereumPrice);
              let link = USDollar.format(chainlinkPrice);
              let ada = USDollar.format(cardanoPrice);
              let dot = USDollar.format(polkadotPrice);
             
          // HTML Replacement
              document.getElementById("btc").innerHTML = btc;
              document.getElementById("eth").innerHTML = eth;
              document.getElementById("link").innerHTML = link;
              document.getElementById("ada").innerHTML = ada;
              document.getElementById("dot").innerHTML = dot;



///////// PIE Chart //////////////////////////////////////////////////////////////////////////////////////////
                let priceArray = [bitcoinPrice, ethereumPrice, chainlinkPrice, cardanoPrice, polkadotPrice];
                const xValues = ["Bitcoin", "Ethereum", "Chainlink", "Cardano", "Polkadot"];
                //const yValues = [55, 49, 44, 24, 15];
                const barColors = [
                  "#b91d47",
                  "#00aba9",
                  "#2b5797",
                  "#e8c3b9",
                  "#1e7145"
                ];

                new Chart("myPieChart", {
                  type: "pie",
                  data: {
                    labels: xValues,
                    datasets: [{
                      backgroundColor: barColors,
                      //data: yValues
                      data: priceArray
                    }]
                  },
                  options: {
                    title: {
                      display: true,
                      text: "Crypto Currency Prices"
                    }
                  }
                });



///////// Bar Chart //////////////////////////////////////////////////////////////////////////////////////////
   

                new Chart("myBarChart", {
                  type: "bar",
                  data: {
                    labels: xValues,
                    datasets: [{
                      backgroundColor: barColors,
                      //data: yValues
                      data: priceArray
                    }]
                  },
                  options: {
                    legend: {display: false},
                    title: {
                      display: true,
                      text: "Crypto Currency Prices"
                    }
                  }
                });

            
              //console.log(`The formated version of ${btc} is ${USDollar.format(btc)}`);
              //console.log(btc);
         }) 

  .catch(err => console.error('error:' + err));



 
//////////  New URL Call for BTC History /////////////////////////////////////////////////////////////////////

         // How many days of data do you want? (up to 365)
            let days = 365;

  const btcHistoryURL = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=' + days + '&interval=daily';
  const btcoptions = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKEY}
};


fetch(btcHistoryURL, btcoptions)
  .then(res => res.json())
  .then(json =>  {
    
               // This Function Changes the Price to USD format
               let USDollar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });

              JSON.stringify(json);


////////// BTC Price History Line Chart //////////////////////////////////////////////////////////////////////

              let btcpriceTimestamps = [];
              let btcprices = [];

           //   let marketCapTimestamps = [];
           //   let marketCaps = [];

           //   let volumeTimestamps = [];
           //   let totalVolumes = [];

          // This loops the JSON to create the 'btcpriceTimestamps' & 'btcprices' Arrays
              json.prices.forEach(([timestamp, price]) => {
                btcpriceTimestamps.push(timestamp);
                btcprices.push(price);
            });


      ////////////// NOT USED CURRENTLY /////////////////////////////////
      //  // Extract timestamps and market caps                        //
/*               json.market_caps.forEach(([timestamp, marketCap]) => {
                marketCapTimestamps.push(timestamp);
                marketCaps.push(marketCap);
              });

          // Extract timestamps and total volumes
              json.total_volumes.forEach(([timestamp, volume]) => {
                volumeTimestamps.push(timestamp);
                totalVolumes.push(volume);
              });   */   
      //                                                               //
      ///////////////////////////////////////////////////////////////////

          // Convert timestamps to readable dates
              let readableDates = btcpriceTimestamps.map(timestamp => {
                   // Create a new Date object from the timestamp
              let date = new Date(timestamp);
                   // Convert the date to a readable string (e.g., "MM/DD/YYYY")
              return date.toLocaleDateString(); 
              });

                   // console.log("Readable Dates:", readableDates);


              new Chart("myBTCLineChart", {
                type: "line",
                data: {
                  labels: readableDates,
                  datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: btcprices
                  }]
                },
                options: {
                  legend: {display: false},
                  title: {
                    display: true,
                    text: "Bitcoin Price History"
                  },
                  scales: {
                    yAxes: [{ticks: {min: 0}}],
                  }
                }
              });

  })
  .catch(err => console.error('error:' + err));