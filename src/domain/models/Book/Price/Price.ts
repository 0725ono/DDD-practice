import { ValueObject } from "../../shared/ValueObject";

interface PriceValue {
  amount: number;
  currency: "JPY";
}

export class Price extends ValueObject<PriceValue, "Price"> {
  static readonly MAX = 1000000;
  static readonly MIN = 1;

  constructor(value: PriceValue) {
    super(value);
  }

  protected validate(value: PriceValue): void {
    if (value.currency !== "JPY") {
      throw new Error("通貨はJPYのみ対応しています。");
    }

    if (value.amount < Price.MIN || value.amount > Price.MAX) {
      throw new Error(
        `価格は${Price.MIN}から${Price.MAX}の間でなければなりません。`,
      );
    }
  }

  get amount(): PriceValue["amount"] {
    return this.value.amount;
  }

  get currency(): PriceValue["currency"] {
    return this.value.currency;
  }
}
