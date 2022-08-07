import React, { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "./App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  //adding a delievery marker
  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker-delivery";
    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude,
    };

    const destinations = [];

    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, latitude],
      zoom: 14, //(14)
    });

    setMap(map);

    // const element = document.createElement("div");
    // element.className = "marker";

    const addMarker = () => {
      const popupOffest = {
        bottom: [0, -25], //this is popup message above marker
      };
      const popup = new tt.Popup({ offset: popupOffest }).setHTML(
        "This is you!"
      );

      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on("dragend", () => {
        const lnglat = marker.getLngLat();
        setLongitude(lnglat.lng);
        setLatitude(lnglat.lat);
        //lng lat on dragging updates longitude latitude
        // console.log(lnglat);
      });
      marker.setPopup(popup).togglePopup();
    };

    addMarker();

    // const pointsForDestinations = locations.map
    // const callParameters = {
    //   key:process.env.REACT_APP_TOM_TOM_API_KEY,
    //   destinations: pointsForDestinations,
    //   origins: [convertToPoints(origin)],
    // }
    // return new Promise((resolve, reject) => {
    //   ttapi.services.matrixRouting(callParameters);
    // });

    map.on("click", (e) => {
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
    });

    return () => map.remove();
  }, [longitude, latitude]);
  return (
    <>
      {map && (
        <div className="app">
          <div ref={mapElement} className="map">
            <div className="search-bar">
              <h1>Where to?</h1>
              <input
                type="text"
                id="latitude"
                className="latitude"
                placeholder="Put in latitude"
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
              />
              <input
                type="text"
                id="longitude"
                className="longitude"
                placeholder="Put in Longitude"
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
