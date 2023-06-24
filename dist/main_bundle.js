(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class o extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this._props={},this._firstConnection=0,console.log(this.$list),this.buildUI(this)}prepareListData(t){console.log("list item for data preparation"),new sap.ui.model.json.JSONModel;var e={productItems:[]};for(const o in t)t.hasOwnProperty(o)&&(console.log(Object.values(o)),e.productItems=key);for(const t in e)e.hasOwnProperty(t)&&console.log(t)}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.$list=t.list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.prepareListData(this.$list)))}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"list"in t&&(this.$list=t.list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.prepareListData(this.$list)))}buildUI(e){var o=e;if(console.log("start build ui"),console.log(this.prepareListData(o.$list)),0===o._firstConnection){console.log("--First Time --");let t=document.createElement("div");t.slot="content",o.appendChild(t)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===e._firstConnection?(this.configGrid(),o._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,o=this.byId("listDragnDrop"),n=new sap.ui.model.json.JSONModel;console.log("config grid"),n.setData({productItems:[{id:"Website",description:"http://www.infomotion.de",iconFile:"sap-icon://world"},{id:"Telefon",description:"+49 69 56608 3231",iconFile:"sap-icon://call"},{id:"Mail",description:"david.wurm@infomotion.de",iconFile:"sap-icon://business-card"}]}),sap.ui.getCore().setModel(n,"products"),console.log("--- my product model ---"),console.log(n),o.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),o.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),n=t.getParameter("droppedControl"),i=t.getParameter("dropPosition"),s=o.indexOfItem(e),r=o.indexOfItem(n);console.log("Drop Position"),console.log(r),o.removeItem(e),s<r&&r--,"After"===i&&r++,o.insertItem(e,r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",o)})();