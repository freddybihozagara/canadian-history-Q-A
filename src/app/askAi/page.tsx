"use client";

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AskAI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    if (response) {
      setShowResponse(true);
      const timer = setTimeout(() => {
        setShowResponse(false);
        setResponse("");
      }, 120000); // 120 seconds = 2 minutes

      return () => clearTimeout(timer);
    }
  }, [response]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-4">
       
        <h1 className="text-2xl font-bold text-center mb-6" bottom-margin="20px">
        
        <img
          src="http://localhost:3000/api/images/04192025020927.png"
          alt="ai icon"
          width={50}
          height={50}
          className="w-32 h-32 mx-auto mb-4"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        />
        Ask AI about Canadian History
          </h1>
        
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md min-h-[100px]"
          placeholder="Enter your question about Canadian history..."
        />
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : <img
          src="http://localhost:3000/api/images/04192025020927.png"
          alt="ai icon"
          width={40}
          height={40}
          className="w-32 h-32 mx-auto mb-4"
          style={{ marginLeft: "20px", marginRight: "20px", marginTop: "1px", marginBottom: "1px" }}
        />}
        </button>
        
        {showResponse && response && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h2 className="font-bold mb-2">AI Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}