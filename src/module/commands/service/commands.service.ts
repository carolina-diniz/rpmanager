export const commandsService =  {
  getCommandFileName: (filename: string) => {
    const filePaths = filename.split('/')

    return filePaths[filePaths.length - 1].replace(/\.ts|-/g, '')
  } 
}