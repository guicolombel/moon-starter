/* Libs */
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import barba from '@barba/core';

/* Modules */
import isMobile from './utils/isMobile';
import Splitting from './modules/Splitting';

/* Transitions */
let scroll;
barba.init({
  debug: false,
  transitions: [
    {
      name: 'home',
      to: {
        namespace: ['home']
      },
      once({next}){
        setTimeout(() => {
          smooth(next.container);
        }, 100)
        //Modules
        Splitting();
      },
      beforeEnter({next}){
        scroll.destroy();
        setTimeout(() => {
          smooth(next.container);
        }, 100)
      },
      enter(){},
      after(){
        //Module
        Splitting();
      },
    }, {
      name: 'about',
      to: {
        namespace: ['about']
      },
      once({next}){
        setTimeout(() => {
          smooth(next.container);
        }, 100)
      },
      beforeEnter({next}){
        scroll.destroy();
        setTimeout(() => {
          smooth(next.container);
        }, 100)
      },
      enter(){},
      after(){
        //Module
      },
    }
  ]
});

/* Smooth scroll */
const lerpValue = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)? "0.3" : "0.08";
function smooth(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector('.o-scroll'),
    smooth: true,
    lerp: lerpValue,
    getSpeed: true,
    getDirection: true
  });
  scroll.on('call', (value, way, obj) => {
    if (value === 'lazyLoad'){
      let src = obj.el.dataset.src;
      if(obj.el.tagName == "IMG"){
        obj.el.src = `${src}`;
      } else {
        obj.el.style.backgroundImage = `url(${src})`
      }
    }
  })
}

/* VH */
if(isMobile){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
} else {
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

/* Refresh for Instagram in-app browser */
if(navigator.userAgent.includes("Instagram")){
  if (window.location.href.substr(-2) !== '?r') {
    window.location = window.location.href + '?r';
  }
}

/* Netlify CMS */
if(window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}