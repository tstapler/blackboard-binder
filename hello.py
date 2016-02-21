from flask import Flask, render_template, request, url_for
app = Flask(__name__)

@app.route('/homepage')
def hello_world(name=None):
	return render_template('homepageNav.html', name=name)

if __name__== '__main__':
	app.run(debug=True)
