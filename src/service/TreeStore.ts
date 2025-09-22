import type { TreeStoreInterface, TreeStoreItemInterface } from '@/interface/TreeStore.ts';
import { ITEMS_ID } from '@/interface/TreeStore.ts';
import ItemDoesNotExist from '@/error/treeStore/ItemDoesNotExist.ts';

export default class TreeStore implements TreeStoreInterface {
  _items: Array<TreeStoreItemInterface>
  _itemsMap: Map<string | number, TreeStoreItemInterface>
  _childrenMap: Map<string | number, TreeStoreItemInterface[]>
  [ITEMS_ID]: Array<TreeStoreItemInterface>

  constructor(items: Array<TreeStoreItemInterface>) {
    this[ITEMS_ID] = items;
    this._items = items;
    this._itemsMap = new Map();
    this._childrenMap = new Map();

    this.buildTree(items);
  }

  private buildTree(items: Array<TreeStoreItemInterface>): void {
    this._itemsMap.clear();
    this._childrenMap.clear();

    items.forEach(item => {
      this._itemsMap.set(item.id, item);
      this._childrenMap.set(item.id, []);

      if (item.parent !== null && this._childrenMap.has(item.parent)) {
        this._childrenMap.get(item.parent)?.push(item);
      }
    });
  }

  getAll(): Array<TreeStoreItemInterface> {
    return this._items;
  }

  getItem(id: string | number): TreeStoreItemInterface {
    const item = this._itemsMap.get(id);

    if (item) {
      return item;
    }

    throw new ItemDoesNotExist(id);
  }

  getChildren(id: string | number): Array<TreeStoreItemInterface> {
    const children = this._childrenMap.get(id);

    if (children === undefined) {
      throw new ItemDoesNotExist(id);
    }

    return children || [];
  }

  getAllChildren(id: string | number): Array<TreeStoreItemInterface> {
    // ToDo
    return this[ITEMS_ID];
  }

  getAllParents(id: string | number): Array<TreeStoreItemInterface> {
    // ToDo
    return this[ITEMS_ID];
  }

  addItem(item: TreeStoreItemInterface): void {
    // ToDo
  }

  removeItem(id: string | number): void {
    // ToDo
  }

  updateItem(item: TreeStoreItemInterface): void {
    // ToDo
  }
}
