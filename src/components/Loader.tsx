import React from 'react';

export default function Loader() {
  return (
    <div className="bg-white bg-opacity-50 fixed flex inset-0 items-center justify-center z-50">
      <div
        className="animate-spin border-4 border-gray-300 border-t-blue-300 h-16 rounded-full w-16"
      />
    </div>
  );
}
