# kanye-vk
Node.js script that sets Kanye West quotes as vk.com status

## Usage
0. Create VK app at https://vk.com/dev.
1. Get API token https://oauth.vk.com/authorize?client_id=YOUR_APP_ID&display=page&redirect_uri=blank.html&scope=status,offline&response_type=token.
2. Copy `access_token` token from URL.
3. Put it in `.env` file or in `KANYE_VK_ACCESS_TOKEN` enviroment variable.
4. Run the script right away or put it in your crontab or any other schedule tool.
