# Examples

Demos that install the packed `wireframes` tarball, to check the package before publishing.

```bash
npm pack --pack-destination /tmp      # from the repo root
cd examples/<vite|astro|vue>
npm i                                 # package.json points to the tarball
npm run dev
```

Update the `wireframes` path in each `package.json` if your tarball is elsewhere.