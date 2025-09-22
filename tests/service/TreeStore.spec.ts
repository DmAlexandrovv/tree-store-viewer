import { describe, it, expect } from 'vitest';
import TreeStore from '../../src/service/TreeStore';
import type { TreeStoreItemInterface } from '../../src/interface/TreeStore';

const items: Array<TreeStoreItemInterface> = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064cee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '91064cee', label: 'Айтем 4' },
  { id: 5, parent: '91064cee', label: 'Айтем 5' },
  { id: 6, parent: '91064cee', label: 'Айтем 6' },
  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' }
];

describe('TreeStore', () => {
  it('getAll', () => {
    const treeStore = new TreeStore(items);

    expect(treeStore.getAll()).to.deep.equal(items);
  });

  it('getItem', () => {
    const treeStore = new TreeStore(items);

    expect(treeStore.getItem(1)).to.deep.equal({
      id: 1,
      parent: null,
      label: 'Айтем 1'
    });

    expect(treeStore.getItem('91064cee')).to.deep.equal({
      id: '91064cee',
      parent: 1,
      label: 'Айтем 2'
    });

    expect(treeStore.getItem(7)).to.deep.equal({
      id: 7,
      parent: 4,
      label: 'Айтем 7'
    });
  });

  it('getChildren', () => {
    const treeStore = new TreeStore(items);

    expect(treeStore.getChildren(1)).to.deep.equal([
      { id: '91064cee', parent: 1, label: 'Айтем 2' },
      { id: 3, parent: 1, label: 'Айтем 3' },
    ]);

    expect(treeStore.getChildren('91064cee')).to.deep.equal([
      { id: 4, parent: '91064cee', label: 'Айтем 4' },
      { id: 5, parent: '91064cee', label: 'Айтем 5' },
      { id: 6, parent: '91064cee', label: 'Айтем 6' },
    ]);

    expect(treeStore.getChildren(7)).to.deep.equal([]);
  });

  it('getAllChildren', () => {
    const treeStore = new TreeStore(items);

    expect(treeStore.getAllChildren(1)).to.deep.equal([
      { id: '91064cee', parent: 1, label: 'Айтем 2' },
      { id: 4, parent: '91064cee', label: 'Айтем 4' },
      { id: 5, parent: '91064cee', label: 'Айтем 5' },
      { id: 6, parent: '91064cee', label: 'Айтем 6' },
      { id: 7, parent: 4, label: 'Айтем 7' },
      { id: 8, parent: 4, label: 'Айтем 8' },
      { id: 3, parent: 1, label: 'Айтем 3' },
    ]);

    expect(treeStore.getAllChildren('91064cee')).to.deep.equal([
      { id: 4, parent: '91064cee', label: 'Айтем 4' },
      { id: 5, parent: '91064cee', label: 'Айтем 5' },
      { id: 6, parent: '91064cee', label: 'Айтем 6' },
      { id: 7, parent: 4, label: 'Айтем 7' },
      { id: 8, parent: 4, label: 'Айтем 8' }
    ]);

    expect(treeStore.getAllChildren(7)).to.deep.equal([]);
  });

  it('getAllParents', () => {
    const treeStore = new TreeStore(items);

    expect(treeStore.getAllParents(1)).to.deep.equal([
      { id: 1, parent: null, label: 'Айтем 1' }
    ]);

    expect(treeStore.getAllParents('91064cee')).to.deep.equal([
      { id: '91064cee', parent: 1, label: 'Айтем 2' },
      { id: 1, parent: null, label: 'Айтем 1' },
    ]);

    expect(treeStore.getAllParents(7)).to.deep.equal([
      { id: 7, parent: 4, label: 'Айтем 7' },
      { id: 4, parent: '91064cee', label: 'Айтем 4' },
      { id: '91064cee', parent: 1, label: 'Айтем 2' },
      { id: 1, parent: null, label: 'Айтем 1' },
    ]);
  });

  it('addItem', () => {
    const treeStore = new TreeStore(items);

    treeStore.addItem({ id: 9, parent: null, label: 'Айтем 9' })

    expect(treeStore.getItem(9)).to.deep.equal({
      id: 9,
      parent: null,
      label: 'Айтем 9'
    });

    treeStore.addItem({ id: '910123asd', parent: 9, label: 'Айтем 10' })

    expect(treeStore.getItem('910123asd')).to.deep.equal({
      id: '910123asd',
      parent: 9,
      label: 'Айтем 10'
    });
  });

  it('removeItem', () => {
    const treeStore = new TreeStore(items);

    treeStore.removeItem(7)

    // ToDo check to null or throwed exception
    // expect(treeStore.getItem(7)).to.deep.equal(null);

    treeStore.removeItem('91064cee')

    // ToDo check to null or throwed exception
    // expect(treeStore.getItem('91064cee')).to.deep.equal(null);
    // expect(treeStore.getItem(4)).to.deep.equal(null);
    // expect(treeStore.getItem(5)).to.deep.equal(null);
    // expect(treeStore.getItem(6)).to.deep.equal(null);
    // expect(treeStore.getItem(7)).to.deep.equal(null);
    // expect(treeStore.getItem(8)).to.deep.equal(null);

    treeStore.removeItem(123)

    // ToDo check to throwed exception - remove non existed item
  });

  it('updateItem', () => {
    const treeStore = new TreeStore(items);

    treeStore.updateItem({ id: 7, parent: null, label: 'Айтем 777' })

    expect(treeStore.getItem(7)).to.deep.equal({
      id: 7,
      parent: null,
      label: 'Айтем 777'
    });

    treeStore.updateItem({ id: '91064cee', parent: null, label: 'Айтем 123123' })

    expect(treeStore.getItem('91064cee')).to.deep.equal({
      id: '91064cee',
      parent: null,
      label: 'Айтем 123123'
    });

    treeStore.updateItem({ id: 123, parent: null, label: 'Айтем 123' })

    // ToDo check to null or throwed exception - update non existing item
    // expect(treeStore.getItem(123)).to.deep.equal(null);
  });
})
