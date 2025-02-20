import Post from "./Post";

const postsData = [
  {
    user: "meowed",
    img: "assets/img/gato-telefone.svg",
    likes: "respondeai",
    totalLikes: "101523",
  },
  {
    user: "barked",
    img: "assets/img/dog.svg",
    likes: "adorable_animals",
    totalLikes: "99159",
  },
  {
    user: "9gag",
    img: "assets/img/UtopiaTravisScott.jpg",
    likes: "Lelli.exe",
    totalLikes: "799159",
  }
];

export default function Posts() {
  return (
    <div className="posts">
      {postsData.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}


