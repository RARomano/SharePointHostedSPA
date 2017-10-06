# SharePointHostedSPA
SPA implemented in a SharePoint Hosted App using Vue.js.

The main goal with this is to use this solution as a template for Vue.js SPA for SharePoint. There are a lot of tasks to do, but feel free to send a PR :)

## Requirements
- Node
- NPM

## Structure
All client objects are available on the src folder
![image](https://user-images.githubusercontent.com/12012898/31300484-52d1d642-aaca-11e7-8d0c-07a91510b66b.png)

All routes are configured in the boot.ts file, the root content is on the app.vue.html.

## Resulting app
![image](https://user-images.githubusercontent.com/12012898/31300645-278b1524-aacb-11e7-8e32-91a89684be05.png)


### Still pending
Run webpack whenever a file (.ts, .vue.html, .css, .scss) is changed.

For now, please run manually:

```bash
./node_modules/.bin/webpack --config config/webpack.config.js
./node_modules/.bin/webpack --config config/webpack.config.vendor.js
```

The generated files will be created on the App/Scripts folder

![image](https://user-images.githubusercontent.com/12012898/31300620-0ace06b2-aacb-11e7-9a66-b4b2a53037f5.png)

