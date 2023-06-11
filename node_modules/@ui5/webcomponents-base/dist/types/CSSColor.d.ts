import DataType from "./DataType.js";
/**
 * @class
 * CSSColor data type.
 *
 * @extends sap.ui.webc.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.CSSColor
 * @public
 */
declare class CSSColor extends DataType {
    static isValid(value: string): boolean;
}
export default CSSColor;
