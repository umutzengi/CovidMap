import React from "react";

import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

import countries from "../assets/countryData.json";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  icon,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
  return (
    <div>
      {countries.ref_country_codes.map((marker, i) => (
        <Marker touch key={i} position={marker}>
          <Popup>
            <div className="p-3 text-center">
              <div className="font-bold m-2 text-center text-2xl">
                {marker.country}
              </div>
              <br />

              <Link
                className="p-2 bg-red-500 rounded-md font-bold no-underline text-base shadow-sm shadow-slate-800"
                to={`/details/${marker.country}/${marker.alpha2}`}
              >
                <button className="text-white">Details</button>
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
}

export default LocationMarker;
