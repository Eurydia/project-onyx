import{f as h}from"./micromark-factory-space-Bzki161k.js";import{j as m,m as C,f as c}from"./micromark-util-character-Cn8n62xE.js";const l={name:"tasklistCheck",tokenize:L};function g(){return{text:{91:l}}}function L(n,i,r){const a=this;return e;function e(t){return a.previous!==null||!a._gfmTasklistFirstContentOfListItem?r(t):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(t),n.exit("taskListCheckMarker"),s)}function s(t){return m(t)?(n.enter("taskListCheckValueUnchecked"),n.consume(t),n.exit("taskListCheckValueUnchecked"),k):t===88||t===120?(n.enter("taskListCheckValueChecked"),n.consume(t),n.exit("taskListCheckValueChecked"),k):r(t)}function k(t){return t===93?(n.enter("taskListCheckMarker"),n.consume(t),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),u):r(t)}function u(t){return C(t)?i(t):c(t)?n.check({tokenize:o},i,r)(t):r(t)}}function o(n,i,r){return h(n,a,"whitespace");function a(e){return e===null?r(e):i(e)}}export{g};
//# sourceMappingURL=micromark-extension-gfm-task-list-item-CQ-9H0He.js.map
