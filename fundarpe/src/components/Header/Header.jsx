import React from "react";
import "./Header.css"
import { ImagesProject } from "../../assets/Images";

const Header = () => {
    return (
        <>
            
            <div className="funcultura">
                <img className="Imagens_nav" src={ImagesProject.ImagemNav} alt="Logo" />
            </div>
            <div className="navbar">
                <nav>
                    <ol className="nav-list">
                        <img src={ImagesProject.logoFacebok} alt="caminho_fb" className="logo_facebook" />
                        <img src={ImagesProject.logoTwitter} alt="logo twitter" className="logo_twitter" />
                        <img src={ImagesProject.logoFlickr} alt="logo flickr" className="logo_flickr" />
                        <img src={ImagesProject.logoYoutube} alt="logo youtube" className="logo_youtube" />
                        <div className="search-container">
                            <input type="text" placeholder="Busca" />
                            <span className="arrow">v</span>
                        </div>

                        <div className="search-newsletter">
                            <button className="search-newsletter-btn">Assine nosso newsletter</button>
                        </div>
                    </ol>
                </nav>
            </div>
            <img className="Imagens_nav" src={ImagesProject.FundarpeLogos} alt="Funcultura_logo" />
                
        </>);
};

export default Header;
