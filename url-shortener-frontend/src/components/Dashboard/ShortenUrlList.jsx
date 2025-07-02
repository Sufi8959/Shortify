import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data }) => {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <div className="my-6 space-y-4">
      {safeData.map((item) => (
        <ShortenItem
          key={item._id}
          originalUrl={item.originalUrl}
          shortUrl={item.shortUrl}
          clicks={Array.isArray(item.clicks) ? item.clicks.length : 0}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default ShortenUrlList;
