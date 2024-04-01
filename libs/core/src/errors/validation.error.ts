export class ValidationError extends Error {
  constructor(
    message: string,
    public issue: unknown
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
