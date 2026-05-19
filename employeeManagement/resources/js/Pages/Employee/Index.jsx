import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import EmployeeFilter from "@/Components/EmployeeFilter";
import EditEmployeeModal from "@/Components/EditEmployeeModal";
import DeleteEmployeeModal from "@/Components/DeleteEmployeeModal";
import { useState } from "react";

export default function Index({
    employees = [],
    departments = [],
    filters = {},
}) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const closeEditModal = () => {
        setEditModal(false);
        setSelectedEmployee(null);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setSelectedEmployee(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Employee Directory
                    </h2>
                    <Link
                        href={route("employees.create")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-150 ease-in-out"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Add Employee
                    </Link>
                </div>
            }
        >
            <Head title="Employees" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Single Unified Card */}
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md ring-1 ring-black ring-opacity-5">
                        {/* Filter Section */}
                        <div className="border-b border-gray-100 p-5">
                            <EmployeeFilter
                                departments={departments}
                                filters={filters}
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-left">
                                <thead className="bg-gray-50/70">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-500"
                                        >
                                            Employee Details
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-500"
                                        >
                                            Role & Dept
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-500"
                                        >
                                            Contact Details
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-500"
                                        >
                                            Status
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-500 text-right"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {employees.length > 0 ? (
                                        employees.map((employee) => (
                                            <tr
                                                key={employee.id}
                                                className="hover:bg-gray-50/50 transition duration-150"
                                            >
                                                {/* Profile Column - Increased cell padding to py-6 */}
                                                <td className="whitespace-nowrap px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        {/* Scaled avatar from h-10 to h-11 */}
                                                        <div className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm tracking-wide">
                                                            {employee.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <div className="text-base font-semibold text-gray-900 leading-none">
                                                                {employee.name}
                                                            </div>
                                                            <div className="text-xs font-medium text-gray-400">
                                                                ID: #
                                                                {employee.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role Column */}
                                                <td className="whitespace-nowrap px-8 py-6">
                                                    <div className="space-y-0.5">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee
                                                                .designation
                                                                ?.name || "N/A"}
                                                        </div>
                                                        <div className="text-xs font-medium text-gray-500">
                                                            {employee.department
                                                                ?.name || "N/A"}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact Details Column */}
                                                <td className="whitespace-nowrap px-8 py-6">
                                                    <div className="space-y-0.5">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee.email}
                                                        </div>
                                                        <div className="text-xs font-medium text-gray-500 tracking-wide">
                                                            {employee.phone ||
                                                                "N/A"}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status Badge Column */}
                                                <td className="whitespace-nowrap px-8 py-6">
                                                    <span
                                                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                                            employee.status ===
                                                            "active"
                                                                ? "bg-green-50 text-green-700 ring-green-600/20"
                                                                : "bg-gray-50 text-gray-600 ring-gray-500/10"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`mr-2 h-1.5 w-1.5 rounded-full ${employee.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                                                        ></span>
                                                        {employee.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            employee.status.slice(
                                                                1,
                                                            )}
                                                    </span>
                                                </td>

                                                {/* Action Buttons Column - Wider gap spacing */}
                                                <td className="whitespace-nowrap px-8 py-6 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-3.5">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEmployee(
                                                                    employee,
                                                                );
                                                                setEditModal(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEmployee(
                                                                    employee,
                                                                );
                                                                setDeleteModal(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-8 py-16 text-center text-sm font-medium text-gray-400"
                                            >
                                                No employee records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <EditEmployeeModal
                employee={selectedEmployee}
                departments={departments}
                isOpen={editModal}
                onClose={closeEditModal}
            />

            <DeleteEmployeeModal
                employee={selectedEmployee}
                isOpen={deleteModal}
                onClose={closeDeleteModal}
            />
        </AuthenticatedLayout>
    );
}
