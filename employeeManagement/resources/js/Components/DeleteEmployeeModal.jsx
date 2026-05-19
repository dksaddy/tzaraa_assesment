import { router } from "@inertiajs/react";

export default function DeleteEmployeeModal({ employee, isOpen, onClose }) {
    if (!isOpen || !employee) return null;

    const handleDelete = () => {
        router.delete(route("employees.destroy", employee.id), {
            preserveScroll: true,

            onSuccess: () => {
                onClose();
            },

            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900">
                    Delete Employee
                </h2>

                <p className="mt-4 text-sm text-gray-600">
                    Are you sure you want to delete this employee?
                </p>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">
                        {employee.name}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                        {employee.department?.name} •{" "}
                        {employee.designation?.name}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl bg-gray-100 px-5 py-2.5 font-semibold text-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
