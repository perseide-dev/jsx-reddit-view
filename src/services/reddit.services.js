import axios from "axios";


export const getRedditThreadsService = async (token, queryData) => {
  // Filtrar las claves del objeto data con valores válidos
  const filteredData = Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(queryData).filter(([key, value]) => {
      return (
        value !== null &&
        value !== false &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    })
  );

  // Crear los parámetros de búsqueda
  const params = new URLSearchParams(filteredData);

  // Realizar la petición GET
  return await axios.get(`api/reddits?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};