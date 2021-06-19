import Raven from 'raven-js'

function init() {
    Raven.config("https://561c53305bcc4fa49a5de6a5a9dbb80e@o573435.ingest.sentry.io/5824218",{
    release:'1-0-0',
    environment:'development-test',
}).install()
}
function log(error) {
    Raven.captureException(error)
}
export default{
    init,
    log
}