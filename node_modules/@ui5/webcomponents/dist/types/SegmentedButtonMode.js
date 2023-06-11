/**
 * Different SegmentedButton modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.SegmentedButtonMode
 */
var SegmentedButtonMode;
(function (SegmentedButtonMode) {
    /**
     * There is always one selected. Selecting one deselects the previous one.
     * @public
     * @type {SingleSelect}
     */
    SegmentedButtonMode["SingleSelect"] = "SingleSelect";
    /**
     * Multiple items can be selected at a time. All items can be deselected.
     * @public
     * @type {MultiSelect}
     */
    SegmentedButtonMode["MultiSelect"] = "MultiSelect";
})(SegmentedButtonMode || (SegmentedButtonMode = {}));
export default SegmentedButtonMode;
//# sourceMappingURL=SegmentedButtonMode.js.map