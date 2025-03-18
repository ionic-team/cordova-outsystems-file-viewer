package com.outsystems.plugins.fileviewer

import io.ionic.libs.ionfileviewerlib.model.IONFLVWException

object OSFileViewerErrors {
    private fun formatErrorCode(number: Int): String {
        return "OS-PLUG-FLVW-" + number.toString().padStart(4, '0')
    }

    data class ErrorInfo(
        val code: String,
        val message: String
    )

    val fileDoesNotExist = ErrorInfo(
        code = formatErrorCode(4),
        message = "The file you are trying to open does not exist."
    )

    fun urlMalformed(url: String) = if (url.isBlank()) {
        urlEmpty
    } else {
        ErrorInfo(
            code = formatErrorCode(5),
            message = "The URL you are trying to open is malformed - $url"
        )
    }

    fun filePathInvalid(path: String?) = if (path.isNullOrBlank()) {
        filePathEmpty
    } else {
        invalidParameters
    }

    val filePathEmpty = ErrorInfo(
        code = formatErrorCode(6),
        message = "Path of the file to open is either null or empty."
    )

    val invalidParameters: ErrorInfo = ErrorInfo(
        code = formatErrorCode(7),
        message = "Invalid parameters."
    )

    val noAppToOpen = ErrorInfo(
        code = formatErrorCode(8),
        message = "There is no app to open this document."
    )

    val urlEmpty = ErrorInfo(
        code = formatErrorCode(9),
        message = "URL to open is either null or empty."
    )

    // TODO confirm this error code
    val genericError = ErrorInfo(
        code = formatErrorCode(12),
        message = "Could not open the document."
    )
}

fun Throwable.toOSFileViewerError(): OSFileViewerErrors.ErrorInfo = when (this) {
    is IONFLVWException.FileDoesNotExist -> OSFileViewerErrors.fileDoesNotExist
    is IONFLVWException.InvalidURL -> OSFileViewerErrors.urlMalformed(url)
    is IONFLVWException.InvalidPath -> OSFileViewerErrors.filePathInvalid(path)
    is IONFLVWException.NoApp -> OSFileViewerErrors.noAppToOpen
    is IONFLVWException.EmptyURL -> OSFileViewerErrors.urlEmpty
    else -> OSFileViewerErrors.genericError
}