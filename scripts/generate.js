const prompts = require('prompts');

const generateComponent = require('./generateComponent');
const generateHook = require('./generateHook');

(async () => {
  const response = await prompts({
    type: 'select',
    name: 'type',
    message: 'Generate:',
    choices: [
      {
        title: 'Component',
        description: 'Generate new component',
        value: 'component'
      },
      { title: 'Hook', description: 'Generate new hook', value: 'hook' }
    ],
    initial: 0
  });

  switch (response.type) {
    case 'component':
      await generateComponent();
      break;

    case 'hook':
      await generateHook();
      break;

    default:
  }
})();
