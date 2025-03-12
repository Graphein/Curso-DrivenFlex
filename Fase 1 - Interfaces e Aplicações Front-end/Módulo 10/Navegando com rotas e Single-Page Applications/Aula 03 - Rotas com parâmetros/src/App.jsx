import { BrowserRouter, Routes, Route } from "react-router-dom";

import Receita from "./components/Receita";
import Receitas from "./components/Receitas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Receitas />} />
        <Route path="/receita/:id" element={<Receita />} />
      </Routes>
    </BrowserRouter>
  );
}
