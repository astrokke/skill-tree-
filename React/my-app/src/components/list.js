import React from 'react';
import Node from './Node.js';

const List = ({ technologies, onUnlock, imgSrc }) => {
  
    return (
      <div className="flex flex-row flex-wrap gap-2 " >
        {technologies.map((tech) => (
          <Node
            key={tech.name}
            name={tech.name}
            unlocked={tech.unlocked}
            type={tech.type}
            onUnlock={onUnlock}
            imgSrc={tech.imgSrc}
          />
        ))}
         <hr className="mb-4 mr-10 w-full border-slate-400"  />
         <hr className="mb-4 mr-10 w-full border-slate-400"  />
      </div>
    );
  };

export default List;
