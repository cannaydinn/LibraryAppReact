import { Routes, Route } from "react-router-dom";
import Header from "./Components/HeaderSeciton/header";
import Welcome from "./Components/WelcomeSection/welcome";
import Publisher from "./Components/PublisherSection/publisher";
import Category from "./Components/CategorySection/category";
import Book from "./Components/BookSection/book";
import Author from "./Components/AuthorSection/author";
import BuyingBooks from "./Components/BuyingBooksSection/buyingBooks";
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/publisher" element={<Publisher />} />
        <Route path="/category" element={<Category />} />
        <Route path="/book" element={<Book />} />
        <Route path="/author" element={<Author />} />
        <Route path="/buyingBook" element={<BuyingBooks />} />
      </Routes>
    </div>
  );
}

export default App;