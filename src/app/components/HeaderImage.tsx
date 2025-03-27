import React from "react";

const HeaderImage = () => {
    return (
        <div 
            className="header-image" 
            style={{ display: "flex", justifyContent: "justify", alignItems: "center" }}
        >
            <img 
                src="http://localhost:3000/images/canada-42703_1280.png" 
                alt="Canadian History Trivia Game" 
                style={{ width: "90%", height: "auto" }} 
            />
        </div>
    );
};

export default HeaderImage;

