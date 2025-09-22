export default class ItemDoesNotExist extends Error {
  public readonly itemId: string | number;

  constructor(itemId: string | number, message?: string) {
    const defaultMessage = `Элемент с ID "${itemId}" не существует`

    super(message || defaultMessage);

    this.itemId = itemId;
  }

  public toString(): string {
    return `[${this.name}] ${this.message} (itemId: ${this.itemId})`;
  }
}
