import Stories from "./Stories";
import Posts from "./Posts";
import SideBar from "./SideBar";

export default function Body() {
  return (
    <div className="body">
      <div className="left">
        <Stories />
        <Posts />
      </div>
      <SideBar />
    </div>
  );
}
