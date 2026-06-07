import Dropdown from "@/Components/Dropdown";
import { FiChevronDown } from "react-icons/fi";

export default function UserDropdown({ user }) {
    return (
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            {user.name}

                            <FiChevronDown className="ml-2 h-4 w-4" />
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
                        Profile
                    </Dropdown.Link>

                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Logout
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}