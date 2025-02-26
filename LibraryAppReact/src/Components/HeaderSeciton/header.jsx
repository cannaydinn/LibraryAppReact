import "./header.css";
import { Link } from "react-router-dom";

const pages = [
  { name: "Publisher", link: "/publisher" },
  { name: "Category", link: "/category" },
  { name: "Book", link: "/book" },
  { name: "Author", link: "/author" },
  { name: "Buying Books", link: "/buyingBook" },
];

function Header() {
  return (
    <header
      className="w-full h-[100px] bg-gray-500 flex items-center justify-center"
      id="header"
    >
      <nav className="navbar flex justify-between items-center w-full max-w-6xl px-4">
        <ul className="navbar-nav flex">
          <li className="nav-item">
            <a className="nav-link text-white text-lg font-bold" href="/">
              LIBRARY APP
            </a>
          </li>
        </ul>
        <ul className="navbar-nav flex gap-4">
          {pages.map((page) => (
            <li key={page.link} className="nav-item">
              <Link className="text-white text-lg" to={page.link}>
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;