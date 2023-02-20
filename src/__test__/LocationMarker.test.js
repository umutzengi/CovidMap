import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationMarker from "../Components/LocationMarker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { MapContainer, Popup, Marker } from "react-leaflet";

const queryClient = new QueryClient();

test("LocationMarker | Does popup rendered", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MapContainer>
        <LocationMarker>
          <Marker />
        </LocationMarker>
      </MapContainer>
    </QueryClientProvider>
  );
  setTimeout(() => {
    userEvent.click(Marker);
  }, 1000);
  setTimeout(() => {
    expect(Popup).toBeVisible();
  }, 1000);
});
