// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'fastItALittle',
  description:
    'Will make the video 1.15 faster by default (the second argument will be used as speed). Good to make it more uplift',
  async run(toolbox) {
    let {
      parameters: { first, second },
      print: { error, success },
    } = toolbox
    if (!first) {
      error('File is needed')
      return
    }

    if (!second) {
      second = '1.15'
    }

    try {
      const outputFileName = removeCommonExtensionsFromFile(first)
      await execSync(
        `ffmpeg -y -i "${first}" -vf "setpts=PTS/${second}" -af "atempo=${second}" "${outputFileName}"-${second}x.mp4`
      )
      toolbox.print.success('Done!')
    } catch (error) {
      toolbox.print.error('Something went wrong!')
    }
  },
}
