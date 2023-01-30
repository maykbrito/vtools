const removeCommonExtensionsFromFile = (fileName) => {
  const exts = ['.mp4', '.mkv']

  return exts.reduce((acc, ext) => {
    return acc.replace(ext, '')
  }, fileName)
}

module.exports = {
  removeCommonExtensionsFromFile,
}
