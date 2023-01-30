const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function getTotalTimeOfMP4Videos() {
  const { stdout } = await exec(
    "find . -name '*.mp4' -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \\; | awk '{sum += $1}; END{print sum}'"
  )
  const totalSeconds = parseFloat(stdout)
  const totalDays = Math.floor(totalSeconds / 60 / 60 / 24)
  const totalHours = Math.floor(totalSeconds / 60 / 60) % 24
  const totalMinutes = Math.floor(totalSeconds / 60) % 60
  const totalSecondsMod = Math.floor(totalSeconds) % 60
  return `${totalDays} days ${totalHours
    .toString()
    .padStart(2, '0')}:${totalMinutes
    .toString()
    .padStart(2, '0')}:${totalSecondsMod.toString().padStart(2, '0')}`
}

module.exports = {
  name: 'totalTimeOfMp4Videos',
  description: 'From current directory show total time of all mp4 video files',
  async run(toolbox) {
    const {
      print: { error, success },
    } = toolbox

    try {
      const response = await getTotalTimeOfMP4Videos()
      success(response)
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
