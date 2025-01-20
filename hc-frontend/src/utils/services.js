export const fetchProducts = async () => {
  const response = await fetch('http://localhost:3020/products');
  return response.json();
};

export const queryProducts = async (filters) => {
  const response = await fetch('http://localhost:3020/products/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  return response.json();
};
