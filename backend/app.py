from flask import Flask, render_template
from flask_cors import CORS
from routes.favorites import favorites_blueprint
from routes.pets import pets_blueprint
from routes.register import register_blueprint
from routes.login import auth_blueprint
from db import db, app
from mail import mail

CORS(app)

app.register_blueprint(favorites_blueprint)
app.register_blueprint(pets_blueprint)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = '467catdogadoption@gmail.com'
app.config['MAIL_PASSWORD'] = 'mtotpfevybagwnjb'
app.config['MAIL_DEFAULT_SENDER'] = '467catdogadoption@gmail.com'
app.config['SECRET_KEY'] = 'secretkey'

mail.init_app(app)

@app.route("/")
def home():
  return render_template('index.html')

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)