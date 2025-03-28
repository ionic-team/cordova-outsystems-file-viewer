import IONFileViewerLib

typealias FileViewerService = any IONFLVWOpenDocumentManager & IONFLVWPreviewMediaManager

@objc(OSFileViewerPlugin)
class OSFileViewerPlugin : CDVPlugin {
    var fileViewerService: FileViewerService?
    
    override func pluginInitialize() {
        self.fileViewerService = IONFLVWManager(viewController: self.viewController)
    }
    
    func getService() -> Result<FileViewerService, OSFileViewerError> {
        fileViewerService.map(Result.success) ?? .failure(.bridgeNotInitialised)
    }
}

// MARK: - Public API Methods
private extension OSFileViewerPlugin {
    @objc(openDocumentFromLocalPath:)
    func openDocumentFromLocalPath(command: CDVInvokedUrlCommand) {
        let filePath = getStringInput(command, key: "path")
        executeOperation(command, operationRunner: { service in
            do {
                try service.openDocumentFromLocalPath(filePath: filePath ?? "", completion: { self.sendSuccess(command) })
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    @objc(openDocumentFromResources:)
    func openDocumentFromResources(command: CDVInvokedUrlCommand) {
        let resourcePath = getStringInput(command, key: "path")
        executeOperation(command, operationRunner: { service in
            do {
                try service.openDocumentFromResources(assetPath: resourcePath ?? "", completion: { self.sendSuccess(command) })
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    @objc(openDocumentFromUrl:)
    func openDocumentFromUrl(command: CDVInvokedUrlCommand) {
        let url = getStringInput(command, key: "url")
        executeOperation(command, operationRunner: { service in
            do {
                try service.openDocumentFromUrl(url: url ?? "", completion: { err in
                    if let error = err {
                        self.sendError(command, self.mapError(error))
                    } else {
                        self.sendSuccess(command)
                    }
                })
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    @objc(previewMediaContentFromLocalPath:)
    func previewMediaContentFromLocalPath(command: CDVInvokedUrlCommand) {
        let filePath = getStringInput(command, key: "path")
        executeOperation(command, operationRunner: { service in
            do {
                try service.previewMediaContentFromLocalPath(filePath: filePath ?? "")
                sendSuccess(command)
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    @objc(previewMediaContentFromResources:)
    func previewMediaContentFromResources(command: CDVInvokedUrlCommand) {
        let resourcePath = getStringInput(command, key: "path")
        executeOperation(command, operationRunner: { service in
            do {
                try service.previewMediaContentFromResources(assetPath: resourcePath ?? "")
                sendSuccess(command)
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    @objc(previewMediaContentFromUrl:)
    func previewMediaContentFromUrl(command: CDVInvokedUrlCommand) {
        let url = getStringInput(command, key: "url")
        executeOperation(command, operationRunner: { service in
            do {
                try service.previewMediaContentFromUrl(url: url ?? "")
                sendSuccess(command)
            } catch {
                sendError(command, mapError(error))
            }
        })
    }
    
    func getStringInput(_ command: CDVInvokedUrlCommand, key: String) -> String? {
        let baseObject = command.arguments[0] as? [String : Any]
        return baseObject?[key] as? String
    }
    
    func executeOperation(_ command: CDVInvokedUrlCommand, operationRunner: (FileViewerService) -> Void) {
        switch getService() {
        case .success(let service): operationRunner(service)
        case .failure(let error): sendError(command, error)
        }
    }
    
    func mapError(_ error: Error, url: String = "") -> OSFileViewerError {
        return switch error {
        case IONFLVWError.fileDoesNotExist: .fileDoesNotExist
        case IONFLVWError.invalidURL: .urlMalformed(url: url)
        case IONFLVWError.emptyFilePath: .pathEmpty
        case IONFLVWError.invalidEmptyURL: .urlEmpty
        case IONFLVWError.downloadFailed: .downloadFailed
        case IONFLVWError.missingFileExtension: .missingFileExtension
        default : .couldNotOpenDocument
        }
    }
    
    func sendSuccess(_ command: CDVInvokedUrlCommand) {
        let result = CDVPluginResult(status: .ok)
        commandDelegate.send(result, callbackId: command.callbackId)
    }
    
    func sendError(_ command: CDVInvokedUrlCommand, _ error: OSFileViewerError) {
        let result = CDVPluginResult(status: .error, messageAs: error.toDictionary())
        commandDelegate.send(result, callbackId: command.callbackId)
    }
}
