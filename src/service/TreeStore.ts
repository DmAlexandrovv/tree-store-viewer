import type { TreeStoreInterface, TreeStoreItemInterface } from '@/interface/TreeStore.ts';
import { ITEMS_ID } from '@/interface/TreeStore.ts';

export default class TreeStore implements TreeStoreInterface {
  [ITEMS_ID]: Array<TreeStoreItemInterface>;

  constructor(items: Array<TreeStoreItemInterface>) {
    this[ITEMS_ID] = items;
  }

  getAll(): Array<TreeStoreItemInterface> {
    // ToDo this[ITEMS_ID] only for getAll return initial state

    return this[ITEMS_ID];
  }

  getItem(id: string | number): TreeStoreItemInterface {
    // ToDo
    return this[ITEMS_ID][0];
  }

  getChildren(id: string | number): Array<TreeStoreItemInterface> {
    // ToDo
    return this[ITEMS_ID];
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
