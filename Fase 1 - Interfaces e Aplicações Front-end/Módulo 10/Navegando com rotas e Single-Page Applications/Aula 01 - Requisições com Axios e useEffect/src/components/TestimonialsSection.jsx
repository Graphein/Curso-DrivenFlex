import React from 'react';
import Testimonial from './Testimonial';
import getTestimonialsData from '../data/testimonials';

export default function TestimonialsSection() {
  var testimonialsData = getTestimonialsData();

  return (
    <section id="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>What our clients say</h2>
          </div>
          <div className="row">
            {
              testimonialsData.map((testimonial, index) => <Testimonial key={index} {...testimonial} />)
            }
          </div>
        </div>
      </section>
  );
}