const CALENDAR_LOCAL_KEY = "calendar.appointment";

const calendarForm = document.querySelector("#addCalendar"),
    calendarOutput = document.querySelector("table");

let calendar = JSON.parse(localStorage.getItem(CALENDAR_LOCAL_KEY));

if (calendar == null) {
  localStorage.setItem(CALENDAR_LOCAL_KEY, "[]");
  JSON.parse(localStorage.getItem(CALENDAR_LOCAL_KEY));
}

const updateCalendar = () => {
  calendarOutput.innerHTML = `<thead><th>Name</th><th>Date</th><th>Time</th></thead>`;
  
  calendar.forEach((event) => {
    if (new Date(`${event.date} ${event.time}`) >= new Date()) {
      calendarOutput.innerHTML += `<tr id="${event.id}"><td>${event.event}</td>
                       <td>${event.date}</td>
                       <td>${event.time}</td>
                       <td class="delete" onclick="deleteCalendar(this.parentElement.id)">delete</td></tr>`;
    }
  });
};

const generateId = (length) => {
   let result           = '';
   const characters     = '0123456789abcdef';
   const charsLength    = characters.length;
   
   for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charsLength));
   }

   return result;
};

const deleteCalendar = (id) => {
  console.log(id);

  const finalCalendar = calendar.filter(cal => {
    return cal.id != id
  });

  localStorage.setItem(CALENDAR_LOCAL_KEY, JSON.stringify(finalCalendar));
  updateCalendar();
}

document.addEventListener("DOMContentLoaded", updateCalendar);

calendarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  calendar.push({
    id: generateId(25),
    event: event.target.event.value,
    date: event.target.date.value,
    time: event.target.time.value
  });

  localStorage.setItem(CALENDAR_LOCAL_KEY, JSON.stringify(calendar));
  updateCalendar();
  [event.target.event.value,
   event.target.date.value,
   event.target.time.value] = ["", "", ""];

   event.target.event.focus();
});