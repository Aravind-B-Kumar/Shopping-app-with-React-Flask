from flask import Flask, jsonify,  request#, session
from flask_cors import CORS
#from flask_session import Session
import random
import string
from database import MySqlDB


db = MySqlDB()

app = Flask(__name__) # directory name (built in variable for the currect module)
CORS(app,supports_credentials=True)  # corss policy violation
#server_session = Session(app)

@app.route("/homedata")
def homedata():
    return ...

# @app.route("/@me")
# def get_current_user():
#     uid = session.get("user_id")

#     if not uid:
#         return jsonify({"error": "Unauthorized"}), 401
    
#     uid,email = db.fetchone("SELECT id,email FROM USERS")
#     return jsonify({
#         "id": uid,
#         "email": email
#     }) 

@app.route('/loginUser',methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    if not email or not password:
        return jsonify({"message": "Some mandatory fields need to be filled"}),400

    check = db.fetchone("SELECT uid FROM login WHERE email=%s and password=%s",email,password)

    if not check:
        return jsonify({"message": "Email or password is incorrect"}),400
    
    return jsonify({"message": "login success"}),200


@app.route('/registerUser',methods=['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    repassword = request.json["repassword"]

    check = db.fetchone("SELECT * FROM login WHERE email=%s",email)
    if check:
        return jsonify({"message": "This Email is already registered!"}),400

    if password!=repassword:
        return jsonify({"message": "Passwords does not match!"}),400
    
    db.execute("INSERT INTO login(email,password) VALUES(%s,%s)",email,password)
    return jsonify({"message": "Account Registered successfully."}),200
    

    


if __name__ == "__main__":
    app.run(debug=True)