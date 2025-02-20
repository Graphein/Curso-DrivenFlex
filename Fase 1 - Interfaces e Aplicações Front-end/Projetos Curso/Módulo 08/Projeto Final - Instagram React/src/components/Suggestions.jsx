import Suggestion from "./Suggestion";

const suggestionsData = [
  { user: "bad.vibes.memes", reason: "Segue você" },
  { user: "chibirdart", reason: "Segue você" },
  { user: "adorable_animals", reason: "Segue você" },
];

export default function Suggestions() {
  return (
    <div className="sugestoes">
      <div className="titulo">
        Sugestões para você
        <div>Ver tudo</div>
        {suggestionsData.map((suggestion, index) => (
          <Suggestion key={index} {...suggestion} />
        ))}
      </div>
    </div>
    );
}
