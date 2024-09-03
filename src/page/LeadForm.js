import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/header/Header";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const LeadsFlow = () => {
  const [products, setProducts] = useState([]);
  const [lead, setLead] = useState({
    name: '',
    email: '',
    phone: '',
    productId: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://leads-project-7.onrender.com/product/getProduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); 
    setErrorMessage('');
    
    try {
      const response = await axios.post('https://leads-project-7.onrender.com/leads/create', lead);
      setSuccessMessage('Lead created successfully!'); 
      setLead({
        name: '',
        email: '',
        phone: '',
        productId: ''
      }); // Clear form after successful submission
      console.log(response)
    } catch (error) {
      setErrorMessage('Error creating lead. Please try again.'); 
      console.error('Error creating lead:', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen ">
   
       <div
        className="absolute inset-0 object-cover w-full h-full z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://www.leadsquared.com/wp-content/uploads/2023/07/Lead-Generation-Tools.png')" }}
      ></div>


      <div className="absolute inset-0  opacity-50 z-10"></div>

      <div className="relative z-20 w-full max-w-sm p-8 space-y-6 rounded-lg shadow-lg bg-slate-300 transition-opacity bg-opacity-75">
        <Header />
        <h2 className="text-3xl font-bold text-center text-teal-400">Leads Form</h2>

        {successMessage && (
          <div className="p-4 mb-4 text-green-700  rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-4 mb-4 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaUser className="text-teal-400" />
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Name"
              name="name"
              value={lead.name}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MdEmail className="text-teal-400" />
            </span>
            <input
              type="email"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Email"
              name="email"
              value={lead.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative mb-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaPhone className="text-teal-400" />
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Phone"
              name="phone"
              value={lead.phone}
              onChange={handleChange}
            />
          </div>

          <select
            name="productId"
            value={lead.productId}
            onChange={handleChange}
            required
            className="w-full py-2 pl-10 pr-4 mb-7 text-gray-400 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <a href="/leadlist" className="flex justify-end mb-4 font-semibold text-purple-600 -mx-1">
            View
          </a>

          <button className="w-full px-4 py-2 text-white bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400">
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};
