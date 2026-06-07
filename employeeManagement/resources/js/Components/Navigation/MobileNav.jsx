import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function MobileNav({ open, user }) {
    return (
        <div className={(open ? "block" : "hidden") + " sm:hidden"}>
            <div className="space-y-1 pb-3 pt-2">
                <ResponsiveNavLink
                    href={route("employees")}
                    active={route().current("employees")}
                >
                    Employees
                </ResponsiveNavLink>
            </div>

            <div className="border-t border-gray-200 pb-1 pt-4">
                <div className="px-4">
                    <div className="text-base font-medium text-gray-800">
                        {user.name}
                    </div>

                    <div className="text-sm font-medium text-gray-500">
                        {user.email}
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route("profile.edit")}>
                        Profile
                    </ResponsiveNavLink>

                    <ResponsiveNavLink
                        method="post"
                        href={route("logout")}
                        as="button"
                    >
                        Logout
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
    );
}