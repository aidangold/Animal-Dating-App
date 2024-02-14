from flask import Flask, render_template
from routes.favorites import favorites_blueprint
from routes.pets import pets_blueprint
from routes.register import register_blueprint
from routes.login import login_blueprint
from db import db, app

app.register_blueprint(favorites_blueprint)
app.register_blueprint(pets_blueprint)
app.register_blueprint(register_blueprint)
app.register_blueprint(login_blueprint)

@app.route("/")
def home():
  return render_template('index.html')

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)