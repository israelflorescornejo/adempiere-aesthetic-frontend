import { convertContextInfo } from '@/ADempiere/modules/core'
import {
  IFieldConditionData,
  IFieldData,
  IFieldDefinitionData,
  IFieldGroupData,
  IReferenceData,
  IZoomWindowData
} from '.'

export function convertField(fieldToConvert: any): IFieldData {
  return {
    // base attributes
    id: fieldToConvert.id,
    uuid: fieldToConvert.uuid,
    name: fieldToConvert.name,
    description: fieldToConvert.description,
    help: fieldToConvert.help,
    columnName: fieldToConvert.column_name,
    elementName: fieldToConvert.element_name,
    isActive: fieldToConvert.is_active,
    // displayed attributes
    fieldGroup: convertFieldGroup(fieldToConvert.Fieldgroup),
    displayType: fieldToConvert.display_type,
    isFieldOnly: fieldToConvert.is_field_only,
    isRange: fieldToConvert.is_range,
    isSameLine: fieldToConvert.is_same_line,
    isEncrypted: fieldToConvert.is_encrypted, // passswords fields
    isQuickEntry: fieldToConvert.is_quick_entry,
    sequence: fieldToConvert.sequence,
    seqNoGrid: fieldToConvert.seq_no_grid,
    sortNo: fieldToConvert.sort_no,
    identifierSequence: fieldToConvert.identifier_sequence,
    // value attributes
    formatPattern: fieldToConvert.format_pattern,
    vFormat: fieldToConvert.v_format,
    defaultValue: fieldToConvert.default_value,
    defaultValueTo: fieldToConvert.default_value_to,
    fieldLength: fieldToConvert.field_length,
    valueMin: fieldToConvert.value_max,
    valueMax: fieldToConvert.value_max,
    //
    isIdentifier: fieldToConvert.is_identifier,
    isParent: fieldToConvert.is_parent,
    isKey: fieldToConvert.is_key,
    isSelectionColumn: fieldToConvert.is_selection_column,
    isUpdateable: fieldToConvert.is_updateable,
    isAlwaysUpdateable: fieldToConvert.is_always_updateable,
    //
    isAllowCopy: fieldToConvert.is_allow_copy,
    isHeading: fieldToConvert.is_heading,
    isAllowLogging: fieldToConvert.is_allow_logging,
    isTranslated: fieldToConvert.is_translated,
    //
    columnSQL: fieldToConvert.column_sql,
    //
    isDisplayed: fieldToConvert.is_displayed,
    isDisplayedGrid: fieldToConvert.is_displayed_grid,
    isMandatory: fieldToConvert.is_mandatory,
    isReadOnly: fieldToConvert.is_read_only,
    // Smart Browser attributes
    isQueryCriteria: fieldToConvert.is_query_criteria,
    isOrderBy: fieldToConvert.is_order_by,
    isinfoOnly: fieldToConvert.is_info_only,
    // logics
    callout: fieldToConvert.callout,
    displayLogic: fieldToConvert.display_logic,
    mandatoryLogic: fieldToConvert.mandatory_logic,
    readOnlyLogic: fieldToConvert.read_only_logic,
    // External info
    reference: convertReference(fieldToConvert.reference),
    contextInfo: convertContextInfo(fieldToConvert.context_info),
    fieldDefinition: convertFieldDefinition(fieldToConvert.Fielddefinition)
  }
}

export function convertFieldGroup(fieldGroupToConvert: any): IFieldGroupData {
  if (fieldGroupToConvert) {
    return {
      id: fieldGroupToConvert.id,
      uuid: fieldGroupToConvert.uuid,
      name: fieldGroupToConvert.name,
      fieldGroupType: fieldGroupToConvert.field_group_type,
      isActive: fieldGroupToConvert.is_active,
      //
      groupName: fieldGroupToConvert.name,
      groupType: fieldGroupToConvert.field_group_type
    }
  }
  return {
    id: undefined,
    uuid: undefined,
    name: undefined,
    fieldGroupType: undefined,
    isActive: undefined,
    //
    groupName: undefined,
    groupType: undefined
  }
}

export function convertReference(referenceToConvert: any): IReferenceData {
  if (referenceToConvert) {
    return {
      tableName: referenceToConvert.table_name,
      keyColumnName: referenceToConvert.key_column_name,
      displayColumnName: referenceToConvert.display_column_name,
      query: referenceToConvert.query,
      directQuery: referenceToConvert.direct_query,
      validationCode: referenceToConvert.validation_code,
      zoomWindows: referenceToConvert.zoom_windows.map(
        (zoomWindowItem: any) => {
          return convertZoomWindow(zoomWindowItem)
        }
      )
    }
  }
  return {
    tableName: undefined,
    keyColumnName: undefined,
    displayColumnName: undefined,
    query: undefined,
    directQuery: undefined,
    validationCode: undefined,
    zoomWindows: []
  }
}

export function convertZoomWindow(zoomWindowToConvert: any): IZoomWindowData {
  if (zoomWindowToConvert) {
    return {
      id: zoomWindowToConvert.id,
      uuid: zoomWindowToConvert.uuid,
      name: zoomWindowToConvert.name,
      description: zoomWindowToConvert.description,
      isSalesTransaction: zoomWindowToConvert.is_sales_transaction,
      isActive: zoomWindowToConvert.is_active
    }
  }
  return {
    id: undefined,
    uuid: undefined,
    name: undefined,
    description: undefined,
    isSalesTransaction: undefined,
    isActive: undefined
  }
}

export function convertFieldDefinition(
  fieldDefinitionToConvert: any
): IFieldDefinitionData {
  if (fieldDefinitionToConvert) {
    return {
      id: fieldDefinitionToConvert.id,
      uuid: fieldDefinitionToConvert.uuid,
      value: fieldDefinitionToConvert.Value,
      name: fieldDefinitionToConvert.name,
      isActive: fieldDefinitionToConvert.is_active,
      fieldGroupType: fieldDefinitionToConvert.field_group_type,
      conditions: fieldDefinitionToConvert.conditions.map(
        (itemCondition: any) => {
          return connvertFieldCondition(itemCondition)
        }
      )
    }
  }
  return {
    id: undefined,
    uuid: undefined,
    value: undefined,
    name: undefined,
    fieldGroupType: undefined,
    isActive: undefined,
    conditions: []
  }
}

export function connvertFieldCondition(
  fieldConditionToConvert: any
): IFieldConditionData {
  if (fieldConditionToConvert) {
    return {
      id: fieldConditionToConvert.id,
      uuid: fieldConditionToConvert.uuid,
      condition: fieldConditionToConvert.condition,
      stylesheet: fieldConditionToConvert.style_sheet,
      isActive: fieldConditionToConvert.is_active
    }
  }
  return {
    id: undefined,
    uuid: undefined,
    condition: undefined,
    stylesheet: undefined,
    isActive: undefined
  }
}
