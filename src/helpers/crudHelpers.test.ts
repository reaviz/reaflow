import { upsertNode } from './crudHelpers';

const nodes = [
  {
    id: '1'
  },
  {
    id: '2',
    text: 'Node 2',
    parent: '1'
  },
  {
    id: '3',
    text: 'Node 3',
    parent: '1'
  },
  {
    id: '4',
    text: 'Node 4',
    parent: '1'
  }
];
const edges = [
  {
    id: '2-3',
    from: '2',
    to: '3',
    parent: '1'
  },
  {
    id: '2-4',
    from: '2',
    to: '4',
    parent: '1'
  }
];

test('should upsert node with edges using properties from original one and in right order', () => {
  const newNode = {
    id: '5',
    text: 'Node 5',
    parent: '1'
  };
  const expectedResults = {
    nodes: nodes.concat(newNode),
    edges: [
      {
        id: '2-5',
        from: '2',
        to: '5',
        parent: '1'
      },
      {
        id: '5-3',
        from: '5',
        to: '3',
        parent: '1'
      },
      {
        id: '2-4',
        from: '2',
        to: '4',
        parent: '1'
      }
    ]
  };

  expect(upsertNode(nodes, edges, edges[0], newNode)).toEqual(expectedResults);
});
