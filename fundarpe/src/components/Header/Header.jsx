import React from "react";
import "./Header.css"
import { ImagesProject } from "../../assets/Images";  // Se for exportado como nomeado

const Header = () => {
    return (
        <img className="Imagens_nav" src={ImagesProject.ImagemNav} alt="Logo" />
    );
};

export default Header;
