import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdateModal } from '../Modal/UpdateMpdal';
import { DeleteModal } from '../Modal/DeleteModal';
export const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [products, setProducts] = useState([]);

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
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);

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
            await axios.put(`https://leads-project-7.onrender.com/leads/update/${editingLead._id}`, editForm);
            setEditingLead(null);
            setEditForm({
                name: '',
                email: '',
                phone: '',
                productId: '',
            });
            fetchLeads();  
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://leads-project-7.onrender.com/leads/delete/${id}`);
            setLeads(leads.filter(lead => lead._id !== id));
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    useEffect(() => {
        // Fetch products from the backend API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://leads-project-7.onrender.com/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    const openDeleteModal = (id) => {
        setLeadToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setLeadToDelete(null);
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-black via-teal-600 text-sky-300">
            <div className="mb-6 p-4 bg-transparent rounded-lg shadow-md">
                <input
                    type="text"
                    name="name"
                    placeholder="Search by Name"
                    onChange={handleFilterChange}
                    value={filters.name}
                    className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Search by Email"
                    onChange={handleFilterChange}
                    value={filters.email}
                    className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                             <select
                    name="productId"
                    onChange={handleFilterChange}
                    value={filters.productId}
                    className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="">All Products</option>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>
                            {product.name}
                        </option>
                    ))}
                </select>


                <select
                    name="sortBy"
                    onChange={handleFilterChange}
                    value={filters.sortBy}
                    className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </select>
                
                <select
                name = "order"
                onChange={handleFilterChange}
                value={filters.order}
                className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
                <option value="name:asc">Sort by Name (Ascending)</option>
                <option value="name:desc">Sort by Name (Descending)</option>
                <option value="email:asc">Sort by Email (Ascending)</option>
                <option value="email:desc">Sort by Email (Descending)</option>
            </select> 

            </div>

            {editingLead && (
                <UpdateModal
                    isOpen={!!editingLead}
                    onClose={() => setEditingLead(null)}
                    onUpdate={handleUpdate}
                    formData={editForm}
                    onFormChange={handleEditFormChange}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={() => {
                        if (leadToDelete) handleDelete(leadToDelete);
                        closeDeleteModal();
                    }}
                />
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-black border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-gray-200 text-black">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Product</th>
                            <th className="px-4 py-2 text-left">Update</th>
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
                                    {lead.product?.name || 'N/A'}
                                </td>
                               
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleEdit(lead)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    </td>

                                    <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => openDeleteModal(lead._id)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        Delete
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
