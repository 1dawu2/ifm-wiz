/* eslint no-unused-vars: 0 */
import { html, ifDefined } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
function block0(context, tags, suffix) { return html `<div class="ui5-badge-root"><slot name="icon"></slot>${this.hasText ? block1.call(this, context, tags, suffix) : undefined}<span class="ui5-hidden-text">${ifDefined(this.badgeDescription)}</span></div>`; }
function block1(context, tags, suffix) { return html `<label class="ui5-badge-text"><bdi><slot></slot></bdi></label>`; }
export default block0;
//# sourceMappingURL=BadgeTemplate.lit.js.map