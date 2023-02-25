// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'cutVideo',
  description: 'From given video file, will cut init and end part',
  async run(toolbox) {
    const {
      parameters: {
        first,
        options: { start = '00:00:00.000', end },
      },
      print: { error, success },
    } = toolbox

    if (!first) {
      error('File is needed')
      return
    }

    if (!end) {
      error('--end time is needed')
      return
    }

    try {
      const outputFileName = removeCommonExtensionsFromFile(first)
      execSync(
        `ffmpeg -y -ss "${start}" -t "${end}" -i "${first}" -c copy "${outputFileName}-part.mp4"`
      )
      success('Done!')
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
