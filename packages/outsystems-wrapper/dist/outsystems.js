(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.OSFileViewerPluginWrapper = {}));
})(this, function(exports2) {
  "use strict";
  class OSFileViewerWrapper {
    openDocumentFromLocalPath(options, success, error) {
      if (this.isCordovaPluginDefined()) {
        cordova.plugins.FileViewer.openDocumentFromLocalPath(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        cordova.plugins.OSFileViewer.openDocumentFromLocalPath(options.path, success, error);
      } else {
        window.CapacitorPlugins.FileViewer.openDocumentFromLocalPath(options).then(success).catch(error);
      }
    }
    openDocumentFromResources(options, success, error) {
      if (!this.checkValidResourcePath(options.path, error)) {
        return;
      }
      if (this.isCordovaPluginDefined()) {
        options.path = this.mapResourcePath(options.path);
        cordova.plugins.FileViewer.openDocumentFromResources(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        const { fileName, fileExtension } = this.splitResourcePath(options.path);
        cordova.plugins.OSFileViewer.openDocumentFromResources(fileName, fileExtension, success, error);
      } else {
        options.path = this.mapResourcePath(options.path);
        window.CapacitorPlugins.FileViewer.openDocumentFromResources(options).then(success).catch(error);
      }
    }
    openDocumentFromUrl(options, success, error) {
      if (this.isCordovaPluginDefined()) {
        cordova.plugins.FileViewer.openDocumentFromUrl(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        cordova.plugins.OSFileViewer.openDocumentFromUrl(options.url, success, error);
      } else {
        window.CapacitorPlugins.FileViewer.openDocumentFromUrl(options).then(success).catch(error);
      }
    }
    previewMediaContentFromLocalPath(options, success, error) {
      if (this.isCordovaPluginDefined()) {
        cordova.plugins.FileViewer.previewMediaContentFromLocalPath(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        cordova.plugins.OSFileViewer.previewMediaContentFromLocalPath(options.path, success, error);
      } else {
        window.CapacitorPlugins.FileViewer.previewMediaContentFromLocalPath(options).then(success).catch(error);
      }
    }
    previewMediaContentFromResources(options, success, error) {
      if (!this.checkValidResourcePath(options.path, error)) {
        return;
      }
      if (this.isCordovaPluginDefined()) {
        options.path = this.mapResourcePath(options.path);
        cordova.plugins.FileViewer.previewMediaContentFromResources(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        const { fileName, fileExtension } = this.splitResourcePath(options.path);
        if (this.isOldAndroidPlatform()) {
          cordova.plugins.OSFileViewer.openDocumentFromResources(fileName, fileExtension, success, error);
        } else {
          cordova.plugins.OSFileViewer.previewMediaContentFromResources(fileName, fileExtension, success, error);
        }
      } else {
        options.path = this.mapResourcePath(options.path);
        window.CapacitorPlugins.FileViewer.previewMediaContentFromResources(options).then(success).catch(error);
      }
    }
    previewMediaContentFromUrl(options, success, error) {
      if (this.isCordovaPluginDefined()) {
        cordova.plugins.FileViewer.previewMediaContentFromUrl(options, success, error);
      } else if (this.isOldCordovaPluginDefined()) {
        cordova.plugins.OSFileViewer.previewMediaContentFromUrl(options.url, success, error);
      } else {
        window.CapacitorPlugins.FileViewer.previewMediaContentFromUrl(options).then(success).catch(error);
      }
    }
    checkValidResourcePath(path, error) {
      if (!path.startsWith("resources/")) {
        error({
          code: "OS-PLUG-FLVW-0009",
          message: "Invalid parameters."
        });
        return false;
      }
      return true;
    }
    mapResourcePath(path) {
      let mappedPath = "";
      if (this.isCapacitorShell()) {
        mappedPath += "public";
      } else {
        mappedPath += "www";
      }
      if (!path.startsWith("/")) {
        mappedPath += "/";
      }
      mappedPath += path;
      return mappedPath;
    }
    /**
     * splits a validated "resources/..." path into the fileName/fileExtension pair
     * expected by the old plugin's (pre-1.0.0 of this package) native resources API,
     * which resolves the www/resources location itself instead of taking a full path
     */
    splitResourcePath(path) {
      const relativePath = path.replace(/^resources\//, "");
      const lastDotIndex = relativePath.lastIndexOf(".");
      if (lastDotIndex === -1) {
        return { fileName: relativePath, fileExtension: "" };
      }
      return {
        fileName: relativePath.substring(0, lastDotIndex),
        fileExtension: relativePath.substring(lastDotIndex + 1)
      };
    }
    /**
     * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
     */
    isCapacitorShell() {
      return typeof Capacitor !== "undefined";
    }
    isCordovaPluginDefined() {
      return typeof cordova !== "undefined" && typeof cordova.plugins !== "undefined" && typeof cordova.plugins.FileViewer !== "undefined";
    }
    /**
     * @returns true if the native side is still running the old cordova-outsystems-fileviewer
     * plugin (global `cordova.plugins.OSFileViewer`), e.g. after an OTA update ships this newer
     * web wrapper on top of an app built with the previous native plugin
     */
    isOldCordovaPluginDefined() {
      return typeof cordova !== "undefined" && typeof cordova.plugins !== "undefined" && typeof cordova.plugins.OSFileViewer !== "undefined";
    }
    isOldAndroidPlatform() {
      return typeof cordova !== "undefined" && cordova.platformId === "android";
    }
  }
  const Instance = new OSFileViewerWrapper();
  exports2.Instance = Instance;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
