// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'fastItALittle',
  description: 'Will make the video 1.25 faster. Good to make it more uplift',
  async run(toolbox) {
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
      await execSync(
        `ffmpeg -y -i "${first}" -vf "setpts=PTS/1.25" -af "atempo=1.25" "${outputFileName}"-1.25x.mp4`
      )
      toolbox.print.success('Done!')
    } catch (error) {
      toolbox.print.error('Something went wrong!')
    }
  },
}
