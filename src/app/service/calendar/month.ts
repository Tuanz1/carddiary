export class Month {
  static abbs = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
    'Dec'
  ];
  constructor(num: number, offset: number, total: number) {
    this.num = num;
    this.count = 0;
    this.total = total;
    this.days = new Array<string>();
    this.write = new Array<boolean>(offset + total);
    for (let i = 0; i < offset; i++) {
      this.days.push(' ');
    }
    for (let i = 1; i <= total; i++) {
      this.days.push(i + '');
    }
    this.write.fill(false);
  }
  num: number;
  days: Array<string>;
  write: Array<boolean>;
  count: number;
  total: number;
};