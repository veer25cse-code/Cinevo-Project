const heroH=()=>{const l=hl(),m=l[S.hi%l.length];return`<div class="hero"><i class="bgl" data-m="${m.id}" style="background:${bg(m)}"></i><span class="rt">★ ${m.r}</span><span class="mq">MARQUEE PICK</span><div class="hc"><div class="meta">U/A 16+ • ${m.lg.toUpperCase()} • ${dur(m.d)} • ${m.fm}</div><h1 class="rwd">${rw(m.t)}</h1><p class="mut">${m.g.join(' • ')} • ${m.c.slice(0,3).join(', ')}</p><div class="hb"><button class="btn" onclick="book(${m.id})">Book Tickets</button>${heart(m.id)}</div></div><div class="dots">${J(l.slice(0,6).map((x,i)=>`<i class="${i==S.hi%l.length?'on':''}" onclick="S.hi=${i};$('#hero').innerHTML=heroH()"></i>`))}</div></div>`};
PG.home=()=>{const l=hl();if(S.hm==null||M[S.hm].soon)S.hm=l[0].id;const m=M[S.hm];
return`<div class="srch"><input id="hs" placeholder="Search movies, genres, actors…" onkeydown="if(event.key=='Enter')sq(this.value)"><button onclick="sq($('#hs').value)">Search</button></div>
<div class="chips">${J(Object.keys(CAT).map(k=>`<button class="chip ${k==S.cat?'on':''}" onclick="S.cat='${k}';S.hi=0;render()">${k}</button>`))}</div>
<div id="hero">${heroH()}</div>
<div class="sec rv"><h2>Now Showing</h2><a onclick="go('movies')">VIEW ALL ›</a></div><div class="row-s">${J(l.slice(0,14).map(mcard))}</div>
<div class="sec rv"><h2>Cinemas in ${S.city}</h2><select onchange="S.hm=+this.value;S.sel=null;render()">${J(M.filter(x=>!x.soon).map(x=>`<option value="${x.id}" ${x.id==S.hm?'selected':''}>${x.t}</option>`))}</select></div>
${dateStrip()}<div class="cgrid" style="margin-top:12px">${J(cin().map((c,i)=>cCard(c,m,1,i)))}</div>
<div class="card claim"><div class="ci">${IC.ticket}</div><div><small class="gold">MEMBERS CLUB LOUNGE</small><h3>Zero Booking Fee + 15% off</h3><p class="mut" style="font-size:13px">${S.coupon?'Applied to every booking in your account':'Claim once and prices drop across all cinemas'}</p></div><button class="btn" ${S.coupon?'disabled':''} onclick="claim(event)">${S.coupon?'CLAIMED ✓':'CLAIM'}</button></div>`};
function claim(e){S.coupon=true;save();confetti(e.clientX,e.clientY,70);toast('Offer claimed — prices dropped!');render()}
function sq(v){S.q=v.trim();S.tab='now';go('movies')}
