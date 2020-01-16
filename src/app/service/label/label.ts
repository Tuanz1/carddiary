export class Label {
  select: boolean;
  name: string;
  count: number;
  index: number;
  constructor(
      index: number, name: string, count: number, select: boolean = false) {
    this.index = index;
    this.name = name;
    this.count = count;
    this.select = select;
  }
};