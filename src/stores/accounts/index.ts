/*用户相关*/
import { defineStore } from 'pinia'
import { AgentCenter } from './types'
// import { $post } from '../../'
import { $get } from '../../request'

export const useAccountCenter = defineStore('agentCenter', {
  state: (): AgentCenter => {
    return {
      all: [],
      accountList: [],
      account_number: '',
      total: 0,
    }
  },
  actions: {
    GET_ACCOUNT_LIST() {
      return $get('account_list').then((res: any) => {
        if (res.err) return console.log(err.message)
        // this.all = res
        this.account_number = res.account_number
        this.accountList = res.data
        console.log(res)
        return res
      })
    },
  },
})
