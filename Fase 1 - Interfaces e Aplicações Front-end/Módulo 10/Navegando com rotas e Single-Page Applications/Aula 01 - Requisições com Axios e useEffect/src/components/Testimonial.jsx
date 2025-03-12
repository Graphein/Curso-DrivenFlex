import React from 'react';

export default function Testimonial(props) {
  var { img, text, name } = props;

  return (
    <div className="col-md-4">
      <div className="testimonial">
        <div className="testimonial-image">
          <img src={img} alt="" />
        </div>
        <div className="testimonial-content">
          <p>
            {text}
          </p>
          <div className="testimonial-meta"> - {name} </div>
        </div>
      </div>
    </div>
  )
}