import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./apiProblem"
import { LoginResult, LogoutResult } from "./api.types"

export class AuthenticationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async login(username: string, password: string): Promise<LoginResult> {
    try {
      const response: ApiResponse<unknown> = await this.api.apisauce.post("/service/Auth/usersV3", {
        username,
        password,
      })

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    } catch (e) {
      // eslint-disable-next-line reactotron/no-tron-in-production
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async logout(): Promise<LogoutResult> {
    try {
      const response: ApiResponse<unknown> = await this.api.apisauce.patch(
        "/Authentication/log-out",
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    } catch (e) {
      // __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
