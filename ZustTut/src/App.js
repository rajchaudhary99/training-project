import React, { useState, useEffect, Suspense, lazy } from 'react';

// Lazy load components
const CardSection = lazy(() => import('./components/CardSection'));
const ChartSection = lazy(() => import('./components/ChartSection'));
const Header = lazy(() => import('./components/Header'));

const App = () => {
  const [Id, setId] = useState("bitcoin");
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${Id}`);
    const jsonData = await response.json();
    setData(jsonData);
  };

  const handleSubmit = async (event) => {
    const newId = event.target.value;
    setId(newId);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [Id]);

  return (
    <div>
      {/* Suspense wrapper to handle loading state */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header handle_Submit={handleSubmit} />
        <CardSection
          coinName={data.name}
          currentPrice={data.market_data ? data.market_data.current_price["usd"] : ""}
          mCap24={data.market_data ? data.market_data.market_cap_change_percentage_24h : ""}
          ath={data.market_data ? data.market_data.ath.usd : ""}
          atl={data.market_data ? data.market_data.ath.usd : ""}
          sentiment={data.sentiment_votes_up_percentage}
          high24={data.market_data ? data.market_data.high_24h["usd"] : ""}
          low24={data.market_data ? data.market_data.low_24h["usd"] : ""}
        />
        <ChartSection
          Id={Id}
          priceChange24={data.market_data ? data.market_data.price_change_24h_in_currency.usd : ""}
          MarketCap={data.market_data ? data.market_data.market_cap.usd : ""}
          TotVol={data.market_data ? data.market_data.total_volume.usd : ""}
          Circulating={data.market_data ? data.market_data["circulating_supply"] : ""}
          twitterF={data.community_data ? data.community_data.twitter_followers : ""}
        />
      </Suspense>
    </div>
  );
};

export default App;
