from flask import render_template, flash, redirect, make_response, send_file, url_for
from __init__ import app
from forms import LoginForm
from blackboard_parse import download_all_files
import shutil
import json

@app.route('/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    userKey = "venecia1"

    if form.validate_on_submit():
        try:
            download_all_files(user_id=form.username.data, password=form.password.data)
            return redirect(url_for('download'))
        except:
            return redirect(url_for('fail'))

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
    return render_template('filelist.html', dirs=dirs)

@app.route('/bbdownload')
def download():
    shutil.make_archive("Blackboard_Files", 'zip', "Blackboard_Files")

    return send_file("Blackboard_Files.zip")


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




if __name__== '__main__':
	app.run(debug=True)
