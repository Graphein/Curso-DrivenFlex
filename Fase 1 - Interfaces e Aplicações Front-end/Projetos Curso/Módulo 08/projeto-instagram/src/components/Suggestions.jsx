import Suggestion from "./Suggestion";

const suggestionsData = [
  { user: "bad.vibes.memes", reason: "Segue você" },
  { user: "chibirdart", reason: "Segue você" },
  { user: "adorable_animals", reason: "Segue você" },
];

export default function Suggestions() {
  return (
    <div className="suggestions">
      <h3>Sugestões para você</h3>
      {suggestionsData.map((suggestion, index) => (
        <Suggestion key={index} {...suggestion} />
      ))}
    </div>
  );
}
