export function jsonComparer(json1: {}, json2: {}) {
  const sJson1 = JSON.stringify(json1);
  const sJson2 = JSON.stringify(json2);

  return sJson1 == sJson2;
}
