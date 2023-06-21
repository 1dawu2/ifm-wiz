(()=>{"use strict";let e,n=document.createElement("template");n.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="300px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            rank="{products>rank}"\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class t extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(n.content.cloneNode(!0)),this._props={}}onCustomWidgetResize(e,n){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){this._props={...this._props,...e},console.log(`${this._props.listItems}`)}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}buildUI(n,t){console.log("changedProperties:"),console.log(n);var o=t;let i=document.createElement("div");i.slot="content",o.appendChild(i),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){this.oPanel=this.byId("oPanel"),this.configGrid(this.get),console.log("--- onInit ---"),console.log(this._listOfItems)},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,n=sap.ui.core.dnd.DropPosition,t=this.byId("listDragnDrop"),o=new sap.ui.model.json.JSONModel;console.log("--- JSON Model omit configGrid ---"),console.log(this._listItems);var i={productItems:[{id:"P_0123456",description:"Test 1",iconFile:"sap-icon://numbered-text",rank:1},{id:"P_1234567",description:"Test 2",iconFile:"sap-icon://numbered-text",rank:2},{id:"P_2345678",description:"Test 3",iconFile:"sap-icon://numbered-text",rank:3}]};this._listOfItems=i,console.log("--- list after assignment ---"),console.log(this._listOfItems),o.setData(i),sap.ui.getCore().setModel(o,"products"),t.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),t.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:n.Between,dropLayout:e.Vertical,drop:function(e){var n=e.getParameter("draggedControl"),o=e.getParameter("droppedControl"),i=e.getParameter("dropPosition"),s=t.indexOfItem(n),r=t.indexOfItem(o);console.log("Drop Position"),console.log(r),t.removeItem(n),s<r&&r--,"After"===i&&r++,t.insertItem(n,r),t.focusItem(r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(i)}}customElements.define("ifm-drag",t)})();