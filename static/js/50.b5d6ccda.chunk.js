(this.webpackJsonpmaeven=this.webpackJsonpmaeven||[]).push([[50],{619:function(e,t,n){"use strict";n.r(t);var a=n(3),o=n(0),m=n.n(o),s=n(559);n(560);t.default=function(e){var t=e.components;Object(a.a)(e,["components"]);return m.a.createElement(s.MDXTag,{name:"wrapper",components:t},m.a.createElement(s.MDXTag,{name:"h1",components:t},"useTitle"),m.a.createElement(s.MDXTag,{name:"p",components:t},"useTitle sets document title when a title is passed."),m.a.createElement(s.MDXTag,{name:"h2",components:t},"Signature"),m.a.createElement(s.MDXTag,{name:"pre",components:t},m.a.createElement(s.MDXTag,{name:"code",components:t,parentName:"pre",props:{className:"language-ts",metaString:""}},"function useTitle(title?: string): void;\n")),m.a.createElement(s.MDXTag,{name:"h3",components:t},"Example"),m.a.createElement(s.MDXTag,{name:"p",components:t},"Set document title with useTitle."),m.a.createElement(s.MDXTag,{name:"pre",components:t},m.a.createElement(s.MDXTag,{name:"code",components:t,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"function TitleComponent() {\n  const [title, setTitle] = useState();\n  useTitle(title);\n\n  return (\n    <Block padding>\n      <H3>Type to set document title</H3>\n      <TextInput value={title} onChange={ev => setTitle(ev.target.value)} />\n    </Block>\n  );\n}\n\nrender(<TitleComponent />);\n")))}}}]);
//# sourceMappingURL=50.b5d6ccda.chunk.js.map