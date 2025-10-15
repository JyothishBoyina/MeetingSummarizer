import React from 'react';
import { S as Style } from './type-BnSIpOnX.js';

type Props = {
    wrapperStyle?: Style;
    visible?: boolean;
    wrapperClass?: string;
    height?: string | number;
    width?: string | number;
    color?: string;
    firstLineColor?: string;
    middleLineColor?: string;
    lastLineColor?: string;
    ariaLabel?: string;
};
/**
 * @description contains three lines in a wave motion
 * line colors are changeable
 */
declare const LineWave: React.FunctionComponent<Props>;

export { LineWave };
