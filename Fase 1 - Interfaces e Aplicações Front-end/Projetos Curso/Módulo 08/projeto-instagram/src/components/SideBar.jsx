import User from "./User";
import Suggestions from "./Suggestions";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <User />
      <Suggestions />
    </aside>
  );
}