# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2]

### 2025-05-29

- Fix(ios): Remove duplicate path separators that could cause files to not be found.
- Fix(android): Opening local files with special characters.

## [1.0.1]

### 2025-04-10

- Fix android library gradle declaration.

## [1.0.0]

### 2025-03-21

- Feat: Implement plugin methods: `openDocumentFromLocalPath`, `openDocumentFromResources`, `openDocumentFromUrl`, `previewMediaContentFromLocalPath`, `previewMediaContentFromResources`, `previewMediaContentFromUrl`.
- Feat: Add outsystems-wrapper block.