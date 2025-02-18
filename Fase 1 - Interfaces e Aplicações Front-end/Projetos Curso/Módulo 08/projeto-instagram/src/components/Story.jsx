export default function Story({ img, user }) {
    return (
      <div className="story">
        <div className="imagem">
          <img src={img} alt={user} />
        </div>
        <div className="usuario">
            <p>{user}</p>
        </div>
        <div className="setinha">
         <ion-icon name="chevron-forward-circle"></ion-icon>
        </div>
      </div>
    );
}
