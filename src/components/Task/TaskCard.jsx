import "./TaskCard.css";
//takes in the name of a person
//name of task
//and two times for start to finish
//both times require an hour number from 0 to 23 and minute from 0 to 59
export default function TaskCard({
  person_name,
  task,
  startHour,
  startMinute,
  endHour,
  endMinute,
}) {
  return (
    <div className="task-card">
      <h3 className="task-intro">
        {"Here is your next task, "}
        <span className="person-name">{person_name}</span>
      </h3>
      <h2 className="task-name">{task}</h2>
      <div className="task-time-container">
        <h4 className="task-time">
          Starts At:
          <span className="time">{TimeToString(startHour, startMinute)}</span>
        </h4>
        <h4 className="task-time">
          End At:
          <span className="time">{TimeToString(endHour, endMinute)}</span>
        </h4>
      </div>
    </div>
  );
}

//helper for getting hour number and minute number and formatting into AM/PM time string
function TimeToString(hour, minute) {
  //format hour into 12 hour format, if newHour is 0, turn it into 12

  let newHour = hour % 12 === 0 ? 12 : hour % 12;

  //get time period based on 12 hour
  let timePeriod = hour < 12 ? "AM" : "PM";

  //add 0 to new minute if lower than 10
  let newMinute = (minute < 10 ? "0" : "") + minute;
  return `${newHour}:${newMinute} ${timePeriod}`;
}
