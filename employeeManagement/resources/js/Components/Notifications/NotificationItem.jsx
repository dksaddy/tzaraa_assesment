export default function NotificationItem({
    notification,
    onClick,
}) {
    return (
        <div
            onClick={() => onClick(notification.id)}
            className={`px-4 py-3 text-sm border-b border-gray-500/10 hover:bg-gray-50 cursor-pointer transition ${
                notification.read_at === null
                    ? "bg-yellow-50"
                    : "bg-white"
            }`}
        >
            <p
                className={
                    notification.read_at === null
                        ? "font-bold text-gray-800"
                        : "font-medium text-gray-800"
                }
            >
                {notification.data.message}
            </p>

            <span className="block mt-1 text-[10px] text-gray-400">
                {new Date(
                    notification.created_at
                ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </span>
        </div>
    );
}