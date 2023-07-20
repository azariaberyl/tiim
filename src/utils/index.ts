export function jsonComparer(json1: {}, json2: {}) {
  const sJson1 = JSON.stringify(json1);
  const sJson2 = JSON.stringify(json2);

  return sJson1 == sJson2;
}

export function findValueBasedOnId<T extends { id: string }>(dataArray: T[] | null, id: string | null): T | undefined {
  if (dataArray === null) return;
  if (id === null) return;
  return dataArray.find((val) => val.id === id);
}
