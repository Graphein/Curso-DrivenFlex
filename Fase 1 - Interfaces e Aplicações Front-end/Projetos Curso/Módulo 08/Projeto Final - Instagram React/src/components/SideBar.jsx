import User from "./User";

export default function SideBar() {
  const suggestions = [
    { username: "bad.vibes.memes", image: "assets/img/bad.vibes.memes.svg", reason: "Segue você" },
    { username: "chibirdart", image: "assets/img/chibirdart.svg", reason: "Segue você" },
    { username: "razoesparaacreditar", image: "assets/img/razoesparaacreditar.svg", reason: "Novo no Instagram" },
    { username: "adorable_animals", image: "assets/img/adorable_animals.svg", reason: "Segue você" },
    { username: "smallcutecats", image: "assets/img/smallcutecats.svg", reason: "Segue você" },
  ];

  return (
    <div className="sidebar">
      <User />

      <div className="sugestoes">
        <div className="titulo">
          Sugestões para você
          <div>Ver tudo</div>
        </div>

        {suggestions.map((suggestion, index) => (
          <div className="sugestao" key={index}>
            <div className="usuario">
              <img src={suggestion.image} alt={suggestion.username} />
              <div className="texto">
                <div className="nome">{suggestion.username}</div>
                <div className="razao">{suggestion.reason}</div>
              </div>
            </div>
            <div className="seguir">Seguir</div>
          </div>
        ))}
      </div>

      <div className="links">
        Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade • Termos • Localizações • Contas mais relevantes •
        Hashtags • Idioma
      </div>

      <div className="copyright">© 2021 INSTAGRAM DO FACEBOOK</div>
    </div>
  );
}
