export const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch data from ${url}: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
};
