import Stories from "./Stories";
import Posts from "./Posts";
import SideBar from "./SideBar";

export default function Body() {
  return (
    <div className="corpo">
      <div className="esquerda">
        <Stories />
        <Posts />
      </div>
      <SideBar />
    </div>
  );
}
