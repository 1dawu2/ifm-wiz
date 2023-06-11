/**
 * Gets the effective RTL setting by first checking the configuration
 * and if not set using the currently set language or the navigator language if the language is not explicitly set.
 * @returns {boolean} whether RTL should be used
 */
declare const getRTL: () => boolean;
export { getRTL };
