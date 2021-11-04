// export const baseEndpoint = 'http://localhost:3000';
export const baseEndpoint = 'https://f42f-186-146-148-161.ngrok.io';

async function makeRequest(sufix = '/', method = 'GET', payload = {}) {
  const BASE_URL = baseEndpoint;
  const contentType = 'application/json';

  const general = {
    method,
    redirect: 'follow',
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
    },
  };

  if (
    method === 'POST' ||
    method === 'PUT' ||
    method === 'DELETE' ||
    method === 'PATCH'
  ) {
    general.body = JSON.stringify(payload);
  }

  console.log('EL GENERAL', general);
  return await fetch(`${BASE_URL}${sufix}`, general)
    .then(response => {
      console.log(method, response.status, `${BASE_URL}${sufix}`, response);
      if (!response.ok) {
        console.log(
          `Service error ${BASE_URL}${sufix} ${JSON.stringify(response)}`,
        );
        throw {status: response.status, message: '¡Algo salió mal!'};
      }

      return response.json();
    })
    .then(jsonresponse => jsonresponse)
    .catch(err => {
      console.log(err);
      return err;
    });
}

export const API = {
  auth: {
    login: async () => {
      const response = await makeRequest('/auth', 'GET');
      return response;
    },
    setCredentials: async payload => {
      const response = await makeRequest('/auth', 'POST', payload);
      return response;
    },
    signUp: async payload => {
      const response = await makeRequest('/profile', 'POST', payload);
      return response;
    },
  },
  user: {
    update: async payload => {
      const response = await makeRequest('/profile', 'PUT', payload);
      return response;
    },
    getProfiles: async () => {
      const response = await makeRequest('/profile', 'GET');
      return response;
    },
  },
};
