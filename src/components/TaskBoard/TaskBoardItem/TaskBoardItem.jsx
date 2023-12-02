import "./TaskBoardItem.css";
export default function TaskBoardItem({
  name,
  task,
  startHour,
  startMinute,
  endHour,
  endMinute,
}) {
  return <div className="taskboard-item">
    <div>{name}</div>
    <div>{task}</div>
    <div>{TimeToString(startHour, startMinute)}</div>
    <div>{TimeToString(endHour, endMinute)}</div>

  </div>;
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
