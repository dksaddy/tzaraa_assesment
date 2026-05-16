import React from 'react';

export default function EditEmployeeModal({
    isOpen,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    processing,
    departments,
    designations,
    onDepartmentChange
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-100">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Modify Employee Details</h3>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">&times;</button>
                </div>
                
                {/* Modal Form Layout */}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Full Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.name && <div className="text-red-500 text-xs mt-1 font-medium">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.email && <div className="text-red-500 text-xs mt-1 font-medium">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Phone Number</label>
                        <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {errors.phone && <div className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Department</label>
                        <select value={data.department_id} onChange={onDepartmentChange} className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        {errors.department_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.department_id}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Designation</label>
                        <select value={data.designation_id} onChange={e => setData('designation_id', e.target.value)} className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500" disabled={designations.length === 0}>
                            <option value="">Select Designation</option>
                            {designations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        {errors.designation_id && <div className="text-red-500 text-xs mt-1 font-medium">{errors.designation_id}</div>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Status</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-xs mt-1 font-medium">{errors.status}</div>}
                    </div>

                    {/* Action Controls */}
                    <div className="flex justify-end gap-2 pt-2 border-t mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded font-medium transition cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-4 py-2 rounded font-medium transition shadow-sm disabled:opacity-50 cursor-pointer">
                            {processing ? "Updating..." : "Update Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
