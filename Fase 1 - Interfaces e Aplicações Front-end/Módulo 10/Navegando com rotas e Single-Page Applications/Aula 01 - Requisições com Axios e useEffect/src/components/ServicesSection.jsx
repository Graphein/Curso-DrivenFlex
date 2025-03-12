import React from 'react';
import Service from './Service';
import getServicesData from '../data/services';

export default function ServicesSection() {
  var servicesData = getServicesData();

  return (
      <section id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="row">
            {servicesData.map((service, index) => <Service key={index} {...service} />)}
            <Service />
          </div>
        </div>
    </section>
  );  
}

