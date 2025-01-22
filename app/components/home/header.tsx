export default function Header() {
    return (
        <header className="text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-4">
                    <img className="h-8 w-auto" src="/Knox.svg" alt="Knox logo" />
                </div>
                <nav className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <a
                                href="/dashboard"
                                className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="/login"
                                className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                Login
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}