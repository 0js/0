# 0: async-stdlib [*latest: 0.1.1*](http://0.ss.cx/0.js)

This project creates a stdlib of CDNed vendor code for (require.js) async javascript.

[live demo](http://0.ss.cx/index.html)
```html
<script src="http://0.ss.cx/0.js"></script>
<script>
  require(['jquery'], function ($) {
    $('body').append('<h1>Hello from jQuery!')
  })
</script>
```

## Versioning

All libraries are updated once per week.

If during that week a semver library makes a major version, or a non-semver library (boo) releases *any* version, 0 will bump to a new major version as well.

Each major version of 0 will be kept updated with minor and patch releases of semver libraries.

The `latest` of each major version of 0 will be available at `http://0.ss.cx/[major-version].js`. The `latest` major version of 0 will be available at `http://0.ss.cx/0.js`.

So, if `http://0.ss.cx/5.js` is the latest version of 0 when you included it, it *will* introduce patches and upgrades but it *will not* introduce breaking changes.

## Adding Libraries

To add a library to 0, fork this repository then add the library config to `_libs/[library-name]/[library-version].json` and submit a pull request.

Or, if that's not your thing, [create an issue](https://github.com/0js/0/issues/new) and include a link to the library you need and we'll add it within a few days.

### Mirroring

If your library doesn't have a CDNed url, submodule it into `_mirrors` and set `local` to `true` in the json file. It'll be uglified and gzipped and served from the 0 s3 bucket.
