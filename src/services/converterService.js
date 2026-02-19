const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const convertUnit = async (category, value, fromUnit, toUnit) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      category,
      value: parseFloat(value),
      fromUnit,
      toUnit
    })
  });

  if (!response.ok) {
    throw new Error("Conversion failed");
  }

  return await response.json();
};
