(()=>{"use strict";let t,o=document.createElement("template");o.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_draggable" name="ifm_draggable">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc"\n      height="100%">\n        <f:Card width="500px">                \n            <f:header>\n                <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n            </f:header>\n            <f:content>\n                <m:List\n                    showSeparators="All"\n                    id="listDragnDrop"                 \n                    items="{products>/productItems}">                        \n                    <m:StandardListItem\n                        description="{products>description}"\n                        icon="{products>iconFile}"\n                        title="{products>id}" />\n                </m:List>\n            </f:content>\n        </f:Card>\n    </mvc:View>\n    <\/script>\n';class e extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(o.content.cloneNode(!0)),this.addEventListener("click",(t=>{t=new Event("onClick"),this.dispatchEvent(t),this.fireChanged(t)})),this._props={},this._firstConnection=0,console.log(this.$list)}get sortedList(){return this.$sortedList}fireChanged(t){console.log("onClick triggerd"),console.log(t)}retrieveListData(t,o,e,s){var n=t[o][e];t[o].splice(e,1),t[o].splice(s,0,n),this.getSortedList(t[o])}setSortedList(t){this.$sortedList=t}prepareListData(t){console.log("list item for data preparation");var o={productItems:[]};return void 0!==t&&t&&Object.values(t).forEach((t=>o.productItems.push(t))),console.log("sac list"),console.log(o.productItems),o}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.$list=t.list),"sortedList"in t&&(this.$sortedList=t.sortedList)}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"sortedList"in t&&(this.$sortedList=t.sortedList,console.log("sorted list after update"),console.log(this.$sortedList)),"list"in t&&(this.$list=t.list,this.$sortedList=this.$list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.buildUI(this))),console.log("changed properties"),console.log(t)}buildUI(o){var e=o;if(console.log("start build ui"),0===e._firstConnection){console.log("--First Time --");let t=document.createElement("div");t.slot="content",e.appendChild(t)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===o._firstConnection?(this.configGrid(),e._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var t=sap.ui.core.dnd.DropLayout,o=sap.ui.core.dnd.DropPosition,s=this.byId("listDragnDrop"),n=new sap.ui.model.json.JSONModel;console.log("config grid"),n.setData(e.prepareListData(e.$list)),sap.ui.getCore().setModel(n,"products"),console.log("--- my product model ---"),console.log(n),s.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),s.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:o.Between,dropLayout:t.Vertical,drop:function(t){var o=t.getParameter("draggedControl"),n=t.getParameter("droppedControl"),i=t.getParameter("dropPosition"),r=s.indexOfItem(o),l=s.indexOfItem(n);console.log("sInsertPosition"),console.log(i),console.log("Drag Position: "),console.log(r),console.log("Drop Position"),console.log(l),s.removeItem(o),r<l&&l--,"After"===i&&l++;var d=sap.ui.getCore().getModel("products").oData;e.retrieveListData(d,"productItems",r,l),console.log("oData"),console.log(d),s.insertItem(o,l)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",e)})();