import { findNestedNode } from './helpers';

describe('findNestedNode', () => {
  it('should find a node within a list of nodes', () => {
    const canvasChildren = [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      }
    ];

    const result = findNestedNode('2', canvasChildren);
    expect(result).toEqual(canvasChildren[1]);
  });

  it('should find a node within a nested node with parentId', () => {
    const canvasChildren = [
      {
        id: '1',
        children: [
          {
            id: '2',
            parent: '1'
          },
          {
            id: '3',
            parent: '1'
          }
        ]
      }
    ];

    const result = findNestedNode('2', canvasChildren, '1');
    expect(result).toEqual({
      id: '2',
      parent: '1'
    });
  });

  it('should find a node within a nested node without parentId', () => {
    const canvasChildren = [
      {
        id: '1',
        children: [
          {
            id: '2',
            parent: '1'
          },
          {
            id: '3',
            parent: '1'
          }
        ]
      }
    ];

    const result = findNestedNode('2', canvasChildren);
    expect(result).toEqual({
      id: '2',
      parent: '1'
    });
  });

  it('should find a node within a nested nested node', () => {
    const canvasChildren = [
      {
        id: '1',
        children: [
          {
            id: '2',
            parent: '1',
            children: [
              {
                id: '3',
                parent: '2'
              }
            ]
          }
        ]
      }
    ];

    const result = findNestedNode('3', canvasChildren);
    expect(result).toEqual({
      id: '3',
      parent: '2'
    });
  });
});
