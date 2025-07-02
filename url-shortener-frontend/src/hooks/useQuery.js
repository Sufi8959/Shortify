import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    "my-shortenurls",
    async () => {
      const res = await api.get("/api/url/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return res.data.data; // Node.js backend returns { data: [...] }
    },
    {
      select: (data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchTotalClicksPerDay = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      const res = await api.get("/api/url/clicksPerDay", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return res.data.data; // Node.js backend returns { data: { totalClicks: number } }
    },
    {
      onError,
      staleTime: 5000,
    }
  );
};
