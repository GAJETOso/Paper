/** Typed access to the Sylvara design tokens. */
import tokens from "../tokens/tokens.json";

export { tokens };
export type DesignTokens = typeof tokens;

export const colors = tokens.color;
export const radii = tokens.radius;
export const shadows = tokens.shadow;
export const motion = tokens.motion;
