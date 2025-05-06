import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import logo from "../assets/Logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", form)
      .then((res) => {
        setUser(res.data);
        navigate("/hoje");
      })
      .catch(() => {
        alert("Login falhou!");
        setLoading(false);
      });
  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          disabled={loading}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          disabled={loading}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={loading}>
          {loading ? <ClipLoader color="#FFF" size={13} /> : "Entrar"}
        </button>
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
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