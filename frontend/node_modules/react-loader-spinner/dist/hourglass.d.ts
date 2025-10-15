import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.js';

interface HourglassProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string];
}
declare const Hourglass: FunctionComponent<HourglassProps>;

export { Hourglass };
