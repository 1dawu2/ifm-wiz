import { PropertyValue } from "../UI5ElementMetadata.js";
/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DataType
 * @public
 */
declare class DataType {
    /**
     * Checks if the value is valid for its data type.
     * @public
     * @abstract
     * @returns {Boolean}
     */
    static isValid(value: any): boolean;
    static attributeToProperty(attributeValue: string | null): PropertyValue;
    static propertyToAttribute(propertyValue: PropertyValue): string | null;
    static valuesAreEqual(value1: any, value2: any): boolean;
    static generateTypeAccessors(types: Record<string, string>): void;
    static get isDataTypeClass(): boolean;
}
export default DataType;
