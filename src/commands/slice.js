const { execSync } = require('child_process')
const { removeCommonExtensionsFromFile, getExtension } = require('../utils')

module.exports = {
  name: 'slice',
  description: 'slice file minute by minute or by given segment time',
  async run(toolbox) {
    const {
      parameters: {
        first: file,
        options: { segment = '00:01:00' },
      },
      print: { error, success },
    } = toolbox

    if (!file) {
      error('File is needed')
      return
    }

    try {
      const ext = getExtension(file)
      const seg = String(segment).match(/^\d\d\:\d\d\:\d\d$/gi)

      if (!seg) {
        return new Error('Segment time wrong format! Must be hh:mm:ss')
      }

      const cmd = `
      ffmpeg -i ${file} -c copy -map 0 -segment_time ${segment} -f segment -reset_timestamps 1 ${removeCommonExtensionsFromFile(
        file
      )}%03d.${ext}
      `
      execSync(cmd)
      success('Done!')
    } catch (err) {
      console.log(err)
      error(err.message)
    }
  },
}
