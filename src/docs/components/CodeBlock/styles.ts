import { style } from 'typestyle';

const liveContainer = style({
  boxSizing: 'border-box',
  border: `1px solid var(--maeven-color-grey)`,
  marginBottom: 'var(--maeven-base)'
});

const liveToolbar = style({
  borderBottom: `1px solid var(--maeven-color-grey)`,
  padding: 'calc(var(--maeven-base) / 4)',
  $nest: {
    'button + button': {
      marginLeft: 'calc(var(--maeven-base) / 4)'
    }
  }
});

const liveEditor = style({
  background: '#0d1011',
  caretColor: '#ff8801'
});

const livePreview = style({
  padding: 'var(--maeven-base)',
  $nest: {
    '&:not(:first-child)': {
      display: 'none'
    }
  }
});

const liveError = style({
  color: 'var(--maeven-color-danger)',
  overflowY: 'auto'
});

const fullscreen = style({
  zIndex: 100,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  $nest: {
    '& > div:last-child': {
      flexGrow: 1,
      overflow: 'auto'
    }
  }
});

export const liveClasses = {
  container: liveContainer,
  editor: liveEditor,
  error: liveError,
  fullscreen,
  preview: livePreview,
  toolbar: liveToolbar,
  bg: {
    default: style({
      background: 'var(--maeven-color-body-background)'
    }),
    transparent: style({
      backgroundColor: '#fff',
      backgroundImage:
        'linear-gradient(45deg,#efefef 25%,transparent 0,transparent 75%,#efefef 0,#efefef),linear-gradient(45deg,#efefef 25%,transparent 0,transparent 75%,#efefef 0,#efefef)',
      backgroundPosition: '0 0, 10px 10px',
      backgroundSize: '20px 20px'
    })
  }
};

export const monokai = style({
  $nest: {
    '& *::selection': {
      background: 'rgba(255,255,255,.2) !important'
    },
    '& .token.plain': {
      color: '#d7d7d7 !important'
    },
    '& .token.comment': {
      color: '#677a83 !important'
    },
    '& .token.tag': {
      color: '#f92672 !important'
    },
    '& .token.tag.punctuation': {
      color: '#d7d7d7 !important'
    },
    '& .token.tag.class-name': {
      color: '#66d9ef !important'
    },
    '& .token.tag.attr-name': {
      color: '#a6e22e !important'
    },
    '& .token.tag.attr-value': {
      color: '#e6db74 !important'
    },
    '& .token.tag.script': {
      color: '#d7d7d7 !important'
    },
    '& .token.keyword': {
      color: '#f92672 !important'
    },
    '& .token.function': {
      color: '#a6e22e !important'
    },
    '& .token.number': {
      color: '#ae81ff !important'
    },
    '& .token.buildin': {
      color: '#ae81ff !important'
    },
    '& .token.script.number': {
      color: '#ae81ff !important'
    }
  }
});
