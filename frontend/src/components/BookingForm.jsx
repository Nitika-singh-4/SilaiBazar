import React, { useState } from 'react';

const BookingForm = ({ tailorId, onBookingSubmit }) => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookingSubmit({ tailorId, service, date, time });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-semibold mb-4">Book a Tailor</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Service</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          placeholder="e.g. Blouse Stitching"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
