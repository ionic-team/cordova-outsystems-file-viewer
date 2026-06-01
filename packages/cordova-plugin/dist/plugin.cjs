"use strict";
const cordova = require("cordova");
function s(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return new Proxy({}, {
          get(w, o) {
            return (c, p, r) => {
              const i = t.Capacitor.Plugins[n];
              if (i === void 0) {
                r(new Error(`Capacitor plugin ${n} not found`));
                return;
              }
              if (typeof i[o] != "function") {
                r(new Error(`Method ${o} not found in Capacitor plugin ${n}`));
                return;
              }
              (async () => {
                try {
                  const a = await i[o](c);
                  p(a);
                } catch (a) {
                  r(a);
                }
              })();
            };
          }
        });
      }
    }
  );
}
function u(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, n) {
        return t.cordova.plugins[n];
      }
    }
  );
}
function f(t = false) {
  typeof window > "u" || (window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window));
}
var exec = cordova.require("cordova/exec");
function openDocumentFromLocalPath(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "openDocumentFromLocalPath", [options]);
}
function openDocumentFromResources(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "openDocumentFromResources", [options]);
}
function openDocumentFromUrl(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "openDocumentFromUrl", [options]);
}
function previewMediaContentFromLocalPath(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "previewMediaContentFromLocalPath", [options]);
}
function previewMediaContentFromResources(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "previewMediaContentFromResources", [options]);
}
function previewMediaContentFromUrl(options, success, error) {
  exec(success, error, "OSFileViewerPlugin", "previewMediaContentFromUrl", [options]);
}
module.exports = {
  openDocumentFromLocalPath,
  openDocumentFromResources,
  openDocumentFromUrl,
  previewMediaContentFromLocalPath,
  previewMediaContentFromResources,
  previewMediaContentFromUrl
};
f(true);
