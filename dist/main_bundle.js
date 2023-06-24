(()=>{"use strict";let o,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class e extends HTMLElement{constructor(){console.log("constructor:"),super(),o=this.attachShadow({mode:"open"}),o.appendChild(t.content.cloneNode(!0)),this._props={},this._firstConnection=0,console.log(this.$list),this.buildUI(this)}prepareListData(o){if(console.log("list item for data preparation"),new sap.ui.model.json.JSONModel,Object.values(o).forEach((o=>console.log(o))),void 0!==o&&o)for(const t in o)if(o.hasOwnProperty(t))for(const o in t)t.hasOwnProperty(o)&&(console.log("list item from object:"),console.log(t+":"+o))}onCustomWidgetBeforeUpdate(o){this._props={...this._props,...o},console.log("before update:"),console.log(this._firstConnection),"list"in o&&(this.$list=o.list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.prepareListData(this.$list)))}onCustomWidgetAfterUpdate(o){console.log("after update:"),console.log(this._firstConnection),"list"in o&&(this.$list=o.list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.prepareListData(this.$list)))}buildUI(t){var e=t;if(console.log("start build ui"),console.log(this.prepareListData(e.$list)),0===e._firstConnection){console.log("--First Time --");let o=document.createElement("div");o.slot="content",e.appendChild(o)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(o){return o.extend("ifm.drag.initial",{onInit:function(o){console.log("-------oninit--------"),0===t._firstConnection?(this.configGrid(),e._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var o=sap.ui.core.dnd.DropLayout,t=sap.ui.core.dnd.DropPosition,e=this.byId("listDragnDrop"),n=new sap.ui.model.json.JSONModel;console.log("config grid"),n.setData({productItems:[{id:"Website",description:"http://www.infomotion.de",iconFile:"sap-icon://world"},{id:"Telefon",description:"+49 69 56608 3231",iconFile:"sap-icon://call"},{id:"Mail",description:"david.wurm@infomotion.de",iconFile:"sap-icon://business-card"}]}),sap.ui.getCore().setModel(n,"products"),console.log("--- my product model ---"),console.log(n),e.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),e.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:t.Between,dropLayout:o.Vertical,drop:function(o){var t=o.getParameter("draggedControl"),n=o.getParameter("droppedControl"),i=o.getParameter("dropPosition"),s=e.indexOfItem(t),r=e.indexOfItem(n);console.log("Drop Position"),console.log(r),e.removeItem(t),s<r&&r--,"After"===i&&r++,e.insertItem(t,r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(o.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",e)})();