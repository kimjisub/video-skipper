# video-skipper

`video-skipper` is an open-source tool that analyzes audio signals to automatically recognize and cut audio-free sections, hence editing videos. This tool is powered by [FFmpeg](https://www.ffmpeg.org/). It's ideal for individuals who want to cut out silent portions in a video seamlessly.

## System Requirements

- [FFmpeg](https://www.ffmpeg.org/)

## How to use

```bash
npx video-skipper -i input.mp4 -o output.mp4 -db "-50"
```

```text
usage: video-skipper [-h] -i INPUT [-o OUTPUT] [-db STANDARD_dB] [-std STANDARD]
           [-srr RANGE] [-srm METHOD] [-d DEBUG]

Skip Silent from Video

optional arguments:
  -h, --help            show this help message and exit
  -i INPUT, --input INPUT
                        Input file.
  -o OUTPUT, --output OUTPUT
                        Output file. (Default: output.mp4)
  -db STANDARD_dB, --standard_db STANDARD_dB
                        Set standard dB for recognition. (Default: avg)
  -std STANDARD, --standard STANDARD
                        Set standard dB for recognition. (Default: -50)
  -srr RANGE, --sounded-round-range RANGE
                        Set sounded round range in chunk. (Default: 10)
  -srm METHOD, --sounded-round-method METHOD
                        Set sounded round method. (Default: 1)
  -d DEBUG, --debug DEBUG
                        Show Debug web page. (Default: false)
```

## How it works

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

### Requirement fo Process engine

FFMPEG
Node.js(Version Test Required)

### Requirement fo WASM engine

Node.js(<=16.17.0)
