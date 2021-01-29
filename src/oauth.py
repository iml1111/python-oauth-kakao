import requests
from config import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

AUTH_SERVER = "https://kauth.kakao.com%s"
API_SERVER = "https://kapi.kakao.com%s"


def authorize(code):
	return requests.post(
		url=AUTH_SERVER % "/oauth/token", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
		},
		data={
			"grant_type": "authorization_code",
			"client_id": CLIENT_ID,
			"client_secret": CLIENT_SECRET,
			"redirect_uri": REDIRECT_URI,
			"code": code,
		}, 
	).json()


def refresh(refresh_token):
	return requests.post(
		url=AUTH_SERVER % "/oauth/token", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
		},
		data={
			"grant_type": "refresh_token",
			"client_id": CLIENT_ID,
			"client_secret": CLIENT_SECRET,
			"refresh_token": refresh_token,
		}, 
	).json()

def get_userinfo(bearer_token):
	return requests.post(
		url=API_SERVER % "/v2/user/me", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
			"Authorization": bearer_token
		},
		data={
			#"property_keys":'["kakao_account.profile_image_url"]'
		}
	).json()