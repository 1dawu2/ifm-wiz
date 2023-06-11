import DataType from "./DataType.js";
/**
 * @class
 * DOM Element reference or ID.
 * <b>Note:</b> If an ID is passed, it is expected to be part of the same <code>document</code> element as the consuming component.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DOMReference
 * @public
 */
declare class DOMReference extends DataType {
    static isValid(value: string | HTMLElement): boolean;
    static propertyToAttribute(propertyValue: string | HTMLElement): string | null;
}
export default DOMReference;
