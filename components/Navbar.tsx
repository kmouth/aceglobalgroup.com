export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-green-900">
          ACE GLOBAL GROUP
        </h1>

        <nav className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Products</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}