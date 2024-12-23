"use client"; // Mark as a Client Component
import { useState } from "react";

export default function Blog2() {
  const [showForm, setShowForm] = useState(false);

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Party Time </h1>
      <img
        src="/./assests/pic3.jpg"
        alt="React Basics"
        className="w-full h-96 object-cover mb-6"
      />
      <p className="text-gray-700">
        Planning an event can be an exciting but daunting task. The world of
        events offers many options, from intimate gatherings to large-scale
        celebrations. The prospect of planning an event can trigger a lot of
        anxiety. It’s easy to convey that you are overwhelmed by the different
        types of events you can choose from. And yet, each event type plays a
        vital role in relevant sectors.
      </p>
      <p className="text-gray-700 mt-4">
        You don’t have to make that choice alone. We’ve devised a list of
        different types of events to ensure you are in the right direction. No
        matter your event goals, there’s a strong possibility that one of these
        choices will send you and your attendees home happy.
      </p>

      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleRegisterClick}
        >
          Register Now
        </button>
      </div>

      {/* Embedded Google Form (Visible only when "Register Now" is clicked) */}
      {showForm && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Registration Form
          </h2>
          <iframe
            src="https://forms.gle/Tuoc7ZyLS5ZxJSNh6"
            width="100%"
            height="600"
            className="border rounded-md shadow-lg"
            title="Google Form"
          ></iframe>
          <p className="text-gray-500 text-center mt-4">
            * Please select the first option to proceed.
          </p>
        </div>
      )}
    </div>
  );
}
