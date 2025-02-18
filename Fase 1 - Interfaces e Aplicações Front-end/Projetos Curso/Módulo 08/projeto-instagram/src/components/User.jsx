import React, { useState } from "react";

export default function User() {
  const user = {
    username: "catanacomics",
    image: "assets/img/catanacomics.svg",
  };

  const [nome, setNome] = useState(user.username);
  const [avatar, setAvatar] = useState(user.image);

  function mudarNome() {
    const novoNome = prompt("Qual nome deseja?");
    if (novoNome && novoNome.trim() !== "") {
      setNome(novoNome);
    }
  }

  function mudarAvatar() {
    const novaImagem = prompt("Cole o link da nova imagem:");
    if (novaImagem && novaImagem.trim() !== "") {
      setAvatar(novaImagem);
    }
  }
  return (
    <div className="usuario">
      <img onClick={mudarAvatar} src={avatar} alt="imagem de perfil" />
      <div className="texto">
        <span>
          <strong onClick={mudarNome}>{nome}</strong>
          <ion-icon name="pencil" onClick={mudarNome}></ion-icon>
        </span>
      </div>
    </div>
  );
}
