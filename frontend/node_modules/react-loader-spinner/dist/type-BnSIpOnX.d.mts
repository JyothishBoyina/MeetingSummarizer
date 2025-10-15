type Style = {
    [key: string]: string;
};
interface PrimaryProps {
    height?: string | number;
    width?: string | number;
    ariaLabel?: string;
    wrapperStyle?: Style;
    wrapperClass?: string;
    visible?: boolean;
}
interface BaseProps extends PrimaryProps {
    color?: string;
    /**
     * Provide multiple colors to render a gradient instead of a solid color.
     * When 2 or more colors are supplied a gradient <defs> will be injected and
     * the primary color reference (fill or stroke) becomes url(#gradientId).
     */
    colors?: string[];
    /** Type of gradient (linear or radial). Defaults to linear. */
    gradientType?: 'linear' | 'radial';
    /** Angle (in degrees) applied via rotate() transform for linear gradients. */
    gradientAngle?: number;
}

export type { BaseProps as B, PrimaryProps as P, Style as S };
