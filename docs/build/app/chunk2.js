/*! Built with http://stenciljs.com */
const{h:n}=window.App;function t(n,t,r){const e={};return r.split(" ").forEach(r=>(e[r]=!0,n&&(e[`${r}-${n}`]=!0,t&&(e[`${r}-${t}`]=!0,e[`${r}-${n}-${t}`]=!0)),e)),e}function r(n){const t={};for(let r=0;r<n.length;r++)t[n[r]]=!0;return t}function e(n,t){return n?{[n]:!0,[`${n}-${t}`]:!0}:{}}function o(n){const t={};return function(n){return n?Array.isArray(n)?n:n.split(" ").filter(n=>""!==n.trim()):[]}(n).forEach(n=>t[n]=!0),t}function u(n,t,r=!1){if(n&&"#"!==n[0]&&-1===n.indexOf("://")){const e=document.querySelector("ion-router");if(e)return t&&t.preventDefault(),e.componentOnReady().then(()=>e.push(n,r?-1:1))}return Promise.resolve()}export{e as getButtonClassMap,r as getElementClassMap,u as openURL,t as createThemedClasses,o as getClassMap};