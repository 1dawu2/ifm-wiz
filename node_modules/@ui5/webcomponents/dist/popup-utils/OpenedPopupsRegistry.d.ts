import Popup from "../Popup.js";
type RegisteredPopupT = {
    instance: Popup;
    parentPopovers: Array<Popup>;
};
declare const addOpenedPopup: (instance: Popup, parentPopovers?: Array<Popup>) => void;
declare const removeOpenedPopup: (instance: Popup) => void;
declare const getOpenedPopups: () => RegisteredPopupT[];
export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
