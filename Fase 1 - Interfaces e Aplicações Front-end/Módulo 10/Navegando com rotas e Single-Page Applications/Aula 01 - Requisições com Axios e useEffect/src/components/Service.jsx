import React from 'react';

export default function Service(props) {
  var { icon, name, text } = props;

  return (
    <div className="col-md-4">
      <i className={icon}></i>
      <div className="service-desc">
        <h3>{name}</h3>
        <p>
          {text}
        </p>
      </div>
    </div>
  );
}