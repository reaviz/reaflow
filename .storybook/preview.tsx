import theme from './theme';

export const parameters = {
  layout: 'centered',
  docs: {
    theme
  },
  controls: { hideNoControlsWarning: true },
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: [
        'Docs',
        [
          'Introduction',
          'Getting Started',
          [
            'Installing',
            'Basics',
            'Components',
            'Data Shapes',
            'Linking Nodes'
          ],
          'Utils',
          [
            'Getting Started',
            'Extending',
            'Graph',
            'CRUD'
          ],
          'Advanced',
          [
            'Styling'
          ],
          'Helpers',
          [
            'Selection',
            'Undo Redo',
            'Proximity'
          ]
        ],
      ],
    },
  },
};
