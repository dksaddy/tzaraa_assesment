import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import SimpleLayout from '@/Layouts/SimpleLayout';

export default function Add({ departments }) {
    // Local state stores designations for the dependent dropdown list
    const [designations, setDesignations] = useState([]);
    
    // Inertia form hook handles request tracking, processing states, and validation anomalies
    const { data, setData, post, errors, processing } = useForm({
        name: '', 
        email: '', 
        phone: '', 
        department_id: '', 
        designation_id: '', 
        status: 'active'
    });

    // Fires automatically when a department is selected to populate matching designations
    const handleDepartmentChange = (e) => {
        const deptId = e.target.value;
        
        // Reset selections to clear old state references
        setData(prev => ({ ...prev, department_id: deptId, designation_id: '' }));
        setDesignations([]);

        if (deptId) {
            fetch(`/get-designations/${deptId}`)
                .then(res => res.json())
                .then(data => setDesignations(data))
                .catch(err => console.error("Error fetching designations:", err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit parameters straight to the post handler endpoint URL string
        post('/add');
    };

    return (
        <SimpleLayout header="Add New Employee">
            <Head title="Create Employee" />
            
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1 font-medium">{errors.name}</div>}
                    </div>

                    {/* Email Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            value={data.email} 
                            onChange={e => setData('email', e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1 font-medium">{errors.email}</div>}
                    </div>

                    {/* Phone Input Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                            type="text" 
                            value={data.phone} 
                            onChange={e => setData('phone', e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        {errors.phone && <div className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</div>}
                    </div>

                    {/* Department Dropdown Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <select 
                            value={data.department_id} 
                            onChange={handleDepartmentChange} 
                            className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        {errors.department_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.department_id}</div>}
                    </div>

                    {/* Dependent Designation Dropdown Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <select 
                            value={data.designation_id} 
                            onChange={e => setData('designation_id', e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                            disabled={!data.department_id}
                        >
                            <option value="">Select Designation</option>
                            {designations.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        {errors.designation_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.designation_id}</div>}
                    </div>

                    {/* Status Select Options Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select 
                            value={data.status} 
                            onChange={e => setData('status', e.target.value)} 
                            className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-xs mt-1 font-medium">{errors.status}</div>}
                    </div>

                    {/* Form Controls Row Panel */}
                    <div className="flex justify-end gap-2 pt-2 mt-6">
                        <Link 
                            href="/" 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded font-medium transition"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded font-medium transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </SimpleLayout>
    );
}
