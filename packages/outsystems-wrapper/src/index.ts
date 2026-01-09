import { OpenFromLocalPathOptions, OpenFromResourcesOptions, OpenFromUrlOptions, PreviewMediaFromLocalPathOptions, PreviewMediaFromResourcesOptions, PreviewMediaFromUrlOptions, PluginError } from "../../cordova-plugin/src/definitions"

class OSFileViewerWrapper {

    openDocumentFromLocalPath(options: OpenFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.openDocumentFromLocalPath(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.openDocumentFromLocalPath(options)
                .then(success)
                .catch(error);
        }
    }
      
    openDocumentFromResources(options: OpenFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
        if (!this.checkValidResourcePath(options.path, error)) {
            return
        }
        options.path = this.mapResourcePath(options.path)

        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.openDocumentFromResources(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.openDocumentFromResources(options)
                .then(success)
                .catch(error);
        }
    }
    
    openDocumentFromUrl(options: OpenFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.openDocumentFromUrl(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.openDocumentFromUrl(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.previewMediaContentFromLocalPath(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.previewMediaContentFromLocalPath(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
        if (!this.checkValidResourcePath(options.path, error)) {
            return
        }
        options.path = this.mapResourcePath(options.path)

        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.previewMediaContentFromResources(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.previewMediaContentFromResources(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.previewMediaContentFromUrl(options, success, error)
        } else {
            // @ts-ignore
            window.CapacitorPlugins.FileViewer.previewMediaContentFromUrl(options)
                .then(success)
                .catch(error);
        }
    }

    private checkValidResourcePath(path: string, error: (error: PluginError) => void): boolean {
        if (!path.startsWith('resources/')) {
            // plugin only supports resources/ directory by design
            //  to not be able access to any app resource in any location
            error({
                code: 'OS-PLUG-FLVW-0009',
                message: 'Invalid parameters.'
            })
            return false
        }
        return true
    }

    private mapResourcePath(path: string): string {
        let mappedPath = ''
        // the location of where assets are stored varies from MABS 12 to other versions
        if (this.isCapacitorShell()) {
            mappedPath += 'public'
        } else {
            mappedPath += 'www'
        }
        if (!path.startsWith('/')) {
            mappedPath += '/'
        }
        mappedPath += path
        return mappedPath
    }
    
    /**
     * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
     */
    private isCapacitorShell(): boolean {
        // @ts-ignore
        return typeof (Capacitor) !== "undefined"
    }

    private isCordovaPluginDefined(): boolean {
        // @ts-ignore
        return typeof(cordova) !== "undefined" && typeof(cordova.plugins) !== "undefined" && typeof(cordova.plugins.FileViewer) !== "undefined";
    }
}

export const Instance = new OSFileViewerWrapper()