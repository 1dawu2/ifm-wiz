(()=>{"use strict";let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="300px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class n extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._export_settings={},this._export_settings.listItems=[]}get listItems(){return this._export_settings.listItems}set listItems(e){this._export_settings.listItems=e}onCustomWidgetResize(e,t){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){"designMode"in e&&(this._designMode=e.designMode)}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}buildUI(t,n){var o=n;let i=document.createElement("div");i.slot="content",o.appendChild(i),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){this.oPanel=this.byId("oPanel"),console.log("--- on init ---"),console.log(o._export_settings.listItems),this.configGrid()},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,n=sap.ui.core.dnd.DropPosition,i=this.byId("listDragnDrop"),s=new sap.ui.model.json.JSONModel;console.log("--- changed properties ---"),console.log(t.listItems);var r=o._export_settings.listItems;console.log("--- my list ---"),console.log(r),s.setData(r),sap.ui.getCore().setModel(s,"products"),i.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),i.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:n.Between,dropLayout:e.Vertical,drop:function(e){var t=e.getParameter("draggedControl"),n=e.getParameter("droppedControl"),o=e.getParameter("dropPosition"),s=i.indexOfItem(t),r=i.indexOfItem(n);console.log("Drop Position"),console.log(r),i.removeItem(t),s<r&&r--,"After"===o&&r++,i.insertItem(t,r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(i)}}customElements.define("ifm-drag",n)})();