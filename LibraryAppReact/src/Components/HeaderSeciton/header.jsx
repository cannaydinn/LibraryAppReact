
import "./header.css";

function Header() {
  return (
    <>
      <header
        className="w-full h-[100px] bg-gray-500 flex items-center justify-center"
        id="header"
      >
        <nav className="navbar flex justify-between items-center w-full max-w-6xl px-4">
          <ul className="navbar-nav flex">
            <li className="nav-item">
              <a
                className="nav-link text-white text-lg font-bold "
                href="/"
              >
                LIBRARY APP
              </a>
            </li>
          </ul>
          <ul className="navbar-nav flex gap-4">
            <li className="nav-item">
              <a className="nav-link text-white" href="/publisher">
                Publisher
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/category">
                Category
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/book">
                Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/author">
                Author
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/buyingBook">
                Buying Books
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
