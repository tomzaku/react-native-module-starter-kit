const chalk = require('chalk')
const PrettyError = require('pretty-error')
const pe = new PrettyError()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var fs = require('fs');
var cs = require('change-case')

const localIps = require('./helper/getIp')
const check = require('./check')
const appDir = (nameProject) => `${process.cwd()}/${nameProject}`
const libDir = `../../`
const baseDir = `${__dirname}/../base`
const log = console.log
const localIp = localIps.length > 0 ? localIps[0] : '192.168.100.122'

async function copyAppDelegate(nameProject) {
  log(chalk.blue('Copy App Delegate'))
  const appDelegate = String.raw`
  /**
   * Copyright (c) 2015-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  #import "AppDelegate.h"

  #import <React/RCTBundleURLProvider.h>
  #import <React/RCTRootView.h>

  @implementation AppDelegate

  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
    NSURL *jsCodeLocation;
    #ifdef DEBUG
      jsCodeLocation = [NSURL URLWithString:@"http://${localIp}:8081/index.bundle?platform=ios&dev=true"];
    #else
      jsCodeLocation = [[NSBundle mainBundle] URLWithStringLForResource:@"main" withExtension:@"jsbundle"];
    #endif
    // jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    //  jsCodeLocation = [NSURL URLWithString:@"http://${localIp}:8081/index.bundle?platform=ios&dev=true"];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"${nameProject}"
                                                initialProperties:nil
                                                    launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
  }
  @end
  `
  await exec(`echo '${appDelegate}' > ${appDir(nameProject)}/ios/${nameProject}/AppDelegate.m`)
}

async function linkingPackage(nameProject) {
  // Linking crash at here. may be some package in list have problem
  exec(`cd ${appDir(nameProject)} && react-native link`)
}
async function copyIndexFile(nameProject) {
  log(chalk.blue('Copy index.js file'))
  const indexFile  = `import { AppRegistry } from 'react-native';
  import App from './src/mobile';
  
  AppRegistry.registerComponent('${nameProject}', () => App);
  `
  await exec(`echo "${indexFile}\" > ${appDir(nameProject)}/index.js`)

}
async function copyZkrnConfig(nameProject) {
  const zkrn = {
    "version": require(`${libDir}/package.json`).version
  }
  await exec(`echo '${JSON.stringify(zkrn)}' > ${appDir(nameProject)}/.zkrn`)
}


async function copyBaseToProject(nameProject) {
  await exec(`cp -r ${baseDir}/src ${appDir(nameProject)}/src` );

  // Copy Index file
  await copyIndexFile(nameProject)
  await copyAppDelegate(nameProject)
  await copyBin(nameProject)
  await copyZkrnConfig(nameProject)
}

async function installPackage(nameProject, namePackage) {
  log('Installing package: ' + chalk.green.underline.bold(`${namePackage}`))
  await exec(`cd ${process.cwd()}/${nameProject} && yarn add ${namePackage}`)
}

async function installPackageDependence(nameProject) {
  const dependences = [
    // GENERAL
    'uuid',
    'ramda',
    'axios',
    'moment',
    'randomcolor',
    // REDUX
    'redux',
    'normalizr',
    'react-redux',
    'redux-saga',
    'redux-thunk',
    'reselect',
    'seamless-immutable',
    'redux-persist',
    'redux-form',
    // UI
    'react-native-vector-icons',
    'react-consola',
    'react-native-animatable',
    'react-native-modal-datetime-picker',
    'react-native-shimmer-placeholder',
    'react-native-spinkit',
    'react-native-device-info',
    'react-native-keyboard-aware-scroll-view',
    'react-native-orientation',
    'react-native-image-picker',
    'react-native-circular-action-menu',
    'react-native-action-button',
    'react-native-elements',
    'react-navigation',
    'react-native-scrollable-tab-view',
    'react-native-datepicker',
    'react-native-linear-gradient',
    'react-native-material-bottom-navigation-performance',
    'react-native-i18n',
  ]
  for (let package of dependences) {
    await installPackage(nameProject, package);
  }
 
}

async function copyBin(nameProject) {
  log(chalk.blue('Copy bin and Makefile'))
  const changeIp = String.raw`#!/usr/bin/env python3
import re
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect((\"8.8.8.8\", 80))
ip = s.getsockname()[0]
s.close()

FILE_IOS = './ios/${nameProject}/AppDelegate.m'
with open(FILE_IOS) as f:
    content = f.read()
content_new = re.sub(r'(http:\/\/).*\/', r'http://' + ip + ':8081/', content)

f = open(FILE_IOS, 'w')
f.write(content_new)

print('Change IP to ' + ip + ' successfuly')
  `
  await exec(`mkdir ${appDir(nameProject)}/bin && echo "${changeIp}" > ${appDir(nameProject)}/bin/x-change-ip && chmod +x ${appDir(nameProject)}/bin/x-change-ip`)
  await exec(`cp  ${baseDir}/Makefile ${appDir(nameProject)}/`)
}

async function installReactNative(nameProject) {
  // check exist rn
  try {
    
    if (fs.existsSync(`${appDir(nameProject)}`)) {
      const { stdout, stderr } = await exec(`cd ${appDir(nameProject)}/ && react-native -v`)
      // if (stdout.indexOf('n/a') > 0) { //if react-native is'nt exist
      //   await exec(`react-native init ${nameProject}`);
      // }
      // else {
        throw "ERR> Your folder name ${nameProject} is existed R-N\nGO> Change the name App"
      // }
      return false;
    } else {
      await exec(`react-native init ${nameProject}`);
      return true;
    }
  } catch (err) {
    log(chalk.red.bold('err'))
    return false;
  }
}

async function init(name) {
  try {
    const isInstalledDependence = await check()
    if (!name) throw 'Please fill your name app. For ex: zkrn init myApp'
    const nameProject = cs.camelCase(name) 
    // log(chalk.yellow(`FILE BIN: ${__dirname}`))
    // log(chalk.cyan('FILE BIN ' + __dirname))
    // log(chalk.cyan('DEFAULT FOLDER ' + process.cwd()))
    log(chalk.cyan("==============================================="))
    log(chalk.blue(`Creating new react-native called ${nameProject}... Will take 5 minutes`))
    const status = await installReactNative(nameProject)
    if (!status) {
      throw 'See error on top'
    }
    log(chalk.green(`Creating react-native successfully`))

    log(chalk.cyan("==============================================="))
    log(chalk.blue(`Now install dependence package`))
    await installPackageDependence(nameProject)
    log(chalk.green(`Installed lib successfully`))
 
    log(chalk.cyan("==============================================="))
    log(chalk.blue('Copying base component'))
    await copyBaseToProject(nameProject)
     // Link package
    log(chalk.cyan("==============================================="))
    log(chalk.blue('Linking package...'))
    await linkingPackage(nameProject)

    log(chalk.green('Done!. Have a nice day!'))
    log(chalk.cyan(`> cd ${nameProject}`))
    log(chalk.cyan(`> make build-ios`))
  } catch(err) {
    log(chalk.red(pe.render(err)))
  }
}

module.exports = init