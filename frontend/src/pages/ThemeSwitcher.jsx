// src/components/ThemeSwitcher.jsx
import React, { useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  useEffect(() => {
    const wrapper = document.getElementById('theme-switcher-wrapper');
    const button = document.getElementById('theme-switcher-button');
    const themes = ['theme-orange', 'theme-purple', 'theme-green', 'theme-blue'];

    const displayHandler = () => {
      wrapper.classList.toggle('is-open');
    };

    const themeHandler = (e) => {
      themes.forEach(theme => {
        document.body.classList.remove(theme);
      });
      document.body.classList.add(`theme-${e.currentTarget.dataset.theme}`);
    };

    button.addEventListener('click', displayHandler);
    wrapper.querySelectorAll('[data-theme]').forEach(theme => {
      theme.addEventListener('click', themeHandler);
    });

    // Set initial theme
    const initialTheme = themes[Math.floor(Math.random() * themes.length)];
    document.body.classList.add(initialTheme);

    // Cleanup event listeners on unmount
    return () => {
      button.removeEventListener('click', displayHandler);
      wrapper.querySelectorAll('[data-theme]').forEach(theme => {
        theme.removeEventListener('click', themeHandler);
      });
    };
  }, []);

  return (
    <div>
      <div className="theme-switcher-wrapper" id="theme-switcher-wrapper">
        <span>Themes color</span>
        <ul>
          <li><em className="is-active" data-theme="orange"></em></li>
          <li><em data-theme="green"></em></li>
          <li><em data-theme="purple"></em></li>
          <li><em data-theme="blue"></em></li>
        </ul>
      </div>
      <div className="theme-switcher-button" id="theme-switcher-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path fill="currentColor" d="M352 0H32C14.33 0 0 14.33 0 32v224h384V32c0-17.67-14.33-32-32-32zM0 320c0 35.35 28.66 64 64 64h64v64c0 35.35 28.66 64 64 64s64-28.65 64-64v-64h64c35.34 0 64-28.65 64-64v-32H0v32zm192 104c13.25 0 24 10.74 24 24 0 13.25-10.75 24-24 24s-24-10.75-24-24c0-13.26 10.75-24 24-24z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
