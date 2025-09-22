const ITEMS_ID = Symbol('items')

interface TreeStoreItemInterface {
  id: string|number
  parent: string|number|null
  label: string
}

interface TreeStoreInterface {
  [ITEMS_ID]: Array<TreeStoreItemInterface>

  getAll(): Array<TreeStoreItemInterface>

  getItem(id: string|number): TreeStoreItemInterface

  getChildren(id: string|number): Array<TreeStoreItemInterface>

  getAllChildren(id: string|number): Array<TreeStoreItemInterface>

  getAllParents(id: string|number): Array<TreeStoreItemInterface>

  addItem(item: TreeStoreItemInterface): void

  removeItem(id: string|number): void

  updateItem(item: TreeStoreItemInterface): void
}

export type {
  TreeStoreItemInterface,
  TreeStoreInterface,
}

export {
  ITEMS_ID
}
