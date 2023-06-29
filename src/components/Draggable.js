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
        xmlns:f="sap.f"
        xmlns:card="sap.f.cards"
        xmlns:core="sap.ui.core"
        xmlns:m="sap.m"        
        xmlns:mvc="sap.ui.core.mvc">
        <m:NavContainer
            id="pageContainer"
            initialPage="root">
            <m:Page id="root">
                <m:OverflowToolbar>
                <m:ToolbarSpacer/>
                <m:Title text="Sort List"/>
                <m:ToolbarSpacer/>
                </m:OverflowToolbar>
                <m:Panel
                id="SortList">
                    <f:GridContainer
                    id="grid1"
                    snapToRow="true">
                        <f:layout>
                        <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />
                        </f:layout>
                        <f:Card width="400px">
                        <f:header>
                            <card:Header title="Kontakt" subtitle="David Wurm" />
                        </f:header>
                        <f:content>
                            <m:List
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
            </m:Page>
        </m:NavContainer>
    </mvc:View>
    </script>
`;

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
            this._fireEventChanged(event);
        });

        // handle variables
        this._props = {};
        this._props.list = {};
        this._firstConnection = 0;
    }

    // GETTER & SETTER
    get list() {
        return this._props.list;
    }

    set list(newList) {
        this._props.list = newList;
    }

    getList() {
        return this.list
    }

    setList(newList) {
        this.list = newList;
    }

    // HELPER
    _fireEventChanged(event) {
        console.log("onClick triggerd");
        console.log(event);
    }

    _firePropertiesChanged(value) {
        this.list = value;
        console.log("property change");
        console.log(this.list);
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
                properties: {
                    list: value
                }
            }
        }));
    }

    // Attribute Observer
    static get observedAttributes() {
        return [
            "list"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            this[name] = newValue;
        }
    }

    // CONTROL FLOW
    retrieveListData(listItems, modelIdentifier, fromIndex, toIndex) {
        var element = listItems[modelIdentifier][fromIndex];
        listItems[modelIdentifier].splice(fromIndex, 1);
        listItems[modelIdentifier].splice(toIndex, 0, element);
    }

    updateList(oData) {
        console.log("oData update");
        console.log(oData);
        var sacList = [];
        if (typeof oData != 'undefined' && oData) {
            Object.values(oData).forEach(
                val => sacList.push(val)
            );
            this._firePropertiesChanged(sacList);
        }
    }

    prepareListData(listItems, modelIdentifier) {
        var sacList = { "productItems": [] };

        if (typeof listItems != 'undefined' && listItems) {
            Object.values(listItems).forEach(
                val => sacList["productItems"].push(val)
            );
            this.updateList(sacList["productItems"]);
        }

        console.log("prepared list");
        console.log(sacList);

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
            this.list = changedProperties["list"];
        };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        console.log("after update:");
        console.log(this._firstConnection);
        if ("list" in changedProperties) {
            this.list = changedProperties["list"];
            if (typeof this.list != 'undefined' && this.list) {
                this.buildUI(this);
            };
        };

    }

    // Main UI Logic
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
                "sap/f/dnd/GridDropInfo",
                "sap/ui/core/library",
            ],
            function (Controller) {
                "use strict";

                return Controller.extend("ifm.drag.initial", {

                    onInit: function (oEvent) {
                        console.log("-------oninit--------");
                        if (that._firstConnection === 0) {
                            this.configList();
                            that_._firstConnection = 1;
                        } else {
                            console.log("--- not first connection ---");
                        }
                    },

                    configList: function () {
                        var DropLayout = sap.ui.core.dnd.DropLayout;
                        var DropPosition = sap.ui.core.dnd.DropPosition;
                        var oGrid = this.byId("listDragnDrop");
                        var modelProduct = new sap.ui.model.json.JSONModel();
                        modelProduct.setData(that_.prepareListData(that_.list, "productItems"));
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

                                oGrid.removeItem(oDragged);

                                if (iDragPosition < iDropPosition) {
                                    iDropPosition--;
                                }

                                if (sInsertPosition === "After") {
                                    iDropPosition++;
                                }

                                var oData = sap.ui.getCore().getModel("products").oData;

                                that_.retrieveListData(oData, "productItems", iDragPosition, iDropPosition);
                                that_.updateList(oData);
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