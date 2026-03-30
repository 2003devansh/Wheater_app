export const fetchJson = async <T>(url: string): Promise<T> => {
  // console.time("API");
  const res = await fetch(url);
  // console.timeEnd("API");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
};
