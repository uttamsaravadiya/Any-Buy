import React, { useState } from 'react';

const AddProduct = () => {
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ photo, title, description, price });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl text-center font-bold mb-6">Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Photo:</label>
                        <input type="file" onChange={handlePhotoChange} className="mt-1 block w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title:</label>
                        <input type="text" value={title} onChange={handleTitleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea value={description} onChange={handleDescriptionChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price:</label>
                        <input type="number" value={price} onChange={handlePriceChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <button type="submit" className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;