import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    "my-shortenurls",
    async () => {
      return await api.get("/api/url/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
    },
    {
      select: (data) => {
        const sortedData = data.data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    "url-totalclick",
    async () => {
      return await api.get(
        "/api/url/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    {
      select: (data) => {
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickDate: key,
          count: data.data[key], // data.data[2024-01-01]
        }));
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};
