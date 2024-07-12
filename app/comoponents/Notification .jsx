import React, { useState, useEffect } from 'react';

const Notification = ({ message, status, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Trigger onClose after timeout
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  let bgColor = '';
  switch (status) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    default:
      bgColor = 'bg-gray-500';
  }

  const handleClose = () => {
    setVisible(false);
    onClose(); // Trigger onClose when manually closing
  };

  return (
    <>
      {visible && (
        <div className={`fixed bottom-5 right-5 p-4 rounded-md text-white ${bgColor}`}>
          <div className="flex justify-between items-center">
            <div>{message}</div>
            <button
              className="ml-4 text-sm font-medium focus:outline-none"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
