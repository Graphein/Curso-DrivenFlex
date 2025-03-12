import React from 'react';

export default function TeamMember(props) {
  var { img, name, job } = props;

  return (
    <div className="col-md-3 col-sm-6 team">
      <div className="thumbnail">
        <img src={img} alt="..." className="team-img" />
        <div className="caption">
          <h4>{name}</h4>
          <p>{job}</p>
        </div>
      </div>
    </div>
  );
}