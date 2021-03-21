/**
 * 用户搜索模块
 */
import request from '@/utils/request'

/**
 * 获取联想建议
 * @param q
 * @returns {AxiosPromise}
 */
export const getSearchSuggstion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param params
 * @returns {AxiosPromise}
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
