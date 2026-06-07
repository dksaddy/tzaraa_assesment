import { FiMenu, FiX } from "react-icons/fi";

export default function MobileMenuButton({
    open,
    onClick,
}) {
    return (
        <div className="-me-2 flex items-center sm:hidden">
            <button
                onClick={onClick}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
                {open ? (
                    <FiX className="w-6 h-6" />
                ) : (
                    <FiMenu className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}