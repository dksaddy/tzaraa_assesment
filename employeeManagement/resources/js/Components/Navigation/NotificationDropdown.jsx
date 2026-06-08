import Dropdown from "@/Components/Dropdown";
import NotificationItem from "../Notifications/NotificationItem";
import { FiBell } from "react-icons/fi";

export default function NotificationDropdown({
    notifications,
    onNotificationClick,
    markAllRead,
}) {
    const unreadCount = notifications.filter((n) => n.read_at === null).length;

    return (
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center relative rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            <FiBell className="w-6 h-6" />

                            {unreadCount > 0 && <span>{unreadCount}</span>}
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content contentClasses="py-1 bg-white w-80 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center px-4 py-2 border-b">
                        <span className="text-xs font-semibold">
                            Notifications
                        </span>

                        <button
                            onClick={markAllRead}
                            className="text-xs text-blue-500"
                        >
                            Mark all as read
                        </button>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="px-4 py-3 text-center text-sm text-gray-500">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onClick={onNotificationClick}
                            />
                        ))
                    )}
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
