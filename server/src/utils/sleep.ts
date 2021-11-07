export const sleep = (ms: number) =>
  new Promise((response) => setTimeout(response, ms));
