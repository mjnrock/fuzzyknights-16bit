## Module Tutorial

### Using `FKGE`
#### `import` _/engine/.../filename.js_
All `import`s from `FKGE` **must** use the `/engine/` root (e.g. `/engine/path/to/file`).  Because the browser is loading the files, you **must** also include the `.js` extension.  When using classes or files from the current module, relative pathing is fine (e.g. `./path/to/file`).