import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Template from './template.vue'
import SequenceOrder from '@/ADempiere/modules/window/components/SequenceOrder'
import MainPanel from '@/ADempiere/shared/components/Panel'
import { PanelContextType } from '../../utils/DictionaryUtils/ContextMenuType'
import { IPanelDataExtended } from '@/ADempiere/modules/dictionary'
import { Namespaces } from '../../utils/types'
import { IRecordSelectionData } from '@/ADempiere/modules/persistence'
import { showNotification } from '../../utils/notifications'
import { WindowTabAssociatedAction } from '@/ADempiere/modules/window'
import { DeviceType } from '@/ADempiere/modules/app/AppType'

@Component({
  name: 'ModalProcess',
  mixins: [Template],
  components: {
    MainPanel,
    SequenceOrder
  }
})
export default class ModalProcess extends Vue {
    @Prop({ type: String, default: undefined }) parentUuid?: string
    @Prop({ type: String, default: '' }) containerUuid!: string
    @Prop({ type: String, default: 'window' }) panelType!: PanelContextType
    @Prop({ type: String, default: '' }) reportExportType!: string

    // Computed properties
    get isMobile(): boolean {
      return this.$store.state.app.device === DeviceType.Mobile
    }

    get width(): number {
      if (this.isMobile) {
        return 80
      }
      return 50
    }

    get isVisibleDialog(): boolean {
      return this.$store.state.processModule.isVisibleDialog
    }

    get modalMetadata(): Partial<IPanelDataExtended> {
      return this.$store.state.processModule.metadata
    }

    get windowRecordSelected(): any {
      // return this.$store.state.window.recordSelected
      return this.$store.state.windowModule.currentRecord
    }

    get getterDataRecordsAndSelection(): IRecordSelectionData {
      return this.$store.getters[
        Namespaces.BusinessData + '/' + 'getDataRecordAndSelection'
      ](this.containerUuid)
    }

    // Watchers
    @Watch('isVisibleDialog')
    handleIsVisibleDialogChange(value: boolean) {
      if (this.modalMetadata.isSortTab) {
        const data = this.$store.getters[
          Namespaces.BusinessData + '/' + 'getDataRecordAndSelection'
        ](this.modalMetadata.containerUuid)
        if (!data.isLoaded && !data.record.length) {
          this.$store
            .dispatch(Namespaces.Window + '/' + 'getDataListTab', {
              parentUuid: this.modalMetadata.parentUuid,
              containerUuid: this.modalMetadata.containerUuid,
              isAddRecord: true
            })
            .catch(error => {
              console.warn(
                            `Error getting data list tab. Message: ${error.message}, code ${error.code}.`
              )
            })
        }
      }
    }

    // Methods
    showNotification = showNotification

    closeDialog(): void {
      this.$store.dispatch(Namespaces.Process + '/' + 'setShowDialog', {
        type: this.modalMetadata.panelType,
        action: undefined
      })
    }

    runAction(action: WindowTabAssociatedAction) {
      if (action.isSortTab) {
        this.$store.dispatch(Namespaces.Window + '/' + 'updateSequence', {
          parentUuid: this.modalMetadata.parentUuid,
          containerUuid: this.modalMetadata.containerUuid
        })
        return
      }
      if (action === undefined && this.windowRecordSelected !== undefined) {
        this.$router.push(
          {
            name: this.$route.name!,
            query: {
              ...this.$route.query,
              action: this.windowRecordSelected.UUID
            }
          }
        )
        this.closeDialog()
      } else if (action !== undefined) {
        const fieldNotReady = this.$store.getters[Namespaces.Panel + '/' + 'isNotReadyForSubmit'](action.uuid)
        if (this.panelType === PanelContextType.Form) {
          this.$store.dispatch(Namespaces.Process + '/' + 'processPos', {
            action: action,
            parentUuid: this.parentUuid,
            idProcess: this.$store.getters[Namespaces.Order + '/' + 'getFindOrder'].id,
            containerUuid: this.containerUuid,
            panelType: this.panelType, // Determinate if get table name and record id (window) or selection(browser)
            parametersList: this.$store.getters[Namespaces.Utils + '/' + 'getPosParameters']
          })
            .catch(error => {
              console.warn(error)
            })
          this.closeDialog()
        } else {
          if (!fieldNotReady) {
            this.closeDialog()
            const porcesTabla = this.$store.getters[Namespaces.Utils + '/' + 'getProcessSelect'].processTablaSelection
            const selection = this.$store.getters[Namespaces.Utils + '/' + 'getProcessSelect']
            if (porcesTabla) {
              // selection.forEach(element => {
              this.$store.dispatch(Namespaces.Process + '/' + 'selectionProcess', {
                action: action, // process metadata
                parentUuid: this.parentUuid,
                containerUuid: this.containerUuid,
                panelType: this.panelType, // determinate if get table name and record id (window) or selection (browser)
                reportFormat: this.reportExportType,
                recordUuidSelection: selection,
                isProcessTableSelection: true,
                routeToDelete: this.$route
              })
              // })
            } else {
              this.$store
                .dispatch(Namespaces.Process + '/' + 'startProcess', {
                  action: action, // process metadata
                  parentUuid: this.parentUuid,
                  isProcessTableSelection: false,
                  containerUuid: this.containerUuid,
                  panelType: this.panelType, // determinate if get table name and record id (window) or selection (browser)
                  reportFormat: this.reportExportType,
                  routeToDelete: this.$route
                })
                .catch(error => {
                  console.warn(error)
                })
            }
          } else {
            this.showNotification({
              type: 'warning',
              title: this.$t('notifications.emptyValues').toString(),
              name: '<b>' + fieldNotReady.name + '.</b> ',
              message: this.$t('notifications.fieldMandatory').toString()
            })
          }
        }
      }
    }
}
