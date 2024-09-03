import React, { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';

export const CaptchaComponent = ({ onCaptchaChange }) => {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  // Generate CAPTCHA when the component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    onCaptchaChange(value === captcha);
  };

  // Handle CAPTCHA refresh
  const handleRefresh = () => {
    generateCaptcha();
    setUserInput('');
    onCaptchaChange(false); // Set CAPTCHA validity to false when refreshed
  };

  return (
    <div className="captcha-container">
      <div className="captcha-display flex items-center">
        <span className="font-mono text-xl bg-zinc-400">{captcha}</span>
        <button
          type="button"
          onClick={handleRefresh}
          className="ml-2 text-blue-500 flex items-center"
        >
          <MdRefresh className="w-5 h-5" />
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Enter the text shown"
        className="captcha-input mt-2 bg-neutral-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2 w-36"
      />
    </div>
  );
};
