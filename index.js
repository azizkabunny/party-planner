// CONSTANTS
const BASE = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api';
const COHORT = '/2603-FTB-CT-WEB-PT';
const RESOURCE = '/events';
const API = BASE + COHORT + RESOURCE;

console.log('API', API);

let events = [];
let selectedEvent;

async function getAllEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error('Error fetching all events', error);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + '/' + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (error) {
    console.error('Error fetching event', error);
  }
}

// COMPONENTS
function EventListItem(event) {
  const $li = document.createElement('li');
  if (event.id === selectedEvent?.id) {
    $li.classList.add('selected');
  }
  $li.innerHTML = `
  <a href="#selected">${event.name}</a>`;
  $li.addEventListener('click', () => getEvent(event.id));
  return $li;
}

function EventList() {
  const $ul = document.createElement('ul');
  $ul.classList.add('events');

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

function SelectedEvent() {
  if (!selectedEvent) {
    const $p = document.createElement('p');
    $p.classList.add('message');
    $p.textContent = 'Please select an event..';
    return $p;
  }

  const $event = document.createElement('section');
  $event.classList.add('selected-event');
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <time datetime="${selectedEvent.date}">
      ${selectedEvent.date.slice(0, 10)}
    </time>
    <address>${selectedEvent.location}</address>
    <p>${selectedEvent.description}</p>
    <GuestList></GuestList>
  `;

  return $event;
}

function render() {
  const $app = document.querySelector('#app');
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
  <section>
  <h2>Upcoming Events</h2>
  <EventList></EventList>
  </section>
  <section id="selected">
  <SelectedEvent></SelectedEvent>
  </section>
  </main>
  `;
  // const list = document.createElement('list');
  // const section = document.createElement('section');
  $app.querySelector('EventList').replaceWith(EventList());
  $app.querySelector('SelectedEvent').replaceWith(SelectedEvent());
}

async function init() {
  await getAllEvents();
  render();
}

init();
