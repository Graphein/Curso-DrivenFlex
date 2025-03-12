import { useEffect,useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("<https://dog.ceo/api/breeds/image/random>")
      .then((res) => {
        setImage (res.data.message);
      });
  }, []);

  return (
    <div className="view">
      <div className="image">
        {image ? (
          <img src={image} alt="Catioro fofíneo" />
        ) : (
          "Carregando imagem..."
        )}
      </div>
    </div>
  );
}