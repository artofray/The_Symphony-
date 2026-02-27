# OpenClaw Telegram Setup Guide 🦞 -> ✈️

Unlock Maggie on Telegram so you can chat with her on the go.

## 1. Create a Bot
1. Open Telegram and search for **@BotFather**.
2. Send command: `/newbot`
3. Follow prompts:
   - Name: `Maggie Conductor` (or similar)
   - Username: `Maggie_Conductor_Bot` (must end in `bot`)
4. **Copy the HTTP API Token**. (e.g., `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

## 2. Get Your Chat ID
1. Search for **@userinfobot** (or just message your new bot later and check logs).
2. Start it to see your numeric ID (e.g., `123456789`).
   - *Alternative:* Add your bot to a group, then use @RawDataBot to get group ID.

## 3. Configure OpenClaw
Open `%USERPROFILE%\.openclaw\config.yaml` and find the `channels` section:

```yaml
channels:
  telegram:
    enabled: true
    bot_token: "8305314954:AAF7kxtZTjY9ZFpbOtA02pY_N4phTmnakfE"  <-- Paste token for @Clawsofdeath_bot here
    allowed_chats:
      - name: "The Forge"
        id: "me maggie"            <-- Paste ID here (quotes important)
        type: "private"                    <-- or "group"
```

## 4. Restart OpenClaw
For changes to take effect, you must restart the gateway service:

```powershell
# Stop existing process (if running)
taskkill /F /IM node.exe

# Start Gateway
openclaw gateway
```

**Note:** If you are running the dashboard, changing `config.yaml` usually defaults to port 18789, so no dashboard changes needed.
