<template>
  <el-container
    v-if="isLoadedMetadata"
    key="process-loaded"
    class="view-base"
    style="height: 84vh;"
  >
    <el-header
      v-if="showContextMenu"
      style="height: 39px;"
    >
      <context-menu
        :menu-parent-uuid="$route.meta.parentUuid"
        :container-uuid="processUuid"
        :panel-type="panelType"
        :is-report="processMetadata.isReport"
      />
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="content-collapse">
            <h3 v-show="(processTitle)" class="warn-content text-center">
              <el-popover
                v-if="(processMetadata.help)"
                ref="helpTitle"
                placement="top-start"
                :title="processTitle"
                width="400"
                trigger="hover"
              >
                <div v-html="processMetadata.help" />
              </el-popover>
              <el-button
                v-popover:helpTitle
                type="text"
                class="title text-center"
              >
                {{ processMetadata.name }}
              </el-button>
            </h3>
            <main-panel
              :position-tab="processMetadata.accesLevel"
              :container-uuid="processUuid"
              :metadata="processMetadata"
              :is-edit="isEdit"
              :panel-type="panelType"
            />
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <div
    v-else
    key="process-loading"
    v-loading="!isLoadedMetadata"
    :element-loading-text="$t('notifications.loading')"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
    class="loading-process"
  />
</template>

<style>
  .el-card__body {
    padding-top: 0px !important;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
</style>
<style scoped >
  .view-base {
    height: 100%;
    min-height: calc(100vh - 84px);
  }

  .loading-process {
    padding: 100px 100px;
    height: 100%;
  }

  .title {
    color: #000000;
    text-size-adjust: 20px;
    font-size: 100%;
    font-weight: 605!important;
  }
  .warn-content {
    margin: 0px 0px !important;
    padding-top: 0px !important;
  }
  .content-help {
    width: 100%;
    height: 100%;
    padding-left: 39px !important;
  }
  .el-card {
    width: 100% !important;
    height: 100% !important;
  }
  .sticky-submenu {
    position: absolute !important;
    right: 0;
    top: 0;
  }
  .content-collapse {
    padding-left: 20 px !important;
    padding-top: 50 px !important;
  }
</style>
