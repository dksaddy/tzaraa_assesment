import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import useNotifications from "@/Hooks/useNotifications";

import DesktopNav from "@/Components/Navigation/DesktopNav";
import MobileNav from "@/Components/Navigation/MobileNav";
import UserDropdown from "@/Components/Navigation/UserDropdown";
import MobileMenuButton from "@/Components/Navigation/MobileMenuButton";
import NotificationDropdown from "@/Components/Navigation/NotificationDropdown";

export default function AuthenticatedLayout({
    header,
    children,
}) {
    const { auth } = usePage().props;

    const {
        notifications,
        setNotifications,
    } = useNotifications(auth);

    const [
        showingNavigationDropdown,
        setShowingNavigationDropdown,
    ] = useState(false);

    const handleNotificationClick = (id) => {
        console.log("Clicked:", id);

        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id
                    ? { ...n, read_at: new Date() }
                    : n
            )
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <DesktopNav />
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <NotificationDropdown
                                notifications={notifications}
                                onNotificationClick={
                                    handleNotificationClick
                                }
                            />

                            <UserDropdown
                                user={auth.user}
                            />
                        </div>

                        <MobileMenuButton
                            open={
                                showingNavigationDropdown
                            }
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    !showingNavigationDropdown
                                )
                            }
                        />
                    </div>
                </div>

                <MobileNav
                    open={
                        showingNavigationDropdown
                    }
                    user={auth.user}
                />
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}