import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Event Management Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-50 text-gray-800 h-full flex flex-col">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white shadow-lg border-b">
          <nav className="mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <div className="text-3xl font-extrabold text-blue-600 hover:text-blue-500 transition duration-300 ease-in-out">
              <a href="/">Event Management Dashboard</a>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                Home
              </a>
              <a
                href="/blogs/blog1"
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                Contact
              </a>
              <a
                href="/ongoing"
                className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out"
              >
                Currently Ongoing
              </a>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-2xl text-gray-700 hover:text-blue-500 focus:outline-none">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full mx-auto py-5 pb-8">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} My Next.js App. All rights reserved.
            </p>
            <div className="mt-4 space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-500 transition duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-500 transition duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
