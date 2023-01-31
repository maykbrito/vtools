const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { removeCommonExtensionsFromFile } = require('../utils')

async function cropToTiktok(filePath, x) {
  const outputFile = removeCommonExtensionsFromFile(filePath)
  await exec(
    `ffmpeg -i ${filePath} -vf "crop=ih*(9/16):ih:x=((in_w-out_w)/2)+${x}" -crf 18 ${outputFile}-vertical.mp4`
  )
}

module.exports = {
  name: 'cropToTiktok',
  description:
    'From given file, crop it to Tiktok specs. Can add x position of the video',
  async run(toolbox) {
    const {
      parameters: {
        first,
        options: { x },
      },
      print: { error, success },
    } = toolbox

    if (!first) {
      error('Filepath is needed')
      return
    }

    let xPos = x || 130

    try {
      await cropToTiktok(first, xPos)
      success('Done!')
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
