(()=>{"use strict";let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="SAC artifacts" id="oPanel">\n        <f:GridContainer\n            id="grid1"\n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="300px">\n                <f:header>\n                <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                <m:List\n                    showSeparators="None"\n                    items="{products>/productItems}">\n                    <m:StandardListItem\n                    description="{products>description}"\n                    icon="{products>iconFile}"\n                    title="{products>id}" />\n                </m:List>\n                </f:content>\n            </f:Card>\n            </f:GridContainer>\n      </m:Panel>\n    </mvc:View>\n    <\/script>\n';class n extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._listOfItems={}}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}setListValue(e){this._listOfItems=e,this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{listOfItems:this._listOfItems}}}))}getListValue(){return this._listOfItems}buildUI(t,n){var i=n;let o=document.createElement("div");o.slot="content",i.appendChild(o),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){this.oPanel=this.byId("oPanel"),this.configGrid(this.get)},configGrid:function(e){var t=sap.ui.core.dnd.DropLayout,n=sap.ui.core.dnd.DropPosition,i=this.byId("grid1"),o=new sap.ui.model.json.JSONModel,s={productItems:[{id:"P_0123456",description:"Test 1",iconFile:"sap-icon://world"},{id:"P_1234567",description:"Test 2",iconFile:"sap-icon://call"},{id:"P_2345678",description:"Test 3",iconFile:"sap-icon://business-card"}]};this.setListValue(s),console.log(this.getListValue),o.setData(s),sap.ui.getCore().setModel(o,"products"),i.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),i.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:n.Between,dropLayout:t.Vertical,drop:function(e){var t=e.getParameter("draggedControl"),n=e.getParameter("droppedControl"),o=e.getParameter("dropPosition"),s=i.indexOfItem(t),r=i.indexOfItem(n);console.log("Drop Position"),console.log(r),i.removeItem(t),s<r&&r--,"After"===o&&r++,i.insertItem(t,r),i.focusItem(r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(o)}}customElements.define("ifm-drag",n)})();