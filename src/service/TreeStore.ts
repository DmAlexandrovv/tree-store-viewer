import type { TreeStoreInterface, TreeStoreItemInterface } from '@/interface/TreeStore.ts';
import ItemDoesNotExist from '@/error/treeStore/ItemDoesNotExist.ts';
import ItemDuplicate from '@/error/treeStore/ItemDuplicate.ts';

export default class TreeStore implements TreeStoreInterface {
  _items: Array<TreeStoreItemInterface>
  _itemsMap: Map<string | number, TreeStoreItemInterface>
  _childrenMap: Map<string | number, TreeStoreItemInterface[]>
  _parentMap: Map<string | number, string | number | null>

  constructor(items: Array<TreeStoreItemInterface>) {
    this._items = items;
    this._itemsMap = new Map();
    this._childrenMap = new Map();
    this._parentMap = new Map();

    this.buildTree(items);
  }

  private buildTree(items: Array<TreeStoreItemInterface>): void {
    this._itemsMap.clear();
    this._childrenMap.clear();
    this._parentMap.clear();

    items.forEach(item => {
      this._itemsMap.set(item.id, item);
      this._childrenMap.set(item.id, []);
      this._parentMap.set(item.id, item.parent);

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
    const children: TreeStoreItemInterface[] = [];
    const fillChildren = (id: string | number) => {
      const currentItemChildren = this.getChildren(id);

      if (currentItemChildren.length > 0) {
        children.push(...currentItemChildren);

        for (const item of currentItemChildren) {
          fillChildren(item.id);
        }
      }
    }

    fillChildren(id);

    return children;
  }

  getAllParents(id: string | number): Array<TreeStoreItemInterface> {
    const parents: TreeStoreItemInterface[] = [this.getItem(id)];

    const fillParents = (id: string | number) => {
      const parentId = this._parentMap.get(id);

      if (parentId !== null && parentId !== undefined) {
        const parent = this._itemsMap.get(parentId);

        if (parent) {
          parents.push(parent)

          fillParents(parent.id)
        }
      }
    }

    fillParents(id);

    return parents;
  }

  addItem(item: TreeStoreItemInterface): void {
    if (this._itemsMap.has(item.id)) {
      throw new ItemDuplicate(item.id);
    }

    this._itemsMap.set(item.id, item);
    this._parentMap.set(item.id, item.parent);
    this._childrenMap.set(item.id, []);

    if (item.parent !== null && this._childrenMap.has(item.parent)) {
      this._childrenMap.get(item.parent)?.push(item);
    }
  }

  removeItem(id: string | number): void {
    if (!this._itemsMap.has(id)) {
      throw new ItemDoesNotExist(id);
    }

    const item = this._itemsMap.get(id);
    const children = this.getAllChildren(id);

    children.forEach(child => {
      this._itemsMap.delete(child.id);
      this._parentMap.delete(child.id);
      this._childrenMap.delete(child.id);
    });

    this._itemsMap.delete(id);
    this._parentMap.delete(id);
    this._childrenMap.delete(id);

    if (item && item.parent !== null) {
      const parentChildren = this._childrenMap.get(item.parent) || [];

      this._childrenMap.set(item.parent, parentChildren.filter(child => child.id !== item.id));
    }
  }

  updateItem(item: TreeStoreItemInterface): void {
    const oldItem = this._itemsMap.get(item.id);

    if (oldItem === undefined) {
      throw new ItemDoesNotExist(item.id);
    }

    if (oldItem.parent !== item.parent) {
      if (oldItem.parent !== null) {
        const oldParentChildren = this._childrenMap.get(oldItem.parent) || [];

        this._childrenMap.set(oldItem.parent, oldParentChildren.filter(child => child.id !== oldItem.id));
      }

      if (item.parent !== null && this._childrenMap.has(item.parent)) {
        this._childrenMap.get(item.parent)?.push(item);
      }
    }

    this._itemsMap.set(item.id, item);
    this._parentMap.set(item.id, item.parent);
  }
}
