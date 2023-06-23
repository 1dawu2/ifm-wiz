(()=>{"use strict";let n,e=document.createElement("template");e.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_hack_content" name="ifm_hack_content">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.drag.initial"\n\t  xmlns:grid="sap.ui.layout.cssgrid"\n\t  xmlns:dnd="sap.ui.core.dnd"\n\t  xmlns:dnd-grid="sap.f.dnd"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc">\n      <m:Panel height="100%" expandable="true" expanded="true" headerText="Maintain Aggregate" id="oPanel">\n        <f:GridContainer            \n            snapToRow="true">\n            <f:layout>\n                <f:GridContainerSettings rowSize="5rem" columnSize="5rem" gap="1rem" />\n            </f:layout>\n            <f:Card width="500px">                \n                <f:header>\n                    <card:Header iconSrc="sap-icon://sort" title="Sort Order" subtitle="Material" />\n                </f:header>\n                <f:content>\n                    <m:List\n                        id="listDragnDrop"\n                        showSeparators="None"                    \n                        items="{products>/productItems}">                        \n                        <m:StandardListItem\n                            description="{products>description}"\n                            icon="{products>iconFile}"\n                            title="{products>id}" />\n                    </m:List>\n                </f:content>\n            </f:Card>\n        </f:GridContainer>\n        </m:Panel>\n    </mvc:View>\n    <\/script>\n';class t extends HTMLElement{constructor(){super(),n=this.attachShadow({mode:"open"}),n.appendChild(e.content.cloneNode(!0)),this._firstConnection=0,console.log("--- constructor list ---"),console.log(this.list)}set list(n){this.list=n,this.dispatchEvent(new CustomEvent("propertiesChanged",{detail:{properties:{list:this.list}}}))}get list(){return this.list}buildUI(e){var t=e;if(console.log("start build ui"),console.log(t),0===t._firstConnection){console.log("--First Time --");let n=document.createElement("div");n.slot="content",t.appendChild(n)}sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/export/Spreadsheet","sap/f/dnd/GridDropInfo","sap/ui/core/library"],(function(n){return n.extend("ifm.drag.initial",{onInit:function(n){console.log("-------oninit--------"),console.log(t.list),0===e._firstConnection?(this.configGrid(),t._firstConnection=1):console.log("--- not first connection ---")},configGrid:function(){var n=sap.ui.core.dnd.DropLayout,e=sap.ui.core.dnd.DropPosition,o=this.byId("listDragnDrop"),i=new sap.ui.model.json.JSONModel,r=t.list;console.log(r),i.setData({productItems:[{id:"Website",description:"http://www.infomotion.de",iconFile:"sap-icon://world"},{id:"Telefon",description:"+49 69 56608 3231",iconFile:"sap-icon://call"},{id:"Mail",description:"david.wurm@infomotion.de",iconFile:"sap-icon://business-card"}]}),sap.ui.getCore().setModel(i,"products"),console.log("--- my product model ---"),console.log(i),o.addDragDropConfig(new sap.ui.core.dnd.DragInfo({sourceAggregation:"items"})),o.addDragDropConfig(new sap.f.dnd.GridDropInfo({targetAggregation:"items",dropPosition:e.Between,dropLayout:n.Vertical,drop:function(n){var e=n.getParameter("draggedControl"),t=n.getParameter("droppedControl"),i=n.getParameter("dropPosition"),r=o.indexOfItem(e),s=o.indexOfItem(t);console.log("Drop Position"),console.log(s),o.removeItem(e),r<s&&s--,"After"===i&&s++,o.insertItem(e,s)}}))}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(n.getElementById("oView")).html()}).placeAt(content)}}customElements.define("ifm-drag",t)})();