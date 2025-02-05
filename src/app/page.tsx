"use client";

import React, { useState, useEffect } from "react";

interface ApiResponse {
  message: string;
  query: string;
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ping`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      })
      .catch((error) => console.log(error));
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
