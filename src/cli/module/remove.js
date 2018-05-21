var fs = require('fs')
const util = require('util');
const { build, printCommands, printWtf, print } = require('gluegun')
const PrettyError = require('pretty-error')
const pe = new PrettyError()


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const exec = util.promisify(require('child_process').exec);
var { makeGetModulePath } = require('../helper/path')
var { makeGetModuleName } = require('../helper/name')

const removeModuleDir = async (moduleName) => {
  const getModulePath = makeGetModulePath(moduleName);
  print.info(`>>> Removing ${getModulePath.getModuleDir()}`)
  await exec(`rm -rf ${getModulePath.getModuleDir()}`)
}

const updateAppFile = async (moduleName, file) => {
  const getModuleName = makeGetModuleName(moduleName)
  const moduleActionName = getModuleName.getAction()

  const rawText = await readFile(file, {encoding: 'utf-8'})
  regrex = new RegExp(`\n.*${moduleName}.*`,'g')
  const filePhoneRenamed = rawText.replace(regrex,'')
  // Save
  // console.log('>>>filePhoneRenamed', filePhoneRenamed)
  await writeFile(file, filePhoneRenamed)
}

const updateImportModule = async (moduleName) => {
  const getModulePath = makeGetModulePath(moduleName);

  const indexModulePath = getModulePath.getAppIndex()
  const appActionPath = getModulePath.getAppAction()
  const appReselectPath = getModulePath.getAppReselect()
  print.info(`Removing ${indexModulePath}`)
  await updateAppFile(moduleName, indexModulePath)
  print.info(`Removing ${appActionPath}`)
  await updateAppFile(moduleName, appActionPath)
  print.info(`Removing ${appReselectPath}`)
  await updateAppFile(moduleName, appReselectPath)
}

const Remove = async (moduleName) => {
  const getModulePath = makeGetModulePath(moduleName);
  try {
    print.info(`Removing module ${moduleName} begin...`)
    if (!getModulePath.isExist() ){
      throw `Module called \'${moduleName}\'is not existed`
    }
    print.warning("===============================================")
    await removeModuleDir(moduleName)
    print.info('> Remove import module')
    await updateImportModule(moduleName)

  } catch (err) {
    print.error('ERR Remove: ')
    print.error(pe.render(err))
  }
}

module.exports = Remove