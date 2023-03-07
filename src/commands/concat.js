const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function concat() {
  await exec(
    `[ -e list.txt ] && rm list.txt
for f in *.mp4
do
   echo "file $f" >> list.txt
done

ffmpeg -f concat -i list.txt -c copy joined.mp4 && rm list.txt`
  )
}

module.exports = {
  name: 'concat',
  description: 'concat all .mp4 files in folder',
  async run(toolbox) {
    const {
      print: { error, success },
    } = toolbox

    try {
      await concat()
      success('Done!')
    } catch (err) {
      console.log(err)
      error('Something went wrong!')
    }
  },
}
