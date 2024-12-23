"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firestore methods
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import CreateEventModal from "./CreateEventModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
    googleFormLink: "",
    responsesLink: "",
    imageUrl: "",
  });

  const [userId, setUserId] = useState(null); // Store userId state
  const [events, setEvents] = useState([]); // Store fetched events

  // Fetch the current user ID when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Get the user ID from Firebase Auth
      } else {
        setUserId(null); // If no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle form submission for creating a new event
  const handleEventSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("No user is logged in");
      return;
    }

    try {
      // Add event to 'events' collection
      const eventRef = await addDoc(collection(db, "events"), {
        name: newEvent.name,
        date: newEvent.date,
        description: newEvent.description,
        googleFormLink: newEvent.googleFormLink,
        responsesLink: newEvent.responsesLink,
        imageUrl: newEvent.imageUrl,
        createdBy: userId,
        createdAt: new Date(),
      });

      // Add event reference to the user's collection
      const userEventRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userEventRef);

      if (userSnapshot.exists()) {
        // If the user document exists, update the events array
        await setDoc(
          userEventRef,
          {
            events: {
              [eventRef.id]: {
                name: newEvent.name,
                date: newEvent.date,
                description: newEvent.description,
                googleFormLink: newEvent.googleFormLink,
                responsesLink: newEvent.responsesLink,
                imageUrl: newEvent.imageUrl,
                createdAt: new Date(),
              },
            },
          },
          { merge: true }
        );
      } else {
        // If the user document doesn't exist, create it
        await setDoc(userEventRef, {
          events: {
            [eventRef.id]: {
              name: newEvent.name,
              date: newEvent.date,
              description: newEvent.description,
              googleFormLink: newEvent.googleFormLink,
              responsesLink: newEvent.responsesLink,
              imageUrl: newEvent.imageUrl,
              createdAt: new Date(),
            },
          },
        });
      }

      console.log("Event created successfully");
      setIsModalOpen(false); // Close modal after submission

      // Reset form
      setNewEvent({
        name: "",
        date: "",
        description: "",
        googleFormLink: "",
        responsesLink: "",
        imageUrl: "",
      });

      // Refresh the event list
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: eventRef.id, ...newEvent },
      ]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg"
      >
        Create Event
      </button>

      {/* Pass props to CreateEventModal */}
      <CreateEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleEventSubmit={handleEventSubmit}
      />

      {/* Render events */}
      <div className="mt-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={event.imageUrl || "/default-event.jpg"}
                alt={event.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {event.name}
              </h4>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <a
                href={event.googleFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                RSVP
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
