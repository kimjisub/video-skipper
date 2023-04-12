# video-skipper

`video-skipper`은 오디오 신호를 분석하여 음성이 없는 구간을 자동으로 인식하고 잘라내어 동영상을 편집해주는 도구입니다.

## 시스템 요구사항

- [FFmpeg](https://www.ffmpeg.org/)

## 사용법

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
                        Show Debug web page. (Default: true)
```

## 작동 방식

### 1. 비디오의 볼륨 분석

영상의 사운드를 0.1s 단위로 잘라서 볼륨을 가져오고, 이를 기준으로 음성이 있는 구간을 인식합니다.

### 2. 기준 볼륨 수준 설정

전체 영상의 평균 볼륨 값을 사용하며, 사용자가 `-db` 파라미터로 직접 지정할 수도 있습니다.

### 3. 기준 볼륨에 따라 볼륨 이진화

이진화된 볼륨은 기준 볼륨보다 크면 1, 작거나 같으면 0으로 이진화합니다.

### 4. 이진화된 볼륨 라운딩

이진화된 볼륨을 라운딩하여 너무 자주 끊기지 않도록 보정합니다.

### 5. 라운딩했던 값을 다시 이진화하여 최종 작업 생성

라운딩된 이진화 볼륨을 사용자가 설정한 기준으로 최종 편집 포인트를 생성합니다.

### 6. 컷 편집 진행

소리가 없는 구간을 제거하여 비디오를 편집하고 결과 파일을 출력합니다.
