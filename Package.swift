// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "com.outsystems.plugins.fileviewer",
    platforms: [
        .iOS(.v15)
    ],
    products: [
        .library(
            name: "com.outsystems.plugins.fileviewer",
            targets: ["OSFileViewerPlugin"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/ionic-team/ion-ios-fileviewer.git", exact: "1.0.3")
    ],
    targets: [
        .target(
            name: "OSFileViewerPlugin",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "IONFileViewerLib", package: "ion-ios-fileviewer")
            ],
            path: "packages/cordova-plugin/ios"
        )
    ]
)
