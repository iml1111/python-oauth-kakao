# python-Oauth-kakao
Python을 이용한 Kakao Oauth 연동 로그인 예제입니다.

테스트한 프레임워크는 Flask이지만 Flask에 종속된 기능을 전혀 사용하지 않았기 때문에 타 프레임워크에서도 사용하실 수 있습니다.

해당 코드에 대한 자세한 설명은 [여기](https://blog.naver.com/shino1025/222226561870)를 참고해주세요.


# Dependency

해당 예제 코드를 실행하기 위해서는, 먼저 [Kakao Developers](https://developers.kakao.com/)에서 어플리케이션 등록을 끝마쳐야 합니다.

그 후, **발급받은 Client_id, Client_Secret(선택사항), Redirect_URI를 해당 서버에서 config.py에 다음과 같이 입력해주세요.** config.py는 app.py와 같은 경로에 위치해야 합니다.

```python
# config.py 예시 (해당 값은 실제 정보가 아닙니다)
CLIENT_ID = "198f75998f7dc4f1198f75970400f56"
CLIENT_SECRET = "3pdc4f1198f759Ey4yFPR24198f759ZzO"
REDIRECT_URI = "http://localhost:5000/oauth"
```



# Get Started

```shell
$ cd /python-oauth-kakao
$ pip install -r requirements.txt
$ cd ./src
$ python app.py
...
* Restarting with stat
* Debugger is active!
* Debugger PIN: XXX-XXX-XXX
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
...
```





