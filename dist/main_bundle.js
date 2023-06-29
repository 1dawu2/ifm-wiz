(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_draggable" name="ifm_draggable">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n        controllerName="ifm.drag.initial"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"        \n        xmlns:mvc="sap.ui.core.mvc">\n        <m:Page class=”sapUiResponsivePadding”>\n            <m:List\n                showSeparators="All"\n                id="ifmDragnDrop"\n                class="sapUiResponsiveMargin" \n                width="auto"               \n                items="{products>/productItems}">\n                    <m:headerToolbar>\n                        <m:Toolbar>\n                            <m:Title text="Sort List"/>\n                        </m:Toolbar>\n                    </m:headerToolbar>\n\n            </m:List>\n        </m:Page>\n    </mvc:View>\n    <\/script>\n';class o extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this.addEventListener("click",(t=>{t=new Event("onClick"),this.dispatchEvent(t),this._fireEventChanged(t)})),this._props={},this._props.list={},this._firstConnection=0}get list(){return this._props.list}set list(t){this._props.list=t}getList(){return this.list}setList(t){this.list=t}_fireEventChanged(t){console.log("onClick triggerd"),console.log(t)}_firePropertiesChanged(t){this.list=t,console.log("property change"),console.log(this.list),this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:t}}}))}static get observedAttributes(){return["list"]}attributeChangedCallback(t,e,o){e!=o&&(this[t]=o)}retrieveListData(t,e,o,i){var s=t[e][o];t[e].splice(o,1),t[e].splice(i,0,s)}updateList(t){console.log("oData update"),console.log(t);var e=[];void 0!==t&&t&&(Object.values(t).forEach((t=>e.push(t))),this._firePropertiesChanged(e))}prepareListData(t,e){var o={productItems:[]};return void 0!==t&&t&&(Object.values(t).forEach((t=>o.productItems.push(t))),this.updateList(o.productItems)),console.log("prepared list"),console.log(o),o}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list)}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list,void 0!==this.list&&this.list&&this.buildUI(this))}buildUI(e){var o=e;if(console.log("start build ui"),0===o._firstConnection){console.log("--First Time --");let t=document.createElement("div");t.slot="content",o.appendChild(t)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===e._firstConnection?(this.configGrid(),o._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,i=this.byId("ifmDragnDrop"),s=new sap.ui.model.json.JSONModel;s.setData(o.prepareListData(o.list,"productItems")),sap.ui.getCore().setModel(s,"products"),i.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),i.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),s=t.getParameter("droppedControl"),n=t.getParameter("dropPosition"),r=i.indexOfItem(e),a=i.indexOfItem(s);i.removeItem(e),r<a&&a--,"After"===n&&a++;var l=sap.ui.getCore().getModel("products").oData;o.retrieveListData(l,"productItems",r,a),o.updateList(l),i.insertItem(e,a)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",o)})();