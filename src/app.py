from flask import Flask, render_template
from config import CLIENT_ID, REDIRECT_URI
import oauth

app = Flask(__name__)
app.register_blueprint(oauth.bp)


@app.route("/")
def index():
	return render_template(
		'index.html', 
		client_id=CLIENT_ID, 
		redirect_uri=REDIRECT_URI
	)


if __name__ == '__main__':
	app.run(debug=True)