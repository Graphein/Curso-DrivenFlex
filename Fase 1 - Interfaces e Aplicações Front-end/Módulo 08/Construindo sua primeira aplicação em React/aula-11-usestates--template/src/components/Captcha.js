import React, { useState } from "react";
export default function Captcha() {

  const [mensagemResultado, setMensagemResultado] = useState("");

  return (
    <div className="captcha">
      <div className="titulo">Selecione o cachorro quente</div>
      <div className="imagens">
        <img
          src="https://cdn.shopify.com/s/files/1/0011/2191/0839/products/UTB8ldYRJCnEXKJk43Ubq6zLppXay_1024x1024@2x.jpg"
          alt="Salsicha fantasiado de cachorro quente"
          onClick={() => verificarResposta(false)}
        />
        <img
          src="https://i.pinimg.com/originals/aa/c4/e9/aac4e9dab9251087a4a079958aadf2ef.jpg"
          alt="Salsicha"
          onClick={() => verificarResposta(false)}
        />
        <img
          src="https://blog.pajaris.com.br/wp-content/uploads/2020/10/cachorro-quente-gourmet-receitas.jpg"
          alt="Cachorro quente"
          onClick={() => verificarResposta(true)}
        />
        <img
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdopKhD3IQ6c4KfEG4CTdPblcDErtAwGBCZkiifyGudMfjHxKL"
          alt="Salsicha"
          onClick={() => verificarResposta(false)}
        />
      </div>
      <div className="resultado">{mensagemResultado}</div>
    </div>
  );
  function verificarResposta(ehCachorroQuente) {
    if (ehCachorroQuente) {
      setMensagemResultado("Você é um humano!");
    } else {
      setMensagemResultado("Você é um robô!");
    }
  }
}
