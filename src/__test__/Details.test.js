import React from "react";
import { render, screen, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Details from "../pages/Details/Details";

const queryClient = new QueryClient();

test("Details | does loader rendered", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Details />
    </QueryClientProvider>
  );
  const loader = screen.getByAltText("Loader");
  expect(loader).toBeInTheDocument();
});

const headers = {
  "X-RapidAPI-Key": "46fd74afd6msh716fdfc769c46a8p1da5d3jsne73a1afa90dd",
  "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
};
const country = "Turkey";
function useCustomHook() {
  return useQuery({
    queryKey: ["test"],
    queryFn: () =>
      axios
        .get(
          `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`,
          { headers: headers }
        )
        .then((res) => res.data),
  });
}
test("Details | does data fetched", async () => {
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = renderHook(() => useCustomHook(), { wrapper });
  setTimeout(() => {
    expect(result.current.isSuccess).toBe(true);
  }, 1000);
});
