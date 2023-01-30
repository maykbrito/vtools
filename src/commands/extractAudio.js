// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'extractAudio',
  description: 'Will extract WAV audio from given video file',
  async run(toolbox) {
    // console.log(toolbox)
    const {
      parameters: { first },
      print: { error, success },
    } = toolbox
    if (!first) {
      error('File is needed')
      return
    }

    try {
      const outputFileName = removeCommonExtensionsFromFile(first)
      await execSync(`ffmpeg -i "${first}" "${outputFileName}".wav`)
      toolbox.print.success('Done!')
    } catch (error) {
      console.log(error)
      toolbox.print.error('Something went wrong!')
    }
  },
}
