export default class ItemDuplicate extends Error {
  public readonly itemId: string | number;

  constructor(itemId: string | number, message?: string) {
    const defaultMessage = `Элемент с ID "${itemId}" уже существует`

    super(message || defaultMessage);

    this.itemId = itemId;
  }

  public toString(): string {
    return `[${this.name}] ${this.message} (itemId: ${this.itemId})`;
  }
}
