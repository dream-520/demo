// import { $getList, $getDetail, $addData, $deleteData } from '@/api/report'

const xny = {
  state: {
    list: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 20,
    totalPage: 2,
    detail: {}
  },
  mutations: {
    GET_LIST_rxny: (state, res) => {
      state.list = [{
        data1: '2019',
        data2: '3',
        data3: '2019-03-01',
        data4: '管理员'
      }, {
        data1: '2019',
        data2: '2',
        data3: '2019-02-02',
        data4: '管理员'
      }]
      state.currentPage = 1
      state.totalCount = 20
      state.pageSize = 10
    },

    GET_DETAIL_rxny(state, detail) {
      state.detail = detail
    },

    ADD_DATA_rxny(state, detail) {
      const addData = {
        data1: '2019',
        data2: '1',
        data3: '2019-03-01',
        data4: '管理员'
      }
      state.list.push(addData)
    },

    DELETE_REPORT_rxny(state, deleteId) {
			state.list.splice(deleteId.id,1)
      // state.list = state.list.filter((item) => { return item.id !== deleteId })
    }
  },
  actions: {
    async GetList_rxny({ commit, state }, params) {
      // let result = null
      // result = await $getList({
      //   currPage: params.currPage,
      //   pageSize: params.pageSize || state.pageSize
      // })
      // result && commit('GET_LIST', result.data)
      // params.cb && params.cb()
      const result = null
      commit('GET_LIST_rxny', result)
      params.cb()
    },

    async GetDetail_rxny({ commit, state }, params) {
      // let result = null
      // result = await $getDetail(params)
      // result && commit('GET_DETAIL', result.data)
      // params.cb && params.cb()
      const result = null
      commit('GET_DETAIL_rxny', result)
      params.cb()
    },

    async Add_rxny({ commit, state }, params) {
      // let result = null
      // result = await $addData(params)
      // result && commit('DELETE_REPORT', params.id)
      // params.cb && params.cb()
      const result = null
      commit('ADD_DATA_rxny', result)
      params.cb()
    },

    async DeleteData_rxny({ commit, state }, params) {
      // let result = null
      // result = await $deleteData(params)
      // result && commit('DELETE_REPORT', params.id)
      // params.cb && params.cb()
      const result = null
      commit('DELETE_REPORT_rxny', params)
      params.cb()
    }
  }
}

export default xny
