import Vue from 'vue'
import { fieldModule, formDefinitionModule, processDefinitionModule } from '@/ADempiere/modules/dictionary'
import Vuex, { StoreOptions } from 'vuex'
import vuexLocal from '@/ADempiere/shared/plugins/vuex-persist'
import { RootState } from '@/ADempiere/shared/store/types'
import { systemModule, businessPartnerModule } from '@/ADempiere/modules/core'

import { preferenceModule } from '@/ADempiere/shared/store/modules/preference'
import { dashboardModule } from '@/ADempiere/modules/dashboard'
import { name, version } from '@/../package.json'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    appName: name,
    appVersion: version
  },
  modules: {
    systemModule,
    businessPartnerModule,
    dashboardModule,
    fieldModule,
    formDefinitionModule,
    processDefinitionModule,
    preferenceModule
  },
  plugins: [vuexLocal.plugin]
}

export default new Vuex.Store<RootState>(store)
