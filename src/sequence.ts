export class Sequence {
  weight: number[];
  repr: string;
  constructor(order: number, size: number) {
    this.weight = Array.from({ length: size }, (_, i) => i + 1);
    for (let i = 0; i < size; i++) {
      this.weight[i] = order % (i + 1);
      order = Math.floor(order / (i + 1));
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < i; j++) {
        if (this.weight[j] >= this.weight[i]) {
          this.weight[j]++;
        }
      }
    }
    const char = Array.from({ length: size }, _ => '');
    for (let i = 0; i < size; i++) {
      char[this.weight[i]] = String.fromCharCode(65 + i);
    }
    this.repr = char.join('');
  }
}
