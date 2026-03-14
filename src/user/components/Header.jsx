import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/serverURL";


function Header({ variant = "solid" }) {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
    console.log(userDetails)

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userDetails");

        setUserData(null);

        navigate("/login");
    }


    useEffect(() => {
        setUserData(userDetails)
    }, [])

    const getProfileImageUrl = (profile) => {
        if (profile && profile.startsWith("http")) {
            return profile;
        }
        if (profile) {
            return `${serverURL}/uploads/${profile}`;
        }
        return "/images/profilepic.jpg"; // Default fallback
    };

    return (
        <header
            className={`z-50 ${variant === "dark"
                ? "absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl"
                : "relative w-full"
                }`}
        >

            <Navbar
                fluid
                className={`px-6 py-3 ${variant === "dark"
                        ? "rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                        : "bg-slate-900 text-white shadow-md"
                    }`}
            >

                <NavbarBrand as={Link} to="/">
                    <span className="text-white text-lg font-semibold tracking-wide">
                        DevConnect
                    </span>
                </NavbarBrand>

                <div className="flex md:order-2 items-center gap-3">

                    {userData ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            placement="bottom-end"
                            label={
                                <Avatar
                                    alt="User settings"
                                    img={getProfileImageUrl(userData.profile)}
                                    rounded
                                    className="ring-2 ring-white/20 hover:ring-white/40 transition"
                                />
                            }
                            className="bg-transparent! border-none! shadow-none!"
                        >
                            <div className="min-w-[220px] rounded-xl 
                  bg-slate-800 
                  border border-slate-700
                  shadow-xl
                  overflow-hidden">

                                <DropdownHeader className="text-white! border-b border-slate-700">
                                    <span className="block text-sm font-medium">
                                        {userData.username}
                                    </span>
                                    <span className="block truncate text-xs text-gray-400">
                                        {userData.email}
                                    </span>
                                </DropdownHeader>

                                <Link
                                    to={
                                        userData.role === "company"
                                            ? "/company-profile"
                                            : "/user-profile"
                                    }
                                >
                                    <DropdownItem className="text-white! hover:bg-slate-700! transition">
                                        Dashboard
                                    </DropdownItem>
                                </Link>

                                <DropdownDivider className="bg-slate-700!" />

                                <DropdownItem
                                    onClick={handleLogout}
                                    className="text-white! hover:bg-slate-700! transition"
                                >
                                    Sign out
                                </DropdownItem>
                            </div>
                        </Dropdown>


                    ) : (
                        <Link to={"/login"}>
                            <Button
                                className="rounded-full bg-white text-black hover:bg-gray-200 px-5 py-1.5 text-sm"
                            >
                                <HiUserCircle className="me-2 h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    )}

                    <NavbarToggle className="text-white" />
                </div>

                <NavbarCollapse className="text-white">
                    <Link to="/" className="hover:text-white/80 transition">
                        Home
                    </Link>
                    <Link to="/allprojects" className="hover:text-white/80 transition">
                        Posts
                    </Link>
                    <Link to="/careers" className="hover:text-white/80 transition">
                        Careers
                    </Link>
                    <Link to="/contact" className="hover:text-white/80 transition">
                        Contact
                    </Link>
                </NavbarCollapse>
            </Navbar>
        </header>
    );

}

export default Header
