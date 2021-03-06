import { IRootState } from '@/store'
import { showMessage } from '@/ADempiere/shared/utils/notifications'
import { ActionContext, ActionTree } from 'vuex'
import { requestListPointOfSales } from '../../POSService'
import {
  IListPointOfSalesResponse,
  IPointOfSalesData,
  PointOfSalesState
} from '../../POSType'

type PointOfSalesActionContext = ActionContext<PointOfSalesState, IRootState>
type PointOfSalesActionTree = ActionTree<PointOfSalesState, IRootState>

export const actions: PointOfSalesActionTree = {
  /**
     * List point of sales terminal
     * @param {number} posToSet id to set
     */
  listPointOfSalesFromServer(
    context: PointOfSalesActionContext,
    posToSet = null
  ) {
    const userUuid: string = context.rootState.user.userUuid

    requestListPointOfSales({
      userUuid
    })
      .then((response: IListPointOfSalesResponse) => {
        console.log(response)
        // TODO: Add organization
        context.commit('setPontOfSales', {
          ...response,
          userUuid
        })

        const posList: IPointOfSalesData[] = response.list
        const getterPos: string = context.getters.getPointOfSalesUuid
        let pos: IPointOfSalesData | undefined
        if (posList) {
          if (getterPos) {
            pos = posList.find(
              (itemPOS: IPointOfSalesData) =>
                itemPOS.uuid === getterPos
            )
          }

          // match with route.query.pos
          if (!pos && posToSet) {
            pos = posList.find(
              (itemPOS: IPointOfSalesData) =>
                itemPOS.id === posToSet
            )
          }

          // set first element in array list
          if (!pos) {
            pos = posList[0]
          }
        }
        if (!pos) {
          pos = undefined
        }
        if (pos!.uuid !== getterPos) {
          context.dispatch('setCurrentPOS', pos)
        }
      })
      .catch(error => {
        console.warn(
                    `listPointOfSalesFromServer: ${error.message}. Code: ${error.code}.`
        )
        showMessage({
          type: 'error',
          message: error.message,
          showClose: true
        })
      })
  },
  setCurrentPOS(
    context: PointOfSalesActionContext,
    posToSet: IPointOfSalesData
  ) {
    context.commit('setCurrentPOS', posToSet)

    // const oldRoute = router.app._route
    // router.push({
    //   name: oldRoute.name,
    //   params: {
    //     ...oldRoute.params
    //   },
    //   query: {
    //     ...oldRoute.query,
    //     pos: posToSet.id
    //   }
    // }, () => {})

    context.commit('setIsReloadKeyLayout')
    context.commit('setIsReloadProductPrice')
    context.commit('setIsReloadListOrders')
    context.commit('setShowPOSKeyLayout', false)
    context.dispatch('deleteAllCollectBox')
  }
}
