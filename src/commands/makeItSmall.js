const { execSync } = require('child_process')
const { removeCommonExtensionsFromFile } = require('../utils')

module.exports = {
  name: 'makeItSmall',
  description: 'Just compress the file and get a small one',
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
        `ffmpeg -y -i "${first}" -vcodec h264 -acodec aac "${outputFileName}"-small.mp4`
      )
      success('Done!')
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
