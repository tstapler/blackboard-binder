from flask import render_template, flash, redirect
from __init__ import app
from forms import LoginForm
# index view function suppressed for brevity

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    userKey = "venecia1"

    if form.validate_on_submit():
        if form.username.data == userKey:
            flash('un="%s", pw=%s' %
                (form.username.data, form.password.data))
            return redirect('/success')
        else:
            flash('Typed "%s", needed "%s"' %
                (form.username.data, userKey))
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


if __name__== '__main__':
	app.run(debug=True)
