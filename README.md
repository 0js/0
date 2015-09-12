# 0: async-stdlib

This project creates a stdlib of vendor code for (require.js) async javascript.

```
<script src="http://0.ss.cx/0.js"></script>
<script>
  require(['jquery'], function ($) {
    $('body').append('<h1>Hello from jQuery!')
  })
</script>
```

## Adding Libraries

To add a library to 0, fork this repository then add the library config to `_libs/[library-name]/[library-version].json` and submit a pull request.
