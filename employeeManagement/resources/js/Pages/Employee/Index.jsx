import React, { useState, useEffect } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import SimpleLayout from "@/Layouts/SimpleLayout";
import EditEmployeeModal from "@/Components/EditEmployeeModal"; 

export default function Index({ employees, departments, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [deptId, setDeptId] = useState(filters.department_id || "");
    const [status, setStatus] = useState(filters.status || "");

    const { data: bioData, setData: setBioData, patch: patchBio } = useForm({ name: "", email: "", phone: "" });
    const [editingBioId, setEditingBioId] = useState(null);

    // Modal Control States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDesignations, setModalDesignations] = useState([]);

    // Form instance bound directly to modal props
    const {
        data: editData,
        setData: setEditData,
        put: putUpdate,
        errors: editErrors,
        processing: editProcessing,
        reset: resetEditForm,
    } = useForm({
        id: "", name: "", email: "", phone: "", department_id: "", designation_id: "", status: "active",
    });

    useEffect(() => {
        if (search !== (filters.search || "") || deptId !== (filters.department_id || "") || status !== (filters.status || "")) {
            router.get("/", { search, department_id: deptId, status }, { preserveState: true, replace: true });
        }
    }, [search, deptId, status]);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this employee record?")) {
            router.delete(`/employee/delete/${id}`);
        }
    };

    const startInlineEdit = (emp) => {
        setEditingBioId(emp.id);
        setBioData({ name: emp.name, email: emp.email, phone: emp.phone });
    };

    const handleBioSubmit = (e, id) => {
        e.preventDefault();
        patchBio(`/employee/bio/${id}`, { onSuccess: () => setEditingBioId(null) });
    };

    // Open Modal Safely
    const openEditModal = (emp) => {
        const targetDeptId = emp.department_id || (emp.department ? emp.department.id : null);

        setEditData({
            id: emp.id || "",
            name: emp.name || "",
            email: emp.email || "",
            phone: emp.phone || "",
            department_id: targetDeptId || "",
            designation_id: emp.designation_id || "",
            status: emp.status || "active",
        });

        if (targetDeptId && targetDeptId !== "undefined") {
            fetch(`/get-designations/${targetDeptId}`)
                .then((res) => res.json())
                .then((data) => {
                    setModalDesignations(data);
                    setIsModalOpen(true);
                })
                .catch(() => {
                    setModalDesignations([]);
                    setIsModalOpen(true);
                });
        } else {
            setModalDesignations([]);
            setIsModalOpen(true);
        }
    };

    const handleModalDepartmentChange = (e) => {
        const selectedDeptId = e.target.value;
        setEditData((prev) => ({ ...prev, department_id: selectedDeptId, designation_id: "" }));
        setModalDesignations([]);

        if (selectedDeptId) {
            fetch(`/get-designations/${selectedDeptId}`)
                .then((res) => res.json())
                .then((data) => setModalDesignations(data));
        }
    };

    const handleFullEditSubmit = (e) => {
        e.preventDefault();
        putUpdate(`/employee/update/${editData.id}`, {
            onSuccess: () => {
                setIsModalOpen(false);
                resetEditForm();
            },
        });
    };

    return (
        <SimpleLayout header="Employee Directory">
            <Head title="Employees List" />

            <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                {/* Search Panel */}
                <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        <input type="text" placeholder="Search name..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 p-2 rounded text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        <select value={deptId} onChange={(e) => setDeptId(e.target.value)} className="border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">All Departments</option>
                            {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                        </select>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 p-2 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <Link href="/add" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded font-medium transition shadow-sm">Add New Employee</Link>
                </div>

                {/* Table Data View */}
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
                            {employees.map((emp) => (
                                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="p-3">
                                        {editingBioId === emp.id ? (
                                            <form onSubmit={(e) => handleBioSubmit(e, emp.id)} className="space-y-2 max-w-xs">
                                                <input type="text" value={bioData.name} onChange={e => setBioData('name', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded" required />
                                                <input type="email" value={bioData.email} onChange={e => setBioData('email', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded" required />
                                                <input type="text" value={bioData.phone} onChange={e => setBioData('phone', e.target.value)} className="border border-gray-300 p-1 text-xs w-full rounded" required />
                                                <div className="space-x-2">
                                                    <button type="submit" className="text-green-600 text-xs font-semibold hover:underline">Save</button>
                                                    <button type="button" onClick={() => setEditingBioId(null)} className="text-gray-500 text-xs hover:underline">Cancel</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="font-semibold text-gray-900">{emp.name}</div>
                                                <div className="text-xs text-gray-500">{emp.email} | {emp.phone}</div>
                                                <button onClick={() => startInlineEdit(emp)} className="text-blue-600 text-xs font-medium hover:underline mt-1 block cursor-pointer">Inline Edit Bio</button>
                                            </>
                                        )}
                                    </td>
                                    <td className="p-3 text-gray-700 align-top">{emp.department?.name || "N/A"}</td>
                                    <td className="p-3 text-gray-700 align-top">{emp.designation?.name || "N/A"}</td>
                                    <td className="p-3 align-top">
                                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded uppercase ${emp.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{emp.status}</span>
                                    </td>
                                    <td className="p-3 text-right space-x-3 align-top font-medium">
                                        <button type="button" onClick={() => openEditModal(emp)} className="text-amber-600 hover:text-amber-700 hover:underline cursor-pointer">Edit Full</button>
                                        <button type="button" onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-700 hover:underline cursor-pointer">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ⚠️ Render the custom Modal Component and feed it the explicit props list */}
            <EditEmployeeModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFullEditSubmit}
                data={editData}
                setData={setEditData}
                errors={editErrors}
                processing={editProcessing}
                departments={departments}
                designations={modalDesignations}
                onDepartmentChange={handleModalDepartmentChange}
            />
        </SimpleLayout>
    );
}
