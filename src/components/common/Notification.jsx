import React, { useState, useEffect } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Dummy notifications — replace with API call if needed
    const dummyNotifications = [
      { id: 1, message: "New user signed up", time: "2 min ago" },
      { id: 2, message: "Server backup completed", time: "10 min ago" },
      { id: 3, message: "New message received", time: "30 min ago" },
    ];
    setNotifications(dummyNotifications);
  }, []);

  return (
    <div className="w-64 max-h-72 overflow-y-auto bg-white shadow-lg rounded-lg p-3 border border-gray-200">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No notifications</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className="p-2 border-b last:border-b-0 hover:bg-gray-100 rounded transition-colors duration-200 cursor-pointer"
          >
            <p className="text-gray-800 text-sm font-medium">{note.message}</p>
            <small className="text-gray-400 text-xs">{note.time}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
