import React from 'react';
import TeamMember from './TeamMember';
import getTeamData from '../data/team';

export default function TeamSection() {
  var teamData = getTeamData();

  return (
    <section id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div id="row">
          {
            teamData.map((teamMember, index) => <TeamMember key={index} {...teamMember} />)
          }
        </div>
      </div>
    </section>
  );
}