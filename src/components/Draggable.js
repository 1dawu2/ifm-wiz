import "@ui5/webcomponents-base/dist/CustomElementsScope.js"
import "@ui5/webcomponents-fiori/dist/Wizard.js"
export default class IFMWizard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

        this._export_settings = {};
        this._export_settings.imgURL = "";
    }

    // SETTINGS
    get URL() {
        return this._export_settings.imgURL;
    }

    set URL(value) {
        this._export_settings.imgURL = value;
    }

    static get observedAttributes() {
        return [
            "imgURL",
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            this[name] = newValue;
        }
    }

    render() {
        const { shadowRoot } = this;

        // create player card element
        const wizardCard = document.createElement('div');
        wizardCard.id = 'wizard-card';

        // append player card to shadow DOM
        shadowRoot.appendChild(wizardCard);

        var uiCardWC = document.createElement('div');
        uiCardWC.innerHTML =
            `
            <mvc:View
                controllerName="sap.m.sample.TableDnD.Controller"
                xmlns:dnd="sap.ui.core.dnd"
                xmlns:mvc="sap.ui.core.mvc"
                xmlns:c="sap.ui.core"
                xmlns="sap.m"
                height="100%">
                <Page
                    showHeader="false"
                    enableScrolling="true"
                    class="sapUiContentPadding">
                    <content>
                        <HBox renderType="Bare">
                            <mvc:XMLView id="availableProducts" viewName="sap.m.sample.TableDnD.AvailableProducts" async="true"/>
                            <VBox justifyContent="Center" class="sapUiTinyMarginBeginEnd">
                                <Button
                                    class="sapUiTinyMarginBottom"
                                    icon="sap-icon://navigation-right-arrow"
                                    tooltip="Move to selected"
                                    press="moveToSelectedProductsTable"/>
                                <Button
                                    icon="sap-icon://navigation-left-arrow"
                                    tooltip="Move to available"
                                    press="moveToAvailableProductsTable"/>
                            </VBox>
                            <mvc:XMLView id="selectedProducts" viewName="sap.m.sample.TableDnD.SelectedProducts" async="true"/>
                        </HBox>
                    </content>
                </Page>
            </mvc:View>           
            `
        shadowRoot.append(uiCardWC);
    }
}
