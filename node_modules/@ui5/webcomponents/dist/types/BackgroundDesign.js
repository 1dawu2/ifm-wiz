/**
 * Defines background designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BackgroundDesign
 */
var BackgroundDesign;
(function (BackgroundDesign) {
    /**
     * A solid background color dependent on the theme.
     * @public
     * @type {Solid}
     */
    BackgroundDesign["Solid"] = "Solid";
    /**
     * Transparent background.
     * @public
     * @type {Transparent}
     */
    BackgroundDesign["Transparent"] = "Transparent";
    /**
     * A translucent background depending on the opacity value of the theme.
     * @public
     * @type {Translucent}
     */
    BackgroundDesign["Translucent"] = "Translucent";
})(BackgroundDesign || (BackgroundDesign = {}));
export default BackgroundDesign;
//# sourceMappingURL=BackgroundDesign.js.map