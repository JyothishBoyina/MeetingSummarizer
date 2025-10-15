import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface FidgetSpinnerProps extends Omit<BaseProps, 'color'> {
    backgroundColor?: string;
    ballColors?: [string, string, string];
}
declare const FidgetSpinner: FunctionComponent<FidgetSpinnerProps>;

export { FidgetSpinner };
