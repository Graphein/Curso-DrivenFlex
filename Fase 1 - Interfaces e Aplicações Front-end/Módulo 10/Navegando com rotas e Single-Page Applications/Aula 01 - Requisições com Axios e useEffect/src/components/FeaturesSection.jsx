import React from 'react';

import getFeaturesData from '../data/features';
import Feature from './Feature';

export default function FeaturesSection() {

  var features = getFeaturesData();

  return (
    <section id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {features.map((feature, index) => <Feature {...feature} key={index} />)}
        </div>
      </div>
    </section>
  );
}