import React from "react";
import "./Header.css"
import { ImagesProject } from "../../assets/Images";

const Header = () => {
    return (
        <>
            <div className="navbar">
                <nav>
                <ol className="nav-list">
                        <img src={ImagesProject.logoFacebok} alt="caminho_fb" />
                        <img src={ImagesProject.logoTwitter} alt="logo twitter" />
                        <img src={ImagesProject.logoFlickr} alt="logo flickr" />
                        <img src={ImagesProject.logoYoutube} alt="logo youtube" />
                    </ol>
                </nav>
            </div>
            <div className="funcultura">
                <img className="Imagens_nav" src={ImagesProject.ImagemNav} alt="Logo" />
            </div>
        </>);
};

export default Header;
