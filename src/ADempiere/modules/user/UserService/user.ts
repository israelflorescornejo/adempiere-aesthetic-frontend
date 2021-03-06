// Instance for connection
import {
  ApiRest as requestRest,
  evaluateResponse
} from '@/ADempiere/shared/services/instances'
import {
  IMenuData,
  IMenuParams,
  ISessionData,
  IUserInfoData,
  ILoginParams
} from '../UserType'
import { convertMenu, convertSession } from '@/ADempiere/modules/user'

/**
 * Make login by UserName and password, this function can return user data for show
 * @param {string} userName
 * @param {string} password
 */

export function login(data: ILoginParams) {
  const { userName, password, token } = data
  return requestRest({
    url: '/user/login',
    method: 'post',
    data: {
      username: userName,
      password,
      token
    }
  })
}

/**
 * Get User Info
 * @param {string} token or session UUID
 */

export function requestUserInfoFromSession(
  token: string
): Promise<IUserInfoData> {
  return requestRest({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
    .then(evaluateResponse)
    .then((response: IUserInfoData) => {
      return response
    })
}

/**
 * Get session info
 * @param {string} token or session UUID
 */
export function requestSessionInfo(token: string): Promise<ISessionData> {
  return requestRest({
    url: '/user/session',
    method: 'get',
    params: {
      token
    }
  })
    .then(evaluateResponse)
    .then(responseSession => {
      const session = convertSession(responseSession)
      return session
    })
}

/**
 * Logout from server
 * @param {string} token or session UUID
 */
export function logout(token: string): Promise<any> {
  return requestRest({
    url: '/user/logout',
    data: {
      token
    }
  })
}

/**
 * Get User menu from server
 * @param {string} sessionUuid
 */
export function requestMenu(data: IMenuParams): Promise<IMenuData> {
  const { sessionUuid } = data
  return requestRest({
    url: '/user/menu',
    method: 'get',
    params: {
      token: sessionUuid
    }
  })
    .then(evaluateResponse)
    .then(response => {
      return convertMenu(response)
    })
}
