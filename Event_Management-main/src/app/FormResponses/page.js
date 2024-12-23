"use client"; // Client Component

import { useEffect, useState } from "react";

export default function FormResponses({ csvUrl }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();

        const rows = csvText.split("\n");
        const headers = rows[0].split(",");
        const data = rows.slice(1).map((row) => {
          const values = row.split(",");
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || ""; // Map headers to values
            return obj;
          }, {});
        });

        setResponses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (csvUrl) {
      fetchResponses();
    }
  }, [csvUrl]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Form Responses</h1>
      {responses.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              {Object.keys(responses[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-4 py-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                {Object.values(response).map((value, idx) => (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No responses yet.</p>
      )}
    </div>
  );
}
