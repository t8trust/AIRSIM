export const burl = process.env.NODE_ENV == "production" ? "https://192.168.75.63:3000" : "http://127.0.0.1:3000"

export class StatusError extends Error {
  code = 0
  url = ""
  constructor(url, code){
    super("Status error for url : " + code  + " " + url)
    this.code = code
    this.url = url
  }
}

function appendParamsToUrl(url, params){
  function getUrlFragment(key){
    let value = params[key]
    
    if (Array.isArray(value))
      value = JSON.stringify(value)

    return `${key}=${value}` 
  }

  const keys = Object.keys(params)
  console.log(Object.keys(params))

  if (keys.length >= 1) {
    url += `?${getUrlFragment(keys[0])}`
  }

  for (let i = 1; i < keys.length; i++){
    url += `&${getUrlFragment(keys[i])}`
  }
  
  return url;
}

/**
 * @param {string} url 
 * @param {RequestInit?} params
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, params) {
  return fetch(url, {
    headers: { 'Authorization': 'Bearer ' + Auth.token },
    ...params
  }).then(async (resp) => {
    if (resp.status >= 400) throw new StatusError(resp.url, resp.status)
    return await resp.json()  
  })
}

async function fetchWithBodyJSON(method, url, body, params) {
  return fetch(url, { method, 
      body: body ? JSON.stringify(body) : undefined, 
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + Auth.token  },
      ...params })
      .then(async (resp) => {
        if (resp.status >= 400) throw new StatusError(resp.url, resp.status)
        return await resp.json()
      }
  )
}


/**
 * @param {string} url 
 * @param {RequestInit?} params
 * @returns {Promise<any>}
 */
export function postJSON(url, body, params) { return fetchWithBodyJSON("POST", url, body, params) }


/**
 * @param {string} url 
 * @param {RequestInit?} params
 * @returns {Promise<any>}
 */
export function putJSON(url, body, params) { return fetchWithBodyJSON("put", url, body, params) }


export const Auth = {
  token: "",

  async login(login, password) {
    const resp = await postJSON(burl + "/auth/login", { login, password })
    this.token = resp.access_token
    console.log(this.token)
  },

  disconnect() {
    this.token = ""
  }
}

export const Users = {
  url: burl + "/utilisateurs",

  async findAll(){
    return await fetchJSON(appendParamsToUrl(this.url, {}))
  },

  async create(user) {
    return await postJSON(this.url, user);
  },

  async delete(id) {
    return await fetchJSON(`${this.url}/${id}`)
  },

  async update(id, user) {
    return await putJSON(`${this.url}/${id}`, user)
  },
}

export const Airports = {
  url: burl + "/aeroports",
  
  /**
  * @param {{
  *  search: string,
  *  limit: number,
  *  bounds: import("ol/extent").Extent,
  *  page: number
  * }} params
  */
  async findAll(params) {
    return await fetchJSON(appendParamsToUrl(this.url, params))
  },

  async findOne(iata) {
    return await fetchJSON(`${this.url}/${iata}`)
  },

  /**
   * @param {Airport} airport 
   */
  async create(airport) {
    return await postJSON(this.url, airport);
  },

  async delete(iata) {
    return await fetchJSON(`${this.url}/${iata}`)
  },

  /**
   * @param {string} iata 
   * @param {Airport} airport 
   */
  async update(iata, airport) {
    return await putJSON(`${this.url}/${iata}`, airport)
  },
}

export const Flights = {
  url: burl + "/vols",

  async findTravel(iata1, iata2){
    return await fetchJSON(appendParamsToUrl(this.url, {depart: iata1, destination: iata2, page: 0}))
  },

  /**
   * @param {{
   *  page: number
   * }} params 
   */
  async findAll(params) {
    return await fetchJSON(appendParamsToUrl(this.url, params))
  },

  /**
   * @param {Vol} vol 
   */
  async create(vol) {
    return await postJSON(this.url, vol);
  },

  async delete(id) {
    return await fetchJSON(`${this.url}/${id}`)
  },

  /**
   * @param {number} id 
   * @param {Vol} vol 
   */
  async update(id, vol) {
    return await putJSON(`${this.url}/${id}`, vol)
  },  
}
