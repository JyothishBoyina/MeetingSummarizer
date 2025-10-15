import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface ProgressBarProps extends Omit<BaseProps, 'color'> {
    borderColor?: string;
    barColor?: string;
}
declare const ProgressBar: FunctionComponent<ProgressBarProps>;

export { ProgressBar };
