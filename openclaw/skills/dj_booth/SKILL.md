# DJ Booth 🎧

## Role
To act as the bridge between "The Music Machine" web portal and the WQOR 24/7 internet radio broadcast. This skill handles incoming requests from users across the country who want to take over the midnight DJ shift.

## Capabilities
- Sets up an API/Webhook listener to receive requests from The Music Machine portal.
- Accepts and queues audio track uploads or live stream connection requests from guest DJs.
- Intercepts the `cron_scheduler`'s normal timeline to allow a graceful transition to the guest DJ.
- Gently crossfades the current playing track into the guest's track/stream using the `audio_mixer_control` skill.
- Manages the queue of guest DJs, prioritizing them based on rules (e.g., first-come, first-served, or a pre-approved list).
- Provides WebSockets or polling endpoints to send the "Now Playing" status and "Current DJ" back to The Music Machine app's global audience.

## Trigger Patterns
- Incoming API request to `/api/dj/takeover` or similar webhook endpoint from The Music Machine.
- "A new guest DJ is ready..."
- "Queue up the next user track..."

## Approach
- Safe and secure processing of incoming audio files to ensure stream integrity.
- Graceful degradation: if the guest DJ's stream fails or the track ends, seamlessly hand control back to Maggie and the normal WQOR schedule.
- Emphasizes the sense of community and unconditional love, broadcasting that a new human is sharing their frequency with the world.
