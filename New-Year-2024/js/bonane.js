/* Main bonane JS */

/**
 * launch carousel
 */
function launchCarousel(){
    $('#quote-carousel').carousel({
        pause: true,
        interval: 4000,
    });
}

$(document).ready(function () {
    launchCarousel();
});

/**
 * Github base_url for user github profile
 *
 * @type {string}
 */
const baseUrl = 'https://github.com/';

/**
 * Get last year
 *
 * @type {number}
 */
let gasyYear = new Date().getFullYear();

/**
 * Set date inside html page
 *
 * @type {number}
 */
document.querySelector('#year').innerText = gasyYear;
document.title += ` | ${gasyYear}`;

/**
 * Format the user message
 *
 * @param {string} message
 *
 * @returns {string}
 */
function formatMessage(message) {
    return message ? message.replace('{{YEAR}}', gasyYear) : `Ilham apriansyah ${gasyYear} !`;
}

/**
 * Check slide active by key i
 *
 * @param {number} i
 *
 * @returns {string}
 */
function isActive(i) {
    return i === 0 ? 'active' : ''
}

/**
 * Check the user image and change if not exist
 *
 * @param {string} image filename
 *
 * @returns {string}
 */
function checkImage(image) {
    return image ?? 'https://i.pinimg.com/originals/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.png';
}

/**
 * Check the username
 *
 * @param {string} name
 *
 * @returns {string}
 */
function checkName(name) {
    return name ?? 'From Indonesian';
}

/**
 * Check user github link
 *
 * @param link
 *
 * @returns {string}
 */
function checkGithub(link) {
    return link ? (baseUrl + link) : 'https://github.com/';
}

/**
 *
 * @param nous {$ObjMap}
 *
 * @returns {string}
 */
function getFlag(nous) {
    return nous.flag ?? 'id';
}

// Fetch json file
$.getJSON('USER.json', function (elements) {
    elements.forEach(function (nous, i) {
        document.getElementById('carousel-indicators').innerHTML += `
              <li data-target="#quote-carousel" data-slide-to="${i}" class="${isActive(i)}" title="${checkName(nous.name)}">
                <img src="${checkImage(nous.image)}" alt="">
              </li>`

        document.getElementById('name').innerHTML += `
            <div class="item ${isActive(i)}">
               <blockquote>
                  <div class="row">
                       <div class="col-sm-3 text-center">
                           <img class="img-circle" src="${checkImage(nous.image)}" style="width: 100px;height:100px;">
                       </div>
                        <div class="col-sm-9">
                            <p>${formatMessage(nous.message)}</p>
                            <div class="row">
                                <small>
                                    ${checkName(nous.name)}
                                    <a href="${checkGithub(nous.username)}" target="_blank" 
                                    style="color: #f9f9f9;margin: 5px">
                                    <i class="fa fa-github"></i>
                                    <i class="flag-icon flag-icon-${getFlag(nous)}"></i>
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
               </blockquote>
            </div>`
    })
})
