// DeletePopup.js
import React from 'react';

export const DeleteModal = ({ isOpen, onClose, onDelete, id }) => {
    if (!isOpen) return null;

    const handleDelete = () => {
        onDelete(id);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-4">Are you sure you want to delete this lead?</p>
                <div className="flex justify-between">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white p-2 rounded-md"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

