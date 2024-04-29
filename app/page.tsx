"use client";

import { useState } from "react";

export default function Home() {
  const [currentCatUrl, setCurrentCatUrl] = useState("");
  console.log("🟢🟢🟢 ~ Home ~ currentCatUrl:", currentCatUrl);
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY as string,
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const getCatPicture = async () => {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
      requestOptions
    );

    const data = await response.json();

    console.log("🟢🟢🟢 ~ getCatPicture ~ data:", data);

    setCurrentCatUrl(data[0].url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <button
        onClick={() => {
          getCatPicture();
        }}
      >
        <div
          onMouseDown={(e) => {
            e.currentTarget.className = "";
          }}
          onClick={(e) => {
            e.currentTarget.className = "wiggle";
          }}
          style={{
            background: "url(./cat-nose.png) center center no-repeat",
            width: "250px",
            height: "100px",
          }}
        />
      </button>

      {currentCatUrl && (
        <img
          src={currentCatUrl}
          alt="cat"
          style={{
            border: "1px solid transparent",
            borderRadius: "24px",
          }}
        />
      )}
    </main>
  );
}
