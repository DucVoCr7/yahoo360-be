
const helloServer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = `Hi! This is Yahoo360's server.`
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    helloServer: helloServer,
}

