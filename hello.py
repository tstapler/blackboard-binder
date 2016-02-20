from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world(name=None):
	return render_template('index.html', name=name)
@app.route('/hello2')
def hello2():
	return "Hello W00rld2"
if __name__== '__main__':
	app.run(debug=True)

