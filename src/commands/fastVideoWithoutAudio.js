// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'fastVideoWithoutAudio',
  description:
    'Will make the video 2x faster with 12 fps without audio. Good to share.',
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
        `ffmpeg -i "${first}" -filter_complex "fps=fps=12,setpts=0.5*PTS" -an "${outputFileName}"-fast.mp4`
      )
      toolbox.print.success('Done!')
    } catch (error) {
      toolbox.print.error('Something went wrong!')
    }
  },
}
