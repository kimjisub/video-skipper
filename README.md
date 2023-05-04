# video-smart-skipper

소리의 크기를 이용하여 동영상을 편집하는 프로그램은 오디오 신호를 분석하여 음성이 없는 구간을 자동으로 인식하고 잘라내어 동영상을 편집해주는 도구입니다.

## 시스템 요구사항

[nodejs](https://nodejs.org/), [FFmpeg](https://www.ffmpeg.org/)

두 프로그램이 설치되어있지 않으면 프로그램의 작동을 보장할 수 없습니다.

## 사용법

```
node index -i input.mp4 -o output.mp4 -db "-50"
```

```
usage: index [-h] [-v] [-i PATH] [-o PATH] [-c CHUNK_SIZE] [-s SOUNDED_SPEED] [-ns SILENT_SPEED] [-db STANDARD_dB] [-vrr RANGE] [-srr RANGE] [-vrm METHOD] [-srm METHOD] [-d DEBUG]

Cut Video by Silence

Optional arguments:
  -h, --help        Show this help message and exit.
  -v, --version     Show program's version number and exit.
  -i PATH           Input file. (Default: input.mp4)
  -o PATH           Output file. (Default: output.mp4)
  -c CHUNK_SIZE     Sound chunk size in sec. (Default: sec of 1 frame)
  -s SOUNDED_SPEED  Set sounded part speed. (Default: 1)
  -ns SILENT_SPEED  Set silent part speed. (Default: Inf)
  -db STANDARD_dB   Set standard dB for recognition. (Default: -50)
  -vrr RANGE        Set volume round range in chunk. (Default: 3)
  -srr RANGE        Set sounded round range in chunk. (Default: 10)
  -vrm METHOD       Set volume round method. (Default: 3)
  -srm METHOD       Set sounded round method. (Default: 1)
  -d DEBUG          Show Debug web page. (Default: true)
```

## 작동 방식

### 1. Extract Sound by Chunk

영상으로부터 사운드 파일을 `CHUNK_SIZE` 간격으로 추출합니다. `workspace/sounds/` 에 저장됩니다.

### 2. Get Volume of Each Chunk

각 사운드 청크로부터 소리 볼륨을 가져옵니다. 이 작업은 캐싱이 되며, 같은 영상을 2번 이상 처리하게 되면 속도가 향상됩니다.

### 3. Reformat Video (mp4, keyframe)

비디오파일을 편집하기 위한 상태로 변경합니다. mp4포멧으로 키프레임 1로 변환합니다. `workspace/keyedited.mp4` 에 저장됩니다.

### 4. Split and Speeding Videos

영상을 기준에 맞게 자르고, 속도를 조정합니다. `workspace/videos/` 에 저장됩니다.

### 5. Merge All Part to One Video

잘려진 영상을 하나의 비디오로 병합합니다. `OUTPUT` 에 저장됩니다.
