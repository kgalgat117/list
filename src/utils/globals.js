var globals = {}

globals.SERVER_PROTOCOL = 'http'
globals.SERVER_HOST = 'localhost'
globals.SERVER_PORT = ':3000'
globals.SERVER_URL = `${globals.SERVER_PROTOCOL}://${globals.SERVER_HOST}${globals.SERVER_PORT}`

export { globals }