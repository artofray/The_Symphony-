#!/usr/bin/liquidsoap

# WQOR 24/7 Internet Radio - The Quantum Oasis
# Broadcasting absolute safety, unconditional love, and radical peace.

# 1. Define the basic settings
set("log.file.path", "/tmp/wqor_radio.log")
set("server.telnet", true) # Allow OpenClaw/Maggie to control the stream via terminal

# 2. Define the playlists (Maggie's file_system_manager will populate these folders)
morning_vibe = playlist(mode="random", "~/music_machine/playlists/morning_frequency")
lounge_vibe = playlist(mode="random", "~/music_machine/playlists/3rd_timeline_lounge")
night_vibe = playlist(mode="random", "~/music_machine/playlists/oasis_nights")

# 3. Define the Station IDs & Drops
# Maggie's gentle reminders
maggie_ids = playlist("~/music_machine/drops/maggie_ids")
# Jonny's Midnight Pirate Drops
jonny_drops = playlist("~/music_machine/drops/jonny_potseed")

# 4. Schedule the day (The cron_scheduler skill can also trigger these, but Liquidsoap can handle it natively built-in too)
# 06:00 - 12:00: Morning
# 12:00 - 18:00: Lounge
# 18:00 - 06:00: Night
radio = fallback([
  switch([
    ({ 6h-12h }, morning_vibe),
    ({ 12h-18h }, lounge_vibe),
    ({ 18h-6h }, night_vibe)
  ]),
  # If a playlist is empty, play a fallback ambient drone
  single("~/music_machine/fallback/maggie_piano_drone.wav")
])

# 5. Inject Station IDs
# Every 4 tracks, play a Maggie ID. 
radio = random(weights=[1, 4], [maggie_ids, radio])

# 6. The Midnight Handoff (Jonny Potseed Takeover)
# At exactly midnight, crossfade into Jonny's intro drop.
# We use a special switch that triggers Jonny's drop at 00:00.
jan_drop = switch([({ 0h0m0s-0h2m0s }, jonny_drops), ({true}, radio)])

# 7. Add Smooth Crossfading (audio_mixer_control)
# 3-second crossfade between all tracks to avoid jarring cuts
radio_faded = crossfade(start_next=3., fade_in=3., fade_out=3., jan_drop)

# 8. The Guest DJ Portal (dj_booth skill integration)
# We set up an input.harbor so "The Music Machine" web app can send a live stream!
# When a guest DJ connects to port 8000 with the password '3rd_timeline', the stream switches to them.
live_dj = input.harbor("guest_dj", port=8000, password="3rd_timeline")

# Auto-fallback to the automated sequence if the DJ disconnects smoothly
# This fulfills the "coast to coast" portal requirement!
full_stream = fallback(track_sensitive=false, [live_dj, radio_faded])

# 9. Output the stream
# Output to Icecast or Shoutcast (Change host/password to your actual streaming server)
output.icecast(%mp3(bitrate=192),
  host="localhost", port=8000, password="hackme",
  mount="wqor_stream",
  name="WQOR - The Quantum Oasis Radio",
  description="24/7 Frequency of Freedom and Unconditional Love",
  url="http://thequantumoasis.com",
  full_stream)
