import { BASE_API_URL } from './constants'

export const fetchBeers = async setter => {
  const response = await fetch('http://localhost:5005/api/beers')
  const parsed = await response.json()
  setter(parsed)
}

export const apiBase =
  token =>
  async (endpoint, method = 'GET', payload) => {
    const response = await fetch(`${BASE_API_URL}/api/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    const parsed = await response.json()

    return parsed
  }

export const authBase = async (endpoint, credentials) => {
  const response = await fetch(`${BASE_API_URL}/auth/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  const parsed = await response.json()

  return parsed
}

export const login = async credentials => {
  const response = await authBase('login', credentials)
  return response
}

export const signup = async credentials => {
  const response = await authBase('signup', credentials)
  return response
}

export const checkToken = async token => {
  const response = await fetch(`${BASE_API_URL}/auth/verify`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const parsed = await response.json()

  return parsed
}
