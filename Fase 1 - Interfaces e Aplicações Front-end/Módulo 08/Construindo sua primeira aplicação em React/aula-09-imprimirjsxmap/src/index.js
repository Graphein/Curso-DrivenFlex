/* eslint-disable */

import { createRoot } from "react-dom/client";

const urls = [
  "https://image.freepik.com/free-photo/cute-puppies-pomeranian-dog-sitting-wooden-bucket_34266-1188.jpg",
  "https://i.guim.co.uk/img/media/43352be36da0eb156e8551d775a57fadba8ae6d7/0_0_1440_864/master/1440.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=184376f73721b565014f1d24e5bf645c",
  "https://sf.ezoiccdn.com/ezoimgfmt/meowlogy.com/wp-content/uploads/2019/03/12Cute-Puppies--564x460.jpg?ezimgfmt=rs:392x320/rscb2/ng:webp/ngcb2",
  "https://s2.dmcdn.net/v/AH_L31LXG_jL6ch22/x480",
  "https://live.staticflickr.com/3208/3044353793_e5d0ab7a66_n.jpg",
  "https://images2.storyjumper.com/transcoder.png?trim&id=64-t5aew5jfz4-5bmshxacr&maxw=512&maxh=512",
  "https://www.meme-arsenal.com/memes/73651cadd4e6bbc5406da90b32adac0d.jpg",
  "https://media.tenor.com/images/9fdfe39c1c5fd1e80a47a39fa0100f3b/tenor.gif",
  "https://media.tenor.com/images/9853f032993b10d0f960051e44156e8b/tenor.gif",
  "https://media4.giphy.com/media/OmK8lulOMQ9XO/giphy.gif"
];

function App() {
  return (
    <div class="imagens">
      {urls.map (url => (
        <img src={url} alt="" />
      ))}
    </div>
  );
}

const elemento = document.querySelector(".root");
const root = createRoot(elemento);
root.render(<App />);