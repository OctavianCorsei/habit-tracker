from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.attributes import flag_modified 
from datetime import datetime, date

app = Flask(__name__)
CORS(app) #this allows requests from the react frontend

#set up SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///habits.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Habit(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    frequency = db.Column(db.String, nullable=False)
    streak = db.Column(db.Integer, default=0)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    check_ins = db.Column(db.JSON, default=list)  # optional, for check-ins

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "frequency": self.frequency,
            "streak": self.streak,
            "dateCreated": self.date_created.isoformat() if self.date_created else None,
            "checkIns": self.check_ins
        }

#placeholder habits date
habits = []

@app.route("/habits", methods=["GET"])
def get_habits():
    habits = Habit.query.all()
    return jsonify([habit.to_dict() for habit in habits])

@app.route("/habits", methods=["POST"])
def add_habit():
    data = request.json
    habit = Habit(
        id=data["id"],
        name=data["name"],
        frequency=data["frequency"],
        streak=data.get("streak", 0),
        check_ins=[]
    )
    db.session.add(habit)
    db.session.commit()
    return jsonify(habit.to_dict()), 201

@app.route("/habits/<habit_id>/checkin", methods=["POST"])
def checkin_habit(habit_id):
    habit = db.session.get(Habit, habit_id)
    if not habit:
        return jsonify({"error": "Habit not found"}), 404

    today = date.today().isoformat()

    if habit.check_ins is None:
        habit.check_ins = []
    
    if today in habit.check_ins:
        return jsonify({"message": "already done today"}), 200
    
    habit.check_ins.append(today)
    print(f"added {habit.check_ins}")
    flag_modified(habit, "check_ins")
    db.session.commit()

    return jsonify(habit.to_dict()), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)