import { useEffect, useState } from "react";

export default function useNotifications(auth) {
    const [notifications, setNotifications] = useState(
        auth.unread_notifications || []
    );

    useEffect(() => {
        if (!auth.user || !window.Echo) return;

        window.Echo.private(`App.Models.User.${auth.user.id}`)
            .notification((notification) => {
                const normalizedNotification = {
                    id: notification.id,
                    data: notification.data || {
                        message: notification.message,
                    },
                    created_at:
                        notification.created_at ||
                        new Date().toISOString(),
                    read_at: null,
                };

                setNotifications((prev) => [
                    normalizedNotification,
                    ...prev,
                ]);
            });

        return () => {
            window.Echo?.leave(
                `App.Models.User.${auth.user.id}`
            );
        };
    }, [auth.user]);

    return {
        notifications,
        setNotifications,
    };
}