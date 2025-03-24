import { OpenFromLocalPathOptions, OpenFromResourcesOptions, OpenFromUrlOptions, PreviewMediaFromLocalPathOptions, PreviewMediaFromResourcesOptions, PreviewMediaFromUrlOptions, PluginError } from "../../cordova-plugin/src/definitions"

class OSFileViewerWrapper {

    openDocumentFromLocalPath(options: OpenFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.openDocumentFromLocalPath(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.openDocumentFromLocalPath(options)
                .then(success)
                .catch(error);
        }
    }
      
    openDocumentFromResources(options: OpenFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
        if (!this.checkValidResourcePath(options.path, error)) {
            return
        }
        options.path = this.mapResourcePath(options.path)

        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.openDocumentFromResources(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.openDocumentFromResources(options)
                .then(success)
                .catch(error);
        }
    }
    
    openDocumentFromUrl(options: OpenFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.openDocumentFromUrl(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.openDocumentFromUrl(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.previewMediaContentFromLocalPath(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.previewMediaContentFromLocalPath(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
        if (!this.checkValidResourcePath(options.path, error)) {
            return
        }
        options.path = this.mapResourcePath(options.path)

        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.previewMediaContentFromResources(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.previewMediaContentFromResources(options)
                .then(success)
                .catch(error);
        }
    }
    
    previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isSynapseDefined()) {
            // @ts-ignore
            CapacitorUtils.Synapse.FileViewer.previewMediaContentFromUrl(options, success, error)
        } else {
            // @ts-ignore
            Capacitor.Plugins.Geolocation.previewMediaContentFromUrl(options)
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

    /**
     * Check that is required because MABS 12 isnt installing synapse dependency for capacitor plugins.
     * Once MABS 12 no longer has that limitation, this can be removed.
     * @returns true if synapse is defined, false otherwise
     */
    private isSynapseDefined(): boolean {
        // @ts-ignore
        return typeof (CapacitorUtils) !== "undefined"
    }
}

export const Instance = new OSFileViewerWrapper()