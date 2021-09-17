// const upcomingEventsContainer = document.querySelector('#upcoming-events');
const learningProgramsContainer = document.querySelector('#learning-programs');
const bootCampsContainer = document.querySelector('#bootcamps'); 
const communityEventsContainer = document.querySelector('#community-events'); 
const achievementsContainer = document.querySelector('#achievements'); 

function setLoading(container) {
    container.innerHTML = '<div class="flex justify-center mt-5" id="loader"><img src="img/loading.gif" alt="loading" class="w-5 h-5"></div>';
}

function fetchEvents(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'events/events.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function loadEvents(events_string, container, type) {
    const events = JSON.parse(events_string);
    if(events) {
        container.innerHTML = '';
        events[type].forEach((event) => {
            const more_info = (event.more_info) ? `
            <a href="${event.more_info}" target="_blank">
                <div class="flex justify-end text-yellow-500">
                <span>More Info</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                </div>
            </a>
            ` : '';
            const eventCard = `
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="flex flex-col justify-between bg-gray-100 p-6 rounded-lg h-full">
                <div>
                    <img class="h-40 rounded w-full object-cover object-center mb-6" src="events/assets/${event.image}" alt="content">
                    <h3 class="tracking-widest text-yellow-500 text-xs font-medium title-font">${event.date}</h3>
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-4">${event.title}</h2>
                    <p class="leading-relaxed text-base">${event.description}</p>
                </div>
                <div class="container">
                    ${more_info}
                </div>
                </div>
              </div>
            </div>
            `;
            container.innerHTML += eventCard;
        });
    }
}

fetchEvents((event_string)=>{
    // loadEvents(event_string, upcomingEventsContainer, 'upcoming');
    loadEvents(event_string, learningProgramsContainer, 'learning_programs');
    loadEvents(event_string, bootCampsContainer, 'bootcamps');
    loadEvents(event_string, communityEventsContainer, 'community_events');
    loadEvents(event_string, achievementsContainer, 'achievements');
});