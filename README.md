# react-native-bundle-size

Get react-native bundle size for last commits. This cli basically iterates over your last commits and run repeatadly `npx react-native bundle`.

## Inspiration

This repo is inpired by awesome [react-native-bundle-visualizer](https://github.com/IjzerenHein/react-native-bundle-visualizer) by [Hein Rutjes](). It provides visual way to find what package is bloating your react-native JS bundle. Sometimes it is not really easy to see how some big package even got there in first place. **react-native-bundle-size** helps you find the commit where it happend.

## Running

Try it now from within your react-native folder.

```sh
npx react-native-bundle-size .
```

After a while it outputs _commit hash_, _size in bytes_ and _commit messsage_.

```
5cb97d54 4372544 Add new feature
```

You can also specify for how many commits would you like to see bundle size. Remember to commit all your changes. Be aware that creating bundle size takes some time.

```sh
npx react-native-bundle-size . -l 3
```

Whis outputs three lines

```
5cb97d54 4372204 Release
5cb97d54 4372544 Add new feature
5cb97d54 3345544 Refactor
```

### Options

```sh
$ react-native-bundle-size
```

```
  Get react-native bundle size for last commits

  Usage
      $ bundlesize pathToReactNativeApp

  Options
      --limit, -l <n>              How many commits to iterate over. Default 1.
      --skip, -s <n>               How many commits to skip. Default 0.
      --platform, -p <ios|android>   What platform to build bundle for. Default "ios".
      --entryFile, -e <./index.js> Path to index.js file. Default "./index.js".

  Examples
      $ bundlesize .
      $ bundlesize . -l 5 -s 10 -e ./src/index.js
```

## Development

```sh
git clone https://github.com/RobertSasak/react-native-bundle-size
code . # Perform any changes
npm link # make it available locally
react-native-bundle-size ../path-to-your-react-native-folder # Try your changes
```
