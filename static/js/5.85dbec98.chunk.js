(this.webpackJsonpmaeven=this.webpackJsonpmaeven||[]).push([[5],{559:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(562);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return i(o).default}});var r=n(561);function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return i(r).default}})},561:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=u(n(0)),i=u(n(564)),a=u(n(19));function u(e){return e&&e.__esModule?e:{default:e}}var c=(0,i.default)({}),s=c.Provider,p=c.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,i=function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(t,["components"]);return r.default.createElement(p,null,(function(t){return r.default.createElement(e,o({components:n||t},i))}))}};var l=function(e){var t=e.components,n=e.children;return r.default.createElement(s,{value:t},n)};l.propTypes={components:a.default.object.isRequired,children:a.default.element.isRequired},t.default=l},562:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(0),a=s(i),u=s(n(563)),c=n(561);function s(e){return e&&e.__esModule?e:{default:e}}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var f={inlineCode:"code",wrapper:"div"},d=function(e){function t(){return p(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,r=e.props,i=void 0===r?{}:r,c=e.children,s=e.components,p=void 0===s?{}:s,l=e.Layout,d=e.layoutProps,h=p[n+"."+t]||p[t]||f[t]||t;return l?((0,u.default)(this,l),a.default.createElement(l,o({components:p},d),a.default.createElement(h,i,c))):a.default.createElement(h,i,c)}}]),t}(i.Component);t.default=(0,c.withMDXComponents)(d)},563:function(e,t,n){"use strict";var o={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},r={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i=Object.defineProperty,a=Object.getOwnPropertyNames,u=Object.getOwnPropertySymbols,c=Object.getOwnPropertyDescriptor,s=Object.getPrototypeOf,p=s&&s(Object);e.exports=function e(t,n,l){if("string"!==typeof n){if(p){var f=s(n);f&&f!==p&&e(t,f,l)}var d=a(n);u&&(d=d.concat(u(n)));for(var h=0;h<d.length;++h){var v=d[h];if(!o[v]&&!r[v]&&(!l||!l[v])){var m=c(n,v);try{i(t,v,m)}catch(y){}}}return t}return t}},564:function(e,t,n){"use strict";t.__esModule=!0;var o=i(n(0)),r=i(n(565));function i(e){return e&&e.__esModule?e:{default:e}}t.default=o.default.createContext||r.default,e.exports=t.default},565:function(e,t,n){"use strict";t.__esModule=!0;var o=n(0),r=(a(o),a(n(19))),i=a(n(37));a(n(80));function a(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function s(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function p(e){var t=[];return{on:function(e){t.push(e)},off:function(e){t=t.filter((function(t){return t!==e}))},get:function(){return e},set:function(n,o){e=n,t.forEach((function(t){return t(e,o)}))}}}t.default=function(e,t){var n,a,l="__create-react-context-"+(0,i.default)()+"__",f=function(e){function n(){var t,o;u(this,n);for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return t=o=c(this,e.call.apply(e,[this].concat(i))),o.emitter=p(o.props.value),c(o,t)}return s(n,e),n.prototype.getChildContext=function(){var e;return(e={})[l]=this.emitter,e},n.prototype.componentWillReceiveProps=function(e){if(this.props.value!==e.value){var n=this.props.value,o=e.value,r=void 0;((i=n)===(a=o)?0!==i||1/i===1/a:i!==i&&a!==a)?r=0:(r="function"===typeof t?t(n,o):1073741823,0!==(r|=0)&&this.emitter.set(e.value,r))}var i,a},n.prototype.render=function(){return this.props.children},n}(o.Component);f.childContextTypes=((n={})[l]=r.default.object.isRequired,n);var d=function(t){function n(){var e,o;u(this,n);for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return e=o=c(this,t.call.apply(t,[this].concat(i))),o.state={value:o.getValue()},o.onUpdate=function(e,t){0!==((0|o.observedBits)&t)&&o.setState({value:o.getValue()})},c(o,e)}return s(n,t),n.prototype.componentWillReceiveProps=function(e){var t=e.observedBits;this.observedBits=void 0===t||null===t?1073741823:t},n.prototype.componentDidMount=function(){this.context[l]&&this.context[l].on(this.onUpdate);var e=this.props.observedBits;this.observedBits=void 0===e||null===e?1073741823:e},n.prototype.componentWillUnmount=function(){this.context[l]&&this.context[l].off(this.onUpdate)},n.prototype.getValue=function(){return this.context[l]?this.context[l].get():e},n.prototype.render=function(){return(e=this.props.children,Array.isArray(e)?e[0]:e)(this.state.value);var e},n}(o.Component);return d.contextTypes=((a={})[l]=r.default.object,a),{Provider:f,Consumer:d}},e.exports=t.default},574:function(e,t,n){"use strict";n.r(t);var o=n(3),r=n(0),i=n.n(r),a=n(559);t.default=function(e){var t=e.components;Object(o.a)(e,["components"]);return i.a.createElement(a.MDXTag,{name:"wrapper",components:t},i.a.createElement(a.MDXTag,{name:"h1",components:t},"License"),i.a.createElement(a.MDXTag,{name:"p",components:t},"MIT License"),i.a.createElement(a.MDXTag,{name:"p",components:t},"Copyright (c) 2019 Barry de Kleijn"),i.a.createElement(a.MDXTag,{name:"p",components:t},'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:'),i.a.createElement(a.MDXTag,{name:"p",components:t},"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."),i.a.createElement(a.MDXTag,{name:"p",components:t},'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'))}}}]);
//# sourceMappingURL=5.85dbec98.chunk.js.map