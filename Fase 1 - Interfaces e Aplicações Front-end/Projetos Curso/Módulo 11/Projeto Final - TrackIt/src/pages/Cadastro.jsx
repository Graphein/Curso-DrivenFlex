import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; 
import logo from "../assets/Logo.png";

export default function Cadastro() {
  const [form, setForm] = useState({ email: "", name: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form)
      .then(() => navigate("/"))
      .catch(() => {
        alert("Erro no cadastro");
        setLoading(false);
      });
  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={handleSubmit}>
        <input placeholder="email" disabled={loading} value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="senha" type="password" disabled={loading} value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input placeholder="nome" disabled={loading} value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="foto" disabled={loading} value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button disabled={loading}>
          {loading ? <ClipLoader color="#FFF" size={13} /> : "Cadastrar"}
        </button>
      </form>
      <Link to="/">Já tem uma conta? Faça login!</Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 30px;
  input {
    width: 100%;
    margin-bottom: 6px;
    padding: 10px;
  }
  button {
    width: 100%;
    background-color: #52B6FF;
    color: white;
    border: none;
    padding: 10px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 180px;
    margin-bottom: 30px;
  }
`;