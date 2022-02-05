//basitlestirilmis functionlar burda durur.
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //res = response
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; //Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack.
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //json olarak yollucam demek
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //res = response
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; //Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack.
  }
};
