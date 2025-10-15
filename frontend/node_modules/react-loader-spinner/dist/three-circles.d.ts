import React from 'react';
import { S as Style } from './type-BnSIpOnX.js';

type Props = {
    wrapperStyle?: Style;
    visible?: boolean;
    wrapperClass?: string;
    height?: string | number;
    width?: string | number;
    color?: string;
    outerCircleColor?: string;
    innerCircleColor?: string;
    middleCircleColor?: string;
    ariaLabel?: string;
};
/**
 * @description contains three circles rotating in opposite direction
 * outer circle, middle circle and inner circle color can be set from props.
 */
declare const ThreeCircles: React.FunctionComponent<Props>;

export { ThreeCircles };
