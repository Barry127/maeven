(this.webpackJsonpmaeven=this.webpackJsonpmaeven||[]).push([[24],{585:function(e,n,a){"use strict";a.r(n);var t=a(3),o=a(0),l=a.n(o),c=a(559),r=(a(2),a(560));n.default=function(e){var n=e.components;Object(t.a)(e,["components"]);return l.a.createElement(c.MDXTag,{name:"wrapper",components:n},l.a.createElement(c.MDXTag,{name:"h1",components:n},"NativeSelect"),l.a.createElement(r.a,{of:"NativeSelect"}),l.a.createElement(c.MDXTag,{name:"h2",components:n},"Props"),l.a.createElement(r.d,{of:"NativeSelect"}),l.a.createElement(c.MDXTag,{name:"h2",components:n},"Examples"),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Basic"),l.a.createElement(c.MDXTag,{name:"p",components:n},"A basic usage of NativeSelect."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"const options = [\n  { value: 'JavaScript' },\n  { value: 'Java' },\n  { value: 'PHP' },\n  { value: 'Perl' },\n  { value: 'C' },\n  { value: 'Lua' },\n  { value: 'C++' },\n  { value: 'Rust' }\n];\n\nrender(\n  <NativeSelect options={options} placeholder=\"Select something...\">\n    Childeren are placed under the select.\n  </NativeSelect>\n);\n")),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Controlled"),l.a.createElement(c.MDXTag,{name:"p",components:n},"A controlled select."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"const options = [\n  { value: 'js', text: 'JavaScript' },\n  { value: 'java', text: 'Java' },\n  { value: 'php', text: 'PHP' },\n  { value: 'pl', text: 'Perl' },\n  { value: 'c', text: 'C' },\n  { value: 'lua', text: 'Lua' },\n  { value: 'cpp', text: 'C++' },\n  { value: 'rs', text: 'Rust' }\n];\n\nconst Controlled = props => {\n  const [value, setValue] = useState('cpp');\n  return (\n    <NativeSelect\n      {...props}\n      value={value}\n      onChange={ev => setValue(ev.target.value)}\n    >\n      Value: <i>{value}</i>\n    </NativeSelect>\n  );\n};\n\nrender(<Controlled options={options} placeholder=\"Select something...\" />);\n")),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Disabled"),l.a.createElement(c.MDXTag,{name:"p",components:n},"Selects can be disabled."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"const options = [\n  { value: 'JavaScript' },\n  { value: 'Java' },\n  { value: 'PHP' },\n  { value: 'Perl' },\n  { value: 'C' },\n  { value: 'Lua' },\n  { value: 'C++' },\n  { value: 'Rust' }\n];\n\nrender(<NativeSelect disabled options={options} placeholder=\"Disabled\" />);\n")),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Icon"),l.a.createElement(c.MDXTag,{name:"p",components:n},"Select can have an icon."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"// import { code } from 'icon-packs/devicons';\n\nconst options = [\n  { value: 'JavaScript' },\n  { value: 'Java' },\n  { value: 'PHP' },\n  { value: 'Perl' },\n  { value: 'C' },\n  { value: 'Lua' },\n  { value: 'C++' },\n  { value: 'Rust' }\n];\n\nrender(\n  <NativeSelect\n    icon={code}\n    options={options}\n    placeholder=\"Select something...\"\n  />\n);\n")),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Size"),l.a.createElement(c.MDXTag,{name:"p",components:n},"Selects can have different sizes."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},'// import { code } from \'icon-packs/devicons\';\n\nconst options = [\n  { value: \'JavaScript\' },\n  { value: \'Java\' },\n  { value: \'PHP\' },\n  { value: \'Perl\' },\n  { value: \'C\' },\n  { value: \'Lua\' },\n  { value: \'C++\' },\n  { value: \'Rust\' }\n];\n\nrender(\n  <Row gutter={1}>\n    <Col span={12}>\n      <NativeSelect icon={code} options={options} size="sm" placeholder="sm" />\n    </Col>\n    <Col span={12}>\n      <NativeSelect options={options} size="sm" placeholder="sm" />\n    </Col>\n    <Col span={12}>\n      <NativeSelect icon={code} options={options} size="md" placeholder="md" />\n    </Col>\n    <Col span={12}>\n      <NativeSelect options={options} size="md" placeholder="md" />\n    </Col>\n    <Col span={12}>\n      <NativeSelect icon={code} options={options} size="lg" placeholder="lg" />\n    </Col>\n    <Col span={12}>\n      <NativeSelect options={options} size="lg" placeholder="lg" />\n    </Col>\n  </Row>\n);\n')),l.a.createElement(c.MDXTag,{name:"h3",components:n},"Error"),l.a.createElement(c.MDXTag,{name:"p",components:n},"A Select can indicate it has an error."),l.a.createElement(c.MDXTag,{name:"pre",components:n},l.a.createElement(c.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"// import { x } from 'icon-packs/feather';\n\nconst options = [\n  { value: 'JavaScript' },\n  { value: 'Java' },\n  { value: 'PHP' },\n  { value: 'Perl' },\n  { value: 'C' },\n  { value: 'Lua' },\n  { value: 'C++' },\n  { value: 'Rust' }\n];\n\nrender(\n  <Row gutter={1}>\n    <Col span={12}>\n      <NativeSelect\n        hasError\n        icon={x}\n        options={options}\n        placeholder=\"error...\"\n      />\n    </Col>\n    <Col span={12}>\n      <NativeSelect hasError options={options} placeholder=\"error...\">\n        Text indicating error\n      </NativeSelect>\n    </Col>\n  </Row>\n);\n")))}}}]);
//# sourceMappingURL=24.935036a7.chunk.js.map