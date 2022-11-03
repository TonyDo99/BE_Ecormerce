import { client } from "./config";

export async function storageString(key: string, value: object) {
  let [, data] = await client
    .multi()
    .SETEX(`${key}`, 24 * 60 * 60, JSON.stringify(value))
    .GET(`${key}`)
    .EXEC();
  return !data ? false : JSON.parse(data.toString());
}
