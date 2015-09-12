# 0: async-stdlib

This project creates a stdlib of vendor code for (require.js) async javascript.

[live demo](http://0.ss.cx/index.html)
```
<script src="http://0.ss.cx/0.js"></script>
<script>
  require(['jquery'], function ($) {
    $('body').append('<h1>Hello from jQuery!')
  })
</script>
```

## Versioning *latest: 0.0.1*

All libraries are updated once per week.

If during that week a library made a breaking change (announced via semver major version), 0 will enter a new major version as well.

Each major version of 0 will be kept updated with minor and patch releases of libraries.

## Adding Libraries

To add a library to 0, fork this repository then add the library config to `_libs/[library-name]/[library-version].json` and submit a pull request.

### Mirroring

If your library doesn't have a CDNed url, submodule it into `_mirrors` and set `local` to `true` in the json file. It'll be uglified and gzipped and served from the 0 s3 bucket.
