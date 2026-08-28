import { OpenFromLocalPathOptions, OpenFromResourcesOptions, OpenFromUrlOptions, PreviewMediaFromLocalPathOptions, PreviewMediaFromResourcesOptions, PreviewMediaFromUrlOptions, PluginError } from "../../cordova-plugin/src/definitions"

class OSFileViewerWrapper {

    openDocumentFromLocalPath(options: OpenFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
        if (this.isCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.FileViewer.openDocumentFromLocalPath(options, success, error)
        } else if (this.isOldCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.OSFileViewer.openDocumentFromLocalPath(options.path, success, error)
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

        if (this.isCordovaPluginDefined()) {
            options.path = this.mapResourcePath(options.path)
            // @ts-ignore
            cordova.plugins.FileViewer.openDocumentFromResources(options, success, error)
        } else if (this.isOldCordovaPluginDefined()) {
            const { fileName, fileExtension } = this.splitResourcePath(options.path)
            // @ts-ignore
            cordova.plugins.OSFileViewer.openDocumentFromResources(fileName, fileExtension, success, error)
        } else {
            options.path = this.mapResourcePath(options.path)
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
        } else if (this.isOldCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.OSFileViewer.openDocumentFromUrl(options.url, success, error)
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
        } else if (this.isOldCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.OSFileViewer.previewMediaContentFromLocalPath(options.path, success, error)
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

        if (this.isCordovaPluginDefined()) {
            options.path = this.mapResourcePath(options.path)
            // @ts-ignore
            cordova.plugins.FileViewer.previewMediaContentFromResources(options, success, error)
        } else if (this.isOldCordovaPluginDefined()) {
            const { fileName, fileExtension } = this.splitResourcePath(options.path)
            if (this.isOldAndroidPlatform()) {
                // the old plugin's previewMediaContentFromResources is an unimplemented
                // stub on Android (never resolves or rejects) - redirect to the open
                // action, matching the preview-equals-open behavior both plugins already
                // use for media-from-resources on Android
                // @ts-ignore
                cordova.plugins.OSFileViewer.openDocumentFromResources(fileName, fileExtension, success, error)
            } else {
                // @ts-ignore
                cordova.plugins.OSFileViewer.previewMediaContentFromResources(fileName, fileExtension, success, error)
            }
        } else {
            options.path = this.mapResourcePath(options.path)
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
        } else if (this.isOldCordovaPluginDefined()) {
            // @ts-ignore
            cordova.plugins.OSFileViewer.previewMediaContentFromUrl(options.url, success, error)
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
     * splits a validated "resources/..." path into the fileName/fileExtension pair
     * expected by the old plugin's (pre-1.0.0 of this package) native resources API,
     * which resolves the www/resources location itself instead of taking a full path
     */
    private splitResourcePath(path: string): { fileName: string, fileExtension: string } {
        const relativePath = path.replace(/^resources\//, '')
        const lastDotIndex = relativePath.lastIndexOf('.')
        if (lastDotIndex === -1) {
            return { fileName: relativePath, fileExtension: '' }
        }
        return {
            fileName: relativePath.substring(0, lastDotIndex),
            fileExtension: relativePath.substring(lastDotIndex + 1)
        }
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

    /**
     * @returns true if the native side is still running the old cordova-outsystems-fileviewer
     * plugin (global `cordova.plugins.OSFileViewer`), e.g. after an OTA update ships this newer
     * web wrapper on top of an app built with the previous native plugin
     */
    private isOldCordovaPluginDefined(): boolean {
        // @ts-ignore
        return typeof(cordova) !== "undefined" && typeof(cordova.plugins) !== "undefined" && typeof(cordova.plugins.OSFileViewer) !== "undefined";
    }

    private isOldAndroidPlatform(): boolean {
        // @ts-ignore
        return typeof(cordova) !== "undefined" && cordova.platformId === "android";
    }
}

export const Instance = new OSFileViewerWrapper()