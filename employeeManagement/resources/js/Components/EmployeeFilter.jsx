import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EmployeeFilter({
    departments = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [departmentId, setDepartmentId] = useState(
        filters.department_id || "",
    );
    const [status, setStatus] = useState(filters.status || "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("employees"),
                {
                    search,
                    department_id: departmentId,
                    status,
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, departmentId, status]);

    const clearFilters = () => {
        setSearch("");
        setDepartmentId("");
        setStatus("");
    };

    const hasFilters = search || departmentId || status;

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                
                {/* Search */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Search
                    </label>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Name, email or phone..."
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Department
                    </label>

                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Departments</option>

                        {departments.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Clear */}
                {hasFilters && (
                    <div>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="w-full rounded-xl bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}