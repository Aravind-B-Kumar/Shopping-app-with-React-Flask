from flask import Flask, jsonify,  request,session, g
from flask_cors import CORS
from flask_session import Session
from database import MySqlDB
from urllib.parse import unquote
import secrets,random

db = MySqlDB()

app = Flask(__name__) 
app.config['SECRET_KEY'] = secrets.token_urlsafe(32) 
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

CORS(app, supports_credentials=True)

@app.route("/homedata")
def homedata():
    data = db.fetchall("SELECT * FROM data") # list [list[1,"dsds", ...],.. ]
    random.shuffle(data)
    return data

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



# @app.before_request
# def before_request():
#     g.user=None
#     if 'user' in session:
#         g.user=session['user']

@app.route('/set/<string:email>',methods=["POST","GET"])
def set_session(email:str):
    uid,email,password=db.fetchone("select uid,email,password from users where email=%s",email)
    session["user"] = {}
    session["user"]["uid"]=uid
    session["user"]["email"]=email
    session["user"]["password"]=password
    print(session)
    return jsonify(session)

@app.route("/dropSession")
def drop_session():
    session.pop("user",None)
    return jsonify(session)

@app.route("/get")
def _getdata():
    #print(session)
    return jsonify(session) 

@app.route('/loginUser',methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    if not email or not password:
        return jsonify({"message": "Some mandatory fields need to be filled"}),400

    check = db.fetchone("SELECT uid FROM users WHERE email=%s and password=%s",email,password)

    if not check:
        return jsonify({"message": "Email or password is incorrect"}),400
    
    
    return jsonify({"message": "login success"}),200


@app.route('/registerUser',methods=['POST'])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    repassword = request.json["repassword"]

    check = db.fetchone("SELECT * FROM users WHERE email=%s",email)
    if check:
        return jsonify({"message": "This Email is already registered!"}),400

    if password!=repassword:
        return jsonify({"message": "Passwords does not match!"}),400
    
    db.execute("INSERT INTO users(email,password) VALUES(%s,%s)",email,password)
    return jsonify({"message": "Account Registered successfully."}),200
    

    
@app.route('/product/<path:title>', methods=['GET'])
def product_detail(title):
    product = db.fetchone('SELECT * FROM data WHERE title=%s',unquote(title))
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    return jsonify({
        'id': product[0],
        'name': product[1],
        'price': product[2],
        'description': product[3],
        'category': product[4],
        'link': product[5],
        'rating': product[6],
        'ratingcount': product[7],
        'longdesc': product[8]
    })




@app.route("/addOrRemoveCartItem/<int:pid>", methods=['POST','GET'])
def cart_items(pid: int):
    #print(pid)
    #return jsonify(session)
    user = session.get("user")
    _id = db.fetchone("SELECT ID FROM CART_ITEMS WHERE UID=%s AND PID=%s",user["uid"],pid)
    
    if _id:
        db.execute("DELETE FROM CART_ITEMS WHERE ID=%s",_id[0])
        return jsonify({"message": "Item deleted"}),200
    else:
        db.execute("iNSERT INTO CART_ITEMS(UID,PID) VALUES(%s,%s)",user["uid"],pid)
        return jsonify({"message": "Item added"}),200

@app.route("/isInCart/<int:pid>", methods=['GET']) # to check if item in cart and set the button
def is_in_cart(pid: int):
    user = session.get("user")
    if not user:
        return jsonify({"error": "User session not found"}), 401

    _id = db.fetchone("SELECT ID FROM CART_ITEMS WHERE UID=%s AND PID=%s", user["uid"], pid)
    in_cart = _id is not None
    return jsonify({"inCart": in_cart})

@app.route('/cartItems', methods=['GET'])
def get_cart_items():
    user = session.get("user")
    if not user:
        return jsonify({"error": "User session not found"}), 401

    cart_items = db.fetchall("SELECT id, pid FROM CART_ITEMS WHERE uid=%s", user["uid"])
    
    products = []
    for item in cart_items: # item = [3,1]
        product = db.fetchone("SELECT * FROM data WHERE id=%s", item[1])
        if product:
            products.append(product)
                
    return jsonify(products), 200
    



@app.route('/getComments', methods=['GET'])
def get_comments():
    pid = request.args.get('productId')
    if not pid:
        return jsonify({"error": "Product ID is required"}), 400

    try:
        comments = db.fetchall("SELECT UNAME,COMMENT FROM COMMENTS WHERE PID=%s",pid)
        print(comments)
        return jsonify(comments),200
    except  Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/setComment', methods=['POST']) 
def set_comment():
    try:
        pid = request.json.get('productId') 
        comment = request.json.get('comment')
        uid = session.get("user")["uid"]
        uname = session.get("user")["email"]

        if not pid or not comment or not uid or not uname: 
            return jsonify({"error": "Missing required fields"}), 400

        db.execute("INSERT INTO COMMENTS(PID,UID,UNAME,COMMENT) VALUES(%s,%s,%s,%s)",pid,uid,uname,comment)
        return jsonify({"message": "Comment added","uname":uname}),200
    except Exception as e:
        return jsonify({'error': e}), 400


if __name__ == "__main__":
    app.run(debug=True)