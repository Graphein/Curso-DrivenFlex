import Story from "./Story";

const storiesData = [
  { img: "assets/img/9gag.svg", user: "9gag" },
  { img: "assets/img/meowed.svg", user: "meowed" },
  { img: "assets/img/barked.svg", user: "barked" },
];

export default function Stories() {
  return (
    <div className="stories">
      {storiesData.map((story, index) => (
        <Story key={index} img={story.img} user={story.user} />
      ))}
    </div>
  );
}
