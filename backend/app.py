import os
from dotenv import load_dotenv

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

def configure_app(app):
   load_dotenv()
   connection_string = os.getenv('NEON_POSTGRES_CONNECTION_STRING')
   app.config["SQLALCHEMY_DATABASE_URI"] = connection_string

app = Flask(__name__)
configure_app(app)
db = SQLAlchemy(app)

@app.route("/")
def home():
  users = []
  query = text("SELECT id, name FROM adopt_user")
  result = db.session.execute(query)

  for row in result:
    user_data = {"id": row.id, "name": row.name}
    users.append(user_data)

  return jsonify(users)

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
