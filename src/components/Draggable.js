let _shadowRoot;
let tmpl = document.createElement("template");
tmpl.innerHTML = `
    <style>
    </style>
    <div id="ifm_draggable" name="ifm_draggable">
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
      xmlns:mvc="sap.ui.core.mvc"
      height="100%">
        <f:Card width="500px">                
            <f:header>
                <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />
            </f:header>
            <f:content>
                <m:List
                    showSeparators="All"
                    id="listDragnDrop"                 
                    items="{products>/productItems}">                        
                    <m:StandardListItem
                        description="{products>description}"
                        icon="{products>iconFile}"
                        title="{products>id}" />
                </m:List>
            </f:content>
        </f:Card>
    </mvc:View>
    </script>
`
export default class IFMDraggable extends HTMLElement {
    constructor() {
        // start constructor
        console.log("constructor:");
        super();

        // handle shadow DOM
        _shadowRoot = this.attachShadow({
            mode: "open"
        });

        _shadowRoot.appendChild(tmpl.content.cloneNode(true));

        // handle events
        this.addEventListener("click", event => {
            var event = new Event("onClick");
            this.dispatchEvent(event);
            this.fireChanged(event);
        });

        // handle variables
        this._props = {};
        this._firstConnection = 0;
        console.log(this.$list);
    }

    // HELPER
    fireChanged(event) {
        console.log("onClick triggerd");
        console.log(event);
    }

    retrieveListData(listItems, modelIdentifier, fromIndex, toIndex) {
        var element = listItems[modelIdentifier][fromIndex];
        listItems[modelIdentifier].splice(fromIndex, 1);
        listItems[modelIdentifier].splice(toIndex, 0, element);
        this.$sortedList = listItems[modelIdentifier];
        console.log("sorted list items");
        console.log(this.$sortedList);

        return this.$sortedList;
    }

    prepareListData(listItems) {
        console.log("list item for data preparation");
        var sacList = { "productItems": [] };

        if (typeof listItems != 'undefined' && listItems) {
            Object.values(listItems).forEach(
                val => sacList["productItems"].push(val)
            );
        }
        console.log("sac list");
        console.log(sacList["productItems"]);

        return sacList
    }

    // CLEAN-UP
    onCustomWidgetDestroy() {

    }

    disconnectedCallback() {

    }

    // SETTINGS
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
        console.log("before update:");
        console.log(this._firstConnection);
        if ("list" in changedProperties) {
            this.$list = changedProperties["list"];
        }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        console.log("after update:");
        console.log(this._firstConnection);
        if ("list" in changedProperties) {
            this.$list = changedProperties["list"];
            if (typeof this.$list != 'undefined' && this.$list) {
                console.log(this.$list);
                this.buildUI(this);
            }
        }
        if ("sortedList" in changedProperties) {
            this.$sortedList = changedProperties["sortedList"];
        }
    }

    buildUI(that) {
        var that_ = that;

        console.log("start build ui");

        if (that_._firstConnection === 0) {
            console.log("--First Time --");
            let content = document.createElement('div');
            content.slot = "content";
            that_.appendChild(content);
        }

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
                        // this.oPanel = this.byId("oPanel");
                        console.log("-------oninit--------");
                        if (that._firstConnection === 0) {
                            this.configGrid();
                            that_._firstConnection = 1;
                        } else {
                            console.log("--- not first connection ---");
                        }
                    },

                    configGrid: function () {
                        var DropLayout = sap.ui.core.dnd.DropLayout;
                        var DropPosition = sap.ui.core.dnd.DropPosition;
                        var oGrid = this.byId("listDragnDrop");
                        var modelProduct = new sap.ui.model.json.JSONModel();
                        console.log("config grid");
                        modelProduct.setData(that_.prepareListData(that_.$list));
                        sap.ui.getCore().setModel(modelProduct, "products");
                        console.log("--- my product model ---");
                        console.log(modelProduct);

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
                                console.log("sInsertPosition");
                                console.log(sInsertPosition);
                                console.log("Drag Position: ");
                                console.log(iDragPosition);
                                console.log("Drop Position");
                                console.log(iDropPosition);

                                oGrid.removeItem(oDragged);

                                if (iDragPosition < iDropPosition) {
                                    iDropPosition--;
                                }

                                if (sInsertPosition === "After") {
                                    iDropPosition++;
                                }

                                var oData = sap.ui.getCore().getModel("products").oData;

                                that_.retrieveListData(oData, "productItems", iDragPosition, iDropPosition);
                                console.log("oData");
                                console.log(oData)
                                oGrid.insertItem(oDragged, iDropPosition);
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
