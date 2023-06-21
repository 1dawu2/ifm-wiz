(()=>{"use strict";let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="300px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class n extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._export_settings={},this._export_settings.listItems=[]}get listItems(){return this._export_settings.listItems}set listItems(e){this._export_settings.restapiurl=e}onCustomWidgetResize(e,t){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){"designMode"in e&&(this._designMode=e.designMode)}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}buildUI(t,n){console.log("changedProperties:"),console.log(t);var i=n;let o=document.createElement("div");o.slot="content",i.appendChild(o),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){this.oPanel=this.byId("oPanel"),this.configGrid(this.get)},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,t=sap.ui.core.dnd.DropPosition,n=this.byId("listDragnDrop"),i=new sap.ui.model.json.JSONModel,o=this._props.listItems;i.setData(o),sap.ui.getCore().setModel(i,"products"),n.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),n.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:t.Between,dropLayout:e.Vertical,drop:function(e){var t=e.getParameter("draggedControl"),i=e.getParameter("droppedControl"),o=e.getParameter("dropPosition"),r=n.indexOfItem(t),s=n.indexOfItem(i);console.log("Drop Position"),console.log(s),n.removeItem(t),r<s&&s--,"After"===o&&s++,n.insertItem(t,s)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(o)}}customElements.define("ifm-drag",n)})();