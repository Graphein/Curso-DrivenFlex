import { useState } from "react";

export default function Post({ user, img, likes, totalLikes }) {
  const [curtido, setCurtido] = useState(false);
  const [curtidas, setCurtidas] = useState(Number(totalLikes));
  const [salvo, setSalvo] = useState(false);

  function toggleCurtida() {
    if (curtido) {
      setCurtido(false);
      setCurtidas(curtidas - 1);
    } else {
      setCurtido(true);
      setCurtidas(curtidas + 1);
    }
  }

  function toggleSalvo() {
    setSalvo(!salvo);
  }

  function toggleCurtidaPost() {
    if (!curtido) { 
      setCurtido(true);
      setCurtidas(curtidas + 1);
    }
  }

  return (
    <div className="post">
      <div className="topo">
        <div className="usuario">
          <img src={`assets/img/${user}.svg`} alt={user} />
          {user}
        </div>
        <div className="acoes">
          <ion-icon name="ellipsis-horizontal"></ion-icon>
        </div>
      </div>

      <div className="conteudo" onClick={toggleCurtidaPost}>
        <img src={img} alt="Post" />
      </div>

      <div className="fundo">
        <div className="acoes">
          <ion-icon 
            name={curtido ? "heart" : "heart-outline"} 
            className={curtido ? "curtido" : ""}
            onClick={toggleCurtida}
          ></ion-icon>
          <ion-icon name="chatbubble-outline"></ion-icon>
          <ion-icon name="paper-plane-outline"></ion-icon>
          <ion-icon 
            name={salvo ? "bookmark" : "bookmark-outline"} 
            className={salvo ? "salvo" : ""}
            onClick={toggleSalvo}
          ></ion-icon>
        </div>

        <div className="curtidas">
          <strong>{likes}</strong> <span className="espaco"></span> <strong>outras {curtidas.toLocaleString()} pessoas</strong>
        </div>
      </div>
    </div>
  );
}
