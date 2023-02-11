/*用户相关*/
import { defineStore } from 'pinia'
import { AgentCenter } from './types'
// import { $post } from '../../'
import { $get } from '../../request'

export const useAccountCenter = defineStore('agentCenter', {
  state: (): AgentCenter => {
    return {
      accountList: [],
      total: 0,
      account_number: 0,
    }
  },
  actions: {
    GET_ACCOUNT_LIST() {
      return $get('account_list').then((res: any) => {
        if (res.err) return console.log(err.message)
        this.accountList = res
        return res
      })
    },
  },
})
