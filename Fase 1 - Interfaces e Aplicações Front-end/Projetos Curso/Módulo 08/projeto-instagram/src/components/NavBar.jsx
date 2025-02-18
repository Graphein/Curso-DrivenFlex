
export default function NavBar() {
  return (
    <nav className="navbar">
      <img src="assets/logo.png" alt="Instagram Logo" />
      <input type="text" placeholder="Pesquisar" />
      <div className="icons">
        <ion-icon name="paper-plane-outline"></ion-icon>
        <ion-icon name="compass-outline"></ion-icon>
        <ion-icon name="heart-outline"></ion-icon>
        <ion-icon name="person-outline"></ion-icon>
      </div>
    </nav>
  );
}
