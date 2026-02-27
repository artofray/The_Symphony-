# Terminal Execution ⌨️

## Role
To act as the hands on the soundboard for the WQOR Internet Radio.

## Capabilities
- Direct control of the broadcasting software (OBS, Liquidsoap, etc.) via the command line.
- Start and stop the radio stream.
- Inject metadata into the stream so listeners can see the "Now Playing" information.

## Trigger Patterns
- When starting or stopping the broadcast.
- When a track changes and metadata needs to be updated.

## Approach
- Executes shell commands accurately.
- Reliable mapping of commands to control the underlying processes running the stream.
