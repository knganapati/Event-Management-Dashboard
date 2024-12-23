// components/CreateEventModal.js
import { useState } from "react";

const CreateEventModal = ({
  isModalOpen,
  setIsModalOpen,
  newEvent,
  setNewEvent,
  handleEventSubmit,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
        <form onSubmit={handleEventSubmit}>
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              id="eventDate"
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              id="eventDescription"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  description: e.target.value,
                })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="googleFormLink"
              className="block text-sm font-medium text-gray-700"
            >
              Google Form Link
            </label>
            <input
              id="googleFormLink"
              type="url"
              value={newEvent.googleFormLink}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  googleFormLink: e.target.value,
                })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              placeholder="Enter Google Form link"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="responsesLink"
              className="block text-sm font-medium text-gray-700"
            >
              Response Sheet Link
            </label>
            <input
              id="responsesLink"
              type="url"
              value={newEvent.responsesLink}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  responsesLink: e.target.value,
                })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              placeholder="Enter response sheet link"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image URL (optional)
            </label>
            <input
              id="imageUrl"
              type="url"
              value={newEvent.imageUrl}
              onChange={(e) =>
                setNewEvent({ ...newEvent, imageUrl: e.target.value })
              }
              className="w-full mt-2 p-4 border border-gray-300 rounded-md"
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Submit
            </button>
          </div>
        </form>

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CreateEventModal;
