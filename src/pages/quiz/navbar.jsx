// pindahin ke quiz nanti jangan lupa

function Navbar() {
  return (
    <div className="container bg-purple-800 text-white">
      <nav className="flex justify-between mx-auto w-10/12 py-4 ">
        <h3 className="font-bold">BelajarQ</h3>
        <div className="link-group space-x-4">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
