export default function Post(props) {
    return (
      <div className="post">
        <img src={props.src} alt={props.alt} />
        <h1 className="titulo">{props.titulo}</h1>
      </div>
    );
  }