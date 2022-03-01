export class UnimplementedException extends Error {
  override name: string = "UnimplementedException";
  constructor(message: string | undefined) {
    super(message);
    alert("Unimplemented Exception");
  }
}
