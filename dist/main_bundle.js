(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_draggable" name="ifm_draggable">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:m="sap.m"\n      xmlns:mvc="sap.ui.core.mvc">\n        <m:List\n            showSeparators="All"\n            id="listDragnDrop"                 \n            items="{products>/productItems}">                        \n            <m:StandardListItem\n                description="{products>description}"\n                icon="{products>iconFile}"\n                title="{products>id}" />\n        </m:List>\n    </mvc:View>\n    <\/script>\n';class o extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this.addEventListener("click",(t=>{t=new Event("onClick"),this.dispatchEvent(t),this.fireChanged(t)})),this._props={},this._firstConnection=0}fireChanged(t){console.log("onClick triggerd"),console.log(t)}retrieveListData(t,e,o,i){var n=t[e][o];t[e].splice(o,1),t[e].splice(i,0,n)}updateList(t){console.log("oData update"),console.log(t);var e={};void 0!==t&&t&&(Object.values(t).forEach((t=>e.push(t))),this.$list=e)}prepareListData(t,e){var o={productItems:[]};return void 0!==t&&t&&(Object.values(t).forEach((t=>o.productItems.push(t))),this.updateList(o.productItems)),o}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.$list=t.list)}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"list"in t&&(this.$list=t.list,void 0!==this.$list&&this.$list&&this.buildUI(this))}static get observedAttributes(){return["list"]}attributeChangedCallback(t,e,o){e!=o&&(this[t]=o)}buildUI(e){var o=e;if(console.log("start build ui"),0===o._firstConnection){console.log("--First Time --");let t=document.createElement("div");t.slot="content",o.appendChild(t)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===e._firstConnection?(this.configGrid(),o._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,i=this.byId("listDragnDrop"),n=new sap.ui.model.json.JSONModel;n.setData(o.prepareListData(o.$list,"productItems")),sap.ui.getCore().setModel(n,"products"),i.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),i.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),n=t.getParameter("droppedControl"),s=t.getParameter("dropPosition"),r=i.indexOfItem(e),a=i.indexOfItem(n);i.removeItem(e),r<a&&a--,"After"===s&&a++;var d=sap.ui.getCore().getModel("products").oData;o.retrieveListData(d,"productItems",r,a),o.updateList(d),i.insertItem(e,a)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",o)})();