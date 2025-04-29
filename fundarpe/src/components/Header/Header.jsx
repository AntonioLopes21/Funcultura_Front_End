import React from "react";
import "./Header.css"
import { ImagesProject } from "../../assets/Images";

const Header = () => {
    return (
        <>
            
            <div className="funcultura">
                <img className="Imagens_nav" src={ImagesProject.ImagemNav} alt="Logo" />
            </div>
        </>);
};

export default Header;
