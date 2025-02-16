"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse {
  message: string;
  query: string;
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  const fetchApiCall = async () => {
    try {
      const response = await axios.get<ApiResponse>(`api/ping`);
      setApiData(response.data);
    } catch (error) {
      console.error("API Error: ", error);
    }
  };

  useEffect(() => {
    fetchApiCall();
  }, []);

  return (
    <div className="fixed m-0 p-0 flex flex-col justify-center items-center w-full h-full">
      <h1>
        This is the <strong>Invoice Generator App :)</strong>
      </h1>
      <span>API Data: {apiData ? apiData?.message : "None"}</span>
    </div>
  );
}
