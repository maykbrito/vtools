// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'cutVideo',
  description: 'From given video file, will cut init and end part',
  async run(toolbox) {
    console.log(toolbox)
    const {
      parameters: {
        first,
        options: { start, end },
      },
      print: { error, success },
    } = toolbox

    if (!first) {
      error('File is needed')
      return
    }

    if (!start) {
      error('--start time is needed')
      return
    }

    if (!end) {
      error('--end time is needed')
      return
    }

    try {
      const outputFileName = removeCommonExtensionsFromFile(first)
      await execSync(
        `ffmpeg -y -ss "${start}" -t "${end}" -i "${first}" -c copy "${outputFileName}-part.mp4"`
      )
      toolbox.print.success('Done!')
    } catch (error) {
      console.log(error)
      toolbox.print.error('Something went wrong!')
    }
  },
}
