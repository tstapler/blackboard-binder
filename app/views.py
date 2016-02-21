from flask import render_template, flash, redirect
from __init__ import app
from forms import LoginForm
import json

@app.route('/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    userKey = "venecia1"

    if form.validate_on_submit():
        if form.username.data == userKey:
            return redirect('/success')
        else:
            return redirect('/fail')

    return render_template('login.html',
                           title='Log In',
                           form=form)

@app.route('/fail')
def fail():
    return render_template('fail.html')

@app.route('/success')
def success():
    return render_template('success.html')


@app.route('/files')
def files():
    name = "filename.txt"
    return render_template('filelist.html', list=dirs)


dirs = {
  "dir1": {
    "file1": "None",
    "file2": "None"
  },
  "dir2": {
    "dir3": {
      "file3": "None"
    },
    "file4": "None"
  }
}


###for key, value in dirs.viewitems():


if __name__== '__main__':
	app.run(debug=True)
