export default function Suggestion({ user, reason }) {
    return (
      <div className="suggestion">
        <div className="info">
          <img src={`assets/img/${user}.svg`} alt={user} />
          <div>
            <strong>{user}</strong>
            <p>{reason}</p>
          </div>
        </div>
        <button>Seguir</button>
      </div>
    );
}
  