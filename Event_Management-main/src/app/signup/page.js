"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure the db is correctly imported from Firebase
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);

      // Get the userID
      const userID = userCredential.user.uid;

      // Correct way to create a document reference for the user document
      const userDocRef = doc(db, "users", userID); // User document identified by userID
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        phoneNumber: phoneNumber,
        gender: gender,
        createdAt: new Date(),
      });

      setSuccess("Account created successfully!");
      setTimeout(() => {
        router.push("/signin"); // Redirect to Sign-In page after successful signup
      }, 1500);
    } catch (err) {
      console.error("Sign-Up Error:", err.message);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex flex-col md:flex-row">
      {/* Sign Up Form Section (Left side) */}
      <div className="flex flex-col items-center sm:w-[90%] md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 bg-gray-800 rounded-xl shadow-xl mt-10 mb-10 md:mb-0 md:mt-0 flex-grow">
        <form
          className="w-full space-y-6 mx-auto"
          style={{ maxWidth: "400px", paddingTop: "20px" }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-semibold text-left text-gray-100 mb-6">
            Sign Up
          </h2>

          {/* Error and Success Messages */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-300"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-300"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signin")}
                className="text-indigo-400 hover:text-indigo-500 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Right Section with Gallery and Events */}
      <div className="w-full sm:w-[90%] md:w-1/2 lg:w-2/3 xl:w-2/3 px-6 md:px-16 mt-8 md:mt-0 space-y-8 text-gray-300">
        {/* Welcome Paragraph */}
        <p className="text-xl text-center max-w-2xl mx-auto pt-4 px-4 md:px-8">
          Welcome! Create your account to access all the features we offer. Your
          privacy and security are our top priorities.
        </p>

        {/* Image Gallery Section */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 pt-4 px-4 md:px-8">
          {/* Add Image Elements */}
          <img
            src="/assests/pic3.png"
            alt="Gallery Image 1"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
          <img
            src="/assests/pic4.png"
            alt="Gallery Image 2"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
          <img
            src="/assests/pic5.png"
            alt="Gallery Image 3"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
          <img
            src="/assests/pic4.png"
            alt="Gallery Image 4"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Events Section */}
        <div className="w-full space-y-6 pt-4 px-4 md:px-8">
          <h3 className="text-2xl font-semibold text-gray-100">
            Upcoming Events
          </h3>

          {/* Event 1 */}
          <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg">
            <div>
              <h4 className="text-xl text-gray-100">Event 1</h4>
              <p className="text-sm text-gray-400">Date: 2024-12-25</p>
            </div>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm hover:bg-indigo-700">
              Join
            </button>
          </div>

          {/* Event 2 */}
          <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg">
            <div>
              <h4 className="text-xl text-gray-100">Event 2</h4>
              <p className="text-sm text-gray-400">Date: 2025-01-10</p>
            </div>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm hover:bg-indigo-700">
              Join
            </button>
          </div>

          {/* Event 3 */}
          <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg">
            <div>
              <h4 className="text-xl text-gray-100">Event 3</h4>
              <p className="text-sm text-gray-400">Date: 2025-02-15</p>
            </div>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md text-sm hover:bg-indigo-700">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
