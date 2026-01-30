import { ValueObject } from "../../../shared/ValueObject";

export enum StatusEnum {
  InStock = "InStock",
  LowStock = "LowStock",
  OutOfStock = "OutOfStock",
}
export type StatusLabel = "在庫あり" | "在庫わずか" | "在庫なし";

type StatusValue = StatusEnum;
export class Status extends ValueObject<StatusValue, "Status"> {
  constructor(value: StatusValue) {
    super(value);
  }

  protected validate(value: StatusValue): void {
    if (!Object.values(StatusEnum).includes(value)) {
      throw new Error("無効なステータスの値です。");
    }
  }

  toLabel(): StatusLabel {
    switch (this._value) {
      case StatusEnum.InStock:
        return "在庫あり";
      case StatusEnum.LowStock:
        return "在庫わずか";
      case StatusEnum.OutOfStock:
        return "在庫なし";
    }
  }
}
