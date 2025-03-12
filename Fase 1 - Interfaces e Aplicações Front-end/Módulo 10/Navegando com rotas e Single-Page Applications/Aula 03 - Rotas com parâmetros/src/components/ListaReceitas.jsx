import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    const requisicao = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp/receitas"
    );

    requisicao.then((res) => {
      setReceitas(res.data);
    });
  }, []);

  return (
    <ul className="receitas">
      {receitas.map((r) => (
        <li key={r.id}>
          <Link to={`/receita/${r.id}`}>
            <ion-icon name="fast-food-outline"></ion-icon>
            {r.titulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}
