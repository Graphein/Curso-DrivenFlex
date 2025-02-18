export default function Post({ user, img, likes, totalLikes }) {
    return (
      <div className="post">
        <div className="topo">
          <div className="usuario">
            <img src={`assets/img/${user}.svg`} alt={user} />
            {user}
          </div>
          <div className="acoes">
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </div>
        </div>
  
        <div className="conteudo">
          <img src={img} alt="Post" />
        </div>
  
        <div className="fundo">
          <div className="acoes">
            <ion-icon name="heart-outline"></ion-icon>
            <ion-icon name="chatbubble-outline"></ion-icon>
            <ion-icon name="paper-plane-outline"></ion-icon>
            <ion-icon name="bookmark-outline"></ion-icon>
          </div>
  
          <div className="curtidas">
            <strong>{likes}</strong> e <strong>outras {totalLikes} pessoas</strong>
          </div>
        </div>
      </div>
    );
}

  