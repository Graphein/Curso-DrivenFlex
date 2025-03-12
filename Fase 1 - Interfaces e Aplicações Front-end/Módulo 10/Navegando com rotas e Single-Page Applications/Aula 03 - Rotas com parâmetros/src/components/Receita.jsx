import { useState, useEffect } from "react";
import { Link, useParams  } from "react-router-dom";
import axios from "axios";

export default function Receita() {
  const { id } = useParams();
  const [receita, setReceita] = useState({});

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/tastecamp/receitas/${id}`
    );

    requisicao.then((res) => {
      setReceita(res.data);
    });
  }, [id]);

  return (
    <>
      <div className="view">
        <div className="pagina receita">
          <div className="navbar">
            <div className="grupo">
              <Link to="/">
                <div className="botao fechar">
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </Link>
            </div>
          </div>

          <div className="titulo">{receita.titulo}</div>

          <div className="ingredientes">
            <div className="titulo">Ingredientes</div>
            <div className="destaque">{receita.ingredientes}</div>
          </div>

          <div className="modo-de-preparo">
            <div className="titulo">Modo de Preparo</div>
            <div className="destaque">{receita.preparo}</div>
          </div>
        </div>
      </div>
    </>
  );
}
