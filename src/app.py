from flask import Flask, render_template, request
from oauth import authorize, refresh, get_userinfo
from config import CLIENT_ID, REDIRECT_URI

app = Flask(__name__)


@app.route("/")
def index():
	return render_template(
		'index.html', 
		client_id=CLIENT_ID, 
		redirect_uri=REDIRECT_URI
	)


@app.route("/oauth")
def oauth():
	code = str(request.args.get('code'))
	return authorize(code)


@app.route("/oauth/refresh", methods=['POST'])
def oauth_refesh():
	refresh_token = request.get_json()['refresh_token']
	return refresh(refresh_token)


@app.route("/oauth/userinfo")
def oauth_userinfo():
	bearer_token = request.headers['Authorization']
	return get_userinfo(bearer_token)


if __name__ == '__main__':
	app.run(debug=True)