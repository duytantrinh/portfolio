import React from "react"

function Menu() {
  return (
    <div className="menu">
      <div className="menu_left">
        <p>trinhtan11@gmail.com</p>
        <p>-</p>
        <p>437-9960195</p>
        <p>-</p>
        <a
          href="https://github.com/duytantrinh?tab=repositories"
          target="_blank"
        >
          Github profile
        </a>
      </div>
      <div className="menu_buttons">
        <a href="#home" className="menu_button">
          Home
        </a>
        <a href="#css" className="menu_button">
          CSS + Javascript
        </a>
        <a href="#projects" className="menu_button">
          Reactjs
        </a>
        <a href="#nodejs" className="menu_button">
          Nodejs
        </a>
        <a href="#nextjs" className="menu_button">
          Nextjs
        </a>
        <a href="#contact" className="menu_button">
          Contact
        </a>
      </div>
    </div>
  )
}

export default Menu
