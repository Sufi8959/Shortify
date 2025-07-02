import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

function RedirectPage() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        // Call backend to get the original URL
        const response = await axios.get(`/api/url/${shortUrl}`);
        const originalUrl = response.data.originalUrl;
        if (originalUrl) {
          window.location.replace(originalUrl);
        } else {
          // If not found, redirect to error or home
          navigate("/error", { replace: true });
        }
      } catch (error) {
        navigate("/error", { replace: true });
      }
    };
    fetchAndRedirect();
  }, [shortUrl, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg text-slate-700">Redirecting...</p>
    </div>
  );
}

export default RedirectPage;
