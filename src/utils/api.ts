
import { API_URL } from './constants';

export const fetchAPI= async (endpoint: string) => {
try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); 
    console.log('Fetch API response:', data);
    return data;
   
  } catch (error) {
    throw new Error(`${error}`);
  } 
}