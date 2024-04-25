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

/**
 * @param {string} url 
 * @param {RequestInit?} params
 * @returns {Promise<any>}
 */
export async function fetchJSON(url, params) {
  return fetch(url, params).then(async (resp) => {
    if (resp.status >= 400) throw new StatusError(resp.url, resp.status)
    return await resp.json()  
  })
}

/**
 * @param {string} url 
 * @param {RequestInit?} params
 * @returns {Promise<any>}
 */
export async function postJSON(url, body, params) {
  return fetch(url, { method: "POST", 
      body: body ? JSON.stringify(body) : undefined, 
      headers: { "Content-Type": "application/json" },
      ...params })
      .then(async (resp) => {
        if (resp.status >= 400) throw new StatusError(resp.url, resp.status)
        return await resp.json()
      }
  )
}

export const Auth = {
  token: "",

  async login(login, password) {
    const resp = await postJSON("/auth/login", { login, password })
    this.token = resp.access_token
  },

  disconnect() {
    this.token = ""
  }
}

export const Users = {

}


export const Airports = {
  url: burl + "/aeroports",
  async findAll() {
    return await fetchJSON(this.url)
  },

  async findByName(str){
    return await fetchJSON(this.url + "/" + str)
  },

  /**
   * @param {[minlon: number, minlat: number, maxlon: number, maxlat: number]} extents
   */
  async findByRegion(extents){
    return await fetchJSON(this.url + "/" + extents[0] + "/" + extents[1] + "/" + extents[2] + "/" + extents[3])
  }
}

export const Flights = {

}