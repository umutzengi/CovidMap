import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../assets/covid19.gif";

function Detail() {
  const headers = {
    "X-RapidAPI-Key": "46fd74afd6msh716fdfc769c46a8p1da5d3jsne73a1afa90dd",
    "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
  };

  const { country, flag } = useParams();

  const countryList = useQuery({
    queryKey: ["list", country],
    queryFn: () =>
      axios
        .get(
          `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`,
          { headers: headers }
        )
        .then((res) => res.data),
  });
  if (countryList.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="">
          <img src={Loader} alt="Loader" />{" "}
        </div>
      </div>
    );
  }
  if (countryList.isError)
    return "An error has occured" + countryList.error.message;

  const apiDate = new Date(countryList.data.data.lastChecked);
  const formattedDate = `${apiDate.getDate()}/${apiDate.getMonth()}/${apiDate.getFullYear()}`;

  return (
    <div className="h-screen bg-amber-400 flex items-center justify-center">
      {countryList.data.message !== "OK" ? (
        <div className=" bg-red-400 p-5 rounded-md text-2xl m-5">
          There is no disease data about this country. Please choose another
          one!
          <div className="flex justify-center">
            <Link
              className="p-2 bg-red-500 rounded-md font-bold no-underline text-base shadow-sm shadow-slate-800"
              to={`/`}
            >
              <button data-testid="btn" className="text-white">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-red-400 p-5 flex flex-col rounded-xl">
          <div className=" flex justify-center p-5">
            <div className="text-6xl text-white">
              {countryList.data.data.location}
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <img
                className="h-24 w-24"
                alt="United States"
                src={
                  "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                  flag +
                  ".svg"
                }
              />
            </div>
          </div>
          <div className="max-w-full mx-4 py-7 sm:mx-auto sm:px-6 lg:px-8">
            <div className="sm:flex sm:space-x-4">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:-ml-4 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Conf. Cases
                      </h3>
                      <p className="text-xl font-bold text-black">
                        {countryList.data.data.confirmed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:-ml-4 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Deaths
                      </h3>
                      <p className="text-xl font-bold text-black ">
                        {countryList.data.data.deaths}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:-ml-4 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Recovered
                      </h3>
                      <p className="text-xl font-bold text-black">
                        {" "}
                        {countryList.data.data.recovered}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:-ml-4 sm:text-left">
                      <h3 className="text-sm leading-6 font-medium text-gray-400">
                        Last Update
                      </h3>
                      <p className="text-xl font-bold text-black">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              className="p-2 bg-red-500 rounded-md font-bold no-underline text-base shadow-sm shadow-slate-800"
              to={`/`}
            >
              <button className="text-white">Go Back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
