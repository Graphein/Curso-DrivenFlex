import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Habitos from "./pages/Habitos";
import Hoje from "./pages/Hoje";
import Historico from "./pages/Historico";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/habitos" element={user ? <Habitos /> : <Navigate to="/" />} />
      <Route path="/hoje" element={user ? <Hoje /> : <Navigate to="/" />} />
      <Route path="/historico" element={user ? <Historico /> : <Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
