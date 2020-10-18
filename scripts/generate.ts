import prompts from 'prompts';
import { generateComponent } from './generateComponent';
import { generateHook } from './generateHook';

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
      break;
  }
})();
