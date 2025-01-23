import { Link } from "react-router";

export default function Header() {
    return (
        <header className="text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-4">
                <Link to='/'><img className="h-8 w-auto" src="/Knox.svg" alt="Knox logo" /></Link>
                    
                </div>
                <nav className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}