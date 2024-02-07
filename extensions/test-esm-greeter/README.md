# \<test-esm-greeter>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i test-esm-greeter
```

## Usage

```html
<script type="module">
  import 'test-esm-greeter/test-esm-greeter.js';
</script>

<test-esm-greeter></test-esm-greeter>
```



## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`