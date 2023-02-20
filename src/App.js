import React from "react";
import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";

import LocationMarker from "./components/LocationMarker";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <div className="App">
      <div
        data-testid="header"
        className={
          " fixed w-full bg-red-500 pt-2 text-center h-10 text-white font-bold shadow-md  shadow-slate-500 rounded-b-full z-10"
        }
      >
        Total Covid-19 Cases Map
      </div>

      <MapContainer
        touchZoom={true}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        center={[39, 35]}
        zoom={2.5}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        zoomControl={false}
        minZoom={3}
        maxZoom={5}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={100}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default App;
