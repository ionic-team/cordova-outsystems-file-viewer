import { require } from "cordova";
import { OpenFromLocalPathOptions, OpenFromResourcesOptions, OpenFromUrlOptions, PreviewMediaFromLocalPathOptions, PreviewMediaFromResourcesOptions, PreviewMediaFromUrlOptions, PluginError } from "./definitions";


var exec = require('cordova/exec');

/** File Viewer Cordova entry point */

function openDocumentFromLocalPath(options: OpenFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'openDocumentFromLocalPath', [options]);
}

function openDocumentFromResources(options: OpenFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'openDocumentFromResources', [options]);
}

function openDocumentFromUrl(options: OpenFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'openDocumentFromUrl', [options]);
}

function previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'previewMediaContentFromLocalPath', [options]);
}

function previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'previewMediaContentFromResources', [options]);
}

function previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions, success: () => void, error: (error: PluginError) => void): void {
  exec(success, error, 'OSFileViewerPlugin', 'previewMediaContentFromUrl', [options]);
}

module.exports = {
  openDocumentFromLocalPath,
  openDocumentFromResources,
  openDocumentFromUrl,
  previewMediaContentFromLocalPath,
  previewMediaContentFromResources,
  previewMediaContentFromUrl
};