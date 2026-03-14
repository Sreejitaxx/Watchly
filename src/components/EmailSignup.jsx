import React from "react";

const EmailSignup = () => {
  return (
    <div className="flex gap-2">
      <input
        type="email"
        placeholder="Email address"
        className="p-3 w-80 rounded bg-black bg-opacity-60 border border-gray-400"
      />
      <button className="bg-red-600 px-6 py-3 rounded font-bold">Get Started</button>
    </div>
  );
};

export default EmailSignup;
