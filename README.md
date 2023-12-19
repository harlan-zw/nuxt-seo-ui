<h1 align='center'>nuxt-seo-ui</h1>

After careful consideration, this package will no longer be developed. The core feature of this module,
`useBreadcrumbItems` will be moved to [Nuxt SEO](https://github.com/harlan-zw/nuxt-seo-kit).

---

<p align="center">
<a href='https://github.com/harlan-zw/nuxt-seo-ui/actions/workflows/test.yml'>
</a>
<a href="https://www.npmjs.com/package/nuxt-seo-ui" target="__blank"><img src="https://img.shields.io/npm/v/nuxt-seo-ui?style=flat&colorA=002438&colorB=28CF8D" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/nuxt-seo-ui" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/nuxt-seo-ui?flat&colorA=002438&colorB=28CF8D"></a>
<a href="https://github.com/harlan-zw/nuxt-seo-ui" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/harlan-zw/nuxt-seo-ui?flat&colorA=002438&colorB=28CF8D"></a>
</p>


<p align="center">
Fully styled and customizable components for improving your Nuxt SEO.
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<img width="800" height="0" /><br>
<i>Status:</i> <b>Experimental</b> <br>
<sup> Please report any issues 🐛</sup><br>
<sub>Made possible by my <a href="https://github.com/sponsors/harlan-zw">Sponsor Program 💖</a><br> Follow me <a href="https://twitter.com/harlan_zw">@harlan_zw</a> 🐦 • Join <a href="https://discord.gg/275MBUBvgP">Discord</a> for help</sub><br>
<img width="800" height="0" />
</td>
</tbody>
</table>
</p>

ℹ️ Looking for a complete SEO solution? Check out [Nuxt SEO Kit](https://github.com/harlan-zw/nuxt-seo-kit).

## Components

- Breadcrumbs
- More coming soon

## Features

- Zero-config integrations with: nuxt-icon, nuxt-site-config and @nuxtjs/i18n
- Fully styled or headless, you choose
- Accessible

### Zero Config Integrations

- [`nuxt-site-config`](https://content.nuxtjs.org/guide/writing/document-driven)

Adds all entries automatically with generated `lastmod`. Images are included from any `<img>` tags

- [`nuxt-icon`](https://github.com/harlan-zw/nuxt-simple-robots)

Render icons in the components.

- [`@nuxtjs/i18n`](https://github.com/nuxt-modules/i18n)

Translates accesibiliy labels for the language.

## Install

```bash
npm install --save-dev nuxt-seo-ui

# Using yarn
yarn add --dev nuxt-seo-ui
```

## Setup

_nuxt.config.ts_

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-seo-ui',
  ],
})
```


## Usage


## Module Config

### `enabled`

- Type: `boolean`
- Default: `undefined`

Will stop the module from running if set to false.

### `prefix`

- Type: `string`
- Default: `s`

The prefix to use for the components.
For example, setting `Seo` as the prefix will make components accessible as `SeoBreadcrumbs`.

### `global`

- Type: `boolean`
- Default: `false`

Should components be registered globally.


## Sponsors

<p align="center">
  <a href="https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg">
    <img src='https://raw.githubusercontent.com/harlan-zw/static/main/sponsors.svg'/>
  </a>
</p>


## License

MIT License © 2022-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
