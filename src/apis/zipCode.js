export async function fetchZipCode(zipCode) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.zippopotam.us/ES/${zipCode}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener el código postal');
        }

        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
