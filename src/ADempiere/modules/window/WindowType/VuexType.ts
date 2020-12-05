import { IDocumentStatusData } from '@/ADempiere/modules/core'
import {
  PrintFormatsAction,
  ProcessDefinitionAction,
  SummaryAction
} from '@/ADempiere/modules/dictionary/DictionaryType/ContextMenuType'
import { ActionContextName, ActionContextType } from '@/ADempiere/shared/utils/DictionaryUtils/ContextMenuType'
import {
  WindowTabAssociated,
  WindowProcessAsociatedAction,
  WindowDefinitionAction
} from './ContextMenuType'
import { IDocumentActionData } from './DomainType'

export type IContextActionData =
    WindowTabAssociated
    | WindowProcessAsociatedAction
    | WindowDefinitionAction
    | ProcessDefinitionAction
    | PrintFormatsAction
    | SummaryAction

export const item: IContextActionData = {
  action: ActionContextName.ChangeParameters,
  disabled: true,
  name: '',
  processName: '',
  type: ActionContextType.Application
}
const x: IContextActionData[] = []
function add(item: IContextActionData) {
  x.push(item)
}

export type IContextRelationData = any

export type IContextReferenceData = any

export interface IContextMenuData {
    containerUuid: string
    relations: IContextRelationData[]
    actions: IContextActionData[]
    references: IContextReferenceData[]
}

export interface IListDocumentStatus {
    defaultDocumentAction?: IDocumentStatusData
    documentActionsList: IDocumentActionData[]
    recordId?: number
    recordUuid?: string
}

export interface IListDocumentAction {
    defaultDocumentAction?: IDocumentActionData
    documentActionsList: IDocumentActionData[]
    recordId?: number
    recordUuid?: string
}

export interface ContextMenuState {
    contextMenu: IContextMenuData[]
    listDocumentStatus: IListDocumentStatus
    listDocumentAction: IListDocumentAction
}
