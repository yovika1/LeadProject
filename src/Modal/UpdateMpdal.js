// Popup.js
import React from 'react';

export const UpdateModal = ({ isOpen, onClose, onUpdate, formData, onFormChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Edit Lead</h2>
                <form onSubmit={onUpdate}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onFormChange}
                        placeholder="Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={onFormChange}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={onFormChange}
                        placeholder="Phone"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <select
                        name="productId"
                        value={formData.productId}
                        onChange={onFormChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Product</option>
                    </select>
                   
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white p-2 rounded-md"
                        >
                            Update Lead
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 p-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

