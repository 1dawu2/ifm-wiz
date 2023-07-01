(()=>{"use strict";let t,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_draggable" name="ifm_draggable">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n        controllerName="ifm.drag.initial"\n        xmlns:l="sap.ui.layout"  \n        xmlns:dnd="sap.ui.core.dnd"\n        xmlns:dnd-grid="sap.f.dnd"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"        \n        xmlns:mvc="sap.ui.core.mvc"\n        xmlns:f="sap.f"\n        xmlns:card="sap.f.cards">\n            <f:GridContainer\n                id="gridContainer"\n                snapToRow="true">\n                    <f:layout>\n                        <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n                    </f:layout>\n                    <f:Card>\n                        <f:header>\n                            <card:Header iconSrc="sap-icon://sort" title="Sort List" />\n                        </f:header>\n                    <f:content>\n                        <f:GridList\n\t\t\t                id="listDragnDrop"\n\t\t\t                headerText="Header"\n                            items="{products>/productItems}">\n                                <f:GridListItem>\n                                    <m:VBox height="100%">\n                                        <m:VBox class="sapUiSmallMargin">\n                                            <m:layoutData>\n                                                <FlexItemData growFactor="1" shrinkFactor="0" />\n                                            </m:layoutData>\n                                            <core:Icon\n                                                src="{products>iconFile}"\n                                                class="sapUiTinyMarginBottom" />\n                                            <m:Title text="{products>id}" wrapping="true" />\n                                            <m:Label text="{products>description}" wrapping="true" />\n                                        </m:VBox>\n                                    </m:VBox>\n\t\t\t                    </f:GridListItem>\n                        </f:GridList>\n                    </f:content>\n                    </f:Card>\n\t\t\t</f:GridContainer>\t\t\t\t \n    </mvc:View>\n    <\/script>\n';class i extends HTMLElement{constructor(){console.log("constructor:"),super(),t=this.attachShadow({mode:"open"}),t.appendChild(e.content.cloneNode(!0)),this.addEventListener("click",(t=>{t=new Event("onClick"),this.dispatchEvent(t),this._fireEventChanged(t)})),this._props={},this._props.list={},this._firstConnection=0}get list(){return this._props.list}set list(t){this._props.list=t}getList(){return this.list}setList(t){this.list=t}_fireEventChanged(t){console.log("onClick triggerd"),console.log(t)}_firePropertiesChanged(t){this.list=t,console.log("property change"),console.log(this.list),this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:t}}}))}static get observedAttributes(){return["list"]}attributeChangedCallback(t,e,i){e!=i&&(this[t]=i)}retrieveListData(t,e,i,n){var o=t[e][i];t[e].splice(i,1),t[e].splice(n,0,o)}updateList(t){console.log("oData update"),console.log(t);var e=[];void 0!==t&&t&&(Object.values(t).forEach((t=>e.push(t))),this._firePropertiesChanged(e))}prepareListData(t,e){var i={productItems:[]};return void 0!==t&&t&&(Object.values(t).forEach((t=>i.productItems.push(t))),this.updateList(i.productItems)),console.log("prepared list"),console.log(i),i}onCustomWidgetDestroy(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(t){this._props={...this._props,...t},console.log("before update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list)}onCustomWidgetAfterUpdate(t){console.log("after update:"),console.log(this._firstConnection),"list"in t&&(this.list=t.list,void 0!==this.list&&this.list&&this.buildUI(this))}buildUI(e){var i=e;console.log("start build ui"),console.log("--First Time --");let n=document.createElement("div");n.slot="content",i.appendChild(n),sap.ui.define(["sap/ui/core/mvc/Controller","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(t){return t.extend("ifm.drag.initial",{onInit:function(t){console.log("-------oninit--------"),0===e._firstConnection?(this.configList(),i._firstConnection=1):console.log("--- not first connection ---")},configList:function(){var t=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,n=this.byId("listDragnDrop"),o=new sap.ui.model.json.JSONModel;o.setData(i.prepareListData(i.list,"productItems")),sap.ui.getCore().setModel(o,"products"),n.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),n.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:t.Vertical,drop:function(t){var e=t.getParameter("draggedControl"),n=t.getParameter("droppedControl"),o=t.getParameter("dropPosition"),s=e.getParent(),r=this.getView().getModel(),a=r.getProperty("/items"),l=s.indexOfItem(e),d=s.indexOfItem(n),c=a[l];a.splice(l,1),l<d&&d--,"Before"===o?a.splice(d,0,c):a.splice(d+1,0,c),r.setProperty("/items",a);var p=sap.ui.getCore().getModel("products").oData;i.retrieveListData(p,"productItems",l,d),i.updateList(p)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(n)}}customElements.define("ifm-drag",i)})();