/* Layout */
import Layout from '@/layout/index.vue'
import { RouteConfig } from 'vue-router'

const staticRoutes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  },
  {
    path: '/ProcessActivity',
    component: Layout,
    meta: {
      title: 'ProcessActivity',
      icon: 'tree-table',
      noCache: true,
      breadcrumb: false
    },
    redirect: '/ProcessActivity/index',
    children: [
      {
        path: 'index',
        component: () => import('@/ADempiere/modules/process/views/ProcessActivity'),
        name: 'ProcessActivity',
        meta: {
          title: 'ProcessActivity',
          icon: 'tree-table',
          noCache: true,
          isIndex: true
        }
      }
    ]
  },
  {
    path: '/report-viewer',
    component: Layout,
    redirect: 'report-viewer/:processId/:instanceUuid/:fileName/:tableName?',
    children: [
      {
        path: ':processId/:instanceUuid/:fileName/:tableName?',
        component: () => import('@/ADempiere/modules/process/views/ReportViewer'),
        name: 'Report Viewer',
        meta: {
          title: 'ReportViewer',
          reportFormat: '',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '/test',
        component: () => import('@/ADempiere/shared/views/Test'),
        name: 'Test View',
        meta: {
          title: 'Test View',
          hidden: true,
          isIndex: true
        }
      }
    ]
  }
]

export default staticRoutes