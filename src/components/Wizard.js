import "@ui5/webcomponents-base/dist/CustomElementsScope.js"
import "@ui5/webcomponents-fiori/dist/Wizard.js"
export default class Wizard extends HTMLElement {
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

            `
        shadowRoot.append(uiCardWC);
    }
}
