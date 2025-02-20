import Story from "./Story";

const storiesData = [
  { img: "assets/img/9gag.svg", user: "9gag" },
  { img: "assets/img/meowed.svg", user: "meowed" },
  { img: "assets/img/barked.svg", user: "barked" },
  { img: "assets/img/nathanwpylestrangeplanet.svg", user: "nathanwpylestrangeplanet" },
  { img: "assets/img/wawawicomics.svg", user: "wawawicomics" },
  { img: "assets/img/respondeai.svg", user: "respondeai" },
  { img: "assets/img/filomoderna.svg", user: "filomoderna" },
  { img: "assets/img/memeriagourmet.svg", user: "memeriagourmet" },
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
