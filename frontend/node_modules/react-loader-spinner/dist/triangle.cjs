'use strict';var e=require('react'),n=require('styled-components');function _interopDefault(e){return e&&e.__esModule?e:{default:e}}var e__default=/*#__PURE__*/_interopDefault(e);var n__default=/*#__PURE__*/_interopDefault(n);var t="#4fa94d",o={"aria-busy":true,role:"progressbar"};var i=n__default.default.div`
  display: ${r=>r.$visible?"flex":"none"};
`;var s="http://www.w3.org/2000/svg";var A="-3 -4 39 39",f="16,0 32,32 0,32",T=n.keyframes`
to {
   stroke-dashoffset: 136;
 }
`,b=n__default.default.polygon`
  stroke-dasharray: 17;
  animation: ${T} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
`,P=n__default.default.svg`
  transform-origin: 50% 65%;
`,B=({height:r=80,width:a=80,color:p=t,ariaLabel:l="triangle-loading",wrapperStyle:g,wrapperClass:m,visible:d=true})=>e__default.default.createElement(i,{style:g,$visible:d,className:`${m}`,"data-testid":"triangle-loading","aria-label":l,...o},e__default.default.createElement(P,{id:"triangle",width:a,height:r,xmlns:s,viewBox:A,"data-testid":"triangle-svg"},e__default.default.createElement(b,{fill:"transparent",stroke:p,strokeWidth:"1",points:f})));exports.Triangle=B;//# sourceMappingURL=triangle.cjs.map
//# sourceMappingURL=triangle.cjs.map