import React from 'react';

const TechnologyList = ({ technologies, currentLevel }) => (
 <div>
    {technologies.map((tech) => (
      <div key={tech.name}>
        {tech.level <= currentLevel ? (
          <UnlockedTechnology name={tech.name} />
        ) : (
          <LockedTechnology name={tech.name} />
        )}
      </div>
    ))}
 </div>
);

export default TechnologyList;
