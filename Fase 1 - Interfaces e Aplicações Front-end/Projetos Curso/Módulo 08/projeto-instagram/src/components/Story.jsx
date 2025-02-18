export default function Story({ img, user }) {
    return (
      <div className="story">
        <img src={img} alt={user} />
        <p>{user}</p>
      </div>
    );
}
