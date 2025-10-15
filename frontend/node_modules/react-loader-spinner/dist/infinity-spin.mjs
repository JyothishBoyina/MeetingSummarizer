import r from'react';import n,{keyframes}from'styled-components';var o="#4fa94d";var i="http://www.w3.org/2000/svg";var t=242.776657104492,p=1.6,d=keyframes`
12.5% {
  stroke-dasharray: ${t*.14}px, ${t}px;
  stroke-dashoffset: -${t*.11}px;
}
43.75% {
  stroke-dasharray: ${t*.35}px, ${t}px;
  stroke-dashoffset: -${t*.35}px;
}
100% {
  stroke-dasharray: ${t*.01}px, ${t}px;
  stroke-dashoffset: -${t*.99}px;
}
`,f=n.path`
  stroke-dasharray: ${t*.01}px, ${t};
  stroke-dashoffset: 0;
  animation: ${d} ${p}s linear infinite;
`,c=({color:s=o,width:e="200"})=>r.createElement("svg",{xmlns:i,width:`${e}`,height:`${Number(e)*.5}`,viewBox:`0 0 ${e} ${Number(200*.5)}`,"data-testid":"infinity-spin"},r.createElement("defs",null,r.createElement("linearGradient",{id:"gradientColor",x1:"0%",y1:"0%",x2:"100%",y2:"0%"},r.createElement("stop",{offset:"0%",stopColor:"#4fa94d"}),r.createElement("stop",{offset:"100%",stopColor:"#00BFFF"}))),r.createElement(f,{"data-testid":"infinity-spin-path-1",stroke:s,fill:"none",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",d:"M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"}),r.createElement("path",{"data-testid":"infinity-spin-path-2",opacity:"0.07",fill:"none",stroke:s,strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10",d:"M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"}));export{c as InfinitySpin};//# sourceMappingURL=infinity-spin.mjs.map
//# sourceMappingURL=infinity-spin.mjs.map