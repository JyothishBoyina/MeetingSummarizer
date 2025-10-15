import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.js';

interface DiscussProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string];
}
declare const Discuss: FunctionComponent<DiscussProps>;

export { Discuss };
