(this.webpackJsonpmaeven=this.webpackJsonpmaeven||[]).push([[30],{576:function(e,n,t){"use strict";t.r(n);var a=t(3),o=t(0),r=t.n(o),l=t(559),s=t(9),m=t(2),c=t(560);n.default=function(e){var n=e.components;Object(a.a)(e,["components"]);return r.a.createElement(l.MDXTag,{name:"wrapper",components:n},r.a.createElement(l.MDXTag,{name:"h1",components:n},"Alert"),r.a.createElement(c.a,{of:"Alert"}),r.a.createElement(l.MDXTag,{name:"h2",components:n},"Props"),r.a.createElement(c.d,{of:"Alert"}),r.a.createElement(l.MDXTag,{name:"h2",components:n},"Examples"),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Basic"),r.a.createElement(l.MDXTag,{name:"p",components:n},"A basic usage of Alert."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},"<Alert>A basic Alert message.</Alert>\n")),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Controlled"),r.a.createElement(l.MDXTag,{name:"p",components:n},"A Controlled Alert"),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live withRender",live:!0,withRender:!0}},"const Controller = props => {\n  const [isOpen, setOpen] = useState(true);\n\n  const onClose = () => {\n    setOpen(false);\n  };\n\n  const toggle = () => {\n    setOpen(!isOpen);\n  };\n\n  return (\n    <Text>\n      <H4>Toggle Alert</H4>\n      <Alert {...props} animateOnOpen isOpen={isOpen} onClose={onClose}>\n        This is a controlled Alert.\n      </Alert>\n      <Button onClick={toggle}>Toggle</Button>\n    </Text>\n  );\n};\n\nrender(<Controller />);\n")),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Types"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts can be styled in four different types."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},'<Row gutter={1}>\n  <Col span={12}>\n    <Alert type="info">Info Alert</Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="success">Success Alert</Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="warning">Warning Alert</Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="danger">Danger Alert</Alert>\n  </Col>\n</Row>\n')),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Title"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts can have a title."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},'<Row gutter={1}>\n  <Col span={12}>\n    <Alert type="info" title="Info Title">\n      Info message content.\n    </Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="success" title="Success Title">\n      Success message content.\n    </Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="warning" title="Warning Title">\n      Warning message content.\n    </Alert>\n  </Col>\n  <Col span={12}>\n    <Alert type="danger" title="Danger Title">\n      Danger message content.\n    </Alert>\n  </Col>\n</Row>\n')),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Closable"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts with the ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"closable")," prop set to ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"false")," have no close button."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},'<Row gutter={1}>\n  <Col span={12}>\n    <Alert type="success">This Alert is closable.</Alert>\n  </Col>\n  <Col span={12}>\n    <Alert title="Not closable" closable={false}>\n      This alert has no close button.\n    </Alert>\n  </Col>\n</Row>\n')),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Icon"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts can be shown without an icon."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},"<Row gutter={1}>\n  <Col span={12}>\n    <Alert>This Alert has an icon.</Alert>\n  </Col>\n  <Col span={12}>\n    <Alert showIcon={false}>This alert has no icon.</Alert>\n  </Col>\n</Row>\n")),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Custom Icon"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts can have a custom icon."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},'// import { shieldOff } from \'icon-packs/feather\'\n\n<Alert type="warning" icon={shieldOff} title="Warning">\n  Virus protection is disabled!\n</Alert>\n')),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Closing Alerts"),r.a.createElement(l.MDXTag,{name:"p",components:n},r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"onClose")," and ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"afterClose")," give the option to hook into the closing of an Alert."),r.a.createElement(l.MDXTag,{name:"p",components:n},r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"onClose")," will be called when the close button is clicked. Use this to prevent closing an uncontrolled Alert or changing the ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"isOpen")," state for a controlled Alert."),r.a.createElement(l.MDXTag,{name:"p",components:n},r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"afterClose")," is called when the closing animation is finished. Use this to unmount an uncontrolled Alert or run an action after closing."),r.a.createElement(l.MDXTag,{name:"pre",components:n},r.a.createElement(l.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-js",metaString:"live",live:!0}},"<Row gutter={1}>\n  <Col span={12}>\n    <Alert\n      type=\"success\"\n      onClose={() => {\n        alert('onClose for success Alert');\n      }}\n      afterClose={() => {\n        alert('afterClose for success Alert.');\n      }}\n    >\n      Success Alert with onClose and afterClose.\n    </Alert>\n  </Col>\n  <Col span={12}>\n    <Alert\n      type=\"warning\"\n      onClose={ev => {\n        ev.preventDefault();\n        alert('onClose for warning Alert prevents closing.');\n      }}\n      afterClose={() => {\n        alert('This message will never appear.');\n      }}\n    >\n      Warning Alert that prevents closing in onClose.\n    </Alert>\n  </Col>\n</Row>\n")),r.a.createElement(l.MDXTag,{name:"h2",components:n},"Design Guidelines"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Alerts are banners that communicate a message with a severity attached to it. They grab the user\u2019s attention to provide critical information needed in context."),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Main Types"),r.a.createElement(l.MDXTag,{name:"p",components:n},"There are two main types of Alerts: ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"Alert")," and ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"AlertGroup"),"."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"Alert"),r.a.createElement(m.Alert,{type:"success"},"Your data has been saved."),r.a.createElement(l.MDXTag,{name:"p",components:n},"A standard Alert is used in the context of a form or Component."),r.a.createElement(l.MDXTag,{name:"p",components:n},"Place the Alert near the relevant item."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"AlertGroup"),r.a.createElement(m.AlertGroup,null,r.a.createElement(m.Alert,{type:"warning",icon:s.o},"Virus protection has been turned off!")),r.a.createElement(l.MDXTag,{name:"p",components:n},"An ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"AlertGroup")," is used at the global context of an app. AlertGroups should be placed at the top of the app."),r.a.createElement(l.MDXTag,{name:"h3",components:n},"Types"),r.a.createElement(l.MDXTag,{name:"p",components:n},"There ar four types of alerts: ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"info"),", ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"success"),", ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"warning")," and ",r.a.createElement(l.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"danger"),". Each one of them for their own specific purpose."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"Info"),r.a.createElement(m.Alert,{type:"info"},"You can customize your settings on the settings page"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Use info alerts to inform users or educate them about a feature. Info alerts should be dismissable and not overused."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"Success"),r.a.createElement(m.Alert,{type:"success"},"Registration successful."),r.a.createElement(l.MDXTag,{name:"p",components:n},"Use success alerts for a result or success confirmation of a user action."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"Warning"),r.a.createElement(m.Alert,{type:"warning"},"This feature is still experimental"),r.a.createElement(l.MDXTag,{name:"p",components:n},"Use warning alerts to notify users about messages that may need their attention but might not cause errors."),r.a.createElement(l.MDXTag,{name:"h4",components:n},"Danger"),r.a.createElement(m.Alert,{type:"danger"},"Login failed, invalid credentials."),r.a.createElement(l.MDXTag,{name:"p",components:n},"Use error alerts for errors, malfunctions and critical issues."),r.a.createElement(c.b,{do:["Place the alert near the relevant component in an unobtrusive location.","Place the AlertGroup only at the top of the page.","Keep the content text brief and to the point.","Use the right type of alert."],dont:["Dont't use long paragraphs inside an alert","Don't overuse the number of alerts on a single page, they may use significance."]}))}}}]);
//# sourceMappingURL=30.18f8332a.chunk.js.map