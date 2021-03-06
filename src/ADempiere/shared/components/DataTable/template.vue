<template>
  <el-container
    v-if="isLoadPanel"
    label-position="top"
    style="height: inherit;"
    class="data-table-component"
  >
    <el-main style="padding: 0px !important; overflow: hidden;">
      <el-container style="height: 100%;">
        <el-header :style="tableHeaderStyle">
          <el-collapse
            v-if="isParent"
            v-model="activeName"
            v-shortkey="shorcutKey"
            @shortkey.native="actionAdvancedQuery()"
          >
            <el-collapse-item :title="$t('table.dataTable.advancedQuery')" name="PanelAdvancedQuery">
              <main-panel
                v-if="isLoadedPanel || (activeName) && activeName[0] === 'PanelAdvancedQuery'"
                v-show="(activeName) && activeName[0] === 'PanelAdvancedQuery'"
                :container-uuid="'table_' + containerUuid"
                :parent-uuid="'table_' + parentUuid"
                :metadata="panelMetadata"
                panel-type="table"
                is-advanced-query
                class="collapse_item_wrap"
              />
            </el-collapse-item>
          </el-collapse>

          <div v-if="!isMobile">
            <table-main-menu
              :container-uuid="containerUuid"
              :parent-uuid="parentUuid"
              :panel-type="panelType"
              :is-parent="isParent"
              :is-panel-window="isPanelWindow"
              :process-menu="getMenuTable"
              :is-mobile="isMobile"
              :panel-metadata="panelMetadata"
            />
            <el-button
              v-if="!isParent && isPanelWindow"
              type="text"
              :icon="(newRecordsQuantity <= 0) ? 'el-icon-circle-plus' : 'el-icon-remove'"
              style="float: right; padding-top: 8px; font-size: larger; padding-left: 6px; color: gray;"
              :disabled="newRecordsQuantity <= 0 ? isDisabledAddNew : false"
              @click="(newRecordsQuantity <= 0) ? addNewRow() : callOffNewRecord()"
            />
            <icon-element icon="el-icon-news">
              <fixed-columns
                :container-uuid="containerUuid"
                :panel-type="panelType"
                class="header-search-input"
              />
            </icon-element>
            <filter-columns
              v-if="isShowOptionalColumns"
              :container-uuid="containerUuid"
              :panel-type="panelType"
              class="field-optional"
            />
            <div :class="{show: showTableSearch}" class="local-search-container">
              <svg-icon class-name="search-icon" icon-class="search" @click.stop="click()" />
              <el-input
                ref="headerSearchInput"
                v-model="searchTable"
                size="mini"
                :placeholder="$t('table.dataTable.search')"
                class="header-search-input"
              />
            </div>
          </div>
          <div v-else>
            <div v-if="!isParent">
              <fixed-columns
                :container-uuid="containerUuid"
                :panel-type="panelType"
                class="header-search-input"
              />
              <filter-columns
                v-if="isShowOptionalColumns"
                :container-uuid="containerUuid"
                :panel-type="panelType"
                class="field-optional"
              />
              <div :class="{show: showTableSearch}" class="local-search-container">
                <svg-icon class-name="search-icon" icon-class="search" @click.stop="click()" />
                <el-input
                  ref="headerSearchInput"
                  v-model="searchTable"
                  size="mini"
                  :placeholder="$t('table.dataTable.search')"
                  class="header-search-input"
                  clearable
                />
              </div>
            </div>
            <div v-else class="panel-expand">
              <div :class="{show: showTableSearch, mobile: isMobile}" class="local-search-container">
                <svg-icon class-name="search-icon" icon-class="search" @click.stop="click()" />
                <el-input
                  ref="headerSearchInput"
                  v-model="searchTable"
                  size="mini"
                  :placeholder="$t('table.dataTable.search')"
                  class="header-search-input"
                  clearable
                />
              </div>
              <!-- is parent and is mobile -->
              <el-button
                v-show="isPanelWindow && getDataSelection.length"
                type="text"
                icon="el-icon-delete"
                style="color: black; font-size: 17px; font-weight: 605 !important;"
                @click="deleteSelection()"
              />
              <icon-element icon="el-icon-news" style="padding-top: 0px;" @click="searchRecordNavegation()">
                <fixed-columns
                  :container-uuid="containerUuid"
                  :panel-type="panelType"
                  class="header-search-input"
                />
              </icon-element>
            </div>
          </div>
        </el-header>

        <el-main style="padding: 0px !important; overflow: hidden;">
          <table-context-menu
            v-show="isShowedContextMenu"
            :style="{left: leftContextualMenu + 'px', top: topContextualMenu + 'px'}"
            class="contextual-menu"
            :container-uuid="containerUuid"
            :parent-uuid="parentUuid"
            :panel-type="panelType"
            :current-row="currentRowMenu"
            :is-panel-window="isPanelWindow"
            :process-menu="getMenuTable"
            :is-mobile="isMobile"
            :panel-metadata="panelMetadata"
          />

          <el-table
            ref="multipleTable"
            v-loading="!isCreateNewRoute && isLoaded"
            :height="getHeigthTable"
            style="width: 100%"
            border
            :row-key="panelMetadata.keyColumn"
            reserve-selection
            highlight-current-row
            :row-style="rowStyle"
            :data="showTableSearch ? filterResult() : recordsData"
            :element-loading-text="$t('notifications.loading')"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            cell-class-name="datatable-max-cell-height"
            :show-summary="isShowedTotals"
            :row-class-name="tableRowClassName"
            :summary-method="getSummaries"
            @row-click="handleRowClick"
            @row-dblclick="handleRowDblClick"
            @select="handleSelection"
            @select-all="handleSelectionAll"
            @row-contextmenu="rowMenu"
            @contextmenu.prevent.native="block"
          >
            <el-table-column
              v-if="isTableSelection"
              type="selection"
              :prop="panelMetadata.keyColumn"
              fixed
              min-width="50"
            />
            <template v-for="(fieldAttributes, key) in fieldsList">
              <el-table-column
                v-if="isDisplayed(fieldAttributes)"
                :key="key"
                :label="headerLabel(fieldAttributes)"
                :column-key="fieldAttributes.columnName"
                :prop="fieldAttributes.columnName"
                sortable
                min-width="200"
                :class-name="cellClass(fieldAttributes)"
                :fixed="fieldAttributes.isFixedTableColumn"
              >
                <template slot-scope="scope">
                  <template v-if="rowCanBeEdited(scope.row, fieldAttributes)">
                    <field-definition
                      :is-data-table="true"
                      :is-show-label="false"
                      :in-table="true"
                      :metadata-field="{
                        ...fieldAttributes,
                        displayColumn: scope.row[fieldAttributes.displayColumnName],
                        tableIndex: scope.$index,
                        rowKey: scope.row[panelMetadata.keyColumn],
                        keyColumn: panelMetadata.keyColumn,
                        recordUuid: scope.row.UUID
                      }"
                      :record-data-fields="scope.row[fieldAttributes.columnName]"
                      size="mini"
                      @keyup.enter.native="confirmEdit(scope.row)"
                    />
                  </template>
                  <template
                    v-else
                  >
                    <el-tag
                      v-if="['DocStatus', 'O_DocStatus'].includes(fieldAttributes.columnName)"
                      :style="getFieldDefinition(fieldAttributes.fieldDefinition, scope.row)"
                      :type="tagStatus(scope.row[fieldAttributes.columnName])"
                      disable-transitions
                    >
                      {{ displayedValue(scope.row, fieldAttributes) }}
                    </el-tag>
                    <span v-else :style="getFieldDefinition(fieldAttributes.fieldDefinition, scope.row)">
                      {{ displayedValue(scope.row, fieldAttributes) }}
                    </span>
                  </template>
                </template>
              </el-table-column>
            </template>
          </el-table>

          <custom-pagination
            :total="totalRecords"
            :current-page="pageNumber"
            :selection="getDataSelection.length"
            :handle-change-page="handleChangePage"
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<style lang="scss" src="./Style/dataTables-StyleGlobal.scss">
</style>
<style lang="scss" scoped src="./Style/dataTables-StyleScoped.scss">
</style>
