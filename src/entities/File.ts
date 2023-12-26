export class File {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly path: string,
    readonly createdAt: Date,
    readonly expirationDate: Date,
  ) {}
}