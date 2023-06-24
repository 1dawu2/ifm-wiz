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
            <f:Card width="500px">                
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
        // start constructor
        console.log("constructor:");
        super();

        _shadowRoot = this.attachShadow({
            mode: "open"
        });

        _shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this._props = {};
        this._firstConnection = 0;
        console.log(this.$list);
        this.buildUI(this);

    }

    prepareListData(listItems) {
        console.log("list item for data preparation");
        console.log(listItems);
        console.log(typeof listItems);
        var modelData = new sap.ui.model.json.JSONModel();
        var sacList = { "productItems": [] }
        // for (var i = 0; i < listItems.length; i++) {
        //     console.log(listItems[i].id);
        //     sacList["productItems"] = {
        //         "id": listItems[i].id,
        //         "description": listItems[i].description,
        //         "iconFile": listItems[i].iconFile
        //     };
        // };
        // console.log("prepare data");
        // console.log(sacList);
        // modelData.setData(sacList);
        // return modelData
    }

    // SETTINGS
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
        console.log("before update:");
        console.log(this._firstConnection);
        if ("list" in changedProperties) {
            this.$list = changedProperties["list"];
            if (typeof this.$list != 'undefined' && this.$list) {
                console.log(this.$list);
                this.prepareListData(this.$list);
            }
        }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        console.log("after update:");
        console.log(this._firstConnection);
        if ("list" in changedProperties) {
            this.$list = changedProperties["list"];
            if (typeof this.$list != 'undefined' && this.$list) {
                console.log(this.$list);
                this.prepareListData(this.$list);
            }
        }
    }

    buildUI(that) {
        var that_ = that;
        console.log("start build ui");
        console.log(this.prepareListData(that_.$list));

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
                        //this.oPanel = this.byId("oPanel");
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
                        modelProduct.setData(
                            {
                                "productItems": [
                                    {
                                        "id": "Website",
                                        "description": "http://www.infomotion.de",
                                        "iconFile": "sap-icon://world"
                                    },
                                    {
                                        "id": "Telefon",
                                        "description": "+49 69 56608 3231",
                                        "iconFile": "sap-icon://call"
                                    },
                                    {
                                        "id": "Mail",
                                        "description": "david.wurm@infomotion.de",
                                        "iconFile": "sap-icon://business-card"
                                    }
                                ]
                            }
                        );
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
