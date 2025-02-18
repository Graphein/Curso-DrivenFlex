import Post from "./Post";

const postsData = [
  {
    user: "meowed",
    img: "assets/img/gato-telefone.svg",
    likes: "respondeai",
    totalLikes: "101.523",
  },
  {
    user: "barked",
    img: "assets/img/dog.svg",
    likes: "adorable_animals",
    totalLikes: "99.159",
  },
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


