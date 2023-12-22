# DEV IMAGES

This Chrome extension streamlines web development by replacing image URLs in sandbox environments with those specific to development. This eliminates the need to download all static resources for proper sandbox functionality, optimizing the development process. The extension facilitates a seamless transition between local and development images, enhancing workflow efficiency.

## Installing

-  Check if your `Node.js` version is >= **14**.
-  Run `npm install` to install the dependencies.
-  In the package.json you can change the some configurations
```shell
  "sites": {
    "kiwokoES": "development.kiwoko.com",
    "kiwokoPT": "development.kiwoko.pt",
    "tiendanimalES": "development.tiendanimal.es",
    "tiendanimalPT": "development.tiendanimal.pt",
    "animalisFR": "development.animalis.com"
  },
  "env": {
    "kiwokoES":"KIWOKOES",
    "kiwokoPT": "TIENDANIMALES",
    "tiendanimalES":"KIWOKOPT",
    "tiendanimalPT":"TIENDANIMALPT",
    "animalisFR":"ANIMALISFR"
  },
  "realm": {
    "BKDP": "BKDP_DEV",
    "BDLQ": "BDLQ_DEV"
  }
```

### Chrome Extension Developer Mode

1. Set your Chrome browser 'Developer mode' up
2. Click 'Load unpacked', and select `devfiles/build` folder

## Packing

After the development of your extension run the command

```shell
$ npm run build
```
- Update your extension

## Special thanks

Agus 🤎 for bringing forth this idea!


Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

---

Generated by [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)
