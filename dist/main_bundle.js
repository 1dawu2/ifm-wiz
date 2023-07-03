(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n        controllerName="ifm.drag.initial"\n        xmlns:dnd="sap.ui.core.dnd"\n        xmlns:dnd-grid="sap.f.dnd"\n        xmlns:f="sap.f"\n        xmlns:card="sap.f.cards"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"        \n        xmlns:mvc="sap.ui.core.mvc">\n            <m:Panel\n                id="About">\n                <f:GridContainer\n                    id="grid1"\n                    snapToRow="true">\n                    <f:layout>\n                        <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n                    </f:layout>\n                    <f:Card width="400px">\n                        <f:header>\n                            <card:Header iconSrc="sap-icon://sort" title="Sort List" />\n                        </f:header>\n                        <f:content>\n                        <m:List\n                            showSeparators="All"\n                            items="{products>/productItems}"> \n                            <m:StandardListItem\n                                description="{products>description}"\n                                icon="{products>iconFile}"\n                                title="{products>id}" />\n                        </m:List>\n                        </f:content>\n                    </f:Card>\n                    </f:GridContainer>\n            </m:Panel>\n    </mvc:View>\n    <\/script>\n';class o extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this._props={},this._props.list={},this._firstConnection=0}get list(){return this._props.list}set list(t){this._props.list=t}getList(){return this.list}setList(t){this.list=t}_firePropertiesChanged(t){this.list=t,console.log("property change"),console.log(this.list),this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:t}}}))}static get observedAttributes(){return["list"]}attributeChangedCallback(t,e,o){e!=o&&(this[t]=o)}retrieveListData(t,e,o,n){var i=t[e][o];t[e].splice(o,1),t[e].splice(n,0,i)}updateList(t){console.log("oData update"),console.log(t);var e=[];void 0!==t&&t&&(Object.values(t).forEach((t=>e.push(t))),this._firePropertiesChanged(e))}prepareListData(t,e){var o={productItems:[]};return void 0!==t&&t&&(Object.values(t).forEach((t=>o.productItems.push(t))),this.updateList(o.productItems)),console.log("prepared list"),console.log(o),o}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),this.buildUI(t,this)}buildUI(e,o){var n=o;console.log("start build ui"),console.log("--First Time --");let i=document.createElement("div");i.slot="content",n.appendChild(i),sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),this.oPanel=this.byId("oPanel")},configList:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,o=this.byId("grid1"),i=new sap.ui.model.json.JSONModel;i.setData(n.prepareListData(n.list,"productItems")),sap.ui.getCore().setModel(i,"products"),o.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),o.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),i=t.getParameter("droppedControl"),r=t.getParameter("dropPosition"),s=o.indexOfItem(e),a=o.indexOfItem(i);o.removeItem(e),s<a&&a--,"After"===r&&a++;var d=sap.ui.getCore().getModel("products").oData;n.retrieveListData(d,"productItems",s,a),n.updateList(d),o.insertItem(e,a)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(i)}}customElements.define("ifm-drag",o)})();