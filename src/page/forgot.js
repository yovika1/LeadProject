import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotUsername = () => {
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://leads-project-7.onrender.com/forgotuser', {
                UserName: username,
                Password: password,
            });

            if (response.status === 200) {
                setUserName(response.data.username); 
                setError('');
            } else {
                setUserName('');
                setError(response.data.message || 'User not found');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Forgot Username</h2>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
            </div>

            <div className="mb-6">
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 bg-black rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 transition duration-200"
            >
                Submit
            </button>
            <Link to="/login">
    
      <button className="bg-gray-200 mt-4 rounded-full text-gray-800 font-semibold py-2 px-4  hover:bg-gray-300 dark:bg-black dark:text-white dark:hover:bg-gray-600">
        Back to Login
      </button>
      </Link>
            {username && <p className="mt-4 text-gray-600">Your username is: {username}</p>}
            {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>
    </div>
);
};

export default ForgotUsername;