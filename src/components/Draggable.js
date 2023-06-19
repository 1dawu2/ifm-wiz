let _shadowRoot;
let tmpl = document.createElement("template");
tmpl.innerHTML = `

`
export default class IFMDraggable extends HTMLElement {
    constructor() {
        super();

        _shadowRoot = this.attachShadow({
            mode: "open"
        });

        _shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this._export_settings = {};
        this._export_settings.listItems = "";
    }

    // SETTINGS
    get ListItems() {
        return this._export_settings.imgURL;
    }

    set ListItems(value) {
        this._export_settings.imgURL = value;
    }

    static get observedAttributes() {
        return [
            "listItems",
        ];
    }


    onCustomWidgetResize(width, height) {
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
        if ("designMode" in changedProperties) {
            this._designMode = changedProperties["designMode"];
        }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        this.buildUI(changedProperties, this);
    }


    buildUI(changedProperties, that) {

        var that_ = that;

        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.define(
            [
                "sap/ui/core/mvc/Controller",
                "sap/ui/export/Spreadsheet",
                "sap/f/dnd/GridDropInfo",
                "sap/ui/core/library",
            ],
            function (Controller) {
                "use strict";

                return Controller.extend("ifm.hack.initial", {

                });
            });

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView = new sap.ui.core.mvc.XMLView({
            viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
        });
        oView.placeAt(content);

    }



}
