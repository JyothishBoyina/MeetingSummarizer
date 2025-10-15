import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.js';

interface VortexProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string, string, string, string, string];
}
declare const Vortex: FunctionComponent<VortexProps>;

export { Vortex };
