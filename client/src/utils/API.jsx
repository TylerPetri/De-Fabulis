function fetchJSON(url, method = 'GET', data = {}) {
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (method === 'POST' || method === 'PUT') {
    fetchOptions.body = JSON.stringify(data);
  }

  return fetch(url, fetchOptions).then((r) => r.json());
}

export default fetchJSON;
