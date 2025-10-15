import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface RadioProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string, string];
}
declare const Radio: FunctionComponent<RadioProps>;

export { Radio };
