class OSFileViewerWrapper {
  openDocumentFromLocalPath(options, success, error) {
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.openDocumentFromLocalPath(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.openDocumentFromLocalPath(options).then(success).catch(error);
    }
  }
  openDocumentFromResources(options, success, error) {
    if (!this.checkValidResourcePath(options.path, error)) {
      return;
    }
    options.path = this.mapResourcePath(options.path);
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.openDocumentFromResources(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.openDocumentFromResources(options).then(success).catch(error);
    }
  }
  openDocumentFromUrl(options, success, error) {
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.openDocumentFromUrl(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.openDocumentFromUrl(options).then(success).catch(error);
    }
  }
  previewMediaContentFromLocalPath(options, success, error) {
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.previewMediaContentFromLocalPath(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.previewMediaContentFromLocalPath(options).then(success).catch(error);
    }
  }
  previewMediaContentFromResources(options, success, error) {
    if (!this.checkValidResourcePath(options.path, error)) {
      return;
    }
    options.path = this.mapResourcePath(options.path);
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.previewMediaContentFromResources(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.previewMediaContentFromResources(options).then(success).catch(error);
    }
  }
  previewMediaContentFromUrl(options, success, error) {
    if (this.isCordovaPluginDefined()) {
      cordova.plugins.FileViewer.previewMediaContentFromUrl(options, success, error);
    } else {
      Capacitor.Plugins.FileViewer.previewMediaContentFromUrl(options).then(success).catch(error);
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
   * @returns true if app is running in a capacitor shell (MABS 12), false otherwise (cordova)
   */
  isCapacitorShell() {
    return typeof Capacitor !== "undefined";
  }
  isCordovaPluginDefined() {
    return typeof cordova !== "undefined" && typeof cordova.plugins !== "undefined" && typeof cordova.plugins.FileViewer !== "undefined";
  }
}
const Instance = new OSFileViewerWrapper();
export {
  Instance
};
