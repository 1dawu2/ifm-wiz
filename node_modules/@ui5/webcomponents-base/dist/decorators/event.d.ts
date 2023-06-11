import { EventData } from "../UI5ElementMetadata.js";
/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
declare const event: (name: string, data?: EventData) => ClassDecorator;
export default event;
