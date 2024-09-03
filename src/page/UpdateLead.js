import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        productId: '',
        sortBy: '',
        order: ''
    });
    const [editingLead, setEditingLead] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        productId: '',
        createdDate: ''
    });

    useEffect(() => {
        fetchLeads();
    }, [filters]);

    const fetchLeads = async () => {
        try {
            const response = await axios.get('https://leads-project-7.onrender.com/leads/search', { params: filters });
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://leads-project-7.onrender.com/leads/${id}`);
            setLeads(leads.filter(lead => lead._id !== id));
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const handleEdit = (lead) => {
        setEditingLead(lead);
        setEditForm({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            productId: lead.productId?._id || '',
            createdDate: lead.createdDate
        });
    };

    const handleEditFormChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://leads-project-7.onrender.com/leads/${editingLead._id}`, editForm);
            setEditingLead(null);
            setEditForm({
                name: '',
                email: '',
                phone: '',
                productId: '',
                createdDate: ''
            });
            fetchLeads();  // Refresh the leads list
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <input
                    type="text"
                    name="name"
                    placeholder="Search by Name"
                    onChange={handleFilterChange}
                    value={filters.name}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Search by Email"
                    onChange={handleFilterChange}
                    value={filters.email}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <select
                    name="productId"
                    onChange={handleFilterChange}
                    value={filters.productId}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="">All Products</option>
                </select>
                <select
                    name="sortBy"
                    onChange={handleFilterChange}
                    value={filters.sortBy}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="createdDate">Created Date</option>
                </select>
                <select
                    name="order"
                    onChange={handleFilterChange}
                    value={filters.order}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {editingLead && (
                <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Edit Lead</h2>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditFormChange}
                            placeholder="Name"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditFormChange}
                            placeholder="Email"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleEditFormChange}
                            placeholder="Phone"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <select
                            name="productId"
                            value={editForm.productId}
                            onChange={handleEditFormChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Product</option>
                            {/* Add product options here */}
                        </select>
                        <input
                            type="date"
                            name="createdDate"
                            value={editForm.createdDate.split('T')[0]}  // Adjust for date format
                            onChange={handleEditFormChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="bg-teal-500 text-white p-2 rounded-md">
                            Update Lead
                        </button>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-left">Created Date</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map(lead => (
                            <tr key={lead._id}>
                                <td className="px-4 py-2 border-b">{lead.name}</td>
                                <td className="px-4 py-2 border-b">{lead.email}</td>
                                <td className="px-4 py-2 border-b">{lead.phone}</td>
                                <td className="px-4 py-2 border-b">
                                    {lead.productId?.name || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border-b">{new Date(lead.createdDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleEdit(lead)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

