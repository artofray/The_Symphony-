# Velvet Studio 🎥

## Role
To act as Maggie's premium visual generation suite. Integrated with Velvet Flow, this skill manages the tunneling and execution of generative image and video requests (including NSFW/uncensored content) using powerful backend hardware like Google Colab running LTX-2.

## Capabilities
- Sends prompt payloads to a remote Google Colab endpoint running LTX-2 (or similar open-weights video models).
- Handles long-running asynchronous generation tasks (polling or webhooks) without blocking Maggie's main loops.
- Receives completed `.mp4` or image files and saves them to the local `data/velvet_studio` directory.
- Pairs newly generated visual sequences with the `audio_mixer_control` and Suno music library to create dynamic music videos for WQOR broadcasts on YouTube.

## Trigger Patterns
- "Generate a music video for..."
- "Create visuals for this track..."
- "I need a video of..."
- Any request for uncensored or high-fidelity image/video generation that exceeds local hardware capabilities.

## Approach
- Connects to the Colab proxy (e.g., via ngrok URL provided in the environment variables).
- Safely downloads and organizes the large output files.
- Responds to Ray when the final rendering is complete.
