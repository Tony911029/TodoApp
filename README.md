# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
npm start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
npm run android
```


For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
npm run ios
```

## iOS set up
Install iphone simulator via xcode (this will take a while): </Br>
Reference: https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators


#### CocoaPods:
Need to download CocoaPods before we can run `yarn ios:pod`. Sudo command in the official document won't work as macOS won't let you change the pre-installed Ruby version. We need a separate version of Ruby to install CocoaPods. </Br>
Reference: https://stackoverflow.com/a/54873916/20979306

To download a separate version of Ruby:
```
brew install chruby ruby-install
ruby-install ruby
```

Add the following to the `~/.bashrc` or `~/.zshrc` file and restart the terminal:
```
source $HOMEBREW_PREFIX/opt/chruby/share/chruby/chruby.sh # Or run `brew info chruby` to find out installed directory
```

To change the Ruby version to 3.3.5 (or whatever):
```
chruby 3.3.5
```

After changing the version, download CocoaPods (it will take a while):
```
sudo gem install cocoapods -v
```

Download project's dependencies by running the command at the project root directory (might have to change the Ruby version again):
```
npm ios:pod
```