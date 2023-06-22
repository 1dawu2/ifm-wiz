(()=>{"use strict";let e,n=document.createElement("template");n.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class t extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(n.content.cloneNode(!0)),this._props={},console.log("constructor props"),console.log(`${this._props.sac_list}`),this.buildUI()}onCustomWidgetResize(e,n){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){this._props={...this._props,...e}}onCustomWidgetAfterUpdate(e){"sac_list"in e?this.sac_list=e.sac_list:console.log("no property found")}buildUI(){let n=document.createElement("div");n.slot="content",this.appendChild(n),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){this.configGrid()},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,n=sap.ui.core.dnd.DropPosition,t=this.byId("listDragnDrop"),o=new sap.ui.model.json.JSONModel,i=this.listItems;console.log("--- my list ---"),console.log(i),o.setData({productItems:[{id:"Website",description:"http://www.infomotion.de",iconFile:"sap-icon://world"},{id:"Telefon",description:"+49 69 56608 3231",iconFile:"sap-icon://call"},{id:"Mail",description:"david.wurm@infomotion.de",iconFile:"sap-icon://business-card"}]}),sap.ui.getCore().setModel(o,"products"),console.log("--- my product model ---"),console.log(o),t.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),t.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:n.Between,dropLayout:e.Vertical,drop:function(e){var n=e.getParameter("draggedControl"),o=e.getParameter("droppedControl"),i=e.getParameter("dropPosition"),r=t.indexOfItem(n),s=t.indexOfItem(o);console.log("Drop Position"),console.log(s),t.removeItem(n),r<s&&s--,"After"===i&&s++,t.insertItem(n,s)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(n)}}customElements.define("ifm-drag",t)})();