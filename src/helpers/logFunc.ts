export const logs = (req: any, res: any): void => {
  console.log(`Request: ${req.method}, ${req.originalUrl}`)
}
