import React from 'react';
import PortfolioItem from './PortfolioItem';
import getPortfolioData from '../data/portfolio';

export default function PortfolioSection() {
  var portfolioItemsData = getPortfolioData();

  return (
    <section id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {portfolioItemsData.map((item, index) => <PortfolioItem key={index} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}