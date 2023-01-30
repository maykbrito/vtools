// child_process.execSync(command[, options])
const { execSync } = require('child_process')

const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'speed',
  description: 'Will make the video x times faster.',
  async run(toolbox) {
    const {
      parameters: { first, second },
      print: { error },
    } = toolbox
    if (!first) {
      error('File is needed')
      return
    }

    if (!second) {
      error('X time is needed: eg. 1.25 or 2 or 3')
      return
    }

    try {
      const outputFileName = removeCommonExtensionsFromFile(first)
      const [pts, atempo] = [1 / second, String(second).replace(',', '.')]
      execSync(
        `ffmpeg -y -i ${first}  -filter_complex "[0:v]setpts=${pts}*PTS[v];[0:a]atempo=${atempo}[a]" -map "[v]" -map "[a]" ${outputFileName}-${atempo}x.mp4`
      ).toString()
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    } finally {
      toolbox.print.info('Done!')
    }
  },
}
