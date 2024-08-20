import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Trello from "./trello/Trello";
import Board from "./trello/Board";
import CardDetails from "./trello/CardDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trello" element={<Trello />} />
        <Route path="/trello/:boardId" element={<Board />} />
        <Route path="/trello/:boardId/:cardId" element={<CardDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
