import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.js';

interface DNAProps extends Omit<BaseProps, 'color'> {
    /**
     * The primary color of the DNA loader strands.
     * @default 'rgba(233, 12, 89, 0.51)'
     */
    dnaColorOne?: string;
    /**
     * The secondary color of the DNA loader strands.
     * @default '#46dff0'
     */
    dnaColorTwo?: string;
}
declare const DNA: FunctionComponent<DNAProps>;

export { DNA };
