# video-skipper

`video-skipper` is an open-source tool that analyzes audio signals to automatically recognize and cut audio-free sections, hence editing videos. This tool is powered by [FFmpeg](https://www.ffmpeg.org/). It's ideal for individuals who want to cut out silent portions in a video seamlessly.

## System Requirements

### If you use `-e process`

- [Nodejs](https://nodejs.org/)
- [FFmpeg](https://www.ffmpeg.org/)

- Download the ffmpeg-release-essentials.7z file from https://www.gyan.dev/ffmpeg/builds/ when downloading FFmpeg for Windows.
- If entering 'FFmpeg' in the terminal results in an error, access the environment variables through the 'Edit System Environment Variables' window, and add the path to the
  downloaded FFmpeg bin file in the system variables.
- If entering 'FFmpeg' in the terminal doesn't result in an error, then FFmpeg is ready to use.

### If you use `-e wasm`

- [Nodejs](https://nodejs.org/) `<=16.17.0`

## Instructions for uses

- First, enter npm install -g video-skipper in the terminal to install 'video-skipper' globally.

- Enter FFmpeg in the terminal to check if FFmpeg is installed, and if it is not installed, follow the steps mentioned above to install it.

```bash
npx video-skipper -i input.mp4 -o output.mp4 -db "-50"
```

```text
usage: npx video-skipper [-h] -i INPUT [-o OUTPUT] [-e ENGINE] [-db STANDARD_dB] [-std STANDARD]
                [-srr RANGE] [-srm METHOD] [-d DEBUG]

Skip Silent from Video

optional arguments:
  -h, --help            show this help message and exit
  -i INPUT, --input INPUT
                        Input file.
  -o OUTPUT, --output OUTPUT
                        Output file. (Default: output.mp4)
  -e ENGINE, --engine ENGINE
                        FFMPEG engine (Default: wasm)
  -db STANDARD_dB, --standard_db STANDARD_dB
                        Set standard dB for recognition. (Default: avg)
  -std STANDARD, --standard STANDARD
                        Set standard dB for recognition. (Default: -50)
  -srr RANGE, --sounded-round-range RANGE
                        Set sounded round range in chunk. (Default: 10)
  -srm METHOD, --sounded-round-method METHOD
                        Set sounded round method. (Default: 1)
  -d DEBUG, --debug DEBUG
                        Show Debug web page. (Default: true)
```

## Operating mechanism

### 1. Volume Analysis of Video

The sound of the image is cut in 0.1s to obtain volume, and based on this, the interval with voice is recognized.

### 2. Setting the Reference Volume Level

It uses the average volume value of the entire image and can also be specified directly by the user with the -db parameter.

### 3. Binary volume according to reference volume

Binary volumes are binarized to 1 if they are larger than the reference volume and 0 if they are smaller or equal.

### 4. Binaryized volume rounding

Round the binarized volume to calibrate it so that it doesn't break too often.

### 5. Re-binary the rounded value to create the final job

Creates the final edit point based on the user-set criteria for rounded binary volumes.

### 6. Cut Edit Progress

Edit the video and output the result file by removing the silent interval.

## License

This project is licensed under the terms of the Apache License 2.0.
