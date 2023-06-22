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
      xmlns:card="sap.f.cards"
      xmlns:mvc="sap.ui.core.mvc">
      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">
        <f:GridContainer            
            snapToRow="true">
            <f:layout>
                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />
            </f:layout>
            <f:Card width="300px">                
                <f:header>
                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />
                </f:header>
                <f:content>
                    <m:List
                        id="listDragnDrop"
                        showSeparators="None"                    
                        items="{products>/productItems}">                        
                        <m:StandardListItem
                            description="{products>description}"
                            icon="{products>iconFile}"
                            title="{products>id}" />
                    </m:List>
                </f:content>
            </f:Card>
        </f:GridContainer>
        </m:Panel>
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
        this._export_settings.listItems = [];

    }

    // SETTINGS
    get listItems() {
        return this._export_settings.listItems;
    }

    set listItems(newListItems) {
        this._export_settings.listItems = newListItems;
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


                    onInit: function (oEvent) {
                        this.oPanel = this.byId("oPanel");
                        console.log("--- on init ---");
                        console.log(that_._export_settings.listItems);
                        this.configGrid();
                    },

                    configGrid: function () {
                        var DropLayout = sap.ui.core.dnd.DropLayout;
                        var DropPosition = sap.ui.core.dnd.DropPosition;
                        var oGrid = this.byId("listDragnDrop");
                        var modelProduct = new sap.ui.model.json.JSONModel();
                        console.log("--- changed properties ---");
                        console.log(changedProperties['listItems']);
                        var myList = that_._export_settings.listItems;
                        modelProduct.setData(myList);

                        sap.ui.getCore().setModel(modelProduct, "products");

                        oGrid.addDragDropConfig(new sap.ui.core.dnd.DragInfo({
                            sourceAggregation: "items"
                        }));

                        oGrid.addDragDropConfig(new sap.f.dnd.GridDropInfo({
                            targetAggregation: "items",
                            dropPosition: DropPosition.Between,
                            dropLayout: DropLayout.Vertical,
                            drop: function (oInfo) {
                                var oDragged = oInfo.getParameter("draggedControl"),
                                    oDropped = oInfo.getParameter("droppedControl"),
                                    sInsertPosition = oInfo.getParameter("dropPosition"),
                                    iDragPosition = oGrid.indexOfItem(oDragged),
                                    iDropPosition = oGrid.indexOfItem(oDropped);
                                console.log("Drop Position");
                                console.log(iDropPosition);

                                oGrid.removeItem(oDragged);

                                if (iDragPosition < iDropPosition) {
                                    iDropPosition--;
                                }

                                if (sInsertPosition === "After") {
                                    iDropPosition++;
                                }

                                oGrid.insertItem(oDragged, iDropPosition);
                                //oGrid.focusItem(iDropPosition);
                            }
                        }));
                    },

                });
            });

        //### THE APP: place the XMLView somewhere into DOM ###
        var oView = new sap.ui.core.mvc.XMLView({
            viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
        });
        oView.placeAt(content);

    }
}
