import { FunctionComponent } from 'react';
import { B as BaseProps } from './type-BnSIpOnX.mjs';

interface RotatingTrianglesProps extends Omit<BaseProps, 'color'> {
    colors?: [string, string, string];
}
declare const RotatingTriangles: FunctionComponent<RotatingTrianglesProps>;

export { RotatingTriangles };
