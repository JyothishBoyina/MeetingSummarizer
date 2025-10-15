import React from 'react';
import { S as Style } from './type-BnSIpOnX.mjs';

type Props = {
    wrapperStyle?: Style;
    visible?: boolean;
    wrapperClass?: string;
    height?: string | number;
    width?: string | number;
    color?: string;
    outerCircleColor?: string;
    innerCircleColor?: string;
    barColor?: string;
    ariaLabel?: string;
};
/**
 * @description contains two circles rotating in opposite direction
 * and a wave bars. outer circle, inner circle and bar
 * color can be set from props.
 */
declare const CirclesWithBar: React.FunctionComponent<Props>;

export { CirclesWithBar };
