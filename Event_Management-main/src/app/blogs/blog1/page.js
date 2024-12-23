"use client"; // Mark as a Client Component
import { useState, useRef, useEffect } from "react";
import FormResponses from "../../FormResponses/page";

export default function Blog1() {
  const [showForm, setShowForm] = useState(false);
  const [showData, setShowData] = useState(false);

  const formSectionRef = useRef(null); // Ref for the registration form section
  const dataSectionRef = useRef(null); // Ref for the data section

  // Function to scroll to an element with smooth scroll
  const smoothScrollTo = (element) => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Enable smooth scrolling
        block: "start", // Align the top of the element with the top of the viewport
      });
    }
  };

  // Scroll when showForm or showData changes
  useEffect(() => {
    if (showForm && formSectionRef.current) {
      smoothScrollTo(formSectionRef.current); // Smooth scroll to the form section
    } else if (showData && dataSectionRef.current) {
      smoothScrollTo(dataSectionRef.current); // Smooth scroll to the data section
    }
  }, [showForm, showData]);

  const handleRegisterClick = () => {
    setShowForm(true);
    setShowData(false); // Hide data view when showing the form
  };

  const handleCheckDataClick = () => {
    setShowData(true);
    setShowForm(false); // Hide form when showing the data view
  };

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDquJMyikq0QNjI5gH6FFeYjRE5GovJbv-Qs2CCZiFgSKXMItpN0-0Q3ibW44puaD0a_YPycYcMAmM/pub?output=csv";

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        Ganesha Chaturthi Celebration
      </h1>
      <img
        src="/./assests/pic2.jpg"
        alt="Ganesha Chaturthi"
        className="w-full h-96 object-cover mb-8 rounded-lg shadow-xl"
      />
      <p className="text-lg text-gray-700 mb-4">
        Are you planning to visit Bangalore and wondering when the best time of
        year is to experience the vibrant cultural festivals and events the city
        has to offer? Look no further because in this section, we’ll explore the
        best time to visit Bangalore for festivals and events so you can plan
        your trip accordingly.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Bangalore, also known as the Silicon Valley of India, is a bustling city
        that celebrates its cultural heritage through numerous festivals and
        events throughout the year. From traditional music and dance
        performances to art exhibitions and sports events, Bangalore has
        something for everyone.
      </p>

      <div className="mt-8 flex justify-center gap-6">
        <button
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={handleRegisterClick}
        >
          Register Now
        </button>

        <button
          className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={handleCheckDataClick}
        >
          Check Registered Data
        </button>
      </div>

      {/* Embedded Google Form (Visible only when "Register Now" is clicked) */}
      {showForm && (
        <div
          ref={formSectionRef}
          className="mt-12 bg-white rounded-lg shadow-2xl p-8"
        >
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
            Registration Form
          </h2>
          <iframe
            src="https://forms.gle/Tuoc7ZyLS5ZxJSNh6"
            width="100%"
            height="600"
            className="border-2 border-indigo-300 rounded-md shadow-lg"
            title="Google Form"
          ></iframe>
          <p className="text-center text-gray-500 mt-4">
            * Please select the first option to proceed.
          </p>
        </div>
      )}

      {/* Data View (Visible only when "Check Registered Data" is clicked) */}
      {showData && (
        <div
          ref={dataSectionRef}
          className="mt-12 bg-white rounded-lg shadow-2xl p-8"
        >
          <h2 className="text-3xl font-semibold text-center text-green-700 mb-6">
            Registered Data
          </h2>
          <FormResponses csvUrl={csvUrl} />
        </div>
      )}
    </div>
  );
}
