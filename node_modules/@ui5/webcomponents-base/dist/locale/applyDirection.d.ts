/**
 * Re-renders all RTL-aware UI5 Elements.
 *
 * <b>Note:</b> Call this method whenever you change the "dir" property anywhere in your HTML page.
 * <b>Example:</b> <code>document.body.dir = "rtl"; applyDirection();</code>
 * @public
 * @returns {Promise<void>}
 */
declare const applyDirection: () => Promise<void>;
export default applyDirection;
