let _shadowRoot;
let tmpl = document.createElement("template");
tmpl.innerHTML = `
    <style>
    </style>
    <div id="ifm_hack_content" name="ifm_hack_content">
      <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
      controllerName="ifm.drag.initial"
	  xmlns:grid="sap.ui.layout.cssgrid"
	  xmlns:dnd="sap.ui.core.dnd"
	  xmlns:dnd-grid="sap.f.dnd"
      xmlns:core="sap.ui.core"
      xmlns:t="sap.ui.table"
      xmlns:m="sap.m"
      xmlns:f="sap.f"
      xmlns:mvc="sap.ui.core.mvc">
	    <Panel id="panelForGridList" backgroundDesign="Transparent">
		<headerToolbar>
			<Toolbar height="3rem">
				<Title text="Grid List with Drag and Drop"/>
			</Toolbar>
		</headerToolbar>
		<f:GridList
			id="gridList"
			headerText="GridList header">
			<f:dragDropConfig>
				<dnd:DragInfo sourceAggregation="items" />
				<dnd-grid:GridDropInfo targetAggregation="items" dropPosition="Between" dropLayout="Horizontal" drop="onDrop" />
			</f:dragDropConfig>
			<f:customLayout>
				<grid:GridBoxLayout boxMinWidth="17rem" />
			</f:customLayout>
			<f:GridListItem>
				<VBox height="100%">
					<VBox class="sapUiSmallMargin">
						<layoutData>
							<FlexItemData growFactor="1" shrinkFactor="0" />
						</layoutData>
						<Title text="Title" wrapping="true" />
						<Label text="Subtitle" wrapping="true" />
					</VBox>
				</VBox>
			</f:GridListItem>
		</f:GridList>
	    </Panel>
    </mvc:View>
    </script>
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

                return Controller.extend("ifm.drag.initial", {

                });
            });

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView = new sap.ui.core.mvc.XMLView({
            viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
        });
        oView.placeAt(content);

    }



}
