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
     * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
     */
    private isCapacitorShell;
    /**
     * Check that is required because MABS 12 isnt installing synapse dependency for capacitor plugins.
     * Once MABS 12 no longer has that limitation, this can be removed.
     * @returns true if synapse is defined, false otherwise
     */
    private isSynapseDefined;
}
export declare const Instance: OSFileViewerWrapper;
export {};
