(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.OSFileViewerPluginWrapper = {}));
})(this, function(exports2) {
  "use strict";
  class OSFileViewerWrapper {
    openDocumentFromLocalPath(options, success, error) {
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.openDocumentFromLocalPath(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.openDocumentFromLocalPath(options).then(success).catch(error);
      }
    }
    openDocumentFromResources(options, success, error) {
      if (!this.checkValidResourcePath(options.path, error)) {
        return;
      }
      options.path = this.mapResourcePath(options.path);
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.openDocumentFromResources(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.openDocumentFromResources(options).then(success).catch(error);
      }
    }
    openDocumentFromUrl(options, success, error) {
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.openDocumentFromUrl(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.openDocumentFromUrl(options).then(success).catch(error);
      }
    }
    previewMediaContentFromLocalPath(options, success, error) {
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.previewMediaContentFromLocalPath(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.previewMediaContentFromLocalPath(options).then(success).catch(error);
      }
    }
    previewMediaContentFromResources(options, success, error) {
      if (!this.checkValidResourcePath(options.path, error)) {
        return;
      }
      options.path = this.mapResourcePath(options.path);
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.previewMediaContentFromResources(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.previewMediaContentFromResources(options).then(success).catch(error);
      }
    }
    previewMediaContentFromUrl(options, success, error) {
      if (this.isSynapseDefined()) {
        CapacitorUtils.Synapse.FileViewer.previewMediaContentFromUrl(options, success, error);
      } else {
        Capacitor.Plugins.Geolocation.previewMediaContentFromUrl(options).then(success).catch(error);
      }
    }
    checkValidResourcePath(path, error) {
      if (!path.startsWith("resources/")) {
        error({
          code: "OS-PLUG-FLVW-0007",
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
     * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
     */
    isCapacitorShell() {
      return typeof Capacitor !== "undefined";
    }
    /**
     * Check that is required because MABS 12 isnt installing synapse dependency for capacitor plugins.
     * Once MABS 12 no longer has that limitation, this can be removed.
     * @returns true if synapse is defined, false otherwise
     */
    isSynapseDefined() {
      return typeof CapacitorUtils !== "undefined";
    }
  }
  const Instance = new OSFileViewerWrapper();
  exports2.Instance = Instance;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
