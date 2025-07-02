import dayjs from "dayjs";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdOutlineAdsClick } from "react-icons/md";

function ShortenItem({ originalUrl, shortUrl, clicks, createdAt }) {
  const [isCopied, setIsCopied] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const subDomain = import.meta.env.VITE_SHORT_DOMAIN.replace(
    /^https?:\/\//,
    ""
  );
  return (
    <div
      className={`bg-slate-100 shadow-lg border border-dotted  border-slate-500 px-6 sm:py-1 py-3 rounded-md  transition-all duration-100 `}
    >
      <div
        className={`flex sm:flex-row flex-col  sm:justify-between w-full sm:gap-0 gap-5 py-5 `}
      >
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden ">
          <div className="text-slate-900 pb-1 sm:pb-0   flex items-center gap-2 ">
            <a
              href={`${import.meta.env.VITE_BACKEND_URL}/api/url/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] font-montserrat font-[600] text-linkColor"
            >
              {subDomain + "/s/" + `${shortUrl}`}
            </a>
            <FaExternalLinkAlt className="text-linkColor" />
          </div>

          <div className="flex items-center gap-1 ">
            <h3 className=" text-slate-700 font-[400] text-[17px] ">
              {originalUrl}
            </h3>
          </div>

          <div className="flex   items-center gap-8 pt-6 ">
            <div className="flex gap-1  items-center font-semibold  text-green-800">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clicks}</span>
              <span className="text-[15px] ">
                {clicks === 0 || clicks === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex  flex-1  sm:justify-end items-center gap-4">
          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={`${
              import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`
            }`}
          >
            <div className="flex cursor-pointer gap-1 items-center bg-gradient-to-l from-blue-500 to-rose-500 bg-clip-textpy-2  font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white ">
              <button className="">{isCopied ? "Copied" : "Copy"}</button>
              {isCopied ? (
                <LiaCheckSolid className="text-md" />
              ) : (
                <IoCopy className="text-md" />
              )}
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default ShortenItem;
