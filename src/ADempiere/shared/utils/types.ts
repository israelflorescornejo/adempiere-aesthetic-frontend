export interface IConfigData {
    server: {
        host: string
        port: number
    }
    adempiere: {
        api: {
            url: string
            service: string
            fullPath: string
        }
        images: {
            url: string
            service: string
            fullPath: string
        }
    }
}

// Resource types

export interface ImagePathData {
    url: string
    urn: string
    uri: string
}

export interface IRequestImageData {
    file: string
    width?: number
    height?: number
    operation?: string
}

export interface IKeyValueObject<T = any> {
    [key: string]: T
}

export interface IResponseList<T> {
    nextPageToken: string
    recordCount: number
    list: T[]
}

export enum Namespaces {
    // Root
    App = 'app',
    ErrorLog = 'errorLog',
    Permission = 'permission',
    Settings = 'settings',
    TagsView = 'tagsView',
    User = 'user',
    // Adempiere
    System = 'systemModule',
    BusinessPartner = 'businessPartnerModule',
    Dashboard = 'dashboardModule',
    Field = 'fieldModule',
    FormDefinition = 'formDefinitionModule',
    ProcessDefinition = 'processDefinitionModule',
    Preference = 'preferenceModule',
    WindowDefinition = 'windowDefinitionModule',
    Language = 'languageModule',
    Persistence = 'persistenceModule',
    Window = 'windowModule',
    Event = 'eventModule',
    Utils = 'utilsModule',
    Lookup = 'lookupModule',
    CallOutControl = 'callOutControlModule',
    ChatEntries = 'chatEntriesModule',
    ContainerInfo = 'containerInfoModule',
    Report = 'reportModule',
    FieldValue = 'fieldValueModule',
    Process = 'processModule',
    PointOfSales = 'pointOfSalesModule',
    Collection = 'collectionModule',
    KeyLayout = 'keyLayoutModule',
    Order = 'orderModule',
    OrderLines = 'orderLinesModule',
    ListProductPrice = 'listProductPriceModule',
    ContextMenu = 'contextMenuModule',
    Panel = 'panelModule',
    BusinessData = 'businessDataModule',
    BrowserDefinition = 'browserDefinitionModule',
    Browser = 'browserModule'
}
