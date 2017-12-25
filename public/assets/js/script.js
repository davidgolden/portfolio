document.getElementById('titlePage').style.height = window.innerHeight+'px';

// *********** Start NavBar Script ***************
var navBar = document.getElementsByTagName('nav')[0];
var scrollIcon = document.getElementById('scrollIcon');
var mobileNavOpen = false;
var scrollDown = false;
var navLink = document.getElementsByClassName('navLink');
let navIcons = document.getElementById('mobileIcons');
var isSmall;

function turnOnMobile() {
	navBar.classList.remove('normalNav');
	navBar.classList.add('navOnScroll');
	navIcons.style.display='block';
}

function turnOffMobile() {
	navBar.classList.remove('navOnScroll');
	navBar.classList.add('normalNav');
	navBar.classList.remove('mobileNav');
	navIcons.style.display='none';
}

// function checkY(y) {
// 	if(window.scrollY > (y*.25)) {
// 		turnOnMobile();
// 		scrollDown = true;
// 	}
// 	// When you scroll up, turn off mobile
// 	else if(isSmall == false) {
// 		turnOffMobile();
// 		scrollDown = false;
// 	}
// }

function checkX(x) {
	if(x <= 960) {
		turnOnMobile();
		isSmall = true;
	}
	else {
		turnOffMobile();
		isSmall = false;
	}
}

// Find screen size, turn on mobile if applicable
window.addEventListener('load', function() {
	checkX(window.innerWidth);
})

// When you scroll down, turn on mobile
window.addEventListener('scroll', function() {
	checkY(window.innerHeight);
});
// When screen is resized, find out size, then turn on mobile if applicable
window.addEventListener('resize', function() {
	//resize background image
	document.getElementById('titlePage').style.height = window.innerHeight+'px';
	checkX(window.innerWidth);
	if(scrollDown == true) {
		checkY(window.innerHeight);
	}
})

// On click of hamburger icon
scrollIcon.addEventListener('click', function() {
	// If mobileNav is closed, open it
	if(mobileNavOpen == false) {
		navBar.classList.add('mobileNav');
		mobileNavOpen = true;
	}
	// If mobileNav is open, close it
	else {
		navBar.classList.remove('mobileNav');
		mobileNavOpen = false;
	}
})

for(var i=0; i<navLink.length; i++) {
	navLink[i].addEventListener('click', function() {
		navBar.classList.remove('mobileNav');
		mobileNavOpen = false;
		checkY(window.innerHeight);
	})
}
// *********** End NavBar Script ***************


// *********** Start Portfolio Script ***************

var projects = [
	{
		name: "recipe-cloud",
		imgURL: "assets/images/recipebook.png",
		link: "http://www.recipe-cloud.com",
		desc: "<h3>Recipe Cloud</h3> <br> Recipe App for storing and sharing recipes and autopopulating grocery lists. Recipe URL image scraping, automatic totaling and converting of ingredient quantities/measurements, filter recipes by tags, browse others' recipes and add them to your recipe book, and edit just about anything!",
		tags: ["HTML", "CSS", "JS", "NodeJS", "Express", "MongoDB", "Bootstrap"]
	},
	{
		name: "tfc",
		imgURL: "assets/images/tfc.png",
		link: "http://www.david-golden.com/TFC2",
		desc: "<h3>Table to Farm Compost</h3> <br> This website for my curbside composting company prompts users to enter their address and immediately assigns them a pick up day using Google Maps API. There is a user dashboard for customers to update their payment information, address, or request compost, and an admin dashboard for monitoring all customer details.",
		tags: ["HTML", "CSS", "JS", "Google Maps API", "Stripe API", "NodeJS", "Express", "MongoDB"]
	},
	{
		name: "portfolio",
		imgURL: "assets/images/profilesite.png",
		desc: "<h3>This Site!</h3><br>It's nothing super fancy, but I built this website using entirely vanilla CSS (including CSS Grid) and JS without the use of any frameworks.",
		tags: ["HTML", "CSS", "JS"]
	}
];

var displayProject = document.getElementById('displayProject');
var displayImage = document.getElementsByClassName('item-image')[0];
var displayDesc = document.getElementsByClassName('item-desc')[0];
var displayTags = document.getElementsByClassName('item-tags')[0];
var nextProject = document.getElementsByClassName('fa-chevron-right')[0];
var lastProject = document.getElementsByClassName('fa-chevron-left')[0];
var currentProject = 0;

showProject(currentProject);

lastProject.addEventListener('click', function() {
	displayLastProject();
})

nextProject.addEventListener('click', function() {
	displayNextProject();
})

function showProject(currentProject) {
	displayImage.innerHTML = "<a href='"+projects[currentProject].link+"'target='_blank'><img src='"+projects[currentProject].imgURL+"'></a>";
	displayDesc.innerHTML = `<p>${projects[currentProject].desc}</p>`;
	displayTags.innerHTML = "";
	for(var i = 0; i<projects[currentProject].tags.length; i++) {
		displayTags.innerHTML += "<span>"+projects[currentProject].tags[i]+"</span>";
	}
}

function displayNextProject() {
	// add 1 to currentproject
	currentProject++;
	// if currentproject is > projects.length-1, reset back to 0, then display project
	if(currentProject > projects.length-1) {
		currentProject =0;
		showProject(currentProject);
	}
	// if not, display project
	else {
		showProject(currentProject);
	}
}

function displayLastProject() {
	// subtract 1 from currentproject
	currentProject--;
	// if current project < project.length-project.length, reset to currentproject.length-1
	if(currentProject < 0) {
		currentProject = projects.length-1;
		showProject(currentProject);
	}
	//if not, display project
	else {
		showProject(currentProject);
	}
	
}
