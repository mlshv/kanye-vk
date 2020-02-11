import fs from 'fs'
import inquirer from 'inquirer'
import got from 'got'

import { VK_API_VERSION, TOKEN_FILE_PATH } from './config'

export async function getToken() {
    const savedToken = await fs.promises.readFile(TOKEN_FILE_PATH)

    if (savedToken && savedToken.length) {
        const body = await got(
            `https://api.vk.com/method/status.get?v=${VK_API_VERSION}&access_token=${savedToken}`
        ).json()

        // VK returns 200 code for any response 🙄
        if (!body.error) {
            return savedToken
        }

        // token is invalid. let's get a new one
    }

    const { appId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'appId',
            message: 'Enter your Standalone app’s id. You can create one at https://vk.com/apps?act=manage',
            filter: string => string.trim(),
            validate: string => parseInt(string) === +string
        }
    ])

    const { token } = await inquirer.prompt([
        {
            type: 'input',
            name: 'token',
            message: `Open the link in a browser and enter access_token from URL https://oauth.vk.com/authorize?client_id=${appId}&display=page&redirect_uri=blank.html&scope=status,offline&response_type=token`,
            filter: string => string.trim(),
            validate: string => !!string
        }
    ])

    await fs.promises.writeFile(TOKEN_FILE_PATH, token)

    return token
}
