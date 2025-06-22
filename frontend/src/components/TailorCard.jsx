import React from 'react';

const TailorCard = ({ tailor, onBookClick }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold text-blue-700">{tailor.shopName}</h2>
      <p className="text-gray-600">Address: {tailor.address}</p>
      <p className="text-gray-600">Services: {tailor.services?.join(', ')}</p>

      {tailor.pricing && (
        <div className="mt-2">
          <p className="text-gray-700 font-medium">Pricing:</p>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {Array.from(tailor.pricing.entries()).map(([key, value]) => (
              <li key={key}>
                {key}: ₹{value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onBookClick(tailor._id)}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default TailorCard;
