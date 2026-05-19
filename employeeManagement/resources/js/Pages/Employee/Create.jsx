import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Create({ departments = [] }) {
    const [designations, setDesignations] = useState([]);
    const [loadingDesignations, setLoadingDesignations] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        department_id: '',
        designation_id: '',
        status: 'active',
    });

    useEffect(() => {
        if (!data.department_id) {
            setDesignations([]);
            setData('designation_id', '');
            return;
        }

        setLoadingDesignations(true);
        
        fetch(route('departments.designations', data.department_id))
            .then((res) => res.json())
            .then((resData) => {
                setDesignations(resData);
                if (!resData.some(d => d.id === parseInt(data.designation_id))) {
                    setData('designation_id', '');
                }
            })
            .catch((err) => console.error('Error fetching designations:', err))
            .finally(() => setLoadingDesignations(false));
    }, [data.department_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Add New Employee
                    </h2>
                    {/* Restyled Clean Header Back Button */}
                    <Link
                        href={route('employees')}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-in-out"
                    >
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Cancel & Go Back
                    </Link>
                </div>
            }
        >
            <Head title="Add Employee" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    
                    <div className="overflow-hidden bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                            
                            {/* Section Heading */}
                            <div className="border-b border-gray-100 pb-4">
                                <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Provide the employee's contact records and employment profile attributes.</p>
                            </div>

                            {/* Row: Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className={`mt-1.5 block w-full rounded-lg border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                            </div>

                            {/* Row: Email & Phone Split */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john.doe@company.com"
                                        className={`mt-1.5 block w-full rounded-lg border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g. 01711000005"
                                        className={`mt-1.5 block w-full rounded-lg border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Section Heading */}
                            <div className="border-b border-gray-100 pb-4 pt-4">
                                <h3 className="text-base font-semibold text-gray-900">Work Assignment</h3>
                                <p className="mt-1 text-sm text-gray-500">Assign their active division branch parameters.</p>
                            </div>

                            {/* Row: Department & Designation Dropdowns */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="department_id" className="block text-sm font-medium text-gray-700">Department</label>
                                    <select
                                        id="department_id"
                                        value={data.department_id}
                                        onChange={(e) => setData('department_id', e.target.value)}
                                        className={`mt-1.5 block w-full rounded-lg border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm ${errors.department_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    >
                                        <option value="">Select a Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                                        ))}
                                    </select>
                                    {errors.department_id && <p className="mt-1.5 text-xs text-red-600">{errors.department_id}</p>}
                                </div>

                                <div>
                                    <label htmlFor="designation_id" className="block text-sm font-medium text-gray-700">
                                        Designation {loadingDesignations && <span className="text-xs text-indigo-500 animate-pulse">(Loading...)</span>}
                                    </label>
                                    <select
                                        id="designation_id"
                                        value={data.designation_id}
                                        onChange={(e) => setData('designation_id', e.target.value)}
                                        disabled={!data.department_id || loadingDesignations}
                                        className={`mt-1.5 block w-full rounded-lg border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 transition shadow-sm disabled:bg-gray-50 disabled:text-gray-400 ${errors.designation_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    >
                                        <option value="">
                                            {!data.department_id ? 'Choose Department First' : 'Select a Designation'}
                                        </option>
                                        {designations.map((desg) => (
                                            <option key={desg.id} value={desg.id}>{desg.name}</option>
                                        ))}
                                    </select>
                                    {errors.designation_id && <p className="mt-1.5 text-xs text-red-600">{errors.designation_id}</p>}
                                </div>
                            </div>

                            {/* Row: Status Radio */}
                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700">Employment Status</label>
                                <div className="mt-3 flex items-center gap-6">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="active"
                                            checked={data.status === 'active'}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ms-2 text-sm font-medium text-gray-900">Active</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="inactive"
                                            checked={data.status === 'inactive'}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ms-2 text-sm font-medium text-gray-900">Inactive</span>
                                    </label>
                                </div>
                                {errors.status && <p className="mt-1.5 text-xs text-red-600">{errors.status}</p>}
                            </div>

                            {/* Restyled Professional Form Action Footer */}
                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6 mt-4">
                                <Link
                                    href={route('employees')}
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-in-out"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Saving Record...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            Save Employee
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
