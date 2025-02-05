import React, { useState } from "react";

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center gap-2 px-3 py-2 black border rounded-lg shadow hover:shadow-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="w-8 h-8 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
        <span>John Doe</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 black border rounded-lg shadow-lg w-48">
          <button
            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
          
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;