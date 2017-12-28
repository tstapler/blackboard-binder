# Blackboard-Binder

## Why?
Tired of downloading lecture notes?

Sick of missing assignments?

Use Blackboard Binder!

An app that archives your course materials so that you don't have to.

## Development
_I'll assume that you already read the [Webpack docs](https://webpack.github.io/docs) and the [Chrome Extension](https://developer.chrome.com/extensions/getstarted) docs._

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Run `npm run start`
5. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
6. Have fun!

### Icons

To modify the icons, edit the svg files located in `src/assets`. To regenerate the icon pngs, run `make local-icon-gen`\* 

\*Generating icons requires that [Inkscape](https://inkscape.org/en/) is installed.

### Publishing
After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```
Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Acknowledgments 

**Credit to Samiel Simoes for [this](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate) awesome chrome extension boilerplate!**


## Disclamer

The contributers to this project do not endorse any use of blackboard-binder which 
goes against the [terms of use](https://www.blackboard.com/footer/terms-of-use.aspx).

