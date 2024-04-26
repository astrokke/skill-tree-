import React from 'react';


const Node = ({ name, unlocked, type, onUnlock,imgSrc  }) => {
  
    // Appliquez des styles de base pour tous les nœuds
    const baseStyles = "text-center shadow-md";
    const unlockedStyles = unlocked ? 'filter-none' : 'filter grayscale'; // Utilisez 'grayscale' pour les images verrouillées
    const typeStyles = type === 'main' ? 'mb-24 mt-14 ml-6 h-36 mr-32' : 'mb-24 mt-6 w-36 h-36 rounded-full mr-32';// Exemple : marge supérieure différente

    const improvementWrapperStyles = type === 'improvement' ? 'div-with-white-background border-solid border-2 border-white-500 rounded-2xl ' : '';
    const improvementTextStyles = type === 'improvement' ? {  } : {};
    return (
      
        <div className={`${baseStyles} ${unlockedStyles} ${typeStyles}`} onClick={() => onUnlock(name)}>
         <img src={imgSrc} alt="Logo" style={{ width: 'fit-content', height: 'inherit' ,borderRadius: '100%' }} />
         <div className={improvementWrapperStyles} style={{ position: 'relative'  }}>
          <p style={improvementTextStyles}>{name}</p>
          </div>
        </div>
      );
    };


export default Node;
