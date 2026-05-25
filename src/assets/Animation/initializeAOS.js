// aosInit.js
import AOS from 'aos';
import 'aos/dist/aos.css';

export const initializeAOS = () => {
  AOS.init({
    duration: 700,  // Duration of the animation in milliseconds
    easing: 'ease-in-out',  // Type of easing for the animation
    once: true,  // Whether animation should happen only once - while scrolling down
    mirror: false,  // Whether elements should animate out while scrolling past them
  });
};
