import e from'react';import n,{keyframes}from'styled-components';var t="#4fa94d",o={"aria-busy":true,role:"progressbar"};var i=n.div`
  display: ${r=>r.$visible?"flex":"none"};
`;var s="http://www.w3.org/2000/svg";var A="-3 -4 39 39",f="16,0 32,32 0,32",T=keyframes`
to {
   stroke-dashoffset: 136;
 }
`,b=n.polygon`
  stroke-dasharray: 17;
  animation: ${T} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
`,P=n.svg`
  transform-origin: 50% 65%;
`,B=({height:r=80,width:a=80,color:p=t,ariaLabel:l="triangle-loading",wrapperStyle:g,wrapperClass:m,visible:d=true})=>e.createElement(i,{style:g,$visible:d,className:`${m}`,"data-testid":"triangle-loading","aria-label":l,...o},e.createElement(P,{id:"triangle",width:a,height:r,xmlns:s,viewBox:A,"data-testid":"triangle-svg"},e.createElement(b,{fill:"transparent",stroke:p,strokeWidth:"1",points:f})));export{B as Triangle};//# sourceMappingURL=triangle.mjs.map
//# sourceMappingURL=triangle.mjs.map