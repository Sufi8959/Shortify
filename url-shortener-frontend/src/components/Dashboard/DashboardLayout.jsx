import React, { useState } from "react";
import Graph from "./Graph";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import Loader from "../Loader";
import {
  useFetchTotalClicksPerDay,
  useFetchMyShortUrls,
} from "../../hooks/useQuery";
import { useContextApi } from "../../context_api/ContextApi";
import { useNavigate } from "react-router-dom";
function DashboardLayout() {
  const { token } = useContextApi();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  function onError() {
    console.log("error");
  }
  const {
    isLoading: loader,
    data: totalClicksPerDay = [],
    refetch,
  } = useFetchTotalClicksPerDay(token, onError);

  const { isLoading, data: myShortenUrls } = useFetchMyShortUrls(
    token,
    onError
  );

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className=" h-96 relative ">
            {totalClicksPerDay.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
              </div>
            )}
            {/* You may want to update the Graph component if it expects an array */}
            <Graph graphData={totalClicksPerDay} />
          </div>
          <div className="py-5 sm:text-end text-center ">
            <button
              className="bg-gradient-to-l from-blue-500 to-rose-500 px-4 py-2 rounded-md text-white cursor-pointer"
              onClick={() => setShortenPopUp(true)}
            >
              Create a New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm " />
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
}

export default DashboardLayout;
