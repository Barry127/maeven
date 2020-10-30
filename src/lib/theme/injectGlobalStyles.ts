const modernNormalize = `/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,::after,::before{box-sizing:border-box}:root{-moz-tab-size:4;tab-size:4}body{margin:0}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}`;
const baseCss = `html{font-size:var(--mvn-base)}body{background:var(--mvn-color-background);color:var(--mvn-color-text);line-height:var(--mvn-typography-line-height);font-family:var(--mvn-typography-font-family);font-size:1.6rem;text-rendering:optimizeLegibility;text-size-adjust:100%;-webkit-font-smoothing:antialiased;transition:background var(--mvn-transition-duration) var(--mvn-transition-timing-function)}body.mvn-dark{background:var(--mvn-color-background-dark);color:var(--mvn-color-text-dark)}::selection{background:var(--mvn-color-text-selection)}`;

_injectCss(modernNormalize);
_injectCss(baseCss);

function _injectCss(css: string) {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    const head = document.querySelector('head');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute(
      'href',
      `data:text/css;charset=UTF-8,${encodeURIComponent(css)}`
    );
    head?.appendChild(link);
  }
}

export default true;
