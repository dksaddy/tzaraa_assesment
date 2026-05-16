import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SimpleLayout from '@/Layouts/SimpleLayout';

export default function Index({ employees, departments, filters }) {
    // Keep track of search filter states in local memory
    const [search, setSearch] = useState(filters.search || '');
    const [deptId, setDeptId] = useState(filters.department_id || '');
    const [status, setStatus] = useState(filters.status || '');

    // Inertia form state explicitly allocated for handling inline bio corrections
    const { data, setData, patch } = useForm({ name: '', email: '', phone: '' });
    const [editingId, setEditingId] = useState(null);

    // This block automatically triggers a fast filter refresh whenever search values change
    useEffect(() => {
        router.get('/', 
            { search, department_id: deptId, status }, 
            { preserveState: true, replace: true }
        );
    }, [search, deptId, status]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this employee record?")) {
            router.delete(`/employee/delete/${id}`);
        }
    };

    const startInlineEdit = (emp) => {
        setEditingId(emp.id);
        setData({ name: emp.name, email: emp.email, phone: emp.phone });
    };

    const handleBioSubmit = (e, id) => {
        e.preventDefault();
        patch(`/employee/bio/${id}`, {
            onSuccess: () => setEditingId(null)
        });
    };

    return (
        <SimpleLayout header="Employee Directory">
            <Head title="Employees List" />
            
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                {/* Search & Actions Top Management Panel */}
                <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        <input 
                            type="text" 
                            placeholder="Search name, email, phone..." 
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            className="border border-gray-300 p-2 rounded text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        <select 
                            value={deptId} 
                            onChange={e => setDeptId(e.target.value)} 
                            className="border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">All Departments</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)} 
                            className="border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    {/* Plain string URL routing link used instead of Ziggy helpers */}
                    <Link href="/add" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded font-medium transition shadow-sm">
                        Add New Employee
                    </Link>
                </div>

                {/* Data Collection Grid Display */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border border-gray-200 rounded">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                                <th className="p-3">Employee Details</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Designation</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="p-3">
                                        {editingId === emp.id ? (
                                            <form onSubmit={(e) => handleBioSubmit(e, emp.id)} className="space-y-2 max-w-xs">
                                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                                                <div className="space-x-2">
                                                    <button type="submit" className="text-green-600 text-xs font-semibold hover:underline">Save</button>
                                                    <button type="button" onClick={() => setEditingId(null)} className="text-gray-500 text-xs hover:underline">Cancel</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="font-semibold text-gray-900">{emp.name}</div>
                                                <div className="text-xs text-gray-500">{emp.email} | {emp.phone}</div>
                                                <button onClick={() => startInlineEdit(emp)} className="text-blue-600 text-xs font-medium hover:underline mt-1 block">
                                                    Inline Edit Bio
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="p-3 text-gray-700 align-top">{emp.department?.name || 'N/A'}</td>
                                    <td className="p-3 text-gray-700 align-top">{emp.designation?.name || 'N/A'}</td>
                                    <td className="p-3 align-top">
                                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded uppercase ${emp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right space-x-3 align-top font-medium">
                                        {/* Plain text template literals manage variable mapping seamlessly */}
                                        <Link href={`/employee/edit/${emp.id}`} className="text-amber-600 hover:text-amber-700 hover:underline">
                                            Edit Full
                                        </Link>
                                        <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-700 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {employees.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-400 italic">
                                        No employee records matched your filter criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </SimpleLayout>
    );
}
