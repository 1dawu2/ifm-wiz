(()=>{"use strict";let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class n extends HTMLElement{constructor(){console.log("constructor:"),super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._props={},this._firstConnection=0,console.log(this.$list)}prepareListData(e){console.log("list item for data preparation");var t={productItems:[]};return void 0!==e&&e&&Object.values(e).forEach((e=>t.productItems.push(e))),console.log("sac list"),console.log(t.productItems),t}onCustomWidgetBeforeUpdate(e){this._props={...this._props,...e},console.log("before update:"),console.log(this._firstConnection),"list"in e&&(this.$list=e.list)}onCustomWidgetAfterUpdate(e){console.log("after update:"),console.log(this._firstConnection),"list"in e&&(this.$list=e.list,void 0!==this.$list&&this.$list&&(console.log(this.$list),this.buildUI(this)))}buildUI(t){var n=t;if(console.log("start build ui"),0===n._firstConnection){console.log("--First Time --");let e=document.createElement("div");e.slot="content",n.appendChild(e)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){console.log("-------oninit--------"),0===t._firstConnection?(this.configGrid(),n._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,t=sap.ui.core.dnd.DropPosition,o=this.byId("listDragnDrop"),i=new sap.ui.model.json.JSONModel;console.log("config grid"),i.setData(n.prepareListData(n.$list)),sap.ui.getCore().setModel(i,"products"),console.log("--- my product model ---"),console.log(i),o.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),o.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:t.Between,dropLayout:e.Vertical,drop:function(e){var t=e.getParameter("draggedControl"),n=e.getParameter("droppedControl"),i=e.getParameter("dropPosition"),s=o.indexOfItem(t),r=o.indexOfItem(n);console.log("Drop Position"),console.log(r),o.removeItem(t),s<r&&r--,"After"===i&&r++,o.insertItem(t,r)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",n)})();