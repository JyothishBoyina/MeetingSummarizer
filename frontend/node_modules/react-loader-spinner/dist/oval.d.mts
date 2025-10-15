import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface OvalProps extends BaseProps {
    strokeWidth?: string | number;
    strokeWidthSecondary?: string | number;
    secondaryColor?: string;
    animationDuration?: string | number;
}
declare const Oval: FunctionComponent<OvalProps>;

export { Oval };
