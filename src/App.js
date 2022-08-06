import { useEffect, useState, useRef } from "react";
import "./App.css";

import * as tt from "@tomtom-international/web-sdk-maps";

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);
  // const longitude = -0.112869;
  // const latitude = 51.504;

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14,
    });

    setMap(map);
    return () => map.remove();
  }, [longitude, latitude]);
  return (
    <div className="app">
      <div ref={mapElement} className="map">
        <div className="search-bar">
          <h1>Where to?</h1>
          <input
            type="text"
            id="longitude"
            className="longitude"
            placeholder="Put in Longitude"
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
          />
          <input
            type="text"
            id="latitude"
            className="latitude"
            placeholder="Put in latitude"
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
