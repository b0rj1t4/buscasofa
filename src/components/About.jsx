import React from 'react';
import './About.css';
import BorjaImage from '../assets/borja.jpeg';

const About = () => {
  const teamMembers = [
    {
      name: 'Borja LLorente Capiscol',
      location: 'Dallas, Texas, EEUU',
      quote: '"Code so clean it sparkles"',
      image: BorjaImage, // Local image import
    },
    {
      name: 'Alejandro Fernandez Yepes',
      location: 'Barcelona, Spain',
      quote: '"Turning coffee into code since morning"',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
    },
    {
      name: 'Unai Perez De la Torre',
      location: 'Bilbao, Spain',
      quote: '"Debugging is like being a detective"',
      image:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
    },
    {
      name: 'Alberto Flores Rivera',
      location: 'Seville, Spain',
      quote: '"Simplicity is the ultimate sophistication"',
      image:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
    },
    {
      name: 'Pablo Taboas Castro',
      location: 'Valencia, Spain',
      quote: '"There\'s no place like 127.0.0.1"',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
    },
  ];

  return (
    <div className="about-container">
      <h1>Acerca de nosotros</h1>
      <div className="team-header">
        <h2>Equipo #13</h2>
        <p className="team-tagline">
          Innovando con pasión, creando con excelencia
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="profile-card">
            <div className="profile-image-container">
              <img
                src={member.image}
                alt={member.name}
                className="profile-image"
              />
            </div>
            <h3>{member.name}</h3>
            <p className="location">{member.location}</p>
            <i className="quote">{member.quote}</i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
