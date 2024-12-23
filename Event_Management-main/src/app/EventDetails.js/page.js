"use client"; // Client Component

import { useState, useEffect } from "react";

export default function EventDetailsInput({ details, onSubmit }) {
  // Initialize the form state with the passed details or empty fields
  const [eventDetails, setEventDetails] = useState({
    name: details?.name || "",
    date: details?.date || "",
    description: details?.description || "",
    googleFormLink: details?.googleFormLink || "",
    responsesLink: details?.responsesLink || "",
    imageUrl: details?.imageUrl || "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the event details to the parent component for further handling
    onSubmit(eventDetails);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        {details ? "Edit Event" : "Create Event"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Event Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={eventDetails.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={eventDetails.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="googleFormLink" className="block text-gray-700">
            Google Form Link
          </label>
          <input
            id="googleFormLink"
            name="googleFormLink"
            type="url"
            value={eventDetails.googleFormLink}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="responsesLink" className="block text-gray-700">
            Responses Link
          </label>
          <input
            id="responsesLink"
            name="responsesLink"
            type="url"
            value={eventDetails.responsesLink}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-gray-700">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={eventDetails.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all"
        >
          {details ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}
