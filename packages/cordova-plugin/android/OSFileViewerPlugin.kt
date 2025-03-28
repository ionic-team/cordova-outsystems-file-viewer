package com.outsystems.plugins.fileviewer

import io.ionic.libs.ionfileviewerlib.IONFLVWController
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject

class OSFileViewerPlugin : CordovaPlugin() {
    private val controller by lazy { IONFLVWController() }
    private val coroutineScope by lazy { CoroutineScope(Dispatchers.IO) }

    override fun onDestroy() {
        super.onDestroy()
        coroutineScope.cancel()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        val optionsObject: JSONObject
        try {
            optionsObject = args.getJSONObject(0)
        } catch (e: Exception) {
            callbackContext.sendError(OSFileViewerErrors.invalidParameters)
            return true
        }

        return when (action) {
            "openDocumentFromLocalPath",
            "previewMediaContentFromLocalPath" -> {
                openDocumentFromLocalPath(optionsObject, callbackContext)
                true
            }

            "openDocumentFromResources",
            "previewMediaContentFromResources" -> {
                openDocumentFromResources(optionsObject, callbackContext)
                true
            }

            "openDocumentFromUrl",
            "previewMediaContentFromUrl" -> {
                openDocumentFromUrl(optionsObject, callbackContext)
                true
            }

            else -> false
        }
    }

    private fun openDocumentFromLocalPath(options: JSONObject, callbackContext: CallbackContext) {
        val filePath: String? = options.optString("path")
        controller.openDocumentFromLocalPath(cordova.activity, filePath ?: "")
            .onSuccess {
                callbackContext.success()
            }
            .onFailure {
                callbackContext.sendError(it.toOSFileViewerError())
            }
    }

    private fun openDocumentFromResources(options: JSONObject, callbackContext: CallbackContext) {
        val resourcePath: String? = options.optString("path")
        coroutineScope.launch {
            // this native library method needs to be run from a separate thread, to avoid freezing the UI.
            controller.openDocumentFromResources(cordova.activity, resourcePath ?: "")
                .onSuccess {
                    callbackContext.success()
                }
                .onFailure {
                    callbackContext.sendError(it.toOSFileViewerError())
                }
        }
    }

    private fun openDocumentFromUrl(options: JSONObject, callbackContext: CallbackContext) {
        val url: String? = options.optString("url")
        controller.openDocumentFromUrl(cordova.activity, url ?: "")
            .onSuccess {
                callbackContext.success()
            }
            .onFailure {
                callbackContext.sendError(it.toOSFileViewerError())
            }
    }

    /**
     * Extension function to return a unsuccessful plugin result
     * @param error error class representing the error to return, containing a code and message
     */
    private fun CallbackContext.sendError(error: OSFileViewerErrors.ErrorInfo) {
        val pluginResult = PluginResult(
            PluginResult.Status.ERROR,
            JSONObject().apply {
                put("code", error.code)
                put("message", error.message)
            }
        )
        this.sendPluginResult(pluginResult)
    }
}