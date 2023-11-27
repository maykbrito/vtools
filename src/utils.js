const removeCommonExtensionsFromFile = (fileName) => {
  const exts = ['.mp4', '.mkv', 'wav', 'mp3']

  return exts.reduce((acc, ext) => {
    return acc.replace(ext, '')
  }, fileName)
}

const getExtension = (file) => file.slice(-3)

module.exports = {
  getExtension,
  removeCommonExtensionsFromFile,
}
