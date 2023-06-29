(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_draggable" name="ifm_draggable">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n        controllerName="ifm.drag.initial"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"        \n        xmlns:mvc="sap.ui.core.mvc">\n            <m:VBox>\n                <m:Panel headerText="Sort List Items">            \n                    <m:FlexBox\n                        height="100%"\n                        alignItems="Start"\n                        justifyContent="Center">\n                            <m:List\n                                showSeparators="All"\n                                id="listDragnDrop"                 \n                                items="{products>/productItems}">                        \n                                    <m:StandardListItem\n                                        description="{products>description}"\n                                        icon="{products>iconFile}"\n                                        title="{products>id}" />\n                            </m:List>\n                    </m:FlexBox>\n                </m:Panel>\n            </m:VBox>\n    </mvc:View>\n    <\/script>\n';class i extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this.addEventListener("click",(t=>{t=new Event("onClick"),this.dispatchEvent(t),this._fireEventChanged(t)})),this._props={},this._props.list={},this._firstConnection=0}get list(){return this._props.list}set list(t){this._props.list=t}getList(){return this.list}setList(t){this.list=t}_fireEventChanged(t){console.log("onClick triggerd"),console.log(t)}_firePropertiesChanged(t){this.list=t,console.log("property change"),console.log(this.list),this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:t}}}))}static get observedAttributes(){return["list"]}attributeChangedCallback(t,e,i){e!=i&&(this[t]=i)}retrieveListData(t,e,i,o){var n=t[e][i];t[e].splice(i,1),t[e].splice(o,0,n)}updateList(t){console.log("oData update"),console.log(t);var e=[];void 0!==t&&t&&(Object.values(t).forEach((t=>e.push(t))),this._firePropertiesChanged(e))}prepareListData(t,e){var i={productItems:[]};return void 0!==t&&t&&(Object.values(t).forEach((t=>i.productItems.push(t))),this.updateList(i.productItems)),console.log("prepared list"),console.log(i),i}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list)}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list,void 0!==this.list&&this.list&&this.buildUI(this))}buildUI(e){var i=e;if(console.log("start build ui"),0===i._firstConnection){console.log("--First Time --");let t=document.createElement("div");t.slot="content",i.appendChild(t)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===e._firstConnection?(this.configGrid(),i._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,o=this.byId("listDragnDrop"),n=new sap.ui.model.json.JSONModel;n.setData(i.prepareListData(i.list,"productItems")),sap.ui.getCore().setModel(n,"products"),o.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),o.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),n=t.getParameter("droppedControl"),s=t.getParameter("dropPosition"),r=o.indexOfItem(e),a=o.indexOfItem(n);o.removeItem(e),r<a&&a--,"After"===s&&a++;var l=sap.ui.getCore().getModel("products").oData;i.retrieveListData(l,"productItems",r,a),i.updateList(l),o.insertItem(e,a)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",i)})();