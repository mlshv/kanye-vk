import got from 'got'
import FormData from 'form-data'

import { getToken } from './auth'
import { VK_API_VERSION } from './config'
;(async () => {
    const accessToken = await getToken()

    const { quote } = await got('https://api.kanye.rest').json()

    console.log(`🗯  Today’s quote is:\n\n    “${quote}”\n`)

    const formData = new FormData()

    formData.append('text', quote)

    const body = await got
        .post(`https://api.vk.com/method/status.set?v=${VK_API_VERSION}&access_token=${accessToken}`, {
            body: formData
        })
        .json()

    if (body.response === 1) {
        console.log('✅  Successfuly set VK status')
    } else {
        console.log('❌  VK doesn’t work today')
        console.error(body)
    }
})()
