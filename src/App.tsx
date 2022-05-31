import React, { useEffect, useState } from "react";
import { findAssetByName, generateMockHistory } from "./helpers";
import { IHistory } from "./interfaces";
import { useFetch } from "./hooks";
import Chart from "./components/Chart";
import "./App.css";

function App() {
  const { loading, data, error } = useFetch(
    "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"
  );
  const [asset, setAsset] = useState<any>();
  const [tvlHistory, setTvlHistory] = useState<IHistory[] | null>(null);
  const [aprHistory, setAprHistory] = useState<IHistory[] | null>(null);

  if (error) console.warn(error.message);

  useEffect(() => {
    if (data) setAsset(findAssetByName(data, "Hackerdao-WBNB"));
    if (asset) setTvlHistory(asset.selected_farm[0].tvlStakedHistory);
    if (tvlHistory) {
      setAprHistory(generateMockHistory(tvlHistory, asset.aprYearly, 5));
    }
  }, [asset, data, tvlHistory]);

  return (
    <div className="App">
      {loading ? (
        "loading...."
      ) : (
        <div className="col-2">
          <Chart data={aprHistory} name="Asset APR(y)" />
          <Chart data={tvlHistory} name="Asset TVL" />
        </div>
      )}
    </div>
  );
}

export default App;
