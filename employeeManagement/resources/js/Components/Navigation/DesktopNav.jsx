import NavLink from "@/Components/NavLink";

export default function DesktopNav() {
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink
                href={route("employees")}
                active={route().current("employees")}
            >
                Employees
            </NavLink>
        </div>
    );
}