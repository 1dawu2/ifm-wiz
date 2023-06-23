(()=>{"use strict";let e,n=document.createElement("template");n.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class t extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(n.content.cloneNode(!0)),this._list=Object,this._firstConnection=0}setList(e){this._list=e,this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:this._list}}}))}getList(){return this._list}onCustomWidgetResize(e,n){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){"designMode"in e&&(this._designMode=e.designMode)}onCustomWidgetAfterUpdate(e){}buildUI(n,t){var o=n;if(console.log("start build ui"),console.log(o),console.log("changed properties"),console.log(t),0===o._firstConnection){console.log("--First Time --");let e=document.createElement("div");e.slot="content",o.appendChild(e)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(e){return e.extend("ifm.drag.initial",{onInit:function(e){console.log("-------oninit--------"),console.log(o._list),0===n._firstConnection?(this.configGrid(),o._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var e=sap.ui.core.dnd.DropLayout,n=sap.ui.core.dnd.DropPosition,t=this.byId("listDragnDrop"),o=new sap.ui.model.json.JSONModel;o.setData({productItems:[{id:"Website",description:"http://www.infomotion.de",iconFile:"sap-icon://world"},{id:"Telefon",description:"+49 69 56608 3231",iconFile:"sap-icon://call"},{id:"Mail",description:"david.wurm@infomotion.de",iconFile:"sap-icon://business-card"}]}),sap.ui.getCore().setModel(o,"products"),console.log("--- my product model ---"),console.log(o),t.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),t.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:n.Between,dropLayout:e.Vertical,drop:function(e){var n=e.getParameter("draggedControl"),o=e.getParameter("droppedControl"),i=e.getParameter("dropPosition"),r=t.indexOfItem(n),s=t.indexOfItem(o);console.log("Drop Position"),console.log(s),t.removeItem(n),r<s&&s--,"After"===i&&s++,t.insertItem(n,s)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",t)})();