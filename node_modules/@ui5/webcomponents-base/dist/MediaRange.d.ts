type Range = Map<string, Array<number>>;
/**
 * Enumeration containing the names and settings of predefined screen width media query range sets.
 *
 * @namespace
 * @name MediaRange.RANGESETS
 * @public
 */
declare enum RANGESETS {
    /**
     * A 4-step range set (S-M-L-XL).
     *
     * The ranges of this set are:
     * <ul>
     * <li><code>"S"</code>: For screens smaller than 600 pixels.</li>
     * <li><code>"M"</code>: For screens greater than or equal to 600 pixels and smaller than 1024 pixels.</li>
     * <li><code>"L"</code>: For screens greater than or equal to 1024 pixels and smaller than 1440 pixels.</li>
     * <li><code>"XL"</code>: For screens greater than or equal to 1440 pixels.</li>
     * </ul>
     *
     * @name MediaRange.RANGESETS.RANGE_4STEPS
     * @public
     */
    RANGE_4STEPS = "4Step"
}
/**
 * API for screen width changes.
 *
 * @namespace
 * @name MediaRange
 */
declare const MediaRange: {
    RANGESETS: typeof RANGESETS;
    initRangeSet: (name: string, range: Range) => void;
    getCurrentRange: (name: string, width?: number) => string;
};
export default MediaRange;
