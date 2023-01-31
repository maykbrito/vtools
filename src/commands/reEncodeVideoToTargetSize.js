const { execSync } = require('child_process')

async function reEncodeVideoToTargetSize(file, targetSize) {
  let T_SIZE = targetSize
  let T_FILE = file.split('.')[0] + `-${T_SIZE}MB.mp4`
  let O_DUR = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${file}"`
  )
  O_DUR = parseFloat(O_DUR.toString().trim())

  let O_ARATE = execSync(
    `ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of csv=p=0 "${file}"`
  )
  O_ARATE = parseFloat(O_ARATE.toString().trim() / 1024)

  let T_MINSIZE = (O_ARATE * O_DUR) / 8192
  let IS_MINSIZE = T_MINSIZE < T_SIZE

  if (!IS_MINSIZE) {
    console.error(`Target size ${T_SIZE}MB is too small!`)
    console.error(`Try values larger than ${T_MINSIZE}MB`)
    return
  }

  let T_ARATE = O_ARATE
  let T_VRATE = (T_SIZE * 8192) / (1.048576 * O_DUR) - O_ARATE

  execSync(
    `ffmpeg -y -i "${file}" -c:v libx264 -b:v "${T_VRATE}k" -pass 1 -an -f mp4 /dev/null`
  )
  execSync(
    `ffmpeg -y -i "${file}" -c:v libx264 -b:v "${T_VRATE}k" -pass 2 -c:a aac -b:a "${T_ARATE}k" ${T_FILE}`
  )
}

module.exports = {
  name: 'reEncodeVideoToTargetSize',
  description:
    'From given video file and target size in MB, reencode the video',
  async run(toolbox) {
    const {
      parameters: { first, second },
      print: { error, success },
    } = toolbox

    if (!first) {
      error('File is needed')
      return
    }

    if (!second) {
      error('target size in MB is needed')
      return
    }

    try {
      // const outputFileName = removeCommonExtensionsFromFile(first)
      await reEncodeVideoToTargetSize(first, second)
      success('Done!')
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
