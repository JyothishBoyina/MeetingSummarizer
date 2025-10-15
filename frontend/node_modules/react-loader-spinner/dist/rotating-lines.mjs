import r,{useCallback}from'react';import g,{keyframes}from'styled-components';var p="#4fa94d",i={"aria-busy":true,role:"progressbar"};var c="http://www.w3.org/2000/svg";var d=g.div`
  display: ${t=>t.$visible?"flex":"none"};
`;var f=[0,30,60,90,120,150,180,210,240,270,300,330],S=keyframes`
to {
   transform: rotate(360deg);
 }
`,x=g.svg`
  animation: ${S} ${t=>String(t.$animationDuration).endsWith("s")?String(t.$animationDuration):`${t.$animationDuration}s`} steps(12, end) infinite;
`,v=g.polyline`
  stroke-width: ${t=>`${t.$strokeWidth}px`};
  stroke-linecap: round;

  &:nth-child(12n + 0) {
    stroke-opacity: 0.08;
  }

  &:nth-child(12n + 1) {
    stroke-opacity: 0.17;
  }

  &:nth-child(12n + 2) {
    stroke-opacity: 0.25;
  }

  &:nth-child(12n + 3) {
    stroke-opacity: 0.33;
  }

  &:nth-child(12n + 4) {
    stroke-opacity: 0.42;
  }

  &:nth-child(12n + 5) {
    stroke-opacity: 0.5;
  }

  &:nth-child(12n + 6) {
    stroke-opacity: 0.58;
  }

  &:nth-child(12n + 7) {
    stroke-opacity: 0.66;
  }

  &:nth-child(12n + 8) {
    stroke-opacity: 0.75;
  }

  &:nth-child(12n + 9) {
    stroke-opacity: 0.83;
  }

  &:nth-child(12n + 11) {
    stroke-opacity: 0.92;
  }
`,F=({height:t=96,width:m=96,color:h=p,strokeWidth:e=5,animationDuration:o=.75,strokeColor:n,visible:s=true,ariaLabel:a="rotating-lines-loading",wrapperStyle:y,wrapperClass:u})=>{let k=useCallback(()=>f.map(l=>r.createElement(v,{key:l,points:"24,12 24,4",$strokeWidth:e,transform:`rotate(${l}, 24, 24)`})),[e]);return s?r.createElement(d,{style:y,$visible:s,className:u,"aria-label":a,"data-testid":"rotating-lines-loading",...i},r.createElement(x,{xmlns:c,viewBox:"0 0 48 48",width:m,height:t,stroke:n!=null?n:h,$animationDuration:o,speed:String(o),"aria-label":a,"data-testid":"rotating-lines-svg",...i},k())):null};export{F as RotatingLines};//# sourceMappingURL=rotating-lines.mjs.map
//# sourceMappingURL=rotating-lines.mjs.map