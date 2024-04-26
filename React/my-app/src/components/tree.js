/** @format */
import "../App.css";
import React, { useState , useEffect } from "react";
import List from "./list.js";
import Node from "./Node.js";
import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";
import img4 from "../img/4.png";
import automate from "../img/automate.png";
import eclaireur from "../img/eclaireur.png";
import equipe from "../img/equipe.png";
import forage from "../img/forage.png";
import integration from "../img/integration.png";
import mine from "../img/mine.png";
import opti from "../img/opti.png";
import protese from "../img/protese.png";
import terminal from "../img/terminal.png";
import traineaux from "../img/traineaux.png";
import usine from "../img/usine.png";
import collect from "../img/collect.png";
import hydro from "../img/hrydro.png";
import siry from "../img/siry.png";
import acier from "../img/acier.png";
import Entrepot from "../img/entrepo.png";

const initialTechnologies = [
  { name: "Orbite Créative", level: 1, type: "main", unlocked: true, dependencies: [], imgSrc: img1 },
  { name: "Conception Cosmique", level: 2, type: "main", unlocked: false, dependencies: ["Orbite Créative"], imgSrc: img2 },
  { name: "Arithmétique ", level: 3, type: "main", unlocked: false, dependencies: ["Conception Cosmique"], imgSrc: img3 },
  { name: "Calculateur Orbital", level: 4, type: "main", unlocked: false, dependencies: ["Arithmétique "], imgSrc: img4 },

  { name: "Aspiration Astrale", unlocked: false, type: "improvement", dependencies: ["Orbite Créative"], imgSrc: collect },
  { name: "Hydroharmoniseur", unlocked: false, type: "improvement", dependencies: ["Orbite Créative"], imgSrc: hydro },
  { name: "Découpe Éthérée", unlocked: false, type: "improvement", dependencies: ["Orbite Créative"], imgSrc: siry },
  { name: " Forge Spectrale", unlocked: false, type: "improvement", dependencies: ["Orbite Créative"], imgSrc: acier },

  { name: " Noyau Synaptique", unlocked: false, type: "improvement", dependencies: ["Conception Cosmique"], imgSrc: terminal },
  { name: "Glisseurs Stellaires", type: "improvement", unlocked: false, dependencies: ["Conception Cosmique"], imgSrc: traineaux },
  { name: " Synthétiseur Galactique", unlocked: false, type: "improvement", dependencies: ["Conception Cosmique"], imgSrc: usine },
  { name: "Nébulose", unlocked: false, type: "improvement", dependencies: ["Conception Cosmique"], imgSrc: Entrepot },

  { name: "Symbiose Synthétique", unlocked: false, type: "improvement", dependencies: ["Arithmétique "], imgSrc: protese },
  { name: "Harmonie Mécanique", unlocked: false, type: "improvement", dependencies: ["Arithmétique "], imgSrc: automate },
  { name: "Fusion Artificielle", unlocked: false, type: "improvement", dependencies: ["Arithmétique "], imgSrc: integration },
  { name: "Excavation Énergétique", unlocked: false, type: "improvement", dependencies: ["Arithmétique "], imgSrc: mine },

  { name: "Vanguardes Véloces", unlocked: false, type: "improvement", dependencies: ["Calculateur Orbital"], imgSrc: equipe },
  { name: " Sentinelles Spectrales", unlocked: false, type: "improvement", dependencies: ["Calculateur Orbital"], imgSrc: eclaireur },
  { name: " Affinement Cybernétique", unlocked: false, type: "improvement", dependencies: ["Calculateur Orbital"], imgSrc: opti },
  { name: "Extracteur Astral", unlocked: false, type: "improvement", dependencies: ["Calculateur Orbital"], imgSrc: forage },
];

const Tree = () => {
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [unlockedNodes, setUnlockedNodes] = useState({});

  const handleUnlock = (techName) => {
    setTechnologies((prevTechnologies) => {
      const newTechs = prevTechnologies.map((tech) => {
        const isTechToUnlock = tech.name === techName;
        const dependenciesUnlocked = tech.dependencies.every((depName) => prevTechnologies.find((dep) => dep.name === depName && dep.unlocked));
        if (isTechToUnlock && dependenciesUnlocked) {
          return { ...tech, unlocked: true };
        }
        return tech;
      });
      return newTechs;
    });
  };

  useEffect(() => {
    const unlockedNodesPositions = {};
    const nodes = document.querySelectorAll('.unlocked-node');
    nodes.forEach(node => {
      unlockedNodesPositions[node.getAttribute('data-name')] = {
        x: node.offsetLeft + node.offsetWidth / 2,
        y: node.offsetTop + node.offsetHeight
      };
    });
    setUnlockedNodes(unlockedNodesPositions);
  }, [technologies]);

  const lists = createListsFromDependencies(technologies);

  return (
    <div className="p-8 text-white h-full r">
      <div className="bg-ornament-pattern bg-opacity-75 rounded-lg shadow-md p-4 max-w-xs mx-auto border-y-2 mb-6" style={{ width: '30rem' }}>
        <p className="text-white text-2xl font-bold text-center">Arbre technologique</p>
      </div>
      <div className="flex border-double  shadow-inner border-4 border-white-500 rounded-lg  shadow-black backdrop-blur-sm div-with-black-background" style={{ position: "relative" }}>
        <div className="flex flex-col">
          {lists.map((listItem) => (
            <Node key={listItem.main.name} name={listItem.main.name} unlocked={listItem.main.unlocked} type={listItem.main.type} onUnlock={handleUnlock} imgSrc={listItem.main.imgSrc} />
          ))}
        </div>
        
        <div className="flex-grow">
          {lists.map((listItem) => listItem.improvements.length > 0 && <List key={listItem.main.name} technologies={listItem.improvements} imgSrc={listItem.improvements.imgSrc} onUnlock={handleUnlock} />)}
        </div>
      </div>
    </div>
  );
};

export default Tree;

function createListsFromDependencies(technologies) {
  technologies.forEach((tech) => {
    if (tech.type !== "main") {
      tech.type = "improvement";
    }
  });

  const mainNodes = technologies.filter((tech) => tech.type === "main");
  const improvementNodes = technologies.filter((tech) => tech.type === "improvement");

  const lists = mainNodes.map((mainNode) => {
    const improvements = improvementNodes.filter((improvement) => improvement.dependencies.includes(mainNode.name));
    return { main: mainNode, improvements: improvements.length ? improvements : [] };
  });

  return lists;
}