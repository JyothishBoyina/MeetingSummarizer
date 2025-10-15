import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface ColorRingProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string, string, string, string];
}
declare const ColorRing: FunctionComponent<ColorRingProps>;

export { ColorRing };
