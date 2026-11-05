/* ================= DATA ================= */
const LOGO='<svg class="lgo" viewBox="0 0 100 100"><circle class="rg" cx="50" cy="50" r="46" stroke-width="2.5" style="fill:none;stroke:url(#lgG)"/><circle class="rm" cx="50" cy="50" r="37" stroke-width="1" stroke-dasharray="2 5" opacity=".6" style="fill:none;stroke:var(--g2)"/><circle class="cr" cx="50" cy="50" r="28" style="fill:url(#lgG);stroke:none"/><path class="pl" d="M45 38l19 12-19 12z" style="fill:#fff;stroke:#fff;stroke-width:3;stroke-linejoin:round"/><g class="od"><circle cx="50" cy="4" r="3.6" style="fill:#fff;stroke:none"/></g></svg>',$=s=>document.querySelector(s),app=$('#app'),J=a=>a.join('');
const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const ico=d=>`<svg class="ic" viewBox="0 0 24 24">${d}</svg>`,IC={home:ico('<path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/>'),film:ico('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>'),ticket:ico('<path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/>'),user:ico('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),search:ico('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),eye:ico('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),eyeoff:ico('<path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6 0 10 7 10 7a17 17 0 01-3.2 4M6.4 6.4A17 17 0 002 12s4 7 10 7a9.7 9.7 0 004-.9"/>'),bag:ico('<path d="M5 8h14l-1 12H6zM9 8a3 3 0 016 0"/>')};
const rw=t=>t.split(' ').map((w,i)=>`<span style="--i:${i}">${w}</span>`).join(' ');
const IMG={}; // optional poster URLs, e.g. IMG['Dune: Part Two']='https://.../poster.jpg'
const CITIES=['Rewari City','Rewari – Model Town','Rewari – Delhi Road','Rewari – Bus Stand','Bawal','Dharuhera','Bhiwadi','Manesar','Narnaul','Mahendragarh','Jhajjar','Gurugram – Sector 29','Gurugram – Cyber Hub','Gurugram – Sohna Road','Gurugram – MG Road','Faridabad – Sector 15','Palwal','Delhi – Connaught Place','Delhi – Saket','Delhi – Dwarka','Delhi – Rohini','Delhi – Karol Bagh','Delhi – Lajpat Nagar','Delhi – Janakpuri','Delhi – Pitampura','Noida – Sector 18','Noida – Sector 62','Greater Noida – Pari Chowk','Ghaziabad – Indirapuram','Ghaziabad – Vaishali','Sonipat','Rohtak','Panipat'],LM=['Main Market','Delhi Road','Model Town','Civil Lines','Railway Road','City Centre Mall','Sector Market','Bus Stand Road'];
const M=`Singham Again|Hindi|Action/Drama|2024|144|4.2|Ajay Devgn, Kareena Kapoor Khan, Ranveer Singh, Akshay Kumar
Stree 2|Hindi|Horror/Comedy|2024|149|4.5|Shraddha Kapoor, Rajkummar Rao, Pankaj Tripathi
Bhool Bhulaiyaa 3|Hindi|Horror/Comedy|2024|158|4.0|Kartik Aaryan, Vidya Balan, Triptii Dimri
Jawan|Hindi|Action/Thriller|2023|169|4.4|Shah Rukh Khan, Nayanthara, Vijay Sethupathi
Pathaan|Hindi|Action/Thriller|2023|146|4.2|Shah Rukh Khan, Deepika Padukone, John Abraham
Animal|Hindi|Action/Crime|2023|201|4.1|Ranbir Kapoor, Bobby Deol, Rashmika Mandanna
Dangal|Hindi|Drama/Sports|2016|161|4.8|Aamir Khan, Fatima Sana Shaikh, Sanya Malhotra
3 Idiots|Hindi|Comedy/Drama|2009|170|4.9|Aamir Khan, R. Madhavan, Sharman Joshi
Fighter|Hindi|Action/Drama|2024|166|4.0|Hrithik Roshan, Deepika Padukone, Anil Kapoor
War|Hindi|Action/Thriller|2019|156|4.2|Hrithik Roshan, Tiger Shroff, Vaani Kapoor
Tiger 3|Hindi|Action/Thriller|2023|155|3.8|Salman Khan, Katrina Kaif, Emraan Hashmi
Gadar 2|Hindi|Action/Drama|2023|170|3.9|Sunny Deol, Ameesha Patel, Utkarsh Sharma
Kabir Singh|Hindi|Romance/Drama|2019|172|3.9|Shahid Kapoor, Kiara Advani
Brahmastra|Hindi|Fantasy/Adventure|2022|167|3.9|Ranbir Kapoor, Alia Bhatt, Amitabh Bachchan
Rocky Aur Rani Kii Prem Kahaani|Hindi|Romance/Comedy|2023|168|4.1|Ranveer Singh, Alia Bhatt, Dharmendra
Bajrangi Bhaijaan|Hindi|Drama/Comedy|2015|159|4.7|Salman Khan, Kareena Kapoor Khan, Nawazuddin Siddiqui
Chennai Express|Hindi|Comedy/Romance|2013|141|4.0|Shah Rukh Khan, Deepika Padukone
Zindagi Na Milegi Dobara|Hindi|Comedy/Drama|2011|155|4.7|Hrithik Roshan, Farhan Akhtar, Katrina Kaif
Drishyam 2|Hindi|Thriller/Crime|2022|140|4.5|Ajay Devgn, Tabu, Akshaye Khanna
Chhaava|Hindi|History/Action|2025|161|4.3|Vicky Kaushal, Rashmika Mandanna, Akshaye Khanna
Sky Force|Hindi|Action/War|2025|125|4.0|Akshay Kumar, Veer Pahariya, Sara Ali Khan
Pushpa 2: The Rule|Hindi|Action/Drama|2024|201|4.3|Allu Arjun, Rashmika Mandanna, Fahadh Faasil
Laapataa Ladies|Hindi|Comedy/Drama|2024|122|4.6|Nitanshi Goel, Pratibha Ranta, Sparsh Shrivastava
Dhoom 3|Hindi|Action/Thriller|2013|172|3.8|Aamir Khan, Katrina Kaif, Abhishek Bachchan
12th Fail|Hindi|Drama/Biography|2023|147|4.8|Vikrant Massey, Medha Shankar
Dune: Part Two|English|Sci-Fi/Adventure|2024|166|4.7|Timothée Chalamet, Zendaya, Rebecca Ferguson
Oppenheimer|English|Drama/History|2023|180|4.7|Cillian Murphy, Emily Blunt, Robert Downey Jr.
Barbie|English|Comedy/Fantasy|2023|114|4.0|Margot Robbie, Ryan Gosling
Avatar: The Way of Water|English|Sci-Fi/Adventure|2022|192|4.4|Sam Worthington, Zoe Saldaña, Sigourney Weaver
Inception|English|Sci-Fi/Thriller|2010|148|4.8|Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page
Interstellar|English|Sci-Fi/Drama|2014|169|4.8|Matthew McConaughey, Anne Hathaway, Jessica Chastain
The Dark Knight|English|Action/Crime|2008|152|4.9|Christian Bale, Heath Ledger, Aaron Eckhart
Avengers: Endgame|English|Action/Sci-Fi|2019|181|4.7|Robert Downey Jr., Chris Evans, Scarlett Johansson
Spider-Man: No Way Home|English|Action/Adventure|2021|148|4.5|Tom Holland, Zendaya, Benedict Cumberbatch
Top Gun: Maverick|English|Action/Drama|2022|130|4.6|Tom Cruise, Miles Teller, Jennifer Connelly
John Wick: Chapter 4|English|Action/Thriller|2023|169|4.3|Keanu Reeves, Donnie Yen, Bill Skarsgård
Mission: Impossible – Dead Reckoning|English|Action/Thriller|2023|163|4.3|Tom Cruise, Hayley Atwell, Ving Rhames
Deadpool & Wolverine|English|Action/Comedy|2024|128|4.4|Ryan Reynolds, Hugh Jackman, Emma Corrin
Joker|English|Crime/Drama|2019|122|4.4|Joaquin Phoenix, Robert De Niro, Zazie Beetz
Inside Out 2|English|Animation/Family|2024|96|4.3|Amy Poehler, Maya Hawke, Kensington Tallman
Gladiator II|English|Action/History|2024|148|4.0|Paul Mescal, Pedro Pascal, Denzel Washington
Fast X|English|Action/Adventure|2023|141|3.7|Vin Diesel, Jason Momoa, Michelle Rodriguez
The Batman|English|Action/Crime|2022|176|4.4|Robert Pattinson, Zoë Kravitz, Paul Dano
Mad Max: Fury Road|English|Action/Sci-Fi|2015|120|4.6|Tom Hardy, Charlize Theron, Nicholas Hoult
Jurassic World Dominion|English|Adventure/Sci-Fi|2022|147|3.5|Chris Pratt, Bryce Dallas Howard, Laura Dern
Wicked|English|Musical/Fantasy|2024|160|4.4|Cynthia Erivo, Ariana Grande, Jonathan Bailey
Godzilla x Kong: The New Empire|English|Action/Sci-Fi|2024|115|3.8|Rebecca Hall, Brian Tyree Henry, Dan Stevens
Kung Fu Panda 4|English|Animation/Comedy|2024|94|4.0|Jack Black, Awkwafina, Viola Davis
Furiosa: A Mad Max Saga|English|Action/Adventure|2024|148|4.2|Anya Taylor-Joy, Chris Hemsworth
Tenet|English|Sci-Fi/Action|2020|150|4.2|John David Washington, Robert Pattinson, Elizabeth Debicki`.split('\n').map((l,i)=>{const[t,lg,g,y,d,r,c]=l.split('|');return{id:i,t,lg,g:g.split('/'),y:+y,d:+d,r:+r,c:c.split(', '),soon:i%5==4,fm:['2D','IMAX 2D','IMAX 3D','4DX','2D • ATMOS','4K ATMOS'][i%6]}});
const GD={Action:'A high-octane mission where one fearless hero must stop an unstoppable threat before time runs out.',Horror:'Something ancient is awake, and a small town is about to learn that laughing is the only defence.',Comedy:'A feel-good ride packed with big laughs, bigger hearts and a few gloriously chaotic surprises.',Drama:'A deeply human story of ambition, sacrifice and the people who shape who we become.',Romance:'Two lives collide, sparks fly, and love turns out to be anything but simple.','Sci-Fi':'A visionary journey beyond the edge of the known world, where the future is stranger than imagined.',Thriller:'Every clue leads deeper into a web of secrets, and nobody can be trusted.',Crime:'A ruthless underworld, a relentless chase and a moral line that keeps moving.',Fantasy:'A dazzling world of magic and myth, where destiny is a choice.',Animation:'Colourful, clever and full of heart, a story for every age.',History:'An epic retelling of courage and conquest from the pages of history.',Musical:'Spectacle, song and soul in a story that lifts the whole theatre.',Adventure:'An unforgettable expedition across wild frontiers and impossible odds.',War:'Duty, brotherhood and sacrifice in the skies and on the ground.',Sports:'Underdogs, discipline and the fight to make a nation proud.',Family:'Warm, funny and made for the whole family.',Biography:'The true story of an ordinary person who refused to give up.'};
const CAT={Blockbusters:m=>m.r>=4.4,'Heritage Screen':m=>m.y<=2016,IMAX:m=>m.fm.includes('IMAX'),Bollywood:m=>m.lg=='Hindi',Hollywood:m=>m.lg=='English'};
const CT=[['PVR ICON','Dolby Atmos • 4K Laser • Recliner',150,'Phoenix Mall'],['INOX Megaplex','IMAX with Laser • Luxe Lounge',130,'City Centre'],['Cinépolis','4DX • VIP Butler Service',120,'Metro Plaza'],['Heritage Talkies','Single Screen • Grand Balcony • Vintage Concessions',70,'Old Town',1],['Carnival Cinemas','Dolby 7.1 • Gold Class',110,'Central Mall'],['Miraj Cinemas','Atmos • Recliner Lounge',100,'Station Road']];
const TT=['10:30 AM','01:45 PM','05:15 PM','08:45 PM','11:15 AM','02:30 PM','06:15 PM','09:45 PM','12:15 PM','03:45 PM','07:30 PM','10:45 PM'];
const DAY=['SUN','MON','TUE','WED','THU','FRI','SAT'],MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const TIER={A:'r',B:'r',C:'g',D:'g',E:'g',F:'s',G:'s'};
const ROWS=[['A','PREMIUM RECLINER','r',6],['B','','r',6],['C','GOLD CLASS','g',8],['D','','g',8],['E','','g',8],['F','SILVER CLASS','s',8],['G','','s',8]];
const FB=[['Caramel Popcorn Tub',220,1],['Peri Peri Fries',180],['Cold Coffee',160],['Combo for 2 (Popcorn + 2 Drinks)',450]];
/* ================= STATE & HELPERS ================= */
const S=Object.assign({user:null,city:'Rewari City',coupon:false,wish:[],bk:[],wallet:0,rates:{}},L('cv',{}));
if(!CITIES.includes(S.city))S.city=CITIES[0];
Object.assign(S,{page:document.body.dataset.page||'home',mode:'in',hi:0,q:'',tab:'now',g:'All',cat:'Blockbusters',date:0,sel:null,seats:[],pm:'upi',v:'',fbq:{}});
const save=()=>localStorage.setItem('cv',JSON.stringify({user:S.user,city:S.city,coupon:S.coupon,wish:S.wish,bk:S.bk,wallet:S.wallet,rates:S.rates}));
const H=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const R=s=>{let a=H(s);return()=>{a=Math.imul(a^a>>>15,a|1);a^=a+Math.imul(a^a>>>7,a|61);return((a^a>>>14)>>>0)/4294967296}};
let TM,HT;const clr=()=>{clearInterval(TM);clearInterval(HT)};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('on'),2600)};
function confetti(x=innerWidth/2,y=innerHeight/3){for(let i=0;i<3;i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${x}px;top:${y}px;animation-delay:${i*.16}s`;document.body.append(e);setTimeout(()=>e.remove(),1600)}}
const mins=t=>{const[a,p]=t.split(' ');const[h,m]=a.split(':').map(Number);return(h%12+(p=='PM'?12:0))*60+m};
const D=i=>{const d=new Date();d.setDate(d.getDate()+i);return d};
const dl=i=>{const d=D(i);return(i?DAY[d.getDay()][0]+DAY[d.getDay()].slice(1).toLowerCase():'Today')+', '+d.getDate()+' '+MON[d.getMonth()][0]+MON[d.getMonth()].slice(1).toLowerCase()};
const dur=d=>Math.floor(d/60)+'h '+d%60+'m';
const cp=p=>S.coupon?Math.round(p*.85/5)*5:p;
const pr=p=>S.coupon?`<s>₹${p}</s>₹${cp(p)}`:`₹${p}`;
const minp=m=>150+10*(H(m.t)%5);
const cin=()=>CT.map((c,i)=>{const r=R(S.city+i),lm=LM[(H(S.city)+i*3)%LM.length],ar=S.city.split(' – ').pop();return{i,n:c[4]?ar+' '+c[0]:c[0]+': '+lm,a:lm+', '+S.city,d:(.5+r()*7.5).toFixed(1),base:c[2],f:c[1],h:!!c[4],fl:c[4]?['Matinee','Balcony','Heritage Box','Night Owl']:['Dolby 7.1','Atmos','4K Laser','Standard']}});
const shows=(c,m)=>{const r=R(S.city+c.i+m.id+S.date),n=new Date(),nm=n.getHours()*60+n.getMinutes();return TT.slice(c.i%3*4,c.i%3*4+4).map((t,i)=>{const q=r();return{i,t,fmt:c.fl[i],st:q<.18?'Almost Full':q<.42?'Fast Filling':'Available',past:S.date==0&&mins(t)<=nm}})};
const prices=c=>({r:Math.round(c.base*2.3/10)*10,g:Math.round(c.base*1.6/10)*10,s:c.base});
const cur=()=>{const m=M[S.sel.m],c=cin()[S.sel.c];return{m,c,s:shows(c,m)[S.sel.s]}};
const sp=id=>cp(prices(cur().c)[TIER[id[0]]]);
const bg=m=>{const h=H(m.t)%360;return IMG[m.t]?`url('${IMG[m.t].replace(/'/g,'%27')}') center 20%/cover`:`radial-gradient(circle at 75% 18%,hsl(${h} 75% 50%/.6),transparent 55%),linear-gradient(165deg,hsl(${h} 45% 24%),hsl(${(h+55)%360} 55% 6%))`};
const poster=m=>`<div class="poster" data-m="${m.id}" style="background:${bg(m)}">${IMG[m.t]?'':`<b>${m.t}</b>`}</div>`;
const hl=()=>M.filter(m=>!m.soon&&CAT[S.cat](m));
const heart=id=>`<button class="heart ${S.wish.includes(id)?'on':''}" data-id="${id}" onclick="wish(${id},event)">♥</button>`;
const mcard=(m,i=0)=>`<div class="mc rv" style="--d:${Math.min(i,10)}" onclick="book(${m.id})"><div class="pw2">${poster(m)}<span class="rb">★ ${m.r}</span><span class="fb">${m.fm}</span>${m.soon?'<span class="ff2">COMING SOON</span>':''}${heart(m.id)}</div><div class="mi"><h4>${m.t}</h4><p>${m.g.join(' • ')} • ${m.lg}</p><div class="ft2"><div><small>STARTS AT</small><b>${pr(minp(m))}</b></div><button class="btn sm" onclick="event.stopPropagation();book(${m.id})">${m.soon?'Notify':'Book'}</button></div></div></div>`;
/* ================= ROUTER ================= */
const PG={};
/* pages are separate files; go() saves the shared state, then opens the next page */
const TK=['mode','hi','q','tab','g','cat','date','sel','seats','pm','v','movie','hm','last','focus'];
try{Object.assign(S,JSON.parse(sessionStorage.getItem('cvs'))||{})}catch(e){}
if(S.last)S.last=S.bk.find(x=>x.id==S.last.id)||S.last;
const pageUrl=p=>p=='login'?'index.html':p+'.html';
function go(p,o){Object.assign(S,o||{});save();try{sessionStorage.setItem('cvs',JSON.stringify(Object.fromEntries(TK.map(k=>[k,S[k]]))))}catch(e){}clr();location.href=pageUrl(p)}
const toastNext=m=>{try{sessionStorage.setItem('cvt',m)}catch(e){}};
{const m=sessionStorage.getItem('cvt');if(m){sessionStorage.removeItem('cvt');setTimeout(()=>toast(m),700)}}
function render(){clr();const p=S.page,flow=['detail','seats','checkout','ticket'].includes(p);
app.innerHTML=p=='login'?pgLogin():(flow?'':hdr())+`<main class="wrap page">${PG[p]()}</main>`+(flow?'':nav()+`<footer class="site-extra"><a href="about.html">About Cinevo</a><a href="contact.html">Contact</a><a href="feedback.html">Feedback</a></footer>`);after(p)}
function after(p){reveal();if(p=='home')HT=setInterval(()=>{S.hi++;const e=$('#hero');if(e)e.innerHTML=heroH()},5500);
if(p=='ticket')qr();if(p=='checkout'){S.t=600;TM=setInterval(()=>{S.t--;const e=$('#tm');if(e)e.textContent=Math.floor(S.t/60)+':'+String(S.t%60).padStart(2,'0');if(S.t<=0){clr();toastNext('Seat lock expired');go('home')}},1000)}
if(p=='movies'&&S.focus){S.focus=0;setTimeout(()=>$('#q').focus(),200)}}
const hdr=()=>`<header class="hd"><div class="logo" onclick="go('home')">${LOGO}</div><select class="loc" onchange="S.city=this.value;S.sel=null;save();render()">${J(CITIES.map(c=>`<option value="${c}" ${c==S.city?'selected':''}>${c}</option>`))}</select><div class="sp"></div><button class="ib" onclick="go('movies',{focus:1})">${IC.search}</button><button class="av" onclick="go('profile')">${S.user.name[0].toUpperCase()}</button></header>`;
const nav=()=>`<nav class="nav">${J([['home',IC.home,'Home'],['movies',IC.film,'Movies'],['tickets',IC.ticket,'Tickets'],['profile',IC.user,'Profile']].map(n=>`<button class="${S.page==n[0]?'on':''}" onclick="go('${n[0]}')"><span>${n[1]}</span>${n[2]}</button>`))}</nav>`;
const bar=(t,back)=>`<div class="bar noprint"><button class="ib" onclick="${back}">←</button><h2>${t}</h2><button class="av" onclick="go('profile')">${S.user.name[0].toUpperCase()}</button></div>`;
/* ===== shared by several pages ===== */
const dateStrip=()=>`<div class="dates">${J([0,1,2,3,4,5,6].map(i=>{const d=D(i);return`<button class="dt ${S.date==i?'on':''}" onclick="S.date=${i};S.sel=null;render()"><small>${i?DAY[d.getDay()]:'TODAY'}</small><b>${d.getDate()}</b><small>${MON[d.getMonth()]}</small></button>`}))}</div>`;
const cCard=(c,m,g,i)=>`<div class="card cc rv ${c.h?'her':''}" style="--d:${i}"><div class="ch"><div><h3>${c.n}${c.h?'<span class="bdg">HERITAGE</span>':''}</h3><p class="mut">${c.a} • ${c.d} km away</p></div><div class="from">${c.h?'Balcony':'Starts'} from<b>${pr(c.base)}</b></div></div><p class="ft">✦ ${c.f}</p><div class="shows">${J(shows(c,m).map(s=>`<button class="sh ${s.past?'dis':''} ${s.st=='Almost Full'?'af':s.st=='Fast Filling'?'ff':''} ${S.sel&&S.sel.c==c.i&&S.sel.s==s.i&&S.sel.m==m.id?'sel':''}" ${s.past?'disabled':''} onclick="pick(${m.id},${c.i},${s.i},${g})">${s.t}<small>${s.past?'Closed':s.st=='Available'?s.fmt:s.st}</small></button>`))}</div></div>`;
function pick(mid,ci,si,g){S.sel={m:mid,c:ci,s:si};S.movie=mid;if(g){S.seats=[];S.v='';go('seats')}else render()}
function wish(id,e){e.stopPropagation();const i=S.wish.indexOf(id);i<0?S.wish.push(id):S.wish.splice(i,1);save();document.querySelectorAll(`.heart[data-id="${id}"]`).forEach(b=>b.classList.toggle('on',i<0));const r=e.currentTarget.getBoundingClientRect();if(i<0)confetti(r.x+r.width/2,r.y+r.height/2,16);toast(i<0?'Added to wishlist ♥':'Removed from wishlist')}
function book(id){const m=M[id];if(m.soon){if(!S.wish.includes(id)){S.wish.push(id);save()}return toast('We’ll notify you when bookings open ♥')}
const o=$('#ov');o.innerHTML=`<div class="ovb"><div class="orbit s"><i></i><i></i><i></i></div><h2>Rolling your show…</h2><p>${m.t}</p></div>`;o.classList.add('on');setTimeout(()=>{o.classList.remove('on');S.sel=null;S.movie=id;go('detail')},1500)}
function share(t){const u=location.href;navigator.share?navigator.share({title:t,url:u}).catch(()=>{}):navigator.clipboard?.writeText(t+' — '+u).then(()=>toast('Link copied'))}
const UPI=/^[\w.\-]{2,}@[a-z]{2,}$/i;
/* ===== posters, reveal, effects ===== */
const it=$('#intro');if(it){if(sessionStorage.getItem('cvIntro'))it.remove();else{sessionStorage.setItem('cvIntro',1);it.innerHTML=LOGO;setTimeout(()=>it.remove(),4500)}}
/* movie photos: fetched live from Wikipedia (works online, cached after first load) */
Object.assign(IMG,L('cvi',{}));
function paint(m){document.querySelectorAll(`[data-m="${m.id}"]`).forEach(e=>{e.style.background=bg(m);if(e.classList.contains('poster'))e.querySelector('b')?.remove()})}
const jp=u=>new Promise((ok,no)=>{const c='cb'+Math.random().toString(36).slice(2),e=document.createElement('script');window[c]=d=>{delete window[c];e.remove();ok(d)};e.onerror=()=>{e.remove();no()};e.src=u+'&callback='+c;document.head.append(e);setTimeout(no,8000)});
const WU=m=>'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(m.t+' '+m.y+' film')+'&gsrlimit=3&prop=pageimages&piprop=thumbnail&pithumbsize=500&format=json',
pickW=j=>Object.values(j.query.pages).sort((a,b)=>a.index-b.index).find(p=>p.thumbnail)?.thumbnail.source;
const TMDB_KEY='9ca8a42d72df853042b1ce1815a4b2d0',slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
ld=u=>new Promise(ok=>{const i=new Image();i.onload=()=>ok(u);i.onerror=()=>ok(0);i.src=u;setTimeout(()=>ok(0),12000)}),
ps=(t,ms)=>{const e=$('#ps');if(!e)return;e.textContent=t;e.classList.toggle('on',!!t);clearTimeout(e.h);if(ms)e.h=setTimeout(()=>e.classList.remove('on'),ms)};
async function find(m){for(const f of[async()=>await ld('posters/'+slug(m.t)+'.jpg')||await ld('posters/'+slug(m.t)+'.png'),
async()=>{if(!TMDB_KEY)return;const j=await(await fetch('https://api.themoviedb.org/3/search/movie?api_key='+TMDB_KEY+'&query='+encodeURIComponent(m.t))).json(),r=j.results.find(x=>(x.release_date||'').startsWith(m.y)&&x.poster_path)||j.results.find(x=>x.poster_path);return r&&'https://image.tmdb.org/t/p/w500'+r.poster_path},
async()=>pickW(await(await fetch(WU(m)+'&origin=*')).json()),async()=>pickW(await jp(WU(m))),
async()=>{const r=(await(await fetch('https://itunes.apple.com/search?media=movie&limit=1&term='+encodeURIComponent(m.t))).json()).results[0];return r&&r.artworkUrl100.replace('100x100bb','600x900bb')}])try{const u=await f();if(u&&await ld(u))return u}catch(e){}}
async function pics(){const todo=M.filter(m=>!IMG[m.t]),cnt=()=>M.filter(m=>IMG[m.t]).length;if(!todo.length)return;ps('Loading posters '+cnt()+'/'+M.length);for(let i=0;i<todo.length;i+=5){await Promise.all(todo.slice(i,i+5).map(async m=>{const u=await find(m);if(u){IMG[m.t]=u;try{localStorage.setItem('cvi',JSON.stringify(IMG))}catch(e){}paint(m)}}));ps('Loading posters '+cnt()+'/'+M.length)}const n=cnt();n==M.length?ps(''):n?ps(n+'/'+M.length+' posters loaded',4000):ps('Posters could not load. Open this file in Chrome with internet on, or put images in a posters folder.')}
function reveal(){const l=document.querySelectorAll('.rv');if(typeof IntersectionObserver=='undefined'){l.forEach(e=>e.classList.remove('rv'));return}const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const e=x.target;o.unobserve(e);e.classList.add('on');setTimeout(()=>e.classList.remove('rv','on'),1500+(e.style.getPropertyValue('--d')||0)*70)}}),{threshold:.08});l.forEach(e=>o.observe(e))}
let act;document.addEventListener('pointermove',e=>{const t=e.target.closest?.('.mc,.cc,.card,.hero');if(act&&act!==t)['--rx','--ry','--px','--py'].forEach(k=>act.style.removeProperty(k));act=t;if(!t)return;const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px');if(t.classList.contains('mc')){t.style.setProperty('--rx',(.5-y)*10+'deg');t.style.setProperty('--ry',(x-.5)*12+'deg')}if(t.classList.contains('hero')){t.style.setProperty('--px',x-.5);t.style.setProperty('--py',y-.5)}});
document.addEventListener('pointerdown',e=>{const b=e.target.closest?.('.btn,.chip,.sh');if(!b)return;const r=b.getBoundingClientRect(),i=document.createElement('i');i.className='rpl';i.style.cssText=`left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;b.append(i);setTimeout(()=>i.remove(),700)});
/* ===== motion layer (emergent-style) ===== */
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches,Q=s=>document.querySelectorAll(s);
document.body.insertAdjacentHTML('beforeend','<div id="prog"></div>'+(fine&&!rm?'<div id="glow"></div>':''));
let lp=0,ly=0,mg,busy=0;
const hy=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.setProperty('--p',h>0?y/h:0);$('.hd')?.classList.toggle('sc',y>20);$('.nav')?.classList.toggle('hide',y>ly&&y>220);ly=y;Q('.bgl').forEach(e=>e.style.setProperty('--sy',y*.18+'px'))};
addEventListener('scroll',()=>requestAnimationFrame(hy),{passive:true});
const _render=render;render=function(){_render();const m=$('.page');if(m&&lp==S.page)m.classList.add('same');lp=S.page;hy()};
const _go=go;go=function(p,o){const m=$('.page');if(rm||!m||busy)return _go(p,o);busy=1;m.classList.add('leave');setTimeout(()=>{busy=0;_go(p,o)},230)};
const _rv=reveal;reveal=function(){Q('.page .sec,.page .chips,.page .srch,.page .dates,.page .rate,.page .cast,.page .tkt,.page .pm,.page .lock,.page .claim,.page .steps,.page .tg,.page .two-col>*').forEach((e,i)=>{if(!e.classList.contains('rv')&&!e.dataset.t){e.dataset.t=1;e.classList.add('rv');e.style.setProperty('--d',Math.min(i,8))}});_rv()};
if(rm)return;
document.addEventListener('pointerdown',e=>{const i=document.createElement('i');i.className='ck';i.style.left=e.clientX+'px';i.style.top=e.clientY+'px';document.body.append(i);setTimeout(()=>i.remove(),800)});
if(!fine)return;
let t=scrollY,c=scrollY,on=0;const tick=()=>{if(Math.abs(scrollY-c)>80){on=0;return}c+=(t-c)*.09;if(Math.abs(t-c)<.4){c=t;on=0}scrollTo(0,c);if(on)requestAnimationFrame(tick)};
addEventListener('wheel',e=>{if(e.ctrlKey||$('.ov.on')||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();if(!on)t=c=scrollY;t=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,t+e.deltaY*(e.deltaMode?32:1)));if(!on){on=1;requestAnimationFrame(tick)}},{passive:false});
const g=$('#glow');let x=innerWidth/2,y=300,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY});(function l(){x+=(tx-x)*.08;y+=(ty-y)*.08;g.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();
document.addEventListener('pointermove',e=>{const b=e.target.closest?.('.btn,.ib,.av');if(mg&&mg!==b){mg.style.removeProperty('--tx');mg.style.removeProperty('--ty')}mg=b;if(!b)return;const r=b.getBoundingClientRect();b.style.setProperty('--tx',(e.clientX-r.left-r.width/2)*.18+'px');b.style.setProperty('--ty',(e.clientY-r.top-r.height/2)*.28+'px')});
})();
addEventListener('pageshow',e=>{if(e.persisted)location.reload()});
