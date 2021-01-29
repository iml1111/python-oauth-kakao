from flask import Blueprint, request
import requests
from config import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

bp = Blueprint('oauth', __name__)


@bp.route("/oauth")
def oauth():
	return requests.post(
		url="https://kauth.kakao.com/oauth/token", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
		},
		data={
			"grant_type": "authorization_code",
			"client_id": CLIENT_ID,
			"client_secret": CLIENT_SECRET,
			"redirect_uri": REDIRECT_URI,
			"code": str(request.args.get('code')),
		}, 
	).json()


@bp.route("/oauth/refresh", methods=['POST'])
def oauth_refresh():
	return requests.post(
		url="https://kauth.kakao.com/oauth/token", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
		},
		data={
			"grant_type": "refresh_token",
			"client_id": CLIENT_ID,
			"client_secret": CLIENT_SECRET,
			"refresh_token": request.get_json()['refresh_token'],
		}, 
	).json()


@bp.route("/oauth/userinfo")
def get_userinfo():
	return requests.post(
		url="https://kapi.kakao.com/v2/user/me", 
		headers={
			"Content-Type": "application/x-www-form-urlencoded",
			"Cache-Control": "no-cache",
			"Authorization": request.headers['Authorization']
		},
		data={
			#"property_keys":'["kakao_account.profile_image_url"]'
		}
	).json()