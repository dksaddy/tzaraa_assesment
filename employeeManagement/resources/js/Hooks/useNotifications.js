import { useEffect, useState } from "react";

export default function useNotifications(auth) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(auth.notifications || []);
    }, [auth.notifications]);

    useEffect(() => {
        if (!auth.user || !window.Echo) return;

        const channelName = `App.Models.User.${auth.user.id}`;

        window.Echo.private(channelName)
            .notification((notification) => {
                const normalizedNotification = {
                    id: notification.id,
                    data: notification.data ?? {
                        message: notification.message,
                    },
                    created_at:
                        notification.created_at ??
                        new Date().toISOString(),
                    read_at:
                        notification.read_at ?? null,
                };

                setNotifications((prev) => {
                    const exists = prev.some(
                        (n) =>
                            n.id ===
                            normalizedNotification.id
                    );

                    if (exists) return prev;

                    return [
                        normalizedNotification,
                        ...prev,
                    ];
                });
            });

        return () => {
            window.Echo.leave(channelName);
        };
    }, [auth.user]);

    return {
        notifications,
        setNotifications,
    };
}