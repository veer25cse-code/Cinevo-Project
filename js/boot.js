/* runs last on every page: checks login, then draws the page */
const PGN=document.body.dataset.page,NEED={seats:'sel',checkout:'sel',detail:'movie',ticket:'last'};
let blocked=0;
if(PGN=='login'&&S.user){location.replace('home.html');blocked=1}
else if(PGN!='login'&&!S.user){location.replace('index.html');blocked=1}
else if(NEED[PGN]&&S[NEED[PGN]]==null){location.replace('home.html');blocked=1}
if(!blocked){render();pics()}
