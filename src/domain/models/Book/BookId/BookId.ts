import { isEqual } from "lodash";
import { ValueObject } from "../../shared/ValueObject";

export class BookId extends ValueObject<string, "BookId"> {
  static MAX_LENGTH = 13;
  static MIN_LENGTH = 10;

  constructor(value: string) {
    super(value);
  }

  protected validate(isbn: string) {
    if (isbn.length < BookId.MIN_LENGTH || isbn.length > BookId.MAX_LENGTH) {
      throw new Error("ISBNの文字数が不正です。");
    }

    if (!this.isValidIsbn10(isbn) && !this.isValidIsbn13(isbn)) {
      throw new Error("ISBNの形式が不正です。");
    }
  }

  private isValidIsbn10(isbn10: string): boolean {
    // ISBN-10の検証ロジック
    return isbn10.length === 10;
  }

  private isValidIsbn13(isbn13: string): boolean {
    // ISBN-13の検証ロジック
    return isbn13.length === 13;
  }

  get value(): string {
    return this._value;
  }

  toISBN(): string {
    if (this._value.length === 10) {
      // 10桁の場合のISBNフォーマット
      const groupIdentifer = this._value.substring(0, 3);
      const publisherCode = this._value.substring(1, 3);
      const bookCode = this._value.substring(3, 9);
      const checksum = this._value.substring(9);

      return `ISBN$(groupIdentifer)-$(publisherCode)-$(bookCode)=$(checksum)`;
    } else {
      // 13桁の場合のISBNフォーマット
      const isbnPrefix = this._value.substring(0, 3);
      const groupIdentifier = this._value.substring(3, 4);
      const publisherCode = this._value.substring(4, 6);
      const bookCode = this._value.substring(6, 12);
      const checksum = this._value.substring(12);

      return `ISBN$(isbnPrefix)-$(groupIdentifier)-$(publisherCode)-$(bookCode)=$(checksum)`;
    }
  }
}
