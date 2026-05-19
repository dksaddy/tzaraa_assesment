import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditEmployeeModal({
    employee,
    departments,
    isOpen,
    onClose,
}) {
    const [designations, setDesignations] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department_id: "",
        designation_id: "",
        status: "active",
    });

    useEffect(() => {
        if (employee) {
            setForm({
                name: employee.name || "",
                email: employee.email || "",
                phone: employee.phone || "",
                department_id: employee.department_id || "",
                designation_id: employee.designation_id || "",
                status: employee.status || "active",
            });

            fetchDesignations(employee.department_id);
        }
    }, [employee]);

    const fetchDesignations = async (departmentId) => {
        if (!departmentId) {
            setDesignations([]);
            return;
        }

        try {
            const response = await axios.get(
                route("departments.designations", departmentId),
            );

            setDesignations(response.data);
        } catch (error) {
            console.error("Failed to fetch designations:", error);
        }
    };

    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;

        setForm((prev) => ({
            ...prev,
            department_id: departmentId,
            designation_id: "",
        }));

        fetchDesignations(departmentId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route("employees.update", employee.id), form, {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Edit Employee
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    />

                    <select
                        value={form.department_id}
                        onChange={handleDepartmentChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    >
                        <option value="">Select Department</option>

                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.designation_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                designation_id: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    >
                        <option value="">Select Designation</option>

                        {designations.map((designation) => (
                            <option key={designation.id} value={designation.id}>
                                {designation.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={form.status}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-gray-100 px-5 py-2.5 font-semibold text-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white"
                        >
                            Update Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
