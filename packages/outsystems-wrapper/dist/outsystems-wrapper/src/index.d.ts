import { OpenFromLocalPathOptions, OpenFromResourcesOptions, OpenFromUrlOptions, PreviewMediaFromLocalPathOptions, PreviewMediaFromResourcesOptions, PreviewMediaFromUrlOptions, PluginError } from '../../cordova-plugin/src/definitions';
declare class OSFileViewerWrapper {
    openDocumentFromLocalPath(options: OpenFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void;
    openDocumentFromResources(options: OpenFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void;
    openDocumentFromUrl(options: OpenFromUrlOptions, success: () => void, error: (error: PluginError) => void): void;
    previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void;
    previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void;
    previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions, success: () => void, error: (error: PluginError) => void): void;
    private checkValidResourcePath;
    private mapResourcePath;
    /**
     * splits a validated "resources/..." path into the fileName/fileExtension pair
     * expected by the old plugin's (pre-1.0.0 of this package) native resources API,
     * which resolves the www/resources location itself instead of taking a full path
     */
    private splitResourcePath;
    /**
     * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
     */
    private isCapacitorShell;
    private isCordovaPluginDefined;
    /**
     * @returns true if the native side is still running the old cordova-outsystems-fileviewer
     * plugin (global `cordova.plugins.OSFileViewer`), e.g. after an OTA update ships this newer
     * web wrapper on top of an app built with the previous native plugin
     */
    private isOldCordovaPluginDefined;
    private isOldAndroidPlatform;
}
export declare const Instance: OSFileViewerWrapper;
export {};
