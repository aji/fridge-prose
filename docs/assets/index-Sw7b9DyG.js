var z=Object.defineProperty;var V=(a,o,n)=>o in a?z(a,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[o]=n;var i=(a,o,n)=>(V(a,typeof o!="symbol"?o+"":o,n),n);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const h of t)if(h.type==="childList")for(const s of h.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const h={};return t.integrity&&(h.integrity=t.integrity),t.referrerPolicy&&(h.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?h.credentials="include":t.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function e(t){if(t.ep)return;t.ep=!0;const h=n(t);fetch(t.href,h)}})();class X extends Error{}function u(a,o="assertion failed"){if(!a)throw new X(o)}function A(a,o="expected a defined value"){return u(a!=null,o),a}function C(a){const o=document.createElement("p");return o.innerText=a,o}function B(a,o,n,e){return n<=o&&a<=e}function q(a,o){return B(a.x,a.x+a.width,o.x,o.x+o.width)&&B(a.y,a.y+a.height,o.y,o.y+o.height)}const d=class d extends HTMLElement{constructor(){super();i(this,"x");i(this,"y");this.x=0,this.y=0}static register(){customElements.define(d.name,d)}static create(){const n=document.createElement(d.name);return u(n instanceof d),n}startAt(n,e){this.style.left=`${n}px`,this.style.top=`${e}px`,this.style.width="1px",this.style.height="1px",this.x=n,this.y=e}endAt(n,e){let t=Math.abs(n-this.x),h=Math.abs(e-this.y),s=Math.min(n,this.x),r=Math.min(e,this.y);this.style.left=`${s}px`,this.style.top=`${r}px`,this.style.width=`${t}px`,this.style.height=`${h}px`}};i(d,"name","app-board-selection");let D=d;const y=class y extends HTMLElement{constructor(){super()}static register(){customElements.define(y.name,y)}static create(){const o=document.createElement(y.name);return u(o instanceof y),o}update(o,n){this.className=o,this.style.top=o==="horizontal"?`${n}px`:"",this.style.left=o==="vertical"?`${n}px`:""}};i(y,"name","app-snap-rule");let b=y;const m=class m extends HTMLElement{constructor(){super();i(this,"x");i(this,"y");this.x=0,this.y=0}static register(){customElements.define(m.name,m)}static create(n){const e=document.createElement(m.name);return u(e instanceof m),e.innerText=n,e}setIsSelected(n){n?this.setAttribute("data-selected","true"):this.removeAttribute("data-selected")}isSelected(){return this.getAttribute("data-selected")==="true"}dragStart(){this.style.cursor="grabbing"}dragEnd(){this.style.cursor="grab"}moveTo(n,e){this.style.left=`${n}px`,this.style.top=`${e}px`,this.x=n,this.y=e}moveBy(n,e){this.moveTo(this.x+n,this.y+e)}raiseToTop(){var n;(n=this.parentElement)==null||n.appendChild(this)}};i(m,"name","app-tile");let l=m;function I(a,o,n,e){const t=n-o;return Math.abs(t)<e?{result:a+t,distance:Math.abs(t),reference:n}:void 0}function E(a,o,n,e){const t=a,h=a+o,s=Math.round(t/n)*n,r=Math.round(h/n)*n;return L(I(t,t,s,e),I(t,h,r,e))}function P(a,o,n,e,t){const h=a,s=a+o,r=n,g=n+e;return L(I(h,h,r,t),I(h,s,r,t),I(h,h,g,t),I(h,s,g,t))}function L(...a){let o;for(const n of a)n!==void 0&&n.distance!==void 0&&(o===void 0||o.distance===void 0||n.distance<o.distance)&&(o=n);return o}function F(a,...o){return L(...o)??{result:a}}const H=5,S=5,c=class c extends HTMLElement{constructor(){super();i(this,"panning");i(this,"dragTarget");i(this,"dragOffsetX");i(this,"dragOffsetY");i(this,"selectionArea");i(this,"selectedTiles");i(this,"gridX");i(this,"gridY");i(this,"snapRuleX");i(this,"snapRuleY");this.panning=!1,this.dragTarget=null,this.dragOffsetX=0,this.dragOffsetY=0,this.selectionArea=null,this.selectedTiles=[],this.gridX=null,this.gridY=null,this.snapRuleX=null,this.snapRuleY=null,this.addEventListener("mousedown",this.onMouseDown.bind(this)),document.addEventListener("keydown",this.onKeyDown.bind(this)),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("mouseup",this.onMouseUp.bind(this))}static register(){customElements.define(c.name,c)}saveTo(){const n={v:1,tiles:[]};for(const e of this.children)e instanceof l&&n.tiles.push([e.x,e.y,e.innerText]);return JSON.stringify(n)}loadFrom(n){const e=JSON.parse(n);this.removeAllTiles();for(const[t,h,s]of e.tiles)this.createTile(s).moveTo(t,h)}createTile(n){const e=l.create(n);return this.appendChild(e),e}removeAllTiles(){const n=[];for(const e of this.children)e instanceof l&&n.push(e);for(const e of n)e.remove()}adoptTile(n){const e=n.target;u(e instanceof l);const{left:t,top:h}=e.getBoundingClientRect();this.dragTarget=e,this.dragOffsetX=t-n.clientX,this.dragOffsetY=h-n.clientY,this.appendChild(e),e.moveTo(t,h),e.dragStart()}updateSelection(n){this.selectedTiles=[];for(const e of this.children)if(e instanceof l){const t=n!==null&&q(n,e.getBoundingClientRect());e.setIsSelected(t),t&&this.selectedTiles.push(e)}}setGrid(n,e){this.style.backgroundSize=`${n}px ${e}px`,this.classList.add("grid"),this.gridX=n,this.gridY=e}clearGrid(){this.style.backgroundSize="",this.classList.remove("grid"),this.gridX=null,this.gridY=null}getGrid(){return this.gridX!==null&&this.gridY!==null?{x:this.gridX,y:this.gridY}:null}hasGrid(){return this.gridX!==null&&this.gridY!==null}toggleGrid(n,e){this.hasGrid()?this.clearGrid():this.setGrid(n,e)}getSnappable(){const n=[];for(const e of this.children)e instanceof l&&!e.isSelected()&&e!==this.dragTarget&&n.push(e.getBoundingClientRect());return n}snapX(n,e,t){if(!n)return{result:e};const h=this.getGrid(),s=this.getSnappable();return F(e,h!==null?E(e,t,h.x,H):void 0,...s.map(r=>P(e,t,r.x,r.width,H)))}snapY(n,e,t){if(!n)return{result:e};const h=this.getGrid(),s=this.getSnappable();return F(e,h!==null?E(e,t,h.y,H):void 0,...s.map(r=>P(e,t,r.y,r.height,H)))}updateSnapRules(n,e){n!==null?(this.snapRuleX===null&&(this.snapRuleX=b.create(),this.appendChild(this.snapRuleX)),this.snapRuleX.update("vertical",n)):this.snapRuleX!==null&&(this.removeChild(this.snapRuleX),this.snapRuleX=null),e!==null?(this.snapRuleY===null&&(this.snapRuleY=b.create(),this.appendChild(this.snapRuleY)),this.snapRuleY.update("horizontal",e)):this.snapRuleY!==null&&(this.removeChild(this.snapRuleY),this.snapRuleY=null)}onMouseMove(n){if(this.panning){for(const e of this.children)e instanceof l&&e.moveBy(n.movementX,n.movementY);n.preventDefault()}else if(this.dragTarget!==null){const e=this.dragTarget.isSelected();e||this.updateSelection(null);const t=!n.shiftKey,{width:h,height:s}=this.dragTarget.getBoundingClientRect(),r=this.snapX(t,n.clientX+this.dragOffsetX,h),g=this.snapY(t,n.clientY+this.dragOffsetY,s);if(this.updateSnapRules(r.reference??null,g.reference??null),e){const K=r.result-this.dragTarget.x,j=g.result-this.dragTarget.y;for(const U of this.selectedTiles)U.moveBy(K,j)}else this.dragTarget.moveTo(r.result,g.result)}else this.selectionArea!==null&&this.selectionArea.endAt(n.clientX,n.clientY)}onMouseDown(n){n.button===0&&n.ctrlKey||n.button===1?(this.panning=!0,this.classList.add("panning"),n.preventDefault()):n.target instanceof l?(this.dragTarget=n.target,this.dragOffsetX=n.target.x-n.clientX,this.dragOffsetY=n.target.y-n.clientY,n.target.dragStart(),n.target.raiseToTop(),n.preventDefault()):n.target===this&&this.selectionArea===null&&(this.selectionArea=D.create(),this.appendChild(this.selectionArea),this.selectionArea.startAt(n.clientX,n.clientY),document.activeElement instanceof HTMLInputElement&&document.activeElement.blur(),n.preventDefault())}onMouseUp(){this.panning&&(this.panning=!1,this.classList.remove("panning")),this.dragTarget!==null&&(this.dragTarget.dragEnd(),this.dragTarget=null,this.updateSnapRules(null,null)),this.selectionArea!==null&&(this.updateSelection(this.selectionArea.getBoundingClientRect()),this.removeChild(this.selectionArea),this.selectionArea=null)}onKeyDown(n){n.key==="g"||(n.key==="Delete"||n.key==="Backspace"?(this.selectedTiles.forEach(e=>e.remove()),this.updateSelection(null)):n.key==="ArrowLeft"?this.selectedTiles.forEach(e=>e.moveBy(-S,0)):n.key==="ArrowRight"?this.selectedTiles.forEach(e=>e.moveBy(S,0)):n.key==="ArrowUp"?this.selectedTiles.forEach(e=>e.moveBy(0,-S)):n.key==="ArrowDown"&&this.selectedTiles.forEach(e=>e.moveBy(0,S)))}};i(c,"name","app-board");let Y=c;const G=50,k=class k extends HTMLElement{constructor(){super(),this.addEventListener("mousedown",this.onMouseDown.bind(this)),this.style.display="none"}static register(){customElements.define(k.name,k)}open(){this.style.display="",this.innerHTML="",this.appendChild(C("Options will appear here."))}close(){this.style.display="none",this.innerHTML=""}setOptions(o){this.innerHTML="";for(let n=0;n<G&&n<o.length;n++)this.appendChild(l.create(o[n]));if(o.length>G){const n=o.length-G,e=n===1?"additional option":"additional options";this.appendChild(C(`Plus ${n} ${e}`))}o.length===0&&this.appendChild(C("No results"))}onMouseDown(o){o.target instanceof l&&(u(this.parentElement instanceof O),this.parentElement.adoptTile(o),o.preventDefault())}};i(k,"name","app-drawer-options");let w=k;const Q=`Hey.
Oh.
No!
Hello?
Sorry.
Yeah?
Excuse me.
Go!
Oh, my God.
Huh?
Yes, sir.
Hmm.
Okay?
Here.
Ah!
Wow.
Stop!
Well...
Yes?
What is it?
Bye.
Whoa!
Oh, yeah.
No, no.
What happened?
Look.
Oh, no.
That's it.
Now!
Come here.
It's okay.
All right?
Oh, God.
Uh...
Mm-hmm.
Please!
Aah!
Fuck!
You?
Sir.
You know what?
No, no, no.
Wait!
Dad!
Shit.
Me?
Mmm.
Um...
Who are you?
Help!
I love you.
Mm.
Go on.
Mom!
Ow!
How are you?
Right?
Ooh!
Wait a minute.
Good night.
What's wrong?
So...
See?
Listen.
Hold on.
I see.
Shh.
Yep.
How?
Move!
Uh-huh.
Jesus.
There.
Are you okay?
But...
You're right.
Go ahead.
Good morning.
Got it.
Oh, shit.
What do you think?
Sit down.
Come.
Don't.
Here we go.
Whoo!
God!
You okay?
Ok.
What's the matter?
It's all right.
Damn!
What is this?
There you go.
Damn it!
Hurry!
Help me!
Congratulations.
Oh, yes.
Alright.
Ready?
You know?
Get up!
I got it.
Where are you?
Run!
I'm so sorry.
What's this?
Goodbye.
What is that?
I understand.
What...
Ugh!
I just...
Ohh!
Listen to me.
Nope.
I did.
Where is he?
Thank you!
Thank you very much.
Are you all right?
Absolutely.
Hurry up!
I
Yeah, yeah.
I will.
I don't understand.
OK?
That's good.
Look at me.
Not yet.
No, sir.
Cheers.
Nice.
No problem.
Here you go.
Really.
Hi!
Good luck.
Ha!
You all right?
You're welcome.
What's your name?
Never.
I promise.
Forget it.
Don't move.
This way.
Who is it?
When?
What the hell?
Oh, come on.
It's me.
Daddy!
You got it.
What was that?
Enough!
And...
Seriously?
Relax.
Get out of here.
Amen.
Of course not.
Jack.
Fire!
Father!
I'm sorry?
Very good.
That's great.
My God.
Get down!
Hang on.
Let me go!
And you?
Jesus Christ.
Look at this.
Nice to meet you.
I'm not.
I don't know!
Not at all.
That's all.
Thank you, sir.
Good evening.
Go away!
Perfect.
Morning.
Oh, man.
Easy.
What did you say?
Ahh!
Again.
Over.
Be careful.
What for?
Yeah, I know.
How you doing?
I'll be right back.
I mean...
Trust me.
Hold it.
Get out.
Mother!
Where is she?
Holy shit.
Two.
Look at that.
Quiet!
I don't care.
Sam.
That's enough.
YEAH.
Wake up!
Okay, okay.
What's happening?
Not really.
Never mind.
No, thanks.
Do you understand?
Hey, hey.
NO.
What does that mean?
Come with me.
I don't.
Son of a bitch!
Welcome.
Mm-hm.
You see?
Oh, really?
Yes, ma'am.
It's fine.
Yeah, sure.
One.
John.
Excellent.
Honey.
Come on in.
Move it!
Mmm-hmm.
No, thank you.
Are you crazy?
No, no, no, no.
Come on, come on.
It's over.
Do you?
What about you?
Eh?
I told you.
This...
You know that.
Nothing!
Take it easy.
There you are.
I knew it.
I get it.
Where is it?
Come on, let's go.
Over here.
Three.
Just...
There he is.
Thank you so much.
I know!
Quick!
How much?
Take it.
How do you know?
What are you saying?
Great!
You do?
Like what?
Anything.
Yes, of course.
Clear.
I didn't.
Come on, man.
Get in.
Follow me.
Yes, yes.
Who's that?
I'm here.
Yeah, right.
Let go!
Bullshit.
Aye.
How do you do?
Look out!
Uh-oh.
Guys!
Oh my God!
See you.
I can't...
You did?
Right here.
It's true.
This is it.
Do it.
Me, too.
Open the door!
He's dead.
You are.
See you later.
I think so.
Doctor!
Come on...
Right now.
Yes, I do.
Hey, guys.
Remember?
Are you serious?
No way!
Understand?
Can I help you?
What the...
You understand?
It doesn't matter.
Let me see.
Careful.
Police!
Go, go, go!
Everything.
Hm.
One, two, three.
Heh.
Let's see.
Bye-bye.
Are you kidding me?
Well done.
About what?
Watch out!
Don't worry about it.
Look at you.
Yes, it is.
Oh, my god.
There it is.
Yup.
I'm okay.
Fuck you.
Oh, boy.
Are you kidding?
Mommy!
No, I don't.
I have to go.
That's okay.
Understood.
I gotta go.
Oh, thank you.
Nah.
Are you?
Oh, my.
Let's do it.
Michael.
I'm coming.
Of course!
Frank.
Hey, hey, hey.
Freeze!
Yo.
Give it to me.
David.
What did you do?
I know that.
Get back!
Sure!
Wait a second.
Done.
Aw.
Where have you been?
All right, all right.
Charlie.
What do you say?
What's wrong with you?
Beautiful.
Thanks!
Is it?
You know what I mean?
No, I'm not.
You can't.
Mama!
Oh, dear.
I won't.
Oh, right.
Over there.
Where are we going?
I swear.
Sit.
Wait, wait.
Forgive me.
Get him!
Right there.
That...
Next.
Not now.
How's it going?
Let's get out of here.
Ouch!
You ready?
Turn around.
Unbelievable.
I'll do it.
Come back!
Thank God.
That's not true.
There we go.
Bravo!
You don't understand.
That's...
Oh, fuck.
Tomorrow.
Uhh!
No, it's not.
Take care.
I don't get it.
I love it.
Ma'am.
I was.
Awesome.
That's true.
Brother!
Here it is.
Is that right?
I have no idea.
Wonderful.
Tom.
Oh, okay.
I'm not sure.
Good-bye.
I can't believe it.
Out!
I'm serious.
I guess.
Yes, I am.
© P@rM!
What are you?
Can you hear me?
Oh, good.
Mike.
Oh, please.
Oh, I'm sorry.
Merry Christmas.
OH.
What the hell are you doing?
Quickly!
What did he say?
Copy that.
Get off me!
Open up!
Peter.
Where you going?
Good to see you.
Get off!
Is that it?
Not bad.
Goddamn it!
Have a seat.
Indeed.
That's all right.
I like it.
Captain!
Fine!
Who knows?
May I?
Baby.
Oh no!
Ha, ha.
I think...
Wait, wait, wait.
Where are they?
Master!
Harry.
Roger.
Gentlemen.
Down!
It's beautiful.
That's fine.
Say it.
George.
Alex.
We...
Whoa, whoa, whoa.
I got you.
Shoot.
Oh, great.
Ben.
Dude.
Are you OK?
He's gone.
Yay!
Who is he?
I don't believe it.
Not me.
And then?
Tell me!
Stay here.
Just a minute.
Man.
You hear me?
Let go of me!
Keep going.
Are you ready?
Did you?
Fuck off!
Go home.
Give me that.
I agree.
Hey, man.
It's good.
Certainly.
Anything else?
Faster!
Go, go!
Coming.
Boss!
Hey, you!
Because...
WHAT?
Is that so?
Later.
You were right.
What time is it?
That's right!
Four.
I beg your pardon?
Tonight.
Max!
What's the matter with you?
Who's there?
Unh!
Nonsense.
Oh yeah?
Yeah, okay.
Oh, wow.
Think about it.
Now what?
He's right.
Joe.
Good boy.
I don't know what you're talking about.
Good job.
Let him go.
Idiot!
It's not.
Ahem.
Oh, my gosh.
I know, I know.
Good?
Uh-uh.
Not anymore.
Check it out.
No, wait.
Here we are.
Bastard!
No, no, no, no, no.
Deal.
YES.
Five.
How's that?
You're kidding.
Yeah, yeah, yeah.
No, you don't.
Correct.
No, you're not.
Sarah.
Yes, I know.
Don't do that.
You'll see.
Dead.
Argh!
What now?
Don't touch me!
You don't.
What are you gonna do?
Where were you?
How about you?
Kill him!
God damn it!
That's him.
No, I didn't.
Who cares?
Thanks a lot.
Attention!
That's nice.
Oh, Jesus.
It was.
Fantastic.
What's going on here?
I'm all right.
Ha ha!
OKAY.
I hope so.
Take this.
Like this.
You're crazy.
Open it.
Here you are.
I'm going.
Nick.
Uh, yeah.
True.
But why?
Yes, I did.
Henry.
Miss?
Get lost!
Do you hear me?
Don't go.
Absolutely not.
Which one?
Oh, sorry.
Paul.
Cut!
That's me.
Interesting.
Get it?
He...
How dare you?
Mum!
Good afternoon.
Uh, no.
I, uh...
Ha ha ha!
No one.
Boom!
Silence!
Amazing.
He's here.
Up!
Excuse me, sir.
This is...
Where are we?
Christ.
That's impossible.
Water.
Don't shoot!
Promise.
Your Majesty.
Oh, I see.
Very nice.
Stay.
Be quiet.
Jake!
Good idea.
How are you doing?
I'm in.
Papa!
Oops.
I am?
We'll see.
Danny.
Bitch!
Jimmy.
Then...
You son of a bitch!
I hate you!
Watch it!
Finally.
What do we do?
Leave me alone!
Always.
Asshole.
Oh, hey.
I did it.
Happy birthday.
Slow down.
Look at him.
What happened to you?
We did it!
I have.
What's the problem?
Jim.
There she is.
I'm leaving.
You bastard!
You don't know?
Calm down!
See ya.
Gotcha.
I need your help.
Definitely.
Pardon me.
Well, I...
Roger that.
I mean it.
I like that.
James.
Where am I?
Why...
Answer me!
Who is that?
Impossible.
Wait here.
I'll get it.
You think?
Will!
Why is that?
Halt!
Talk to me.
Oi!
Who's this?
What's his name?
Money.
None.
Tony.
Him?
I know it.
Am I right?
For me?
Mary.
Who the hell are you?
Anna.
Shut the fuck up!
Get out of the way!
I'm scared.
HEY.
Home.
I'm ready.
No, I...
Then what?
What are you looking at?
It's you.
Check.
Surprise!
Don't know.
Liar!
You can do it.
That's funny.
Agreed.
Just go.
Aaah!
How do you know that?
Why are you doing this?
You know why?
Good day.
He did.
You, too.
See you tomorrow.
Oh, no, no.
Oh, well.
You tell me.
Oh God!
I'll be back.
I'll go.
Good for you.
For you.
No, of course not.
No, please.
How old are you?
Hyah!
I got him.
I'm really sorry.
Let me guess.
What are you waiting for?
COME ON.
Coffee?
Bingo.
Come on, baby.
Yes sir.
Get away!
Yes, please.
What the hell is that?
You think so?
What do you want me to do?
Whoa, whoa.
Okay, fine.
Sorry about that.
Let her go.
Don't say that.
I remember.
Get in the car.
Ever.
Tommy!
Love.
Ew.
You're lying.
Let's go
Don't do it.
Stay back!
Better.
Pardon?
What have you done?
Aye, sir.
Probably.
NdeR M@nkÖÖ ™
Don't be afraid.
Check this out.
Yes, you are.
What can I do for you?
What are you going to do?
Jane.
Agh!
Bob.
Love you.
Mine.
Come on, guys.
Anyway...
Perhaps.
Back off!
What about me?
Whew.
Let's do this.
Bill.
Drop it!
This one.
Do you mind?
Whoo-hoo!
Drink.
Darling.
Breathe.
You OK?
What the hell is this?
How many?
It's him.
Doesn't matter.
Six.
Lieutenant.
Sweet.
Ha-ha!
No idea.
Goodnight.
Jeez.
I am sorry.
I don't want to.
Ha-ha-ha.
Chris.
More.
I didn't know.
Taxi!
I'll see you later.
Mark.
Me neither.
Leave.
Motherfucker!
I know you.
You're okay.
We need to talk.
== sync, corrected by elderman ==
I don't remember.
I can.
It's too late.
Objection.
Did you see that?
Oh, no, no, no.
Alone.
Ray.
I don't believe you.
You bet.
I can't do it.
Fair enough.
Did you hear that?
I'm done.
No kidding.
What the hell was that?
Yeah, that's right.
Have fun.
I can't do that.
Billy!
I'm hungry.
Seven.
What do I do?
It was an accident.
Aha!
How about that?
All of them.
How come?
Bobby!
Not you.
I'll kill you!
Put it down.
Who is she?
How long?
Sometimes.
You did it.
Oh, hi.
I'm on it.
Stand up.
You're not.
I'm sure.
Wait for me!
Are you alright?
This is ridiculous.
I do!
What do you do?
Shall we?
You're late.
Fuck it.
It's great.
I guess so.
Why me?
He is.
No, I can't.
Chief!
Do something!
Hey, buddy.
Show me.
Eddie.
Don't you?
Lovely.
Sorry I'm late.
I love you, too.
Welcome back.
no.
What do you want from me?
Stay down!
Oh, sure.
That's better.
Kate.
Rachel.
Let's move.
Oh, thanks.
yeah.
Not exactly.
What is going on?
One, two...
C'mon.
Don't do this.
Very funny.
I'm listening.
How are you feeling?
You're wrong.
Uncle!
L...
She...
No, not at all.
She's dead.
Well, yeah.
Back up.
Is that true?
Brilliant.
No shit.
We are.
Oh, my goodness.
Isn't it?
Steve.
Something like that.
Amy.
What's that supposed to mean?
Where to?
How is he?
Yeah, I'm fine.
I'll be fine.
Jump!
All right, then.
Go to hell!
I'm just...
How do you feel?
I'm trying.
Pull!
Almost.
Who was that?
Cut it out!
Fight!
We're here.
I'm on my way.
Claire.
Negative.
Daniel.
Ah, yes.
She's gone.
Watch this.
Just do it.
Johnny!
Good, good.
Back!
They're coming.
Is everything okay?
Gone.
This is crazy.
It hurts.
ALL RIGHT.
Stupid.
Wha...
You look great.
Yeah, of course.
THANK YOU.
How did you know?
Watch.
So am I.
Yes, you do.
Give me your hand.
Let me out!
What's happened?
It...
Stop that!
Come on, now.
Exactly!
Come in!
Do you like it?
Yeah, I do.
Ma!
Hey, come on.
Mr.
Er...
A what?
Leave him alone.
Die!
Oh, I don't know.
I'm tired.
So do I.
Just relax.
Just like that.
What can I do?
Walter.
Believe me.
Is that you?
What can I say?
I am so sorry.
Doc!
Richard.
What about him?
Too bad.
Keep moving.
Good girl.
It's gone.
Yah!
All of it.
Get away from me!
I forgot.
I got this.
Colonel.
I can't do this.
It's done.
It's mine.
Soon.
Annie.
I didn't do anything.
You what?
They're here.
Who are they?
Don't be silly.
I love you too.
Please don't.
Oh, god.
Yeah, well...
Why didn't you tell me?
Hold up.
You will.
Adam.
What is?
Oh my god.
This is great.
Us?
You can't do that.
He's fine.
Close your eyes.
I got to go.
Totally.
What should I do?
It is?
Hey, baby.
I don't know what to say.
That's ridiculous.
I need you.
Lucy!
Boo!
We gotta go.
Too late.
What are we gonna do?
Do what?
Funny.
I'll show you.
Stay there.
Stay with me.
And now?
What do you got?
My son.
I don't know what to do.
I'm out.
Go back.
Everything okay?
Smile.
Not much.
What did I do?
What do you know?
Cool!
There they are.
Of course I do.
Wrong.
hello.
What was it?
My pleasure.
Honestly.
Get in there.
No, not yet.
Madam.
Son.
Mm-mm.
All of you.
She's right.
No, I don't think so.
Are you there?
Yes, thank you.
Push!
What about it?
Andy.
No, not really.
Out of the way!
A lot.
Fuck me.
What's he doing?
Eat.
General.
We can't.
Forever.
Take a look.
Where are you from?
Let me.
No, don't.
I'll take care of it.
Well, thank you.
Thanks, man.
Enjoy.
It's time.
Everyone.
Eric.
== sync, corrected by elderman == @elder_man
No more.
Maybe...
Right away.
I've got it.
Not here.
I can't believe this.
Kevin.
That's cool.
Say something.
Like that.
It's not your fault.
Don't cry.
All right, let's go.
Stand by.
Okay, good.
You didn't.
Oh, thank God.
Thanks for coming.
I'm right here.
Let it go.
And you know what?
Is something wrong?
No, it's okay.
Like...
Tell me about it.
Am I?
Happy?
Eight.
FBI!
Call me.
What the hell is going on?
Everything's fine.
Sounds good.
Come on, come on, come on.
What are you thinking?
You heard me.
Let's go home.
Left.
You like it?
Hold your fire!
Come along.
Sort of.
I can't hear you.
Is that clear?
What is wrong with you?
I'm
Everybody.
What do you think you're doing?
Alice.
Sister.
Matt.
Oh, wait.
Tell him.
I need to talk to you.
Yes, Sir.
How is she?
Copy.
Take your time.
Very.
What do you see?
Hey, look.
She's fine.
Well, well, well.
AII right.
Guess what?
right?
That way.
Damn you!
I'm sorry, sir.
Maybe not.
What is your name?
Professor.
what?
Come out!
I didn't say that.
please.
It's cool.
Good work.
What's her name?
Let me help you.
I really do.
How so?
Ryan.
Ten.
Yes, you can.
Aww.
Okay, bye.
Ahhh!
But I...
Friends?
Can you?
I'll tell you what.
Don't you see?
You're here.
That one.
Listen up.
He's...
Yes, you did.
We do.
No, man.
Come over here.
Yeah, man.
No thanks.
Rose!
Boy.
No, I'm fine.
I don't believe this.
I like you.
In here.
Come back here!
Are you out of your mind?
Emily.
Leave it.
Sergeant.
Sorry, sir.
Terrific.
It's my fault.
I was wrong.
It's alright.
Yeah, me too.
It's perfect.
What's your problem?
Simon.
Lisa.
It's impossible.
Slowly.
Okay, let's go.
I apologize.
Do you understand me?
Or...
Stop him!
Mr. President.
Ladies.
Crap.
Precisely.
Try it.
You idiot!
I'm starving.
okay.
Emma.
Oh, hello.
I have to.
Hands up!
Grandpa!
Hi, honey.
Just a second.
LAUGHTER
We have to go.
I'll be there.
Night.
Turn it off.
It worked.
I'm back.
Who was it?
Hold on a second.
Dammit!
Just a moment.
Time.
Boys.
Would you?
Oh, look.
Maria!
And you are?
One more.
We don't know.
Obviously.
Grandma!
Get outta here!
Don't worry!
Well, I don't know.
Have a nice day.
Jerry.
Anyone?
We're good.
That's crazy.
Have you?
I'll take it.
What do we do now?
Meaning?
I'll...
Ho!
Not again.
Action!
Robert.
As you wish.
Talk.
Jason.
Oh, oh.
It's ok.
Brian.
No, ma'am.
Thank you for coming.
This is for you.
You hear that?
Kill me.
No, you didn't.
Is that all?
What did she say?
It's amazing.
Well, well.
Psst!
It's important.
I have an idea.
You're...
Goddamn!
You go.
Here I am.
Hah!
I miss you.
Are you hurt?
And this?
Oh shit.
Incredible.
Don't you understand?
What's so funny?
I tried.
Commander.
Your Highness.
What is this place?
Get over here.
Yeah, all right.
I believe you.
It's late.
Pete.
Martin.
Drive!
For real?
Yeah, it is.
Are you hungry?
Hey, Dad.
I'm going home.
May I help you?
I appreciate it.
Of what?
See that?
He's coming.
We will.
Welcome home.
Thomas.
My wife.
Arthur.
We did.
Get out of my way!
Is there a problem?
It can't be.
Since when?
You're fired.
yes.
My father.
Together.
Stay where you are.
What about?
Maggie.
Stand back.
You can.
Both.
Shoot him!
Tell you what.
Hey, wait.
Stop the car.
I don't like it.
I thought...
Something's wrong.
Jenny!
Think.
But you know what?
I'll try.
The truth.
I know who you are.
The what?
I don't know why.
One second.
Not.
Order!
No need.
Crazy.
Are you nuts?
After you.
Look here.
Speak.
It's nice.
Hallelujah!
You're dead.
Charles.
Bloody hell.
Laura.
Give me a break.
He's alive.
I doubt it.
It's gonna be okay.
Leave me.
How do I look?
I quit.
Name?
How you doin'?
Get ready.
Why do you say that?
Clark.
I missed you.
Steady.
Josh.
Strange.
He's not here.
Go now.
See you soon.
Grace.
Kill!
Remember that.
I'm busy.
Hi there.
Scott.
Is it true?
What the fuck are you doing?
Can I?
AAH!
That's too bad.
That's what I thought.
Sean!
I beg you.
Hell, no.
Nice to see you.
That's why.
Excuse us.
What are you looking for?
Ed.
Sweetheart.
Look at her.
What're you doing?
Okay, then.
I'll call you.
It's for you.
Luke!
Here they come.
They...
Wait, what?
Greetings.
Nine.
You got that?
I promise you.
Dave.
You and me.
Bang!
You don't have to.
Sara.
So long.
Detective.
You're good.
I'm not going anywhere.
This is good.
Both of you.
Elizabeth.
Get him out of here.
Can I come in?
Let me tell you something.
I'm home.
You'll be fine.
Carl.
I'm kidding.
Are you mad?
You see that?
I love you so much.
Okay, okay, okay.
What do you need?
Don't worry about me.
Erm...
I can see that.
You're all right.
What does it mean?
Ciao.
Remember me?
Why do you ask?
Please, please.
That's what I'm talking about.
How about this?
Hit me.
I would.
Get off of me!
She did.
It's yours.
Not good.
really?
Is that what you want?
Any questions?
Something wrong?
Alan.
What did I tell you?
I'm not going.
Who am I?
It wasn't me.
That's amazing.
The...
What's the difference?
And then what?
Let me in!
Larry.
Yours?
No, it isn't.
Don't be ridiculous.
Come on now.
And I...
Susan.
Pull over.
With what?
He was.
She is.
I'm telling you.
Five minutes.
Get out of there!
How could you?
Ladies and gentlemen.
Please help me.
Kyle.
Why did you do that?
Close the door.
One, two, three, four.
Leo.
Hi, guys.
Kids.
I can't breathe.
How can I help you?
Her.
Is everything all right?
My...
Dan.
No, you can't.
Forward!
Girls!
Helen.
Give it back!
Did I?
You know it.
Just kidding.
We're leaving.
Actually...
I'm glad.
Abby.
Move out!
It's here.
Oh yes.
Mister!
What the hell are you doing here?
Open.
For now.
Leave her alone.
Pleased to meet you.
Right, right.
You know what I'm saying?
That's weird.
I can't see.
Please stop.
You're sure?
It's working.
Well, no.
Here he comes.
Julia.
I couldn't.
But how?
Okay, thanks.
Well, yes.
Yes, that's right.
Not today.
Don't tell me.
Carter.
That's correct.
Do I know you?
One minute.
How'd it go?
But what?
Look at it.
l don't know.
I'll tell you.
Knock it off!
I'm pregnant.
It's good to see you.
Don't bother.
Gross.
No, really.
My lord.
Go for it.
You know me.
Twice.
Go to sleep.
Don't you think?
Yes, yes, yes.
It does.
Geez.
Okay, great.
Work.
Last night.
What did I say?
Here it comes.
Dean.
You're under arrest.
Are you insane?
Know what?
Coming through.
Red.
She's here.
Here he is.
Do it now!
Don't look at me.
None of your business.
Let's go, let's go.
Who told you that?
I'm just saying.
Mummy!
Carry on.
I can feel it.
A...
Don't be.
No, I'm sorry.
I'm not hungry.
I saw it.
Oh, baby.
You lied to me.
Anybody?
Can you do that?
What the hell are you talking about?
God bless you.
Gosh.
Keep it.
One moment.
We're done.
Don't stop.
Do you know him?
I don't want it.
Oh, I know.
What have I done?
Good bye.
Can you believe it?
You look good.
Stay calm.
Dismissed.
Do you remember?
Easy, easy.
That's not fair.
Hank.
Murder.
It's funny.
I'll call you back.
Stop right there!
Okay, all right.
Something.
I don't mind.
Take it off.
You have to.
Chloe.
That's a good idea.
I can do it.
Major.
You're back.
Today?
Yeah, you're right.
No, it's fine.
Naturally.
Attack!
Can I ask you something?
Could be.
They're gone.
Joey!
I want to go home.
It's
Hi, Mom.
Charge!
You can't do this.
Your turn.
I found it.
Gotta go.
You have no idea.
Marty!
Come on, boy.
Everything all right?
Be right back.
Where do you think you're going?
You got me.
You know something?
All right, come on.
Help yourself.
Fuck that.
What the fuck!
We're almost there.
Why would you do that?
How is it?
There we are.
You stay here.
Yeah, thanks.
Jeff!
English
It's not fair.
All clear.
Fall back!
Suit yourself.
Guilty.
Do I?
One more time.
That's an order.
Phil!
Outside.
HELLO.
No, nothing.
Hold still.
Not a chance.
I didn't do it.
I thought so.
Thank you, thank you.
Put the gun down.
Just one.
Julie.
Hey, what are you doing?
I dunno.
Right this way.
Take a seat.
My mother.
That's bullshit.
It's complicated.
Jesse.
No worries.
Karen.
I DON'T KNOW.
Nothin'.
Inside.
What the hell's going on?
I can't help it.
What's up, man?
What am I supposed to do?
I'm very sorry.
Molly.
Hold!
Ta-da!
I was there.
My baby!
What are we going to do?
What about her?
Pick it up.
You can go.
We got it.
Why should I?
What are we doing?
You hungry?
Victor.
Are you ok?
Almost there.
Woo!
Bad.
Hooray!
Already?
Chuck.
It's not that.
Shhh.
Who do you think you are?
Don't leave me.
HI.
William.
Ja.
Yes or no?
Get going.
Good morning, sir.
You're alive.
How should I know?
Fucking hell.
This is bullshit.
Do me a favor.
Oof!
What should we do?
Take cover!
Pleasure.
Why's that?
Me too!
Do you know?
Good God!
Hey, wait a minute.
What are they doing?
I appreciate that.
Rick.
Possibly.
How was it?
Say what?
You scared me.
You understand me?
How did it go?
I don't know yet.
I heard.
Ohhh!
That's not the point.
I did not.
She's...
What a surprise.
Is that...
Okay, thank you.
Somebody!
I should go.
Don't mention it.
Delicious.
OK, OK.
Peace.
Splendid.
That's wonderful.
Mwah.
Who's he?
Take him.
Forget about it.
Buddy.
Happy New Year.
I see it.
Go, go, go, go!
Your father?
I had no idea.
Oh, crap.
Don't you get it?
Of course it is.
Whoops.
Weird.
Katie.
Good news.
All the time.
Still.
Pretty good.
You win.
I'll see you tomorrow.
Bastards!
Who...
I am not.
Hell, yeah.
Wh...
Neither do I.
Hear, hear.
Hi, Dad.
Yes, but...
Hiya.
You bitch!
We're fine.
Beat it!
Come again?
Barry.
I'll help you.
Not quite.
We made it.
Get the fuck out of here.
Fool!
I'm impressed.
Oh, that.
What'd you say?
It's possible.
Is he dead?
Hit it!
Nothing at all.
Look at them.
That's what I said.
Oh, Christ.
Yeah, I did.
Lily.
They are.
Look who's here.
Stand down.
And me.
HUH?
Hello, sir.
Ted.
How you feeling?
Okay, come on.
Help us!
What am I doing?
It's no big deal.
Continue.
What do you want to do?
What's all this?
I, um...
Or not.
I wish.
For how long?
What do you care?
Please forgive me.
Harder!
He does.
Oh, honey.
Well, then.
Well,
Let's eat.
Kind of.
Let me ask you something.
RIGHT.
No, I haven't.
Hold this.
Do you copy?
Get out of the car.
I won!
Yeah, but...
Yesterday.
Tea?
It's cold.
You like that?
Who else?
I'll see what I can do.
What are you up to?
Just wait.
Now go.
You guys!
You're kidding me.
Impressive.
Get...
Howdy.
Jess!
Listen to this.
It was me.
You have?
Where you been?
I can't remember.
Probably not.
Kiss me.
It's a long story.
I don't know, man.
Oh my!
Of course you do.
One more thing.
Okay, here we go.
Take that!
Kelly.
I know, right?
I said no.
Is he okay?
Tim.
Not this time.
Blood.
What took you so long?
That's awesome.
Who said that?
I hear you.
I love him.
Who the fuck are you?
I had to.
Are you happy?
Upstairs.
All right, fine.
Watch your step.
I didn't mean to.
Nurse!
What are they?
My goodness.
You can do this.
It's not true.
Marcus.
It happens.
Are you coming?
I was just...
Please sit down.
Hot.
You look beautiful.
Does it hurt?
I'm out of here.
I love her.
Hey, hey, hey, hey.
Ethan.
You never know.
Hut!
Sheriff.
Guards!
It's not funny.
Leave a message.
Anytime.
Jamie.
Will you?
Take care of yourself.
What you doing?
What have you got?
What happened to him?
Linda.
sir.
Have a good day.
Nothing happened.
Got you.
Get me out of here!
Kim.
Right on.
Gary.
Nice work.
Mayday!
Yes, indeed.
Oh, of course.
What's the point?
Is he?
Cute.
Take him away.
It's up to you.
Do it again.
Sweetie.
Oh, nothing.
Don't be stupid.
Beth.
What then?
Fred.
If you say so.
Bam!
You fool!
Shame.
Vincent.
You know that, right?
Hey, what's up?
So that's it?
Roy!
My brother.
Hey, listen.
Where did he go?
I don't know anything.
It's too dangerous.
Did you know that?
Okay, you know what?
Did you hear me?
What were you thinking?
Be my guest.
It's crazy.
Where did you get this?
Security!
God, no.
Phew!
It's all good.
Let's...
Thankyou.
Will you marry me?
We don't.
I'm proud of you.
Yea.
My Lord.
I'll go with you.
Fast.
You don't say.
I'd love to.
Sure thing.
Doing what?
How do you mean?
I've got to go.
Hold it right there.
Hello there.
Put me down!
Got him.
What the hell happened?
With you.
Promise me.
Where...
Incoming!
Now, come on.
Speak up.
You shut up!
We got him.
That's a lie.
You're on.
It's been a long time.
That's why I'm here.
What do you mean by that?
Don't be scared.
That's not possible.
Nathan.
You good?
Don't look.
This way, please.
No, he's not.
Paris.
For God's sake!
I'm afraid.
That's the one.
Oh, shut up.
Get in here.
I hope not.
I'll call you later.
Break it up!
Wait up!
What's wrong with him?
Yeah, I think so.
Please, no!
We know.
What did you see?
My bad.
Aren't you?
It's coming.
Yeah, baby.
Not so fast.
Dick.
Try again.
I didn't know that.
Sleep.
All of us.
Dinner?
I'm late.
Sophie!
I can do that.
Don't panic.
This is insane.
I give up.
Hey, it's me.
Time to go.
HMM.
Every day.
You too?
Gracias.
I'M SORRY.
Officer.
Thanks very much.
I want you.
Not necessarily.
He did it.
If...
Good Lord.
Did he?
Get your hands off me!
Lee.
No big deal.
You killed him.
A friend.
Whoa, whoa, whoa, whoa.
You should.
On your knees!
Everybody out!
Can't.
You remember?
Safe.
I want to.
I swear to God.
What did he do?
That's her.
Hannah.
Open your eyes.
Get back here!
It's not working.
Nina!
Which way?
I want to talk to you.
You're gonna be okay.
Oliver.
People.
What do you want me to say?
Come, come.
I lied.
Does it matter?
Terrible.
Focus.
Hide!
Shame on you!
It was you.
No, I know.
Music.
He's not.
No, I won't.
That's the problem.
Yeah, I guess.
No, I'm good.
Bruce.
Men.
I need help.
There is.
Ridiculous.
We're going.
Amanda.
Come on, honey.
What am I gonna do?
Yeah, maybe.
What's the big deal?
Carol.
Yes, he is.
It works.
Drop the gun!
Is that okay?
Piss off!
It's not my fault.
Children.
Okay, look.
Very much.
You're beautiful.
Terry.
Come on, boys.
He's good.
I had no choice.
Affirmative.
Stay away from me.
Your mother?
Finished.
Louis.
Teacher!
That's OK.
That's not it.
At last.
What's next?
What are you doing ?
You have my word.
Princess!
Lord!
Oh, that's right.
What the fuck is that?
Si.
The police?
No offense.
You can't be serious.
It's hot.
Holy crap.
Andrew.
Time's up.
It's the truth.
Off you go.
Stay away!
Food.
This is amazing.
He's lying.
Certainly not.
No, you won't.
I know him.
Dance!
I wasn't.
Here they are.
Nowhere.
What is he doing?
Heads up.
He didn't.
WHY?
I'll think about it.
Big deal.
I guess not.
Your name?
Babe.
Hi, there.
Good point.
What are you doin'?
What's that mean?
Please come in.
With me.
Oh, excuse me.
A little bit.
Shall we go?
huh?
Aye, aye, sir.
I'll see you.
Ask him.
Doug.
I'm OK.
Anne.
Take a look at this.
Hey, kid.
What did you just say?
How's he doing?
Out of my way!
Another one?
Pass.
Come with us.
That was great.
Do you love me?
Find him.
It's all over.
So, what do you think?
May I come in?
That's terrible.
Fascinating.
Oh, all right.
Leave him.
Try me.
I do not.
You there?
What'd he say?
Prove it.
Like you.
What does it say?
What difference does it make?
Once.
Stop, stop.
Yuck!
Bless you.
Kill them!
Hang in there.
We won!
Let me see that.
What's goin' on?
I wonder.
How nice.
But you...
Okay, yeah.
Much better.
Shut your mouth.
Disgusting.
I know what I'm doing.
I suppose.
You're safe.
Uh, yes.
You know,
Yeah, that's it.
Step back.
You made it.
I understand that.
Jacob.
In there.
You won't.
Not tonight.
Hey there.
It's weird.
How is that possible?
No reason.
Set!
What will you do?
Hey, Mom.
You wanted to see me?
Farewell.
I can tell.
I'm working on it.
Not for me.
What's this about?
It's dangerous.
Good man.
Traitor!
Tell me the truth.
You are right.
Read it.
Oh, yeah, yeah.
I'm begging you.
Guard!
Howard.
It's her.
What time?
Give me the gun.
Thief!
AH!
Whatever you say.
Lie down.
Ya!
Greg.
She's not here.
Thanks, Dad.
Honest.
Don't ask.
I trust you.
That's not what I meant.
Oh, jeez.
Patrick.
Are you listening?
I'm fine!
Edward.
Screw you.
Who's next?
GO!
It's been a while.
Which is?
Angela.
Hey, there.
You don't believe me?
You're joking.
Don't you remember?
You first.
How can you say that?
What is happening?
REALLY?
Women.
Keep the change.
Murderer!
On the contrary.
Save me!
He knows.
Can I ask you a question?
What's wrong with that?
Yes, we do.
I'm going in.
It'll be fine.
Al.
Fun.
And, uh...
You promised.
Whatever!
Let me see it.
You gotta be kidding me.
Move, move!
Happy birthday to you
Don't touch it.
Where is he now?
Merci.
Says who?
Frankie!
I can't wait.
Maybe you're right.
That's disgusting.
To what?
She's beautiful.
Somebody help me!
Evening.
Walk.
Tyler!
I don't know you.
Yes, I can.
Are you married?
come on.
Simple.
I don't want to die.
They do.
So be it.
It's easy.
You know what I think?
Friend.
Tell me something.
Where do you live?
It's all my fault.
My daughter.
Come on, then.
At ease.
Isn't that right?
Up there.
Allow me.
What you got?
We should go.
Attaboy.
Where did you get that?
Sally!
Angel.
Cease fire!
There's no time.
It's not like that.
Stan!
Family.
Get inside.
Yes, dear.
GOOD.
Just shut up.
That's not good.
Where'd he go?
That's mine.
Hello, darling.
We're on our way.
Appreciate it.
What's with you?
How did you do that?
Look, I'm sorry.
He's okay.
Don.
Nobody move!
Look, look.
Jackie.
Where are you taking me?
Jonathan!
Shh, shh.
Have a drink.
Do you know who I am?
Louder!
Hey, babe.
Two minutes.
Mac.
That was good.
Positive.
A woman.
Move, move, move!
Yes, it does.
Admit it.
How did you know that?
So did I.
Come on, buddy.
Oui.
What are we doing here?
Charlotte.
All right, man.
And what?
Where is everybody?
Here, here.
Jessica.
He's all right.
I didn't say anything.
Oooh!
Donna.
Make way!
Of course you are.
Warning.
Where did you go?
Come on, get up.
What's he doing here?
Eva!
THANKS.
hey.
It's about time.
I'm afraid not.
Marie.
Shh, shh, shh.
Oh, uh...
Hey, what's going on?
Unless...
Waiter!
My god.
Such as?
Get them!
Retreat!
Yes, I have.
I made a mistake.
I haven't.
Hell.
Oh, Lord.
I got an idea.
You have the right to remain silent.
Yet.
It was great.
There's more.
Call the police.
My love.
Do you hear that?
You're leaving?
Why would I do that?
You're the best.
Sure, sure.
Repeat.
Told you.
I saw him.
To me.
What can we do?
You're not going anywhere.
Settle down.
Get dressed.
Long time no see.
So, what?
Thank you, ma'am.
What the fuck is this?
I'm with you.
No, no, no, no, no, no.
Try.
Don't even think about it.
Just tell me.
I killed him.
Good question.
On it.
What just happened?
Nobody!
I don't know what happened.
All set.
Yes, we are.
Gun!
We're not.
Open your mouth.
That's my boy.
How did you...
Hungry?
Penny.
I can do this.
Break!
That's interesting.
Jean.
Margaret.
Ha ha ha ha!
I'm dying.
I can help you.
Morgan.
You knew?
I really am.
You don't know me.
Champagne?
That's you.
I can't tell you.
Anybody home?
Hey, honey.
What a shame.
Carrie.
Sorry, sorry.
Inspector.
You're insane.
New York.
I'm not kidding.
I'm talking to you.
It won't happen again.
Just calm down.
I'm afraid so.
What's he saying?
My friend.
I hate it.
Duck!
D
Catherine.
Nice try.
I'm just kidding.
Lucas!
I want to show you something.
Not a problem.
Nancy.
Say it again.
It'll be fun.
Shoo!
How did this happen?
So sorry.
Martha.
Was.
Well, uh...
Good one.
You mean...
Pretty much.
Can you believe that?
Sleep well.
I've had enough.
Black.
Freedom!
Don't you worry.
Very good, sir.
Don't lie to me.
Way to go.
Don't forget.
Jennifer.
Is she okay?
Your Honor.
You coming?
Alive.
I'd like that.
Who, me?
That's not funny.
Shut up
That's a good one.
UH...
So are you.
Yeah, come on.
Harvey.
With pleasure.
Same here.
This is bad.
Yes, I will.
End of story.
thank you.
Blue.
Let's talk.
Your wife?
You're fine.
Watch me.
oh.
Married?
Let me explain.
LET'S GO.
Lucky.
Frodo!
How did you find me?
You'll be all right.
Are you scared?
What happened here?
That's perfect.
Oh, gosh.
Go to bed.
I'm off.
Do you know why?
Dylan!
No, come on.
Don't be shy.
My turn.
Duh.
You don't have to do this.
I'm a doctor.
Toby.
Shoot me.
You heard him.
Dear.
She was.
Don't you dare!
APPLAUSE
It's no use.
From what?
nder M@nkÖÖ ™
You want some?
You sure about that?
What brings you here?
In.
Lady!
Tell us.
You're lucky.
I suppose so.
Behind you!
Yeah, I got it.
too.
I KNOW.
What's yours?
It's just that...
Do you understand that?
Wait, wait, wait, wait.
Fine, fine.
Come on out.
Didn't you?
But don't worry.
He's crazy.
All right, all right, all right.
I insist.
Hold him.
You saved my life.
You're a liar.
He's back.
So do you.
Well, good.
I'll be all right.
Twenty.
I'm sorry to hear that.
The end.
Let me get this straight.
I can't sleep.
Three, two, one.
You should go.
Say...
You know her?
It's like...
All right, here we go.
Proceed.
Who did this?
Whatever you want.
Beer?
Move on.
Elena.
Hey, you know what?
I know what you mean.
Put it on.
I don't want to talk about it.
That's fantastic.
You know what that means?
Oh really?
It's none of your business.
S...
Fucker!
You're drunk.
Pop!
Olivia.
You're hurting me.
Give me a hand.
It's ridiculous.
Yeah, I am.
I win.
It's wonderful.
Hardly.
Come closer.
Kid!
Betty.
Is he all right?
What a coincidence.
Good evening, sir.
Want some?
US
Off!
Get her!
Look around.
Oh, God, no.
I heard that.
Norman.
Oh, I get it.
Bonjour.
What kind?
Got that?
I'm warning you.
That's the point.
Robin!
We don't have much time.
My husband.
Yeah, I...
Quite.
Hold on, hold on.
I don't know what you mean.
Why are you crying?
Casey.
I'm so happy.
What would you do?
That's my girl.
Smart.
WOW.
Ha, ha, ha.
It isn't.
Give me.
Zoe.
Ian.
It's simple.
Just stop.
Boring.
Kill her!
OH, MY GOD.
Now, listen.
Likewise.
Mmm-mmm.
No, he didn't.
No, we're not.
Close.
It's not possible.
It's incredible.
It's disgusting.
For sure.
Here we go again.
You do it.
Mia.
No comment.
On three.
We got to go.
Sustained.
Hang on a second.
Scared?
Oh, damn.
Why you?
Don't say anything.
Like me.
I can't help you.
Yeah, me, too.
Too much.
I know you do.
You know who I am?
On what?
Zero.
That is correct.
It's locked.
Oh, it's you.
She's alive.
Poor thing.
Is that him?
Cold.
Move over.
You alright?
I'll be damned.
That is...
I'm gonna go.
How about it?
It's not what you think.
I saw you.
Give it.
Rebecca.
Your Grace.
PLEASE.
Are you listening to me?
I don't know about that.
Why did you do it?
Pity.
Higher.
You're gonna be fine.
Please, don't.
Bollocks.
Hush.
No, why?
Don't worry about that.
Get the hell out of here.
A girl.
Catch!
Heil Hitler.
Call an ambulance!
Madame.
I know what you're thinking.
You're doing great.
Thanks, guys.
We're ready.
I said...
Ricky!
Can we talk?
Stop talking.
He'll be fine.
You promise?
But I can't.
Hi, baby.
It was good.
You know what to do.
How have you been?
I'm a cop.
I wouldn't know.
Come inside.
I'll do my best.
No no.
Yeah, whatever.
Hit him!
Kenny!
Trouble?
Well, come on.
Do?
See this?
Can you help me?
What does he want?
All right, look.
Get some rest.
Michelle.
I don't give a shit.
However...
You got him?
Business.
The best.
You're serious?
Mulder.
To do what?
Da.
Cash.
W...
Is...
Let me do it.
I was right.
Help me, please!
I didn't think so.
Have you lost your mind?
I'll see you soon.
Well, you know.
It's open.
Not a word.
I can explain.
Super.
Derek.
I don't know how.
What do we got?
Miles.
Hear that?
I'll wait.
Let's get outta here.
I will not.
How would I know?
I'm sorry about that.
Cover me.
Here she is.
That's for sure.
Come on, move!
Carlos.
What is that supposed to mean?
Girl.
There, there.
They did.
I'm confused.
Life.
Immediately.
You're kidding, right?
Gold.
l know.
What was that about?
Aaron.
Yes, I understand.
Hello, hello.
Aaaah!
I'm going to bed.
Call.
Be good.
More or less.
All aboard!
Well, you know what?
We're in.
Mind your own business.
It's a miracle.
No doubt.
Oh, I...
I hope.
Anywhere.
Fuck him.
I forgive you.
Eat it.
Let me show you.
So what do you think?
Closer.
Just breathe.
To you.
Jay!
What's your point?
Let me out of here!
He died.
Medic!
Did you get it?
I'm sorry, man.
Are you done?
So what happened?
Away!
Cigarette?
I see you.
Hey, come here.
Hmph.
Yes, Your Majesty.
Tina!
On your feet.
WHOA!
Drink up.
Oh, that's great.
There's nothing.
Tell her.
Sammy!
Yes, he did.
Ellie.
Please do.
This guy.
It's not me.
How was your day?
all right.
Any luck?
You don't get it.
Nate.
What is all this?
Evan.
I'll talk to you later.
Yikes.
I just can't.
We'll see about that.
Damn right.
Is this it?
Logan.
I'm gonna kill you!
well...
Yes, it was.
Can I help?
Heave!
Sex.
Stay still.
Let me think.
Rubbish.
No, we don't.
I want...
Strike!
I thought you were dead.
Megan.
Worse.
Sing!
Stop it
I'm sure of it.
Give it up.
What about them?
Leave us.
Justin.
Not that.
Coach.
Don't you know?
How much is it?
What does it matter?
Report.
Caroline.
Sh!
Can you imagine?
What's wrong with her?
It was my fault.
Hi, how are you?
Joseph.
And who are you?
Period.
Albert.
No, never.
Do you read me?
Where were we?
Yeah, I guess so.
Thanks again.
It's delicious.
Apparently.
No, it doesn't.
Matthew.
This morning.
Son of a...
What'd you do?
Dear God.
Who is this guy?
Free.
What are these?
See you around.
Aim!
I wouldn't.
Give me a kiss.
I'm working.
I heard you.
Down here.
That was it.
It's right here.
You must.
Barbara.
What was his name?
Coward!
Have a good night.
I'm alive.
MM-HMM.
Turn!
Goodness.
Hey, everybody.
I'm so proud of you.
Audrey.
Goddammit!
We had a deal.
Are you alone?
Umm...
Like it?
I'm cold.
No, but...
Make yourself at home.
Leave it to me.
Gloria.
What were you doing?
Dennis!
Well, okay.
Liz.
Cops!
Where did you get it?
WELL...
Was it?
What the hell is wrong with you?
So, uh...
Rob!
That won't be necessary.
Know what I mean?
I knew that.
I can handle it.
Bring it on.
April.
Down there.
You said it.
Move back!
That was close.
Call him.
They're dead.
That's strange.
We're going home.
This is important.
Travis.
In what way?
Here she comes.
Next time.
Yes, you.
Well, all right.
That was...
Sugar?
Sarge.
I'm not afraid.
You were there.
How did you get here?
Not like this.
Take me.
Tell them.
With who?
Harold.
And that's it.
The same.
Some.
Drugs?
It's gonna be all right.
That's very good.
By who?
Is he here?
That's all I know.
Knock, knock.
Thank you, Doctor.
What can I get you?
It's a trap.
Pa!
Shut the door.
Let's dance.
What am I doing here?
Everywhere.
Shut it!
What is your problem?
It's empty.
My apologies.
That's what I'm saying.
No,
I mean, come on.
Hola.
Of course you can.
It's real.
Holly.
You have to go.
She's good.
What are you trying to say?
I'm not lying.
It's nice to meet you.
It doesn't.
Get on.
It was a mistake.
I like him.
Oh, I'm so sorry.
Brad.
Loser.
Yeah,
N
Jeremy.
Ten minutes.
I'm gonna...
No, stop!
Don't listen to him.
Hey you!
We gotta get out of here.
It was nothing.
I don't know, sir.
Why would he do that?
I've got you.
Open the gate!
It's getting late.
My dad.
My man.
Mm-mmm.
No no no.
I'll do that.
Ron.
Gandalf!
Look, I...
Can't you see?
Should I?
Where the hell have you been?
Charming.
WAIT.
Get it off!
How'd you know?
I'm happy.
Say that again.
Found it.
Sorry, man.
I'll take that.
Where's the money?
Jerk.
Come down.
That's beautiful.
Thank goodness.
I didn't mean it.
See what I mean?
What are you afraid of?
Just now.
Idiots!
What are you doing there?
It doesn't make sense.
It's unbelievable.
No, you're right.
Stay right there.
Hey, stop!
Where was I?
You get it?
I've been thinking.
You're funny.
Come on, hurry up.
Please, sit down.
That was awesome.
What's on your mind?
My sister.
By the way...
Yeah, so?
That was amazing.
Fuck this.
Noah.
What happened to her?
Lunch.
Nice meeting you.
Get the fuck out!
Maya.
All right then.
Who sent you?
You were saying?
This is nice.
What the fuck is going on?
Don't kill me.
Help him!
Hi, sweetie.
Nicole.
It'll be all right.
You do that.
M...
Keys.
Go where?
Just listen.
Owen.
Nothing else.
Just in case.
Guess.
What the heck?
Jordan.
I'm dead.
Magic.
One moment, please.
See for yourself.
Listen carefully.
Put that down.
Is that correct?
We have a problem.
What is going on here?
Kiss!
Come to me.
Not right now.
Drop your weapon!
Oh, um...
Get him out!
Look,
I don't like this.
Have a good time.
Move aside.
Back to work.
Oh, oh, oh.
I must go.
It's terrible.
Who told you?
What are you talkin' about?
Kitty!
You're absolutely right.
Not true.
Does it?
That's the truth.
Who are you talking to?
Lois.
Are you sick?
Jo!
you know.
Looks good.
Natalie.
It's not right.
You ok?
It's okay, it's okay.
It's, uh...
Concentrate.
let's go.
Marry me.
Sonny.
Yoo-hoo!
I tell you what.
That's the spirit.
Randy.
You go ahead.
It wasn't.
Aargh!
Go, go, go, go, go!
He will.
What a mess.
Answer!
O.K.
The usual.
Great idea.
This is serious.
Get out of my house!
Let's roll.
Please, sir.
Yes, there is.
Put your hands up!
Sounds great.
SORRY.
D'oh!
Walt!
Fifteen.
Sold.
Jill!
I made it.
May.
Pretty.
Can I talk to you?
What makes you say that?
Leave us alone.
You're out.
Play.
Tell me what?
Yeah, you do.
Bro!
Teddy!
What are you thinking about?
Hey, boss.
Excuse me, ma'am.
Sid.
You know how it is.
Someone!
Now, look.
I'm exhausted.
The money.
On my way.
Yeah, you.
Jackson.
Go get him.
Chicken.
No, I'm serious.
Sí.
Why now?
I never said that.
Tara.
What the hell is going on here?
That hurts.
Parker.
All right, guys.
That'd be great.
Ruth.
You serious?
Get some sleep.
I'll handle it.
But now...
And why?
War.
Wish me luck.
I won't be long.
Go inside.
Up here.
You asshole!
Don't leave.
What about this?
Yes, she is.
Give me the keys.
Maybe later.
This is my house.
Present.
Keep it up.
My fault.
You're done.
Todd.
Are you drunk?
Two years.
Give me the phone.
Two weeks.
Go back to sleep.
Shut it down.
Dana!
Cole.
Wait a moment.
Let's hear it.
Aw, come on.
No good.
Nothing more.
What are you staring at?
You know what I'm talking about.
I changed my mind.
Oscar!
Oh, that's good.
Go fuck yourself.
What's that smell?
It's a...
On the ground!
Hey, sweetie.
I'll be in touch.
Is she all right?
She does.
Do you remember me?
Let's get started.
Keep quiet.
What the fuck was that?
Holy...
Good heavens!
Gus!
Cheese.
Yes, Father.
Breakfast.
What am I?
Steven.
Are you fucking kidding me?
Don't get me wrong.
That is all.
No, it's all right.
Daisy.
Well, let's see.
We're friends.
In a minute.
Uh, excuse me.
Manny!
Yes, boss.
O...
Of course I did.
I don't know him.
Earth.
Ashley.
Welcome aboard.
Friday.
No, you don't understand.
I get that.
Ah, shit.
T
Sharon.
Not for long.
How do I know?
Sorry to interrupt.
Where's that?
I'm going with you.
It'll be okay.
Not any more.
Ellen.
Wendy.
Yeah, you did.
Give it here.
God damn!
A man.
Heh, heh.
What the fuck are you talking about?
Oh, cool.
Why are you doing this to me?
Catch him!
What are you laughing at?
Not like that.
Nothing yet.
I'm terribly sorry.
Yeah, why?
Did you hear?
Just me.
What are you doing in here?
Yeah, no.
You again?
Pick up.
I live here.
He won't.
NOW!
Malcolm!
Great job.
I'll come with you.
Just fine.
Come on up.
Eli.
It's not that simple.
About?
My mistake.
Now, wait a minute.
What did they say?
I don't see anything.
Good luck with that.
You're coming with me.
Oh, don't worry.
You're an idiot.
Pay attention.
Y...
Cassie.
Lana.
Marco!
Yeah, exactly.
E
Here, take this.
I'm not interested.
I cannot.
Twelve.
It's a deal.
All done.
No, I'm...
Well, thanks.
That was fun.
Really good.
Keep looking.
You did this.
Let's get going.
What's this all about?
I almost forgot.
What do you want to know?
You didn't know?
We need you.
And that?
There he goes.
Step aside.
Sandy.
Hi, Daddy.
Be patient.
I don't have it.
I have something for you.
Hey, how you doing?
Never again.
It doesn't make any sense.
Alicia.
Don't look at me like that.
I really don't know.
So what do we do?
You did good.
Nice job.
Why are you laughing?
It's urgent.
Let's find out.
Looking good.
Nora.
Revenge.
You don't remember?
I swear it.
Tell me what happened.
That's sweet.
Anyone else?
Operator.
My lady.
Give me a minute.
How would you know?
By whom?
Did something happen?
Oh, there you are.
I'll say.
It's just
Oh dear.
It's all yours.
It's a joke.
Ken!
I'll drive.
Well, why not?
You listen to me.
Answer the question.
Uh, okay.
Love it.
That's what he said.
Fish.
I've...
Patience.
Wilson!
I want it.
What can you do?
What was I supposed to do?
Let me through!
Aigoo.
Hercules!
That sucks.
Why would I?
It's stuck.
Nice and easy.
Yeah, OK.
Junior!
Pull up!
You know, I...
Are you deaf?
Stanley!
Why would you say that?
Good night, sir.
Where's he going?
I can take care of myself.
Aw, shit.
Gee.
Here's the thing.
You want it?
Louise.
Clara!
I don't think...
Ronnie.
Come on, son.
Get over there.
It's time to go.
Mitch.
Very impressive.
See you tonight.
I warned you.
Don't run!
You see this?
Problem?
What's...
Please don't do this.
This is unbelievable.
What was that all about?
Thanks, Mom.
Eve.
It's my job.
Stop them!
Who did?
Just like you.
Not enough.
We need your help.
Is she?
Not to me.
What's it to you?
You hear?
Don't talk.
Chug!
I got her.
Richie!
No, it's...
We'll be fine.
SURE.
Spit it out.
Janet.
Sick.
You're mad.
He's got a gun!
Don't touch that.
I-I...
Lou.
Makes sense.
Thanks for everything.
It's your fault.
Completely.
Truly.
You go first.
How did you get in here?
It's fun.
No time.
Veronica.
Oh, you...
Mercy!
What's that for?
Who did it?
I got one.
Let's have a look.
They don't.
My name?
Hmmm.
Congrats.
No fucking way.
You're up.
Your son.
Gordon.
I could.
Here goes.
What do you expect?
Call 911.
Well, hello.
Come on, Dad.
I want to know.
See you then.
Tracy.
How are ya?
Mnh-mnh.
We'll talk later.
We're running out of time.
I've got an idea.
You don't like it?
Your brother?
Party!
No, that's okay.
A bit.
That's a good question.
Diana.
What's the plan?
What did you think?
Just a little.
But no.
Take a deep breath.
Woo-hoo!
I'll kill him.
Mikey!
Gently.
Why not ?
Danger.
It's not a big deal.
Ali.
Tired?
Literally.
It's them.
America.
Talk to him.
Happy Birthday.
I'll talk to him.
Look at us.
I'm waiting.
Anthony.
Pathetic.
What are those?
Oh, OK.
Emergency.
I think not.
Could you?
Piece of cake.
You motherfucker!
Get back to work.
Where'd you get that?
Am I wrong?
Jealous?
I was scared.
What would you like?
I'm innocent.
How's she doing?
I need a drink.
Taylor.
You can trust me.
We love you.
Hell no.
Oh, no, no, no, no.
I can't see anything.
I don't believe that.
Do not worry.
Yeah, fine.
Do you see?
London.
Green.
Raymond.
Stephen.
Christine.
Come here, you.
Rita.
Scram!
We have to get out of here.
That's a great idea.
That's incredible.
Bad news.
Vince.
Over and out.
It's an emergency.
Are you sure about this?
See what?
He's mine.
Light.
Save it.
Whee!
That's more like it.
You kidding?
No, sorry.
I've seen it.
Busy.
By all means.
It's lovely.
Take her.
Explain.
Why don't you?
Do not.
OW!
Please leave a message.
Any time.
How bad is it?
Jones.
Watch your head.
You're bleeding.
What about us?
I won't do it.
I'm not crazy.
Good to know.
Are you afraid?
Six months.
And why is that?
Get up there.
Not a thing.
I have no idea what you're talking about.
I trusted you.
Go on, then.
There's no way.
Eleven.
YOU.
This is awesome.
Coming up.
Well, that's good.
What to do?
All right, that's it.
Get moving!
What are you guys doing?
Genius.
She'll be fine.
You came.
Here I come.
It's not safe.
It did.
It's gonna be fine.
You suck.
Who is?
Cut it.
It won't work.
Did you see it?
That's insane.
Bring it.
Two days.
You deserve it.
I'll be back soon.
Connie.
Where the hell are you?
Are you joking?
All rise.
This sucks.
Sweet dreams.
Let them go.
That would be great.
Allison.
It's a boy.
Let me try.
Connor!
Right, sir.
Why am I here?
Felix!
Shane!
Just leave me alone.
Of course, sir.
Seth.
Stop, stop, stop.
You're still here.
Caesar!
Oh, Jesus Christ.
I'm great.
Do not move!
Open it up.
Oh god!
Where you goin'?
I have a plan.
Smoke?
From where?
Oh, look at that.
Get to work.
I don't blame you.
Come here, come here.
Come on, please.
You know that, don't you?
Do you know her?
Monica.
Well, um...
Didn't I tell you?
My dear.
Even better.
It depends.
Drink it.
EXCUSE ME.
Hope.
Fly!
No, it wasn't.
Judy.
UM...
Yeah, I'm sure.
No, seriously.
I bet.
I like her.
It's the only way.
They're fine.
Granny!
This is incredible.
No matter.
You can tell me.
I think you're right.
Wait for it.
I know how you feel.
Shawn.
She died.
Dunno.
Ta.
Meaning what?
Just hold on.
Somebody help!
Let's just go.
Truth.
Monsieur.
Phone.
You've got to be kidding me.
Did you know?
You got this.
That's us.
Yes, exactly.
Can I get you anything?
Eww!
This is not good.
What are we waiting for?
So good.
We're okay.
OH, YEAH.
Definitely not.
Is this a joke?
Stop this!
Enter.
Bonnie.
Knock yourself out.
Now, now.
Who's she?
Thank you for your time.
We all do.
But I do.
You understand that?
From who?
Quinn.
Francis.
I remember you.
Them.
What shall we do?
why?
Excuse me, please.
No, she's not.
Bye bye.
I really don't.
Hop in.
What's up with you?
I didn't mean that.
Okay then.
That's not right.
Okay, go.
Okay, sir.
Put this on.
You could say that.
Elliot.
That depends.
Chill.
Try this.
What's wrong with me?
Nicky!
Are we clear?
I'm staying.
And why not?
A week?
That hurt.
I'm thinking.
look.
Three years.
It's not important.
I will kill you.
Hands off!
HERE.
You two.
Sebastian.
And so?
Cat.
You won.
Come in, please.
Okay, guys.
I'm thirsty.
Three days.
I'm so excited.
Nothing to worry about.
Hey, where are you going?
I have no choice.
Begin.
Oh, fine.
I'm sick.
You were?
What's wrong with it?
We all are.
Pfft.
It's so beautiful.
Rocky!
Whore!
That is not true.
What up?
You love me.
Please wait.
You're safe now.
We don't have time.
Is that understood?
That was me.
Hey, you guys.
Death!
No, it's not that.
I'll tell him.
Don't say it.
You wouldn't.
How can I help?
Why are you telling me this?
Where are the others?
We can.
Look there.
It's no good.
She's okay.
Do you hear?
SO...
Do you know that?
Let me ask you a question.
Stand still.
Good to meet you.
Arrest him!
Actually, no.
What a pity.
I can help.
This is all my fault.
I need to know.
You lied.
Mrs.
How do you know my name?
It's very important.
Just once.
What am I going to do?
Mickey.
Julian.
Take me with you.
I couldn't sleep.
Just you.
Run away!
You remember that?
Well then...
Not interested.
Spread out!
No, that's not it.
You crazy?
Did you hear what I said?
We're...
What is the matter?
He's out.
I don't want to go.
That's odd.
Respect.
Think so?
On.
I don't want to know.
Uh, I don't know.
Samantha.
He left.
Where did she go?
It's not him.
Grab him!
I hope you don't mind.
Dog.
I know, but...
Oh, what?
Please leave.
Well, I do.
Lies!
Beats me.
No sir.
I'm free.
OOH!
Yes,
It's horrible.
Someone's coming.
June.
Serious?
You look tired.
I can't take it anymore.
Yes, madam.
What do they want?
This is fun.
Holy cow!
Well, of course.
You need help.
Come on, girls.
Nice one.
Ross.
Never mind that.
Yeah, I'm okay.
You should be.
You're amazing.
You're nuts.
About time.
All righty.
Have you seen him?
Here's the deal.
Is this true?
This is wrong.
Don't laugh.
I'll let you know.
Wine?
Is that what you think?
I'm not surprised.
I disagree.
Come and get it.
Are you sure about that?
Leonard.
You shouldn't be here.
They're everywhere.
Fabulous.
Look around you.
Where did you come from?
I'm glad you're here.
Look over there.
Subtitles by SDI Media Group
I say!
Big.
Move along.
The girl.
What have we got?
March!
One day.
Not sure.
I just did.
Okay, listen.
I have it.
What happened to your face?
What if...
Aagh!
Buffy.
There's nothing here.
Not him.
Stop crying.
Yes, Captain.
Everything will be fine.
I'm not gonna hurt you.
I'm outta here.
Why didn't you?
Satisfied?
I'm so tired.
Oh, shoot.
Cheer up.
Not even close.
Sire.
We have.
Come on, you guys.
We're done here.
You can go now.
Pizza.
Pow!
Slow.
I have to go now.
Moron!
Hold me.
To us.
You were great.
Both of them.
Jen?
Not long.
You got to be kidding me.
I'll be here.
I can't stand it.
OHH!
l'm sorry.
Why did you come here?
I got...
Unfortunately.
Well, what do you think?
I'm not so sure.
The door.
Look at this place.
What did you expect?
To who?
You just...
Never heard of him.
Speech!
Okay, that's it.
Heather.
No, I just...
What do you have?
That's easy.
Robbie.
To whom?
All good.
Be cool.
Salute.
I wanna go home.
What does this mean?
How can you tell?
I'm sorry I'm late.
B
Who are these people?
Gwen.
Start!
Overruled.
Until now.
Lena!
That's nothing.
Same thing.
This is me.
That guy?
Nice shot.
There's no need.
Let's go inside.
That's what I do.
That's awful.
Yes, hello.
Sorry to bother you.
It's not that bad.
Gorgeous.
Would you mind?
man.
All right, thanks.
Director.
You did the right thing.
That doesn't make any sense.
Is that all right?
Where are you now?
It's your turn.
What did he want?
He's my brother.
Afternoon.
Neil.
It's right there.
Right over there.
I saw.
He's a good man.
Let me see your hands!
Milk?
We're closed.
Go get it.
Don't touch anything.
What are you doing out here?
You did what?
Everything is fine.
Don't start.
How much longer?
Now listen.
Take them.
Fire in the hole!
I've had it.
I do not understand.
Oy.
Outstanding.
Phoebe.
Is it good?
Becky.
Victory!
You owe me.
Come in, come in.
Yes, I think so.
They're beautiful.
What're you talking about?
My leg!
Well, I'm sorry.
Get him up.
I don't know where he is.
What is the matter with you?
I love that.
Every time.
He's my son.
I'll explain later.
It's fantastic.
Time out.
How long have you been here?
Is that a problem?
Um, yeah.
We can do this.
Gabriel.
Drop your weapons!
Fear.
There's...
Got to go.
I'll do anything.
That's a shame.
Did it work?
Please, stop.
Neither.
All.
Justice.
Sign here.
No matter what.
Willie!
Join us.
YES, SIR.
Did you see?
Wait a sec.
Let me tell you.
It's strange.
Kill it!
It will.
Hold on a minute.
Come on down.
Please go.
Suicide.
Hands in the air!
Look what I found.
Say again?
I knew.
Come on, girl.
We were.
Working.
Vic.
Will you shut up?
You got that right.
White.
Oh, damn it.
That's different.
I can't move.
I don't understand it.
Rosie.
Hector!
Caleb!
Go in.
Just you and me.
Marvelous.
Take my hand.
Liam!
Thanks, buddy.
You may go.
Do you think so?
How do you like that?
Depends.
Hail!
MMM.
And I'm sorry.
You killed her.
So beautiful.
You need me.
Miranda.
I know everything.
But of course.
Aw, man.
Gina.
What's it about?
You wouldn't understand.
My boy.
Ay!
Stay put.
Fifty.
I need it.
What's he talking about?
Voila.
Thank you for everything.
Get it out!
Not to worry.
Jules.
Get her out of here.
It's awful.
Tess.
I'll meet you there.
It's different.
Game over.
What does it look like?
Can you do it?
Sis!
Checkmate.
Theo!
It is true.
We"?
STOP!
How you been?
Heh heh.
That's cute.
Bye, Dad.
Are you crying?
What are you wearing?
And guess what?
Listen, listen.
Kidding.
Whiskey.
If you want.
A little more.
I'm in a hurry.
THE END
Are they?
I've been looking for you.
Come quickly.
Apparently not.
Thank you, gentlemen.
Nothing much.
Don't give up.
What are you trying to do?
Let's get to work.
Um, no.
Watch yourself.
It's happening.
Clearly.
Hey, how are you?
She's coming.
It's dead.
Let's take a look.
H...
You're wasting your time.
Please, come in.
Are we?
What was her name?
That's my job.
I already did.
Guy!
It's really good.
I'm curious.
My mom.
Yeah, no problem.
That doesn't matter.
Stay close.
Same.
I was thinking...
First...
I should have known.
How does it feel?
I'm stuck.
Debbie.
Anything at all.
I hate him.
Goal!
You're home.
Don't be late.
You're out of your mind.
Very interesting.
That'll do.
I'm worried.
Right away, sir.
Yeah, great.
Yes, I'm fine.
Do you know what I mean?
When was that?
King!
It's not good.
It's all there.
How did it happen?
Ssh!
Let me finish.
I'm sorry, I'm sorry.
Not that I know of.
Hey, Mike.
Yeah, sorry.
It didn't work.
President.
Let's go back.
She's not.
Where'd you go?
Meow.
Fuck, man.
♪ Men. ♪
But I didn't.
So, um...
Trick or treat!
You want a drink?
What money?
I mean, I...
Keep it down.
Have a look.
Yes, they are.
Karl.
Open this door!
What is it now?
Yeah, good.
What things?
Show yourself!
Yes, that's it.
Change.
Thanks so much.
Let's play.
You'll be okay.
We need help.
A boy.
Yeah, you are.
Horrible.
Au revoir.
Gladly.
Word.
Blake.
That's not...
It's bad.
Looks like it.
Just a sec.
I'll miss you.
No further questions.
Yeah, it's me.
Get on the ground!
Where you from?
Kara.
Will you help me?
Look at yourself.
Bye, Mom.
Put it away.
That was you?
For?
And what's that?
And I love you.
Wade!
I'm, uh...
Hands!
I mean,
You don't know him.
He's my friend.
Let me help.
That's why we're here.
Ann!
It's just me.
Well, what is it?
Ivan.
No, you.
This is different.
Flowers.
Normal.
Have you gone mad?
For fuck's sake.
Admiral.
I don't have time for this.
Riley.
Yes, Doctor.
She knows.
You're early.
Whose?
Voilà.
Oh, that's nice.
How did that happen?
We'll be in touch.
Rest.
You're sorry?
Moving on.
Majesty.
Excuse me, miss.
Yeah, go ahead.
I am fine.
Well, what?
It's a pleasure.
Everything's gonna be fine.
Thanks for your help.
It's not you.
Yeah, I'm good.
All right, boys.
Nervous?
Senator.
I've never seen anything like it.
What happens?
Monday.
Hand it over.
Yes, you're right.
Can we?
That was a long time ago.
Step on it!
Can I go now?
Hey, Joe.
And what about you?
He's still alive.
Homer!
Shit, man.
Just take it easy.
Sit down, please.
Chocolate.
You're so beautiful.
It was him.
Wife?
Oh, here we go.
Hey, Jack.
I'm not leaving.
Nice place.
Sure, why not?
Apologize.
I'll get him.
Bye, guys.
You don't know what you're talking about.
Who was he?
You don't have to do that.
What are you guys doing here?
The baby.
Barely.
Nicholas.
Yes, Chef.
You're the boss.
I was worried.
Grab it!
Fucking...
That's just it.
What's that noise?
Scotty!
I'll tell you later.
No, Dad.
What does he do?
That sounds good.
Walk away.
I need...
Please, please, please.
It's no problem.
That's not gonna happen.
Sydney.
Hup!
Hurry, hurry!
But you didn't.
Keep your voice down.
I can see it.
It's not here.
Wayne.
Your husband?
Come this way.
I'm not scared.
Do you think?
I repeat.
Lights.
Nobody knows.
Please don't go.
You kidding me?
Enjoy it.
Don't touch him!
Christian.
Morning, sir.
What the fuck is wrong with you?
Lydia.
Hurray!
I'm not stupid.
Come on, move it!
Don't let go!
It's too much.
Trevor.
Somewhere.
This is all your fault.
You lie.
I'm driving.
It doesn't work.
It's embarrassing.
And for what?
Ready to go?
You're pregnant.
Empty.
All right, okay.
Sit here.
Don't come any closer.
I'm married.
NYPD.
Get on with it.
You want one?
It's there.
Would you like a drink?
We're late.
Please come.
Yes, sure.
This is terrible.
Pussy.
Ana!
Snow.
Good to see you again.
Good, good, good.
Do you trust me?
What is she doing?
I got it, I got it.
I'm going out.
What the hell does that mean?
Can I talk to you for a second?
It's not bad.
Yes, my lord.
That's what it is.
Where is everyone?
Oh, yes, of course.
No, I wasn't.
Cindy.
Hello, there.
He said...
Please, help me.
Vanessa.
It's stupid.
You would?
Oh, for God's sake.
We got a problem.
Whatever it takes.
You don't know anything.
You bastards!
These?
Freddy!
It's a gift.
What is it you want?
It was a joke.
Heh-heh.
Easy now.
Different.
He told me.
Where did they go?
Thanks to you.
God bless.
I don't understand you.
The key.
It's on.
Something's not right.
Just say it.
Victoria.
Stop there!
And here.
Imagine that.
Sue.
Oh, no, you don't.
Brenda.
A pleasure.
Violet.
Do as I say.
Now get out.
Woman.
They're all dead.
No chance.
I'm doing it.
Girlfriend?
Ned!
I don't smoke.
Put it back.
C
My family.
Lenny!
Joan.
You fuck!
Hello, boys.
My eyes!
Rudy!
House.
That's what I want.
She's pregnant.
Feeling better?
Give me a second.
Shoot it!
I doubt that.
Where we going?
It's awesome.
Neither did I.
I can't tell.
Which?
American.
An accident?
Please sit.
I don't need it.
I wanted to.
I missed you so much.
Katherine.
We're clear.
Shush!
I'll see you there.
Did you see him?
Pull yourself together.
Oh, you know what?
You really think so?
Then what is it?
Anybody here?
How can you be so sure?
Just the two of us.
Sasha!
Tomorrow night.
Like who?
Here I go.
Let me talk to him.
Keep talking.
Oh, hell.
I really appreciate it.
I don't know what that means.
Ruby.
He said that?
It wasn't your fault.
Be nice.
And action.
Just forget it.
I see him.
Hal.
They're not.
What's it say?
I told him.
Hear me?
Don't just stand there.
You're free.
Next week.
Stella.
One hour.
Blimey.
None taken.
Okay, cool.
And, um...
Did you miss me?
It really is.
Adrian.
Carmen!
Where is she now?
You're a genius.
I can't take it.
It stinks.
Yes, Mother.
Hear!
Well, sure.
Magnificent.
It's not mine.
Confirmed.
Power.
What are you reading?
If you'll excuse me.
Long story.
Tsk.
Awful.
Come here, boy.
Were you?
It's not enough.
Lance.
Behold!
What do you think of that?
Come on, kid.
It's a lie.
I have a question.
Okay, so...
That's none of your business.
Absolutely nothing.
I loved it.
Bring him in.
Five years.
Hard.
Don't lie.
I don't think so!
Use it.
Jessie!
Bo!
Are you leaving?
Oh, stop it.
All right, listen.
Get a move on!
but...
Feel better?
Where'd you get it?
I-I don't know.
PHONE RINGS
Yeah, really.
I owe you one.
Yes, chef.
Saturday.
Brothers!
Yes, I...
Grandfather!
Take it back.
Yes, I was.
I wish I could.
Woody!
Why are we here?
It won't.
Let's go, guys.
Yes, I'm sure.
Dale.
Okay, sure.
Check it.
Yes, Your Honor.
Last chance.
I know you are.
Joy.
Smith.
You said...
Any news?
My what?
Leave it alone.
I have to tell you something.
How did you do it?
Keith.
What's the deal?
All right, thank you.
Now come on.
It's a girl.
Seventeen.
How could I?
Cal.
Dig.
Rodney!
How's this?
Let's go in.
Send him in.
We have to do something.
Please be seated.
Fuck, yeah.
Lauren.
You're gonna be all right.
A long time ago.
Watch your mouth.
Not mine.
Beg your pardon?
My darling.
This is my home.
Husband?
Show me your hands!
Rory!
Leon.
No, I don't know.
Move in!
Ah, yeah.
How old is she?
For everything.
Uh huh.
Okay, wait.
We'll be right back.
Oh, here.
What are you doing, man?
Pain.
In fact...
What have we here?
We have no choice.
Everything's okay.
I can hear you.
Angie.
All right, now.
Oh, nice.
Hey, Charlie.
Don't call me that.
Hello, everyone.
This is stupid.
Speed.
Don't touch.
Yummy.
Thank god.
Get off him!
Bones.
LOOK.
Cut the crap.
We're sorry.
Your daughter?
Sir, yes, sir.
Sleep tight.
I didn't know what to do.
That's what you think.
Elaine.
Take him out.
Okay, I got it.
No, what?
Hey, you okay?
Don't you agree?
How ya doin'?
I can't go.
Freak.
But, uh...
What's it called?
Hoo!
Me either.
This isn't right.
Barney.
I got nothing.
Where will you go?
When did this happen?
I'm sorry, what?
What do you mean ?
Tuesday.
She's lying.
So what now?
See you there.
How do you do that?
You know what this is?
What is this about?
How can that be?
No, I did not.
Oh, you know.
She's great.
Yeah, hi.
WHAT ARE YOU DOING?
And again.
Swell.
I'm getting married.
Oh, dear God.
Dawn.
Let me show you something.
Not guilty.
Neither am I.
Keep walking.
I'm still here.
There's nothing there.
Pleasure to meet you.
Thursday.
Candy.
Get the fuck off me!
Benjamin.
Of course you did.
I'll handle this.
That's for you.
Yeah, thank you.
Ripped By mstoll
He's cute.
Take it away.
It wasn't my fault.
What did you tell him?
Lucky you.
Hans!
So, what happened?
No, listen.
What was that for?
Oh, yes, yes.
Mission accomplished.
You're telling me.
Isn't that great?
That's the thing.
GREAT.
How sweet.
You wish.
Stop her!
I can't do this anymore.
He's on his way.
Where'd you get this?
Fiona!
I'm up.
Yes, you will.
It's not real.
Be honest.
Hanna?
Allright.
It was horrible.
Hi, sweetheart.
On the floor!
Yes, well...
Find her.
At least.
Cathy.
She's all right.
How do you do it?
No, we can't.
Mexico.
How old is he?
Abort!
Andrea.
You're next.
Drink this.
OH, NO.
You lost.
As you were.
No, no, no, no, no, no, no.
This can't be happening.
Cancer.
I didn't kill him.
Who the hell is that?
Lewis.
He can't.
I'm hit!
One at a time.
Bring it in.
Nothing special.
Bottoms up.
I don't want to hear it.
Heads.
Marshall.
Mine too.
It was fun.
That was fast.
FINE.
Do you know where he is?
Pig!
nbsp
Lost?
You heard.
Yes, thanks.
Diane.
That sounds great.
You're not serious.
With whom?
I should.
I feel...
Do you love him?
Is that good?
Never heard of it.
He doesn't.
No, I got it.
Find it.
Live!
NOTHING.
I might.
Hey, fellas.
Uh, sure.
It's a secret.
Then what happened?
Never better.
Dr.
Mason.
Pam.
Cameron.
I screwed up.
Let's begin.
Dangerous.
Yeah, absolutely.
Fuck you, man.
Oww!
I don't need your help.
Yes Sir.
I'm cool.
Nice to see you again.
Holmes.
I'm asking you.
What do we have here?
Are you threatening me?
Where the hell is he?
How about now?
I don't have one.
What's that about?
Questions?
We're coming.
Before.
Melissa.
So soon?
Answer it.
Me, neither.
Tomorrow morning.
You're disgusting.
Thirty.
Come on, hurry!
It's not too late.
You're on your own.
Just stop it.
Contact.
I have something to tell you.
We don't have time for this.
Carla.
I saw her.
Thank you, doctor.
Good luck to you.
Yeah, why not?
Oh, brother.
Zack!
Ralph!
Do you know what?
I got something for you.
Duke!
Murdered?
No, they're not.
I've been there.
Some other time.
So far.
I'm calling the police.
That's your problem.
See you in the morning.
All the way.
Yes, I would.
Of course I will.
Gas!
Oh, geez.
Say yes.
Stefan.
Oh, it's okay.
He's all yours.
Aye, Captain.
Let's move it.
You're married.
Hey, Sam.
Long time.
Straight ahead.
How long has it been?
School.
Out of the question.
Watch him.
Yes, it's me.
Move away.
What's she doing?
Take it or leave it.
I'll be okay.
Quite right.
I already have.
You look nice.
Help me out.
I'll see you tonight.
I'll be waiting.
Ash!
Alright, alright.
Sure you do.
I believe so.
That's horrible.
How can I?
Ice cream.
Go right ahead.
Lock the door.
You have to believe me.
Don't be like that.
He was here.
What, what?
Iris.
Russell!
Speaking.
I want to help you.
Everything's gonna be okay.
Surrender!
I'm finished.
That's absurd.
I thank you.
Benny!
Booth.
Hi, everybody.
It sucks.
You're not alone.
Claudia.
Alfred.
Lights out.
Don't get up.
Please hold.
It's over there.
Grazie.
If you like.
Bud.
It's a surprise.
Rich.
I'll get back to you.
Don't ask me.
It's all your fault.
Where is that?
Hear what?
I am here.
She's crazy.
Lola.
I don't have time.
Holy fuck.
Your sister?
Don't talk like that.
What of it?
How are you today?
This is your fault.
It's broken.
Please hurry.
Ask her.
What was I thinking?
Fine, thank you.
I know her.
Antonio!
Yes, we did.
Extra!
Try it again.
We didn't.
I see that.
What's he like?
Let's see it.
Boyfriend?
They're good.
Ho, ho, ho!
To the right.
There's something else.
You shouldn't have.
Well, guess what?
Your what?
Say no more.
They're...
Well, I don't.
It's very simple.
I've missed you.
Eventually.
It's not worth it.
Yeah, it was.
There's nothing I can do.
What a waste.
How'd you do that?
Pierre!
Which means...
Poor guy.
Why are you looking at me like that?
My car!
Be right there.
He's not dead.
Clean.
Quit it!
Come now.
Touchdown!
Are you here?
Not ever.
What're you doing here?
Figures.
Your attention, please.
Lawrence.
If you don't mind.
To...
It's hard.
I'm bored.
I'm joking.
Well, that's great.
Another?
Sad.
Wait, no.
Throw it!
Three months.
This is my fault.
Good day, sir.
What more do you want?
Where were you last night?
I'll go first.
Any ideas?
All right, listen up.
But this...
What'd she say?
No, they don't.
Make yourself comfortable.
My child.
You're making a mistake.
As usual.
I wouldn't do that.
Kay.
I'm so scared.
Philip.
Kill them all!
Who did this to you?
Stop fighting!
No thank you.
Yeah, what?
Come on, everybody.
Quiet, please.
What's the rush?
No, I'm okay.
You saw it.
Where do you want to go?
What do you...
What guy?
Oh, absolutely.
I'll see you around.
Did she?
Where're you going?
For us.
I feel good.
Anything wrong?
Can I get you something?
Call me back.
I don't know what it is.
Very clever.
Let's get the hell out of here.
Cooper.
Grow up.
I'll just...
What thing?
What the hell do you think you're doing?
Don't go anywhere.
G
Oh, darling.
Whoa, whoa, whoa, whoa, whoa.
Okay, I'm sorry.
Hold that.
Everybody down!
I like it here.
How much do you want?
It just happened.
Sure you can.
Not there.
what are you doing?
What the fuck, man?
Why do you care?
It's hard to say.
She's pretty.
This is yours.
I'm going to kill you!
Give me a hug.
He was a good man.
Showtime.
Screw it.
Oh-ho!
Be strong.
We're back.
you.
I really...
Shoes.
Your choice.
What's it?
It's very good.
Meredith.
Something happened.
Oh, yes, sir.
It's obvious.
Meg.
Come on, Jack.
It's clear.
We have to talk.
Sorry, guys.
What's in it?
Well, now.
You're free to go.
Is there?
I'll be right down.
You can say that again.
Are you blind?
You're pathetic.
I hate this.
Damn straight.
I can imagine.
Yeah, I remember.
You must be joking.
Get over it.
Chill out.
Yeah, you too.
We'll find him.
Late.
Salud.
Hey, mister.
Typical.
SDH]
Look up.
You piece of shit!
Craig!
Keep your eyes open.
I'm positive.
Yahoo!
Sure, yeah.
Fix it.
A month?
Make it quick.
Rats!
Hell yeah.
He's sick.
I feel it.
Hello, everybody.
Are you finished?
That is true.
When was this?
Scully.
Objection, Your Honor.
Paper.
You heard the man.
Are you with me?
Yee-haw!
Be safe.
That's bad.
I'm worried about you.
You saved me.
Get your hands up!
I'll see you then.
It was a long time ago.
There's a difference.
NO, NO.
I'll take care of this.
I asked you a question.
Chicago.
This is real.
Silly.
I've gotta go.
Auntie!
It's so good to see you.
Hello again.
I'm not worried.
BYE.
One, two, three, four, five.
Hey, girl.
I don't wanna die.
It's wrong.
Amber.
We don't know that.
K
What's in there?
Isaac.
Do you speak English?
Batman.
Thank you, Father.
To where?
Ten seconds.
Take.
What happens now?
How bad?
Can't wait.
Finn!
Something else.
Clay.
What an idiot.
What's it like?
Anybody else?
Want a drink?
How was that?
Eat up.
Em?
It sure is.
What did you find?
Faith.
Well said.
You wait here.
Yeah, yeah, yeah, yeah.
Can I see it?
He's dying.
We're working on it.
Is there anything else?
Don't die.
Nemo!
Well, I'm not.
Marriage?
It's huge.
All right, that's enough.
Please let me go.
Ah, no.
A toast.
I can see.
Sorry to keep you waiting.
I'm happy for you.
I'll take you.
Leslie.
Paige.
Come here, baby.
Make it stop!
I'm not mad.
Spike!
Don't be a fool.
This is weird.
Isabel.
Sandra.
You believe that?
Can you walk?
Get on your knees.
It's raining.
Finish it.
Surprised?
My head.
That son of a bitch.
Superman.
Leaving?
Not one.
Adios.
That's what I mean.
It's not a problem.
This is perfect.
Let's go, come on.
Gibbs.
Look who's talking.
Alexander.
Cool it.
I didn't mean...
I'll bet.
Are we there yet?
Your friend.
Let's move out.
No, honey.
Second.
Wallace!
Don't touch her!
Did...
Burn it.
Besides...
Pull it.
Now, go.
Evelyn.
First things first.
I'll be right with you.
A little?
Afraid?
Don't go away.
Get us out of here!
Sherlock!
Yes, he does.
Jonas.
Do you know what that means?
I'll take it from here.
Marion.
Place your bets.
I'm so glad.
About me?
Just a little bit.
Then don't.
Oh man.
I've been waiting for you.
Alison.
Yeah, let's go.
I'll do it myself.
What's the occasion?
Clever.
SHUT UP!
I can't say.
Bruno!
California.
I already told you.
A few.
I'm gonna die.
He was right.
Well, maybe.
They will.
We can't do that.
Forget that.
Ball!
SHIT.
All the best.
Is that a fact?
Are we done?
I owe you.
I liked it.
You're very kind.
It is not.
Plenty.
Anything you want.
I know what it is.
I have to talk to you.
You're too late.
You look...
You're probably right.
I don't really know.
Let's get him!
Dorothy.
It's a shame.
Calm.
I'm not doing it.
Slut!
It was beautiful.
What are you doing now?
Acknowledged.
So much.
Irene.
Ten years.
Well, what do you know?
The future.
All right, good.
We're trapped.
Just listen to me.
Can I go?
Liv.
Room service.
She didn't.
I'll call you tomorrow.
It's okay, baby.
Only one.
You can't leave.
Nothing, nothing.
You're awake.
It was amazing.
This is mine.
What is he saying?
Back it up.
Man down!
He's great.
This is too much.
What is wrong?
It's on me.
Is there anything I can do?
Reload!
You know what that is?
Mick!
She left.
Helena.
Number one.
At all.
Are you nervous?
Hey, Frank.
Your...
Be still.
Oppa!
Oh, yeah, sure.
Coming right up.
I found him.
Not always.
wait!
A baby?
Hey,
I believe.
Very well!
Let me look at you.
Sixteen.
Yaah!
I don't see it.
We need to go.
That's a relief.
Why are you still here?
I'll be back in a minute.
What do you suggest?
All right, everybody.
I'm coming in.
What girl?
I surrender.
Did you like it?
Troy.
Bella.
I can't believe you.
Artie!
Is that possible?
That's the plan.
Hey, boy.
What are they saying?
Does he?
Well, good night.
Fucking bitch!
You know the rules.
That's the idea.
Where've you been?
Someday.
Wally.
Sexy.
You're hurt.
What are you getting at?
Do you know what this is?
Ladies and gentlemen,
You like?
Imagine.
Lets go.
Mmmm.
I know you will.
Guys, come on.
Erik!
Praise the Lord.
Two hours.
That's so sweet.
Give it to him.
He's over there.
I've no idea.
Where's the girl?
After him!
My friends.
You're what?
You betcha.
That's not necessary.
Enjoy yourself.
Are you tired?
Why, you...
Hey, Nick.
Get out now!
Listen,
We're dead.
Okay, um...
Telephone.
AND...
Fellas.
You're in.
I'm here now.
That's not enough.
I don't give a fuck.
Thank you, dear.
What next?
Because of you.
Kneel.
Talk to you later.
That's all that matters.
Have we met?
You haven't.
Then why?
On me.
Sit tight.
Nuts.
Do we?
Poison.
I guess you're right.
It's very nice.
I must.
Sure is.
It's finished.
Because I love you.
He doesn't know.
What's the matter with him?
J
Pull back!
You'll love it.
You're OK.
Thanks for the ride.
I was looking for you.
Oh, wait a minute.
What's happening to me?
No hard feelings.
We got you.
So,
Okay, well...
Jon.
I don't have to.
They won't.
So cute.
I'm your friend.
Downstairs.
Who are you people?
He's asleep.
All right, bye.
It's useless.
My condolences.
Give me the money.
Erica.
Close it.
Who do you think?
Have you seen her?
Don't hurt me.
Ah-ha!
Come on, let's get out of here.
Who are you calling?
Gay.
Let's do it again.
And thank you.
He'll be all right.
She's mine.
How could I forget?
THAT'S IT.
You happy?
You're an asshole.
I think I do.
Waiting.
How did you get in?
Okay, I get it.
Please help!
Spencer.
I'm used to it.
You look terrible.
No, he doesn't.
Pat!
I told you so.
What does that even mean?
I'm sorry, honey.
I accept.
Bathroom.
Follow him.
How may I help you?
Can we go?
Look, look, look.
I give you my word.
Glad to hear it.
That's not me.
Would you like that?
We don't know yet.
Half.
Oh boy.
Not gonna happen.
Sounds good to me.
Jeffrey.
Yes it is.
I don't want that.
Bummer.
Of course, of course.
Control.
He'll be here.
Don't make me laugh.
Christopher.
Fine, thanks.
At your service.
No, I do.
An hour?
Woof!
What makes you think that?
Is she here?
You see it?
That's not bad.
I told you that.
What's going on with you?
Just take it.
Belle.
I don't drink.
Ice.
Well, that's it.
I didn't see anything.
I'm glad you came.
Buzz!
I lost it.
Joshua!
Earl.
Stop, please.
My, my.
Mel.
It was fine.
How're you doing?
Let us go.
Tell the truth.
Now you're talking.
Dang.
What nonsense!
Where's my money?
And you know why?
That was quick.
Zach.
help!
We're on it.
Saul.
Oh, that's okay.
Bart!
Let's do that.
What do you wanna do?
I wish I knew.
I want to go.
That's terrific.
Five, six, seven, eight.
No more questions.
It was awful.
Yeah, I will.
It's this way.
thanks.
Are you happy now?
Yum.
Extraordinary.
Come on, sweetie.
Here, boy.
But then...
Paula?
Don't thank me.
HA HA HA!
I'm an idiot.
Oh fuck.
I killed her.
Who do you work for?
Not good enough.
Come and get me.
You're a good man.
Nikki.
Take your pick.
Piece of shit.
Not likely.
Look who it is.
Sylvia.
I hope you're right.
Do you read?
In the car.
How old?
Think it over.
Are you cold?
Omar.
I'm not ready.
We got this.
I hate that.
Useless.
Speak of the devil.
Certainly, sir.
Is anyone there?
How could you do that?
Eggs.
That's life.
Donnie!
Not so good.
Take it out.
Be seated.
A-ha!
Is it you?
You make me sick.
It's moving.
Thirteen.
You don't want to know.
Lizzie.
Colin!
Have you eaten?
Your Excellency.
Gah!
Thank you for that.
Speak for yourself.
I haven't done anything.
I loved her.
Good shot.
My name is...
Hey guys.
Like I said.
Get up here.
Look, man.
My treat.
Hey, how's it going?
Maybe so.
Lex.
We're too late.
You mean it?
Gene.
Right, yeah.
It's ready.
Ram!
Good thinking.
Hands on your head.
Just get out.
Don't answer that.
Did you sleep well?
You know this.
Are you still there?
Don't mind me.
I'll tell you why.
Come on, sweetheart.
It's us.
Reggie.
Come on, go!
You look amazing.
Don't push me.
Car.
Take me home.
The car.
You got a minute?
Come on, sit down.
His wife.
You lose.
None at all.
You remember me?
I'm lost.
Good call.
This is impossible.
Excuse me, gentlemen.
It's not gonna happen.
Okay, ready?
And yours?
Curtis.
I love them.
Yes and no.
Shots fired.
Motherfuckers!
Don't hurt him.
Do that.
Hurrah!
Spock.
I won't go.
Ladies first.
Hang up.
I need a favor.
It's not over.
Okay, stop.
It's my turn.
Okay, hold on.
Are you awake?
You can't go.
I can try.
Timmy!
Mr President.
EVE.
You came back.
Another time.
Find them.
Straight.
Won't you sit down?
You don't trust me?
Bernard.
They know.
Yeah, it does.
Fourteen.
No sweat.
I think you do.
Bah!
Hang on a minute.
'Bye.
Urgh!
Are you stupid?
Christmas.
Well, congratulations.
Simone!
No, she didn't.
You're killing me.
Beware!
What has happened?
Please don't kill me.
Bye, honey.
How do you like it?
Sunday.
Get rid of it.
SHH.
I'm in here.
Tell me everything.
All night.
WHOO!
UH-HUH.
No, look.
Shelly.
It won't take long.
I wonder why.
Rosa.
There's nothing to worry about.
No, not me.
Denise.
What you want?
I'll stay.
Brandon.
It's safe.
Well, I am.
But, sir...
I'm sorry, I...
I love you, baby.
It's not that easy.
There's nothing we can do.
It's freezing.
Is she dead?
Fuck them.
It's that simple.
But I'm not.
Tell me more.
We are here.
Oh, this?
Do you remember that?
Moses!
What did you do to him?
Exterminate!
Take her away.
That is it.
Here, look.
Only you.
This is beautiful.
I tell you.
Keep still.
I feel great.
Just trust me.
No one knows.
See it?
Polly.
UGH!
Chef!
Human.
This is an emergency.
Just be careful.
We good?
AHH!
What you got there?
Hey, look at me.
Okay,
I'll take you home.
Everything's gonna be all right.
That's the deal.
We're going in.
Jackpot.
How's it goin'?
It is you.
I feel fine.
That's what she said.
Not really, no.
I've got him.
Mario!
Hello, ladies.
I'll wait for you.
Once more.
This time.
You told me.
You liar!
Hey, watch it!
Monster!
At home.
Good choice.
It just...
Commissioner.
Please excuse me.
I'll take care of him.
Get rid of him.
What you gonna do?
Why, yes.
Case closed.
We go.
We're gonna die!
Ella!
Why didn't you say so?
Is that better?
Good stuff.
Enough is enough.
Thank you, darling.
I wanna talk to you.
Fall in!
We know that.
You stay.
What's happening here?
That's what happened.
He what?
Let me handle this.
That can't be.
Who are you talking about?
So tell me.
Be quick.
Can you believe this?
Marvin.
For Christ's sake!
Perfectly.
Feel it.
A year?
Burn!
For who?
Haven't you heard?
I know what you're doing.
Can we go now?
Amelia.
Why, thank you.
It's alive!
Thanks for asking.
I gotta...
Oh, stop.
Your dad?
I can't swim.
Big time.
You can have it.
I'm on your side.
go!
Apology accepted.
Hands behind your back.
I'm here to help you.
Come on, kids.
I'm counting on you.
Come on, you.
No, that's fine.
Otherwise...
Granted.
How we doing?
Keep your head down.
Deal with it.
You can do that?
No answer.
Too long.
I'm alone.
Thanks anyway.
Do you love her?
It's Christmas.
I don't have any.
No, you know what?
The truth is...
And what is that?
Get me out!
Perfect timing.
I'm in love.
Wait there.
What do I know?
Isn't it obvious?
Please have a seat.
How does it work?
What's this for?
Murphy.
Good enough.
So what!
She told me.
You said that.
Elsa?
Yes, I see.
That's alright.
I am Groot.
Lower.
Can I come?
I'm right behind you.
It's bullshit.
After.
Prince.
What have you been doing?
CHEERING
Gerry!
I'm aware of that.
Kathy.
Ghost!
I'm gonna kill him.
Eighteen.
Give up?
Go on, go on.
Get away from her!
Bad idea.
She's my daughter.
You, uh...
Not possible.
I know you did.
Yes, why?
I'll come back.
Keep trying.
What did you call me?
Everything OK?
I never...
It's pretty.
You're a cop.
Warren.
Don't hang up.
I was worried about you.
Darn it.
It's my birthday.
This is outrageous.
Hey, boys.
That's very nice.
I'll drink to that.
Don't look back.
What the fuck are you doing here?
It's not easy.
I'm not here.
Hey, where you going?
What about that?
Did you say something?
What is that thing?
Over my dead body.
Is that bad?
Nothing, sir.
Please don't hurt me.
Just great.
Why'd you do that?
Turn right.
From whom?
Right on time.
He's there.
Don't be sorry.
Oh, yeah, right.
Is there something wrong?
Question.
Didn't you hear me?
I'm sorry, okay?
I'll see you in the morning.
Hey, John.
I believe in you.
You've got it.
Vera!
I don't want to hurt you.
Everybody knows that.
Yes, I remember.
Hey, Doc.
Read.
Not so much.
Melanie.
Sleeping.
You're not listening.
Jesus fucking Christ.
Yeah, that's me.
You're very welcome.
It's your choice.
Then do it.
I know you're in there.
I don't have a choice.
It's too risky.
It's not the same.
Here, take it.
Do what you want.
A gift.
Yeah, I don't know.
Trust.
Almost done.
All right, you know what?
You have to help me.
I'll find you.
Camera.
We all did.
Is it serious?
Just think about it.
Thank you, guys.
So, what do you say?
He's in there.
Yeah, I understand.
Is he alive?
I care.
Diego!
You better.
Then why are you here?
Stuart.
That would be nice.
OK, let's go.
Busted.
We don't have a choice.
Gimme that.
Aunt!
Dance with me.
My life.
What are you doin' here?
Do you need anything?
Cam.
Did you do it?
Keep it moving.
It looks good.
Fucking asshole.
Haley!
Hit.
The other one.
You did not.
Have a good one.
OH, GOD.
Please tell me.
What a day.
That's not all.
I love this.
I'll take care of you.
Remember this?
A'ight.
Not bad, huh?
I remember that.
Scotch.
Hold tight.
Come home.
One sec.
There's nothing you can do.
This is your last chance.
Prick.
Juliet!
Hallo?
Let's go, let's go, let's go!
Do you see that?
Sheila.
Jenna.
That's what.
You're going?
Sure I do.
What the hell is he doing?
Yes, master.
Hold that thought.
This is absurd.
You mind?
Just drive.
How wonderful.
Do you see it?
Do you believe that?
Hey, dad.
No, I mean it.
No, not you.
North.
I've been looking all over for you.
THAT'S RIGHT.
Becca.
His name?
Kurt.
Rise and shine.
What man?
Give me your phone.
You live here?
Hear me out.
Esther.
OK, then.
Hi, it's me.
We'll figure it out.
Can you see me?
Soldiers!
I'm gone.
All right, sir.
You know the drill.
Little bit.
Wednesday.
Love you, too.
Apologies.
I'm not joking.
England.
Yes, absolutely.
Yes, we can.
Yes, okay.
You sure about this?
He's getting away!
I'm leaving now.
How about...
Stop what?
I couldn't believe it.
I'm alright.
Course.
So now what?
He likes you.
How are you holding up?
Odd.
Just leave.
What--?
You and I.
Then go.
I was kidding.
Christina.
Hey, are you okay?
Fair?
It happened.
Standing by.
I don't like you.
Virginia.
Going somewhere?
Be a man.
Murderers!
Have a good trip.
Sir, please.
I feel sick.
Not once.
I'll get you!
Davis.
Anton.
Where did that come from?
Art.
French.
This way, sir.
What did you do to her?
Who knew?
Very nice to meet you.
Is this yours?
Wait, wait, wait, wait, wait.
FUCK!
Yes, she did.
How far?
Classic.
OF COURSE.
How do you know this?
We got company.
Didn't you know?
Let's have a drink.
I'd like to.
Unh-unh.
You can't go in there.
Have I?
It's your call.
I wasn't there.
Merry!
He's a friend.
We're out of here.
Okay, I will.
No, that's all right.
That should do it.
Hold on one second.
Nothing serious.
Snake!
Where else?
What could I do?
That's pretty good.
Also...
Let's hope so.
You can't stay here.
That's them.
Alec?
Oh, I forgot.
Name it.
Have it your way.
Darn.
It's going to be okay.
Where are they going?
That's a good boy.
Come on, darling.
Watch your back.
Nothing's wrong.
Who gives a shit?
You're my best friend.
You're great.
Ah, well.
Hilarious.
Wait a minute, wait a minute.
I didn't kill her.
I don't need you.
How'd you find me?
Maybe I will.
No, that's not true.
Real good.
It's what I do.
I'll be right out.
Stay with us.
Joel.
To the left.
Come up.
That's good news.
Did you find anything?
You could.
Hurry it up.
But I don't.
He'll be back.
Much obliged.
We wait.
Right, right, right.
Thank you, Your Honor.
What were you saying?
Pervert!
Xena!
Good grief.
Graham.
Ours.
He loves me.
Maybe more.
Get the door.
Pick him up.
Neat.
What's it look like?
You don't mean that.
How many times do I have to tell you?
About that.
You can't do this to me.
Yes, all right.
Go get 'em.
I got your message.
Let me take a look.
I'll find him.
Nay.
Not bad at all.
Boris.
Yes, darling.
l...
What the hell's going on here?
Put him down.
What do I have to do?
I'm flattered.
Mad?
Yeah, I'm sorry.
I gotcha.
We're on.
I love you guys.
I'm over here.
How is that?
Why do you think?
Have you been drinking?
But wait.
I don't think that's a good idea.
You're scared.
I know what to do.
A miracle.
Not too bad.
Hold on a sec.
No can do.
Who goes there?
Don't you like it?
Castle.
I don't know what.
Put that away.
Which one is it?
I loved you.
This is the place.
No... no.
I saw that.
But thank you.
Tough.
That's why you're here.
There's no one here.
Hospital.
It's personal.
Oh, my Lord.
Guns.
What have you got there?
Maurice.
Oh, that's all right.
Namaste.
For example...
I feel terrible.
R...
He's with me.
What the hell do you want?
Doesn't it?
It's clean.
We won't.
I'm almost done.
Go on in.
Scary.
Please, sit.
These are for you.
Hey, hey, hey, hey, hey.
Let's get this over with.
So what do we do now?
Will you excuse me?
Oh my gosh!
I'm trying to help you.
Why'd you do it?
Sidney!
What do I care?
I fucked up.
You look like shit.
I don't have any money.
Both of us.
Chase.
Laurie.
Is this...
Merlin!
False alarm.
That's stupid.
A gun?
Come on, Sam.
Just hang on.
The thing is...
Dewey!
I'm here for you.
It's a pleasure to meet you.
You gotta be kidding.
Laurel.
Hello, dear.
I won't let you.
This is nothing.
Tell me why.
We gotta move.
You come with me.
It could be.
You in?
Nicely done.
Leave her.
How many times?
Not particularly.
How many are there?
Are you jealous?
Midnight.
Texas.
Touché.
I'd rather not.
Isn't it great?
Is that what you're saying?
Rex!
Guess not.
Twins.
Uh, sorry.
But where?
Quiet down.
Alert.
Don't forget that.
Just give me a minute.
Uh, uh...
No, not that.
Get used to it.
Your call.
I know nothing.
So what do you say?
Come On.
Not that one.
Hold it, hold it.
Gin.
hi.
You gotta go.
Who says?
That'll be all.
Blah, blah, blah.
No, no, please.
Cake?
It has to be.
Very pretty.
No questions.
Hold on tight.
Stevie!
What's it for?
Don't kill him.
You know what it is?
Santa!
If you insist.
What's she doing here?
Okay, that's enough.
Teresa.
They're on their way.
Very well, then.
Juan.
He is dead.
Let it be.
Heh heh heh.
Listen to him.
Nothing like that.
That's all I'm saying.
Thank you, Mr. President.
You'd be surprised.
Good afternoon, sir.
Watson.
Bunny.
Erin.
Sal.
Stand aside.
No, absolutely not.
What's going on ?
I'm nervous.
Do you know it?
Take care of him.
You're scaring me.
What's the hurry?
I'm going to.
She did it.
On screen.
Good to go.
Guess who?
Subtitles by LeapinLar
We understand.
Where'd they go?
Hai.
Fools!
They were.
Oh,my god.
How does that sound?
Dexter.
Now listen to me.
Where are you off to?
Oh,yeah.
Do I make myself clear?
Change of plans.
Was it you?
Naomi.
Brooke.
That's the way it is.
Not this one.
Make a wish.
Quit.
Chad.
You should know.
Hey, no.
So far, so good.
Hey, pal.
Call her.
No, I mean...
You're mine.
Duncan.
You shouldn't.
Jan!
This is the police.
No, don't do that.
Ignore him.
Oh, never mind.
How'd you know that?
Thank you, Captain.
WHAT IS IT?
I always have.
Start the car.
How are things?
Problem solved.
Happy Thanksgiving.
You did great.
Consider it done.
Thank you very much, sir.
No, Mom.
Cody!
Stu.
Move it out!
Are you talking to me?
I can not.
How could you do this to me?
Of course he is.
A drink?
Is that her?
Yes, right.
Wicked.
Give me the key.
Otto!
Beckett.
Can you see it?
Three minutes.
We're not going anywhere.
Because of me.
I'll think of something.
Wah!
I'm not in the mood.
Want one?
Just in time.
Grant.
Stop saying that.
Game.
Don't do this to me.
I'm not talking to you.
Well, there you go.
Hey, uh...
But it's true.
And this one?
Oh, sweetie.
Jasper.
You said it yourself.
In a way.
Kai!
Nelson.
That's what I think.
That's a good point.
Cass?
Do you know what time it is?
Get away from him!
Oh, come on, man.
Go back to bed.
Well, here we are.
That's all I need.
Yes, they do.
Just give me a second.
My Lady.
Hike!
Save yourself.
That's brilliant.
Now it's your turn.
Pablo!
Let him in.
Push it!
Door.
It's nothing!
I'll talk to her.
How much do I owe you?
Aaargh!
What a relief.
They're back.
Stop here.
CHEERING AND APPLAUSE
Fighting!
A doctor.
I was wondering...
Stay out of it.
Hey, dude.
I can't explain it.
No, not now.
Yeah, he is.
Just watch.
Hold him down.
It's better.
This is so cool.
Sookie.
Get the fuck outta here.
I've been busy.
Okey-dokey.
Happy now?
Yeah, I'm here.
I Iove you.
Testing.
Yeah, I heard.
Abigail.
You'll get used to it.
Where you headed?
So I see.
I checked.
You're not listening to me.
Did I say that?
HA!
This is not a drill.
Partner.
Nada.
I wanted to see you.
Line up!
Milo.
Superb.
That's not what I mean.
My heart.
That doesn't make sense.
Delighted.
Um, okay.
You know him.
What's gotten into you?
I'm sorry for your loss.
How you holding up?
Excuse me, excuse me.
Strong.
Do you want some?
I got a better idea.
Yeah, he did.
Do you understand what I'm saying?
How much time?
Don't be nervous.
What's your plan?
Brought to you by WITH S2 Written In The Heavens Subbing Squad
Dancing.
You are crazy.
But, um...
What's your name again?
This is madness.
I noticed.
Shotgun.
Walk with me.
I loved him.
What do I do now?
Yes, Master.
Phillip.
Leave now.
Yeah, that's good.
Gabrielle!
Samuel.
Not for you.
We talked about this.
She's sick.
You set me up.
What is she doing here?
Marley.
Do they?
That's how it is.
You decide.
We're safe.
You're jealous.
Why are you following me?
It's over now.
I said stop!
Do you want a drink?
Freddie.
Stand.
I'm telling you the truth.
Good lad.
I've changed my mind.
Thank you all.
I'm gay.
Hey, sweetheart.
Isn't it beautiful?
Three times.
It's my pleasure.
Except...
That's very kind of you.
There isn't.
Peggy.
God forbid.
No way, man.
Naked.
Not funny.
Pilot?
Yeah, I can see that.
So what are you saying?
Val.
Cover!
Drew.
See you next week.
Stay low.
I'm gonna get you.
I couldn't do it.
Read this.
Not her.
Shut up, man.
I just got here.
I'm not like you.
Open the fucking door!
IT'S OKAY.
Where'd she go?
Just don't.
I'm sick of it.
You are welcome.
What happened to them?
I try.
You're the man.
I'm surprised.
What people?
Didn't you hear?
What's going on in there?
Isabelle.
Oh, I do.
I'm gonna do it.
Damon.
Do whatever you want.
Mandy.
Private.
I'll help.
The keys.
How can you be sure?
It's none of my business.
Nooo!
Four years.
What did you do that for?
You're tired.
No, I understand.
Percy.
Pedro!
What do you think about that?
No, it's OK.
Bull.
Happy anniversary.
ok.
now.
Are we ready?
Hey, kids.
What am I saying?
I just thought...
Whoo-hoo-hoo!
We can do it.
Of course he did.
Grenade!
Let's go now.
Great, great.
YOU KNOW WHAT?
Lincoln.
I promise you that.
Wouldn't you?
Monty!
Jonah!
Am I interrupting?
Non.
You're coming with us.
Yeah, something like that.
The cops!
Where are they now?
Yuri!
Assholes.
In the morning.
Ripley!
Monkey!
Talk to her.
Now, listen to me.
Rome.
You weren't there.
In you go.
Stuff.
The answer is no.
Good dog.
Shot.
Come on, get in.
They didn't.
That's nonsense.
Oh, forget it.
But still...
You disgust me.
Rise.
Don't give me that.
Surely.
OK, fine.
You speak English?
I don't like him.
Nadia.
It's been so long.
You found it.
What is he?
I don't see why not.
Federal agents!
Very much so.
and...
Vodka.
What did he look like?
This is a mistake.
Kiss my ass.
Coincidence?
No, he won't.
Enough already.
We'll be back.
I'm just curious.
I'm so...
That's a fact.
So, what now?
It makes sense.
I'm staying here.
SIR.
sorry.
I know you can.
You're doing fine.
You stink.
It's a date.
Ah, fuck.
Now you know.
Rico!
I couldn't help it.
That's not good enough.
On one condition.
What's done is done.
I was joking.
I always do.
Keep me posted.
Who's this guy?
Nothing's changed.
Who's calling?
Close enough.
Defense!
Oop.
With...
Oh, look at this.
Sign it.
Tell me what to do.
Miller.
Yeah, that's him.
Cunt!
Rock!
I like this.
Aaaaah!
Do you agree?
She's my wife.
Corporal.
Untie me.
There's no way out.
We're close.
No deal.
HELP!
No wonder.
Having fun?
He's right here.
Sonic!
Yeah, I'm all right.
She will.
Summer.
ME?
Hey, it's okay.
What are you suggesting?
Homicide.
Yes, you have.
Drop the weapon!
But you do.
Maybe next time.
Is it over?
Come on, Mom.
Mom, please.
I didn't have a choice.
Take off your clothes.
The End
That's the way.
Remarkable.
I have to go to the bathroom.
Call it.
Sit up.
Now get out of here.
I know, I know, I know.
Yeah, totally.
Is it bad?
I need to go.
Joyce.
I panicked.
He didn't say.
I would love to.
Officer down.
Yeah, definitely.
I'm not afraid of you.
Bishop.
I saw them.
Who wants to know?
Please, God.
Old.
I did that.
Tiger!
Lloyd.
Mazel tov.
Much.
Wrong answer.
What'd I tell you?
Are you mad at me?
We can't stay here.
On the double!
God help us.
Do I have to?
Evil.
On what grounds?
What are you going to do now?
Bernie.
That's impressive.
That was a joke.
Destiny.
And how!
You fucker!
Who doesn't?
Everything will be all right.
No, not exactly.
What you talking about?
Let's start.
So what's the problem?
Los Angeles.
Pay up.
I don't know what's going on.
Brown.
Thank you for your help.
What's the time?
NO, NO, NO.
Shut the hell up!
Pregnant?
Say hello.
Please, have a seat.
All right, yeah.
Now wait a minute.
Cheerio.
Have some.
How do you know all this?
Harper.
Not us.
Whoop!
I can wait.
Aloha.
Well, I'll be damned.
He's clean.
Yeah, that's true.
Mostly.
then.
That bastard!
Mmhmm.
What else you got?
Can I help you, sir?
And you know it.
Please listen to me.
How about this one?
France.
Scalpel.
Lie.
You did well.
Forty.
Come and see.
No, no, wait.
We got to get out of here.
Yeah, I get it.
I'm gonna miss you.
♪ Yeah ♪
I don't give a damn.
Myself.
Release!
Very bad.
Do you get it?
Mr. Frodo?
Do you have a minute?
Thank God you're here.
We're getting married.
We should.
Did you know him?
Did you get that?
I've heard a lot about you.
That'll work.
Right, then.
This isn't happening.
Yes, it's true.
I'm not gay.
listen.
You promised me.
Get them out of here.
How did he die?
Eleanor.
Don't look down.
He saved my life.
Dory!
Come on, people.
WALL-E!
Let's move on.
We get it.
Mitchell.
USA!
Choose.
I wouldn't say that.
I'll fix it.
What'd I do?
What is the meaning of this?
Works for me.
Loud and clear.
In that case...
I miss him.
You done?
I'm in trouble.
Or something.
After that...
Like hell.
What is he doing here?
What the hell were you thinking?
What do I want?
Mm-Hmm.
No, it's true.
I'm in love with you.
I'm excited.
Get this.
What are you talking about ?
I wanna show you something.
Be brave.
I'm broke.
Uh, nothing.
Forget him.
What news?
Who did that?
You're sweet.
I beg of you.
Sheesh.
Hey, thanks.
Can't do it.
Everything's all right.
Yeah, we do.
Hi, mom.
That makes two of us.
We'll take it.
Huge.
Everything's under control.
Mademoiselle.
Angry?
No, don't worry.
I didn't want to.
Wait and see.
Aragorn!
Love you too.
Gimme!
I forget.
Let's take a walk.
Where the hell are we?
Salt.
What's new?
So I...
Noted.
Let's drink.
Ah, come on.
There's no other way.
Woah!
Lori.
No, wait a minute.
Yes, doctor.
Jasmine.
Let's go, boys.
Z!
Three weeks.
I do not know!
Miguel!
Let's face it.
Let...
He's so cute.
Very well, sir.
Just one second.
That was nice.
Be happy.
Next question.
They're not here.
Don't fuck with me.
It's big.
What are you gonna do about it?
What'll it be?
That's something.
Why would you?
Hello, sweetheart.
Well, it's...
Stephanie.
Hey, wake up.
Archie!
Rascal!
Sorry to hear that.
I'm going now.
What about this one?
Andre.
Your witness.
Young man.
Stay with him.
What's it gonna be?
Let me check.
I'm blind.
But you're not.
Of course I can.
I'm your father.
I can't find it.
Who are you looking for?
Isn't that enough?
I have a better idea.
What about the others?
Burt!
Which is it?
Oh well.
Ginger.
I don't follow.
No, you haven't.
Why would she do that?
Why did you come?
What the hell happened to you?
Last week.
Do we have a deal?
That's my point.
I'm not going back.
Come quick!
Things.
Now look.
Georgie.
Ha ha ha ha ha!
Don't hit me.
After them!
My arm!
Hey, girls.
We're home.
No money.
I heard it.
Agnes.
Bye now.
You're unbelievable.
Denny.
Okay, honey.
Quick, quick!
A job?
Great news.
From me?
Hugo!
He's a good guy.
Dive!
Ah, thank you.
Or you.
Nineteen.
That's very funny.
He's got it.
He was there.
I'm all ears.
I'll call the police.
You have it.
Is it possible?
Your face.
We've got to go.
Only...
You take care.
Archer.
Whatever, man.
DAD!
So, what's up?
I sure do.
I see them.
Draw!
One time.
I was afraid.
It is now.
Bridget.
Come on, come on, come on, come on.
So sweet.
How could you do this?
Okay, baby.
Don't you move.
I'm freezing.
And I did.
What are you drinking?
Courage.
I can handle this.
Miss me?
You take it.
Dom!
What are we talking about?
Do you want to?
Finish him.
All yours.
YOU KNOW?
Hey, Jimmy.
How is this possible?
Take your hands off me!
Let us pray.
Go figure.
Don't worry about him.
Come on then.
You're cute.
I got that.
Anybody there?
Dad, please.
Pick up the phone.
So have I.
Dwight.
I really did.
Take a good look.
I don't know what that is.
Somehow.
No, I wouldn't.
Guys, guys.
Alright then.
It's your birthday.
As soon as possible.
You said so yourself.
How do you do, sir?
I just don't know.
I'll manage.
This place.
Don't push.
No, of course.
Jacques!
You ready to go?
Just about.
Sure did.
Have you seen it?
Mine, too.
Escape?
I don't trust him.
You look wonderful.
You want something?
Help me up.
I-I'm sorry.
Not so loud.
This is so exciting.
I want to help.
What's the story?
Where's my daughter?
Hon?
We're screwed.
That's about it.
You know I do.
Fuck, no.
Yeah, um...
Nein.
Let me know.
Wait, hold on.
Bad luck.
I have work to do.
Come on, tell me.
of course.
Hard to say.
For good.
Mate.
He got away.
I'm not doing anything.
Come on, wake up.
Do you see him?
Figure it out.
Yeah, we did.
Very cool.
Accident?
He loves you.
Don't you think so?
LAPD!
But you did.
I don't want...
Mr. Mayor.
Well, that's...
Yes, really.
Is it working?
Subtitles by Red Bee Media Ltd
It can wait.
India.
Would you excuse me?
Whatever you need.
You're smart.
I mean that.
I was just kidding.
I work here.
You're a doctor.
You're it.
Go left!
I can see you.
Where am I going?
Glenn.
Ghosts.
I don't feel well.
Janice.
You know what they say.
It's so good.
You can't do it.
Yeah, probably.
Yeah yeah.
That wasn't me.
Why didn't you call me?
Gabe!
Thieves!
Silver.
~ No.
I can't believe this is happening.
Rape!
Don't you trust me?
What's in it for me?
Or else...
Didn't I?
Governor.
Enjoy your meal.
No, we didn't.
Neal.
All right, mate.
Vicky.
I know that now.
I guarantee it.
Thanks for your time.
I got something.
This afternoon.
I have a surprise for you.
So was I.
Fitz.
Sophia.
Fired?
And cut.
Can I help you with something?
We just...
You saw him?
Good times.
Thirsty?
Why are you smiling?
I don't know what to tell you.
Can...
I better go.
I didn't mean it like that.
Would you look at that?
It's pathetic.
That does it.
Is anything wrong?
Don't listen to her.
Heaven.
Don't say a word.
I'll tell you something.
Wes.
Geronimo!
Wyatt.
HA HA!
I was so scared.
Reese.
Engage.
We're in trouble.
A big one.
good.
This isn't funny.
We'll be there.
Don't shout.
That's it, that's it.
What did I miss?
We must go.
What is he talking about?
I hate them.
She's cute.
Bite me.
Well, look.
What can I tell you?
Years.
So it is.
Here's my card.
Even.
It's OK!
No, it's nothing.
Look at this guy.
Is it safe?
Do me a favour.
Good morning, gentlemen.
Smells good.
Meat.
I'd better go.
And do what?
I didn't do anything wrong.
High five.
Ernie!
Come on, lads.
Everyone knows that.
What was it like?
Stay in the car.
Red alert.
You name it.
But you can't.
Yes, what is it?
My back.
I gotta get out of here.
No doubt about it.
What is the problem?
We've got to get out of here.
Marge.
Jolly good.
You want to?
He has.
On the house.
Valerie.
Same to you.
Come on back.
What do you know about it?
Attention, please.
I'm going back.
Where was it?
You're gonna love it.
I'm telling the truth.
From you.
My house.
I don't either.
Help her.
Your mom?
Get down here!
Lucky me.
I won't hurt you.
Winston.
You want a beer?
This is wonderful.
We shall see.
You're not going.
And look.
The children.
Crystal.
Haha!
Right over here.
It'll work.
I'll explain.
Where did you find it?
How long ago?
Oh, there he is.
I'll call.
As always.
She's hot.
It's not so bad.
Easy, boy.
One... two... three.
Don't be mad.
It was nice.
Maddy!
I owe you an apology.
Just let it go.
Old man!
About you.
He's right there.
He wants to talk to you.
I'm sorry, baby.
How strange.
Is that what this is about?
Who was she?
Very soon.
Are you in?
That's my business.
I'm a...
Oh, sweetheart.
We have to go now.
Oh,
Have mercy!
Can you see?
I dare you.
Ahhhh!
Do you have it?
Beauty.
Handsome.
You got a problem?
Hey, yo.
Sweet Jesus.
Of course he does.
Curious.
I won't let you down.
Is this a bad time?
Confess.
Donald.
Oh, no, no, no, no, no.
You jerk!
Ooh, yeah.
Pick one.
Fucking shit!
Just like me.
Who do you think I am?
No pressure.
This is fantastic.
Well, not exactly.
We're saved!
NCIS.
Take off.
Yeah, me neither.
What are they doing here?
You're damn right.
Don't let him get away!
Daphne.
Regina.
Air.
That's too much.
Except you.
I was just thinking.
Is it okay?
Ava.
Hang on, hang on.
Calm down, calm down.
I want to die.
You want to go?
Permission granted.
Love me.
Why would they do that?
What are we supposed to do?
Well, good luck.
Easy does it.
WHO?
No, go ahead.
Who the hell do you think you are?
What shall I do?
I'm ok.
What have we got here?
Sunny.
It makes no sense.
Just sit down.
Behave yourself.
I figured.
That's good to know.
He's a cop.
I'm a police officer.
A dog?
You've changed.
Hodor.
What's that ?
I lost.
Where are you headed?
You have to trust me.
Yes, Your Highness.
Oh, no, sir.
They can't.
There was.
Does it work?
Teal'c!
so...
Did you see her?
You did that?
We're family.
Try it on.
Even you.
That's gross.
I don't want your money.
Am I clear?
Sure it is.
I failed.
Who's your friend?
Don't come near me.
Oh, hell, no.
No, I don't want to.
My parents.
We're under attack!
That's just great.
Ok, ok.
You talk too much.
You know nothing.
Just us.
Take him down!
I can take it.
You forgot?
Good game.
Is that what I think it is?
That's lovely.
It's a trick.
In the back.
It's the police.
Dutch.
But I am.
Just this once.
At once.
Daughter.
Books.
It's all here.
Dinner's ready.
Sorry, ma'am.
That's great news.
There's another one.
It's brilliant.
I didn't ask.
I'm just tired.
How awful.
No, I do not.
What do you have in mind?
I knew you'd come.
You wait.
Do you know me?
Thank you sir.
That's ok.
You feel me?
I remember now.
I envy you.
Hey, bro.
is it?
Rusty.
Yes, Ma'am.
We're gonna be late.
Success.
Oh, aye.
Poor girl.
That's no good.
I know the feeling.
Don't mind if I do.
Information.
Can I talk to you for a minute?
Miami.
Jamal.
Hiro.
So what are you gonna do?
Stop it now!
Let him be.
You scared?
Poof!
A long time.
I don't hear anything.
You're not gonna believe this.
Give it a try.
Can I tell you something?
I don't trust you.
We'll talk about it later.
What a pleasant surprise.
That's all I got.
Who the hell is this?
Let's check it out.
I hate her.
I don't know her.
A hundred?
Yes, Dad.
Don't sweat it.
We could...
Move your ass!
Which is what?
It's normal.
Perhaps not.
Nothing personal.
Are...
He just...
I love you, Dad.
You're so sweet.
It's cute.
I can't tell you that.
Something's happened.
I love this song.
Because I...
It's the same thing.
Did what?
You're mistaken.
Ollie!
Great, thanks.
I love you, man.
My money.
That's how it works.
What are you doing in there?
That's a lot of money.
Deb.
I want to see him.
They've gone.
Don't think so.
You're looking good.
A kiss.
I'm sure you do.
Get out of my sight.
So, what do we do?
Still here.
Out there.
It's as simple as that.
I think it is.
Eugene.
Open fire!
You don't get it, do you?
Are you sure you're okay?
Evidence.
I'll cover you.
Well, what happened?
Rolling.
Alas!
Don't blame me.
What do you think it is?
Where did it go?
We have to leave.
I want my money.
In the kitchen.
Lucifer.
Course not.
You don't have to worry.
Edmund!
Got a minute?
Scarlett!
I said it.
Hey, look at this.
Let's see what you got.
You're not coming?
I mean, really.
How you doing, man?
Is everything OK?
How's business?
Yeah, I know that.
Go get her.
Lots.
Kat.
You know, it's funny.
Weapons.
What, now?
We're just friends.
A child.
That's my car!
For a while.
Did it?
All gone.
You're my friend.
We're a team.
Rain.
What, then?
I can't stay.
It's enough.
What a night.
I'll be right here.
Sounds like fun.
That's my son.
Give.
That it?
What are you working on?
You have a visitor.
Drop!
That's right, sir.
WHAT HAPPENED?
I need to...
What are you doing tonight?
That is good.
Twenty-five.
Why don't you tell me?
They killed him.
I'll catch up.
This doesn't make any sense.
Keep away!
I just, uh...
I said I was sorry.
I didn't see you.
Just leave it.
Roman!
You didn't have to do that.
Well played.
The gun.
I couldn't agree more.
Yes, that's true.
It didn't.
Get in the truck.
Johnson.
Let's celebrate.
What did you say your name was?
I'm trying to.
isn't it?
We've met.
Well, I'm...
Camille.
It's hopeless.
Oh, whoa.
You drive.
Duty calls.
I haven't seen him.
I understand, sir.
Just saying.
Come over.
Where you at?
Join me.
Eat this.
Thank you so much for coming.
Thor!
I'll come.
Goddamn you!
I'm sorry, ma'am.
I lost him.
Two months.
Not that way.
I'll tell her.
Thanks, mate.
I respect that.
I know this.
I'll take him.
Don't talk to me.
Release him.
You two know each other?
I don't want any trouble.
I just want to go home.
Just let me go.
Romeo!
Number two.
Gavin.
West.
Not cool.
Back away!
I can't stay here.
We're going down!
Easy, easy, easy.
Bugger.
Did I wake you?
I have to pee.
Where do you come from?
It's all gone.
Witch!
I mean, no.
I'm a lawyer.
Yellow.
Double.
Yeah, you know what?
Why don't you sit down?
Go on then.
I admit it.
Turn left.
God be with you.
Randall.
I am now.
Spartacus!
Read all about it!
Yippee!
All day.
Yes, he was.
Ehh...
The boy.
Find anything?
One thing.
Tucker!
You have no right.
Stay together.
Stay right here.
Thanks, honey.
Now we're talking.
Who is this man?
I'll stay here.
What'll we do?
Let's have it.
Tanya.
It's interesting.
I said that.
I'll check it out.
Swim!
Now it's my turn.
They're great.
Not all of them.
Are you a doctor?
That's that.
Take them away.
Why did you do this?
I'm not going to hurt you.
Kinda.
Are you certain?
You wanna go?
That's all there is to it.
How beautiful!
Disappear.
This isn't over.
Home sweet home.
He's sleeping.
I'm so happy for you.
What do we have?
He's in.
Do you want one?
Shopping.
Are you going?
We've got a problem.
She won't.
It's too late for that.
She loves you.
Thanks for that.
I'll take my chances.
Give me this.
Hugh.
And yet...
Balls.
Hold the line!
Great to see you.
You little...
I don't like that.
Hey, mom.
I've tried.
Can I buy you a drink?
Keep up the good work.
Sensei!
She said that?
Animals.
Get the hell out!
I was waiting for you.
In your dreams.
Where are you staying?
Keep calm.
I'm so glad you're here.
That's so cool.
Oh, I will.
Let's get the fuck out of here.
Hey, Bob.
Ally?
I'll do what I can.
It's been a long day.
I am ready.
How much time do we have?
Mona!
Okay, got it.
Come back to me.
Will you come with me?
Take these.
It's gorgeous.
I'll wait here.
It was my idea.
Quietly.
Just look.
Aren't you ashamed?
Oh, thank you very much.
Don't be angry.
For all of us.
That girl.
Where does he live?
Do you want it?
Wrong number.
What's my name?
I don't see him.
Did I do something wrong?
tell me.
Oh, it's nothing.
Ariel!
Believe it.
Sorry, what?
Right behind you.
What are the odds?
There's nobody here.
Africa.
You're too kind.
She's asleep.
And I just...
In what?
You tell him.
Shannon.
Let it out.
Interested?
Have you seen this?
Think about that.
Yourself?
Drunk.
Edgar.
That's really good.
What's in the bag?
Why did you?
I don't buy it.
Cowards!
Scoundrel!
Now you.
It's heavy.
I got your back.
Okay, now.
Where do you think?
All alone.
I don't wanna talk about it.
Charley.
Yes I do.
Stone.
Hey, lady!
This is you.
At this hour?
Clarence!
It was terrible.
Put your hands on your head.
Have a nice trip.
Isn't it wonderful?
This can't be.
exactly.
It's not okay.
Carefully.
She loves me.
Get down on the ground!
Well, go on.
You can't be here.
How's that sound?
No, it won't.
I gotta run.
Kit!
That's fair.
He's not coming.
So what is it?
How lovely.
It's, um...
You look fine.
Luck.
Natasha.
That's the guy.
Dogs.
Point taken.
Is it yours?
I know where it is.
Go out.
That was easy.
Not this.
Bye, baby.
No talking.
What's happened to you?
Patty.
I just don't get it.
Papers.
You heard her.
Well, I'll be.
You may.
Mina!
You may kiss the bride.
Perry.
I'm a man.
What do you call it?
We're all gonna die.
No trouble.
My gosh.
Reverend.
Let's just...
Alrighty.
Try to understand.
For whom?
You've got to be kidding.
I want a lawyer.
Don't tell anyone.
Fire away.
I'm bleeding.
And then what happened?
She's sleeping.
I brought you something.
Catch you later.
I found you.
Five, four, three, two, one.
Okay, uh...
Ow, ow, ow!
Don't change the subject.
Yuki!
Please help us.
I know what I saw.
What a joke.
Too many.
I found something.
Here, sir.
Chelsea.
I'll figure it out.
Nuh-uh.
I'll pay.
Oh come on.
Hey, kiddo.
Uh... yeah.
I really like you.
It is what it is.
It's official.
Long live the king!
It's not over yet.
Fine with me.
Fire at will!
I take it back.
Who's in charge here?
He's just a kid.
Susie.
What does she want?
We'll talk.
Come in here.
Just checking.
excuse me.
You don't know what you're doing.
A cop?
F...
I can manage.
I have nothing.
Sorry, mate.
CIA?
Don't answer it.
Lift.
But I did.
BUT...
Why the hell not?
Be reasonable.
Hold her.
Last one.
Mack!
What have you been up to?
What's up ?
What do I say?
I have an appointment.
We broke up.
Keep it going.
I'm getting out of here.
Let me think about it.
I assure you.
You look lovely.
Cousin.
You got a problem with that?
Are you ill?
I'll be there in a minute.
Don't apologize.
Was I?
Yeah, you know.
First time?
Sorry we're late.
Gentlemen, please.
Who does?
Up you go.
Let go of him!
Don't go there.
Is that all you got?
Child.
My hair!
Show him.
Take care of her.
Hunter.
Thank you, thank you, thank you.
You're ready.
Will you stop?
Just like old times.
Not everything.
I know it is.
Flynn!
He's not breathing.
We're finished.
What is that smell?
Vegas.
What's the word?
You must be tired.
She's my sister.
Get to the point.
Felicity.
It is over.
It's for me.
Watch where you're going!
Lighten up.
I swear to you.
How romantic.
Feel that?
There's still time.
It is, isn't it?
You can count on me.
Don't you know that?
We lost him.
Prime Minister.
Watch and learn.
I just know.
Bomb!
Going.
Missing?
What's that sound?
No, dear.
Grr!
Lay down.
Your family.
Against the wall.
Get that.
You don't care.
No, it's just...
I'll be right over.
I'll check.
Come on over.
It was awesome.
Poor kid.
Sign.
Nice car.
You must be hungry.
But I don't know.
Seven years.
I want to see you.
OK, bye.
Please don't do that.
He's my father.
Me and you.
Why what?
You need anything?
Wanda!
I never did.
Manuel!
Precious!
Bread.
What are you watching?
Get away from there!
Don't you recognize me?
Cocaine.
How was your trip?
I'm there.
How exciting.
You are beautiful.
I'm not finished.
Breathe in.
WHY NOT?
30 seconds.
Go that way.
Follow me, please.
Once again.
I didn't hear you.
COME HERE.
Have we met before?
I don't want you to go.
That was beautiful.
No, I guess not.
Ass.
It's good to see you again.
Now I know.
What's funny?
Hi, dad.
You always do.
It's a start.
There it goes.
What else is there?
hold on.
It's a mess.
Hopefully.
All right,
stop!
Your hand.
She'll be all right.
What's the meaning of this?
Turn it up.
Game on.
What a jerk.
No, Sir.
Oh, wonderful.
Can't be.
A ghost?
Come on, dude.
Prison?
Blow.
It was dark.
You earned it.
Wasn't it?
Madison.
Oh my goodness.
Moving.
I got 'em.
You're bluffing.
We're moving.
What's his problem?
Did you find him?
Walker.
Don't turn around.
China.
I'm here to help.
Can I get you a drink?
What's up with that?
nbsp;
His.
Juice?
Now, please.
They don't know.
I'll pass.
Has something happened?
'Kay.
Score!
Grab my hand!
Chinese?
Put it out!
Please be careful.
Shoot them!
Just go away.
Can't you see that?
How do you...
This is the one.
Faster, faster!
It's gonna be great.
Young.
Uh, hello?
The kids.
Come on, Frank.
Real.
Cynthia.
Awkward.
How long will it take?
With this.
Come, come, come.
My word.
Identify yourself.
I want to tell you something.
All right, everyone.
Ah, there you are.
Hello, how are you?
No, wait, wait.
Which part?
I'm not leaving you.
Give me your gun.
What should I say?
That would be me.
James Bond.
Don't think.
Snap out of it!
You're finished.
You Okay?
Get 'em!
We're off.
Good for him.
That so?
Did you do this?
P
Maybe I can help.
I'm sorry to bother you.
He's a good kid.
Diamonds.
Wait outside.
Get it off me!
Not great.
Wait, please.
You don't mind, do you?
Do you need help?
Tell me your name.
OK, thanks.
Doris.
Now, if you'll excuse me.
Hollywood.
I miss you so much.
Of course you don't.
Can I see?
I can't see it.
What are we looking for?
So are we.
It's hard to explain.
Ho-ho!
It burns!
Thousands.
Don't go in there.
Take a break.
Get out there.
I used to.
That is so sweet.
Fake.
Glad you could make it.
You tricked me.
You don't know anything about me.
No, baby.
Why didn't you say anything?
It's a mistake.
Good riddance.
McGee.
Don't think about it.
You must go.
Canada.
I do too.
What are you doing to me?
No, I get it.
Make up your mind.
Attagirl.
It'll pass.
What are you still doing here?
Oh, that's too bad.
My ass!
Hi, darling.
Why did you come back?
Ford!
Where's my son?
Butch.
We'll find her.
Don't do anything stupid.
Keep up.
Win!
I want to be with you.
Well, great.
Jared!
Write it down.
Just curious.
It's not his fault.
What's all this about?
Basically.
Address?
Tickets.
Laugh.
Stick around.
He's my husband.
I don't need this.
The choice is yours.
You fucking bitch!
Jump in.
Whose side are you on?
Listen to you.
Tell me now.
What happened next?
Run for it!
Hey, Ray.
It's insane.
Abandon ship!
Scissors.
This is my life.
Many times.
I'm just asking.
I'm not an idiot.
Po!
I don't care about that.
I feel bad.
Be calm.
My job.
Pepper.
Cristina.
Good morning, everyone.
Count me in.
Y eah.
What are you writing?
What do you want with me?
Hi, girls.
I'll teach you.
Thank you,
You asked for it.
This isn't working.
I don't love you.
What did you tell them?
You're not real.
Give them to me.
Fine by me.
That reminds me.
Okay, everybody.
Counselor.
Sonia!
Are you asleep?
So cool.
You're a dead man.
You're nothing.
Cigarettes.
WHAT DO YOU MEAN?
V?
Bon appétit.
I'll give you that.
I'll pay you back.
That's what you said.
Hello, Father.
No, I couldn't.
I thought you knew.
That's not important.
Yes, miss.
Isn't that nice?
That will be all.
Easy, now.
There, you see?
Who's with me?
I'm so stupid.
No, he isn't.
That's all it is.
Let me down!
You with me?
That's what we do.
Come on over here.
I got you something.
How is it going?
I found her.
Heart attack.
Don't tell me what to do.
The war is over.
Smooth.
She's back.
I fell.
That's the whole point.
I'm looking.
Uh, hi.
It's too bad.
Need some help?
Anyone home?
You have the right to an attorney.
I have to leave.
You know this guy?
Please continue.
We'll be right there.
Harriet.
That's a lot.
How did you find out?
I don't feel so good.
Gollum.
Where's your mother?
The ring.
There's one.
Don't be frightened.
Loose!
Hey, Tom.
Killed?
Take them off.
Who's that guy?
He's dangerous.
A party?
Turn it on.
It's okay, honey.
I wanted to tell you.
Don't fucking move!
I can't believe...
Grrr!
Open the gates!
And one more thing.
The dog.
My favorite.
Long live!
I didn't do that.
Can you feel it?
Innocent?
Radio.
Well, don't worry.
He is here.
Vamos.
Now then.
Not well.
What makes you so sure?
Soldier!
Got a light?
All right, cool.
Beat him!
How much do you need?
Where is he going?
He's not there.
This is nuts.
Don't care.
You don't have to say anything.
He started it.
Why wouldn't I?
How interesting.
Look what you did.
Brandy.
You didn't have to.
Okay, go ahead.
That's easy for you to say.
Hey, what are you doing here?
You should know that.
Good evening, ladies and gentlemen.
I'll look into it.
Just keep going.
Just think.
Sofia.
She likes you.
Fuck 'em.
Marianne!
But not you.
Yes, fine.
Oh, yeah, yeah, yeah.
Will you come?
No one else.
That's what I'm doing.
Come and sit down.
What's she like?
Where are your parents?
Are you busy?
Give me your hands.
We just got here.
College.
Buck!
Speak to me.
I object!
What did she do?
Proof?
No exceptions.
Abraham.
Trish.
That too.
I know you're there.
That can't be right.
Break a leg.
Who is that guy?
I need to tell you something.
My hero.
Half an hour.
I'm not sure yet.
You think this is funny?
Bad dog!
And so are you.
Run, run!
That's my name.
I don't know what I was thinking.
Call the cops.
Pippin!
Things change.
what happened?
I saved your life.
MOM!
Help you?
Oh, look at you.
We're getting out of here.
I had nothing to do with it.
I agree with you.
What happened to your hand?
I can't go on.
God help me.
You want me?
You need to leave.
Why bother?
Hey, excuse me.
nothing.
You want some coffee?
I knew you would.
That was weird.
I will do it.
Beep.
See anything?
He's the one.
Gil.
You should come.
Who were they?
I didn't do nothing.
You have to leave.
Let's try it.
Far out.
I have money.
Around.
Or worse.
What are you doing down here?
Behave.
Where's my wife?
Luis!
She doesn't.
How did I get here?
I can't believe that.
Hey, look at that.
My hand!
Marvellous.
You know what I want.
Get out here!
Is that enough?
Please stay.
Joanna.
Too soon?
You're joking, right?
Tell me what you see.
She's nice.
Okay, Mom.
Who does that?
I can't see a thing.
Whose is it?
And him?
What are you doing up?
I need some help.
Is that a threat?
Does that hurt?
You're afraid.
Anita.
It will be.
Me first.
Uh... no.
What's with him?
Did you find it?
Good answer.
I don't want anything.
Have you forgotten?
You're stupid.
I would never do that.
What do we know?
Simple as that.
Stop moving!
She doesn't know.
It's ours.
That'd be nice.
He was murdered.
Find out.
Goodbye, sir.
I don't think you understand.
Calvin.
Edith.
I found this.
Yeah, she is.
Yeah right.
I'll leave.
No, darling.
Abe!
Wolf!
What did you get?
Oh, Mom.
That bitch!
Don't follow me.
You have no choice.
Hey, Ben.
Here, let me help you.
Where's Dad?
Keep your mouth shut.
My office.
You wanna come?
Well, thank you very much.
Take a breath.
Sucker.
I don't know how to thank you.
The whole thing.
What did I just say?
I'm not angry.
There's no such thing.
Eight years.
I don't know,
Not necessary.
Passport.
Caitlin.
Now, let's see.
Beautiful, isn't it?
Hair.
Get in line.
Still nothing.
Thank you, man.
I fell asleep.
So it's true.
Kirk!
I love...
Milady.
Then who?
Afraid so.
We need to get out of here.
How'd you do it?
I didn't see it.
You're sick!
Sons of bitches!
Anything I can do?
Straight up.
WHAT'S GOING ON?
So, what do we do now?
Shut it off!
Listen, I...
We found it.
Football.
I just do.
They're mine.
Shocking.
Very beautiful.
Uh, well...
You want?
I need more time.
I do, too.
Dynamite.
Who are you working for?
That man.
No, that's...
What was?
help me!
Oh, my baby.
Things have changed.
Alvin!
Cookie?
Kira.
I want to live.
here.
Yeah, I was.
Mayor.
I do now.
Of course it does.
Why would you think that?
Sure you are.
Peyton.
I'm almost there.
Is anybody there?
This is a disaster.
Partners.
What's the trouble?
Ellis.
Hey, now.
You want this?
Thank you all for coming.
I didn't mean to scare you.
What the hell's wrong with you?
What did you do to me?
Was he?
Which ones?
Harris.
Suction.
I messed up.
Marshal.
It's a good idea.
No, I'm all right.
I want you to have it.
There's nothing to talk about.
We have to hurry.
Allie.
Knife.
You called me.
No, actually.
Is someone there?
Thinking.
If that's what you want.
Damien.
I've got something for you.
I don't wanna go.
She can't.
We're fucked.
Lead the way.
You were wrong.
Maestro!
Ty!
But that's impossible.
So what's up?
You look fantastic.
He was my friend.
I'll call him.
You betrayed me.
Did you hear something?
I can live with that.
Allen!
Are you feeling better?
Uh-uh-uh.
How do you know about that?
Now,
Did he say anything?
It's not gonna work.
Bon appetit.
Judge.
Flash.
Can I say something?
Come to bed.
I don't know who that is.
I'm right.
And don't worry.
What did you say to him?
So this is it.
Don't talk to me like that.
Unacceptable.
But I love you.
That's hilarious.
Why is he here?
I LOVE YOU.
But it's not.
This way please.
A joke.
Are you in there?
Do you believe me?
Tessa!
Can you keep a secret?
Ditto.
Come on, mate.
sure.
Pink.
My face!
Driver!
Something's happening.
You shouldn't have done that.
I'm crazy.
Willy.
Hello, Dad.
WAIT A MINUTE.
Willow.
I know I am.
You need to go.
Bond.
What do you think I am?
For this.
Shall I?
Night-night.
I know, I'm sorry.
Come on, Charlie.
I thought we were friends.
Sit down, sit down.
We're all set.
You scared the shit out of me.
Cuff him.
Nat!
Hey, asshole!
Repeat after me.
Nasty.
Tails.
I lied to you.
You don't have a choice.
Miriam.
Yes, Mom.
Hell, yes.
Do you have children?
All right, let's do it.
Where are you taking him?
It's not her.
I don't even know you.
You're a fool.
I'm sorry, too.
Shh, shh, shh, shh.
What's the idea?
No, forget it.
Crane.
That's all I want.
Who are you guys?
Company!
He's drunk.
Did you know about this?
What was he like?
You don't remember me?
Ooh, ooh.
Buckle up.
He's coming back.
Looks that way.
Nailed it.
There she goes.
What does it do?
Is this what you want?
Do you live here?
Aliens?
We'll take it from here.
Do tell.
You think that's funny?
Isn't he?
The book.
Move it, move it!
Fuck's sake.
You be careful.
You're full of shit.
Throw it away.
I've got this.
She was here.
You know what I'm sayin'?
You look well.
No pulse.
What were you doing there?
You don't belong here.
You should have told me.
Oh, I can't.
That was a mistake.
I don't feel like it.
That's all I ask.
Neither can I.
Hey, Max.
Oh, I almost forgot.
He's leaving.
How could this happen?
I need money.
Donny!
It was wonderful.
Not a bit.
Bird.
How are we doing?
Please respond.
What the hell, man?
I remember everything.
Go on, get out of here.
Trust you?
What was she like?
Toast.
Dying.
And here we are.
Ten-hut!
Disappeared.
You look familiar.
Present arms!
Did they?
Yes, father.
My foot!
Tristan!
Thank you again.
Hands behind your head.
Thank you, baby.
Split up.
You'll like it.
Jeannie.
Bye, now.
Let's go, man.
Stay focused.
Know what I'm saying?
What'd I say?
Bye, bye.
Oh, is that right?
Heh-heh-heh.
What do you want ?
Thirty seconds.
You're up early.
Switch.
Oh, that's it.
Something is wrong.
It's more than that.
Comrades!
None whatsoever.
Sherry?
aah!
Morris.
You choose.
You know my name.
I think so too.
These things happen.
Bon voyage.
A date?
Don't you remember me?
No, it's not okay.
Yeah, tell me about it.
Without you.
That was incredible.
That's your job.
It's not for me.
I'll keep that in mind.
Did you kill him?
Hey, wait up!
How does it look?
Every night.
Party's over.
You missed.
Observe.
I'm a writer.
Tight.
I like.
I don't agree.
Mimi!
I want to see it.
Marc.
Golly.
It's sad.
I have to work.
What the hell did you do?
Nice to meet you, too.
Hey, Jim.
That was an accident.
Maddie.
What's the catch?
So what do you want?
Why did you stop?
Right, okay.
Am I dead?
That's not what I'm saying.
I'll protect you.
Very well, thank you.
Uh, I...
Don't flatter yourself.
Tammy.
That's what they say.
And another thing.
Mistress!
Excuse.
I didn't realize.
Take it down.
Going down.
Sadie.
Sabrina.
This is him.
Where did you hear that?
Get some!
It certainly is.
What's what?
You look different.
I don't think I can.
That woman.
Let me have a look.
Tequila.
Is everything alright?
I said shut up!
Turn that off.
You guys okay?
What are you hiding?
I like the sound of that.
It was your idea.
Lester.
Go over there.
It's free.
Now I remember.
What'd you find?
Let's go together.
Oh, I'm fine.
Just so you know.
We're out.
We have a deal.
What did I do wrong?
Darcy.
You don't even know me.
I heard something.
No question.
You keep it.
There you have it.
Well, let's go.
You are so beautiful.
Possible.
Look at these.
You don't know her.
It's now or never.
As if.
I look forward to it.
That's a promise.
I don't know what I'm doing.
Washington.
Shakespeare.
Gail.
Poppy!
Nice, huh?
Oh, fuck me.
I'm clean.
What the hell's the matter with you?
Yes, you were.
You just did.
Give me one.
August.
It was nice meeting you.
Next, please.
Catch it!
Lawyer.
Code red.
Now, where were we?
Shit, shit, shit.
Tighter.
Sorry, I...
Quite so.
Hello, son.
Your eyes.
I shot him.
Do you have an appointment?
Stolen?
Monsters.
Hi, everyone.
Aye aye, sir.
What is his name?
I'll get them.
History.
Show it to me.
Special.
I'm going crazy.
Are you well?
Ari.
This is a surprise.
Heidi!
What's going on in here?
Cherry.
Shrek!
What the--?
Is it him?
No, you're wrong.
What, are you crazy?
There you go again.
Little?
It's dark.
See ya later.
Yes, she does.
Just as I thought.
Make it fast.
Come on, quick.
Are you lost?
And this is...
Burke!
Unknown.
Easy for you to say.
Did you do that?
Urgent.
End of discussion.
Let him.
Why are you...
Don't be sad.
I don't do that.
What are you worried about?
Get the car.
Nobody does.
Well, this is it.
Everybody up!
Far from it.
I can understand that.
You're upset.
Well, fine.
That's a good thing.
Mira.
It's for your own good.
A mistake?
Listen to yourself.
I could do that.
No, they won't.
Houston.
What a nice surprise.
Where's your car?
No, I'm afraid not.
Thank you, God.
Blast!
Gee, thanks.
What am I looking at?
Roland!
It's so hot.
Sorry about this.
I have one.
So let me get this straight.
For what reason?
He's nice.
No, it is not.
Do you know what that is?
How long have you known?
You want to come?
Data.
You're doing good.
Snap.
Grandmother!
We'll wait.
Yeah, uh...
Ungh!
It suits you.
How much is that?
Feels good.
They'll kill you.
In private.
What's going on out there?
So pretty.
I'll fucking kill you!
Tell me what's going on.
Yeah, it's fine.
Why do you want to know?
Suck it!
What does that have to do with anything?
Rabbit.
Bow.
Closed.
That right?
Oh-oh.
Hey, Pete.
Who with?
Raj!
Oh, you did?
I'm not alone.
Pigs!
Would you like some?
Dallas?
I know I did.
Yeah, I'm...
No problems.
Haven't you?
I am so proud of you.
Battle stations.
Heroin.
You are not.
Is it me?
That's exactly right.
Oh, is that so?
You're gonna die.
One last thing.
We're wasting time.
You really want to know?
No one can.
No,no,no.
One of us.
Not yours.
You and me both.
How do we do that?
He's an idiot.
You're perfect.
Marta!
Far away.
Why are we stopping?
Who is there?
We're doomed.
I'm glad to hear that.
It doesn't mean anything.
Shoot her!
Please don't leave me.
So good to see you.
Problems?
Advance!
It's starting.
How can you?
You get used to it.
I'm fine, thank you.
We'll make it.
I was drunk.
I want to ask you something.
Dex.
Be ready.
You ready for this?
Don't shoot me.
No, I did.
No, I am not.
Write.
You see him?
Can you see anything?
When did that happen?
You're young.
Sherman!
Stop the bus!
Matty.
I'm fine, thanks.
So what do you do?
She's dying.
You don't love me.
When did you get back?
Oh, snap!
Manager.
Hey, check it out.
Big mistake.
That is enough.
Indy!
Ah, ah.
A letter?
You mean that?
Sheldon.
You feel that?
You married?
I'm just trying to help.
Look familiar?
Your girlfriend?
Okay, sorry.
Now, then.
She'll be back.
All right, go ahead.
You've gotta be kidding me.
There must be some mistake.
I should've known.
We'll do it.
Right you are.
I'm buying.
Speak English.
You'll find out.
Who's asking?
This is true.
Tie him up.
The phone.
Where are the kids?
Keep an eye on him.
It wasn't like that.
Now what do we do?
Porter.
Xander!
You should be ashamed of yourself.
I'd...
That's far enough.
This is a nightmare.
Did we?
Praise God.
I feel better.
Shalom.
Hey, um...
It's nothing personal.
No, you are.
A word.
I'm not saying that.
Godspeed.
That's no problem.
I can't take this.
Get an ambulance!
Stacy.
Just one thing.
There's nothing to be afraid of.
Whenever you're ready.
And what happened?
Take one.
She's out.
You poor thing.
That's unbelievable.
Are we good?
What are you guys talking about?
It happens all the time.
Vicki!
Up, up.
Small.
Brody.
What happened then?
I want out.
Show some respect.
So what's the plan?
MM.
Can you do that for me?
En garde!
I'm frightened.
Winner!
Or me.
Correction.
Really great.
Oh, thank you so much.
And I will.
So sad.
What is it with you?
This man.
You see what I mean?
That's up to you.
Mark my words.
Raven.
Reed.
I was here.
No problem at all.
Just go home.
We'll be all right.
I don't need to.
That's not what I said.
I don't hate you.
Are you out of your fucking mind?
Talk about what?
Hey, what's that?
Kill you?
What's taking so long?
You love her.
Three hours.
Do you know where she is?
How do you know him?
Kneel down.
Did you get him?
If I may.
Fran?
You should try it.
What does he look like?
Pray.
Who's in there?
Please follow me.
I forgot to tell you.
Okay, let's do it.
I wasn't thinking.
Who were you talking to?
Are you angry?
I just told you.
What did they do to you?
Hang on a sec.
Believe me, I know.
She's perfect.
Just because.
Based on what?
Nikita.
Emmett!
Philippe!
Step forward.
Oh, Dad.
WHAT ARE YOU TALKING ABOUT?
What did you tell her?
Spare me.
Gracie!
Happy Halloween.
How big?
Who asked you?
Downtown.
To be continued.
Are you in pain?
Bert!
How've you been?
He's the best.
It has.
Do sit down.
We can do that.
Oh, you're right.
Orders.
Doyle.
God knows.
Bilbo!
Come on, John.
wow.
Hello, Mother.
Just you wait.
Yeah, we are.
No, listen to me.
It's been too long.
I didn't hear anything.
Hold it there.
Just hear me out.
You know I love you.
I wanted to talk to you.
Subtitles by DramaFever
It was perfect.
Come on, this way.
I've changed.
What went wrong?
Not too much.
uh...
Good evening, gentlemen.
Back there.
Climb!
What's up, guys?
Politics.
There's no point.
Did not.
Best of luck.
A car?
You know what you are?
I don't know anything about that.
What the hell is it?
So, that's it?
This is embarrassing.
I don't have much time.
Let me talk to her.
Your hair.
Sure do.
Oh, me?
A bomb?
Hello, Jack.
No buts.
Five seconds.
I miss her.
Can't sleep?
About us.
Did I hurt you?
Why here?
Although...
It's going to be all right.
Who am I kidding?
Deep breaths.
How old were you?
You're hired.
Ambassador.
Lionel.
Monk.
Touch it.
I don't know what to think.
Don't argue.
Language.
The light.
Everyone out!
Don't hurt her.
Surprise me.
Save him.
He's hurt.
Glad to see you.
What's that all about?
Take the money.
Sorry, buddy.
Turn back!
You're pretty.
Good Morning.
Ah, ah, ah.
Put him on.
Ham.
You're kidding me, right?
Oh, there it is.
But I don't understand.
Hey, stop it!
It was stupid.
Why should I believe you?
Shall we dance?
Italian.
It's the law.
Bigger.
Let's go to work.
Griffin.
Move out of the way!
And mine.
How does that feel?
Can I have a word?
South.
He made it.
What'll you have?
Aaagh!
I don't want this.
He's a doctor.
Maybe I am.
l can't.
No response.
alright.
Give me a cigarette.
They're leaving.
Hey, wait a second.
It's for the best.
Not a clue.
Working on it.
What do you do for a living?
We can't do this.
All over.
He's married.
He's cool.
I don't know who you are.
What did you hear?
Caution.
What the hell happened here?
Speaking of which...
I believe it.
Where'd it go?
What the hell are you?
What's up, baby?
That's wrong.
I'm such an idiot.
Do you like me?
What do you like?
I need this.
It might.
Just get out of here.
Poor baby.
Many.
I don't even know.
HE LAUGHS
Sure, no problem.
Thanks, pal.
When are you leaving?
Hey, what happened?
We're rich!
I'm sorry,
YEP.
me?
Here's one.
We've got him.
Thank you, Sir.
Dollars?
We'll take care of it.
Follow my lead.
He's down.
Give me a call.
Give me some.
He wasn't.
No, stop it!
This is a bad idea.
I want to talk to him.
Oh, it's beautiful.
Let me have it.
Enough of this.
Careful, careful.
Especially you.
Go on now.
He wouldn't.
I need to see you.
That's not what happened.
Ah, right.
Who are these guys?
Get set.
I don't belong here.
It's too soon.
I figured it out.
When did you get here?
You nervous?
Fuckin' hell.
Dani!
I can't hear.
Millie.
Archers!
Hey, what?
Mornin'.
The door was open.
Take the wheel.
Yes, now.
What the hell just happened?
Sound good?
She's my friend.
Well, I did.
Hyung!
How about a drink?
Do I have a choice?
There's a problem.
Yo, man.
Elise.
How are they?
A book?
You don't mind?
Hicks!
I know that look.
You're dismissed.
I will be.
Two, three.
You guys ready?
You're breaking up.
Suzanne.
Jin!
Show us.
Do you want to talk about it?
Viktor.
Hey, what's wrong?
Hold your horses.
What's the address?
Here you are, sir.
Arnold.
Something's going on.
Hello, John.
## [Continues]
Afraid not.
She hates me.
You idiots!
No luck.
Denied.
He didn't do it.
Franklin.
I'll see.
Who's coming?
STOP IT!
Brake!
What happened there?
Pretty cool, huh?
Faggot!
It's a dead end.
Coop.
By yourself?
Do you smoke?
Can you help us?
Now, now, now.
You haven't changed.
I don't wanna.
He's upstairs.
Hey, Jake.
Chance.
Solomon!
Hey, everyone.
Kisses.
Just that.
It's me again.
Kent.
Where the hell are you going?
You know what your problem is?
How cute.
Too.
I've done it.
I don't know where she is.
Mind if I join you?
Everybody does.
Oh, you do?
What are you talking?
It's a free country.
Practice.
German.
You love him.
I'll live.
Why didn't you say something?
We're not sure.
All in.
They are coming.
I don't feel good.
I love you very much.
Hum...
My place.
Tell me what you want.
That's hot.
How are you, sir?
I'm not married.
HOW?
Oh, no, thanks.
Elliott.
Hey, what's this?
You got a better idea?
Relax, relax.
What day is it?
Drop your gun!
Lara!
Got her.
I would never.
You like her?
Guess so.
Um, I don't know.
This is the end.
Bye, sweetie.
Anything you say.
The kid.
Know why?
Who's here?
Don't be so sure.
Horses.
Can I call you back?
Yeah, Dad.
What happened to me?
Daryl.
What an asshole.
Two seconds.
He's beautiful.
Just stay here.
Well, here I am.
Nevermind.
What do you take me for?
You're shitting me.
That's my wife.
Pull the trigger.
I'm shocked.
It doesn't work that way.
Here, let me.
No, we won't.
I see what you mean.
So close.
Bet.
It was nice to meet you.
Patricia.
Shirley.
Start again.
Fuck her.
What is this shit?
I've been better.
That's a...
Austin.
All this.
We tried.
Uh, what?
Anything you say can and will be used against you in a court of law.
That means...
You son of a...
You gotta help me.
Hey, George.
Stop it, please.
Don't fight.
What's she saying?
It is time.
What's going on, man?
It was just...
A while.
You don't look so good.
Thank...
Maybe a little.
You're gonna need it.
THERE.
Divorce?
A boat?
You're a monster.
I find that hard to believe.
GOOD NIGHT.
He's inside.
Left, right.
What else can I do?
I did what I had to do.
Last year.
Good lord.
If you...
How was school?
Hey hey!
What's got into you?
Cyrus.
Ask me.
Strip.
I refuse.
Stay away from him.
More than that.
Jade!
Chop-chop.
UHH!
You coward!
Okay, man.
For instance?
Boyd.
Give it a rest.
I want him.
Have a great day.
Stay away from her.
Don't push it.
♪ Oh ♪
Heart.
Uh, no, no.
What are you on about?
Jeanne!
Can I trust you?
So, yeah.
What you mean?
Oh, what the hell.
Yes, General.
Yeah, hello.
Don't be absurd.
Was it good?
Georgia.
Ow, ow!
Start talking.
Give it back to me!
I will go.
Touch me.
Callie.
But be careful.
Can you imagine that?
You're different.
Cocksucker!
We must hurry.
Call it in.
What else is new?
Fuck yeah!
Dickhead.
Noodles.
Robbery!
Marina.
I can't stop.
That's new.
Is something the matter?
Clyde!
I don´t know.
You understand what I'm saying?
Yeah, that's fine.
I'm going to die.
It's everywhere.
Sorry, boss.
Let's sit down.
Yes, Mama.
We're losing him.
No no no no.
Hey, I'm sorry.
Your majesty.
There's only one way to find out.
So stupid.
What are you, crazy?
You shot me.
Bridge.
`,$=Q.split(`
`).filter(a=>a);function Z(a){const o=a.trim().toLowerCase().split(" ").map(n=>n.trim()).filter(n=>n);return $.filter(n=>o.every(e=>n.toLowerCase().includes(e)))}const W=class W extends HTMLElement{constructor(){super();i(this,"options");i(this,"input");this.input=document.createElement("input"),this.appendChild(this.input),this.input.addEventListener("focus",this.onInputFocus.bind(this)),this.input.addEventListener("blur",this.onInputBlur.bind(this)),this.input.addEventListener("input",this.onInput.bind(this)),this.input.addEventListener("keydown",this.onInputKeydown.bind(this)),this.options=document.createElement("app-drawer-options"),this.appendChild(this.options),document.addEventListener("keydown",this.onKeyDown.bind(this))}static register(){customElements.define(W.name,W)}board(){const n=A(this.getAttribute("board")),e=A(document.getElementById(n));return u(e instanceof Y),e}adoptTile(n){u(this.board!==void 0),this.board().adoptTile(n),this.endInput()}startInput(){this.input.focus(),this.input.select(),this.onInputStart()}endInput(){this.input.blur(),this.onInputEnd()}onInputStart(){u(this.options instanceof w),this.options.open(),this.onInputChanged(this.input.value??"")}onInputChanged(n){u(this.options instanceof w),this.options.setOptions(Z(n))}onInputEnd(){u(this.options instanceof w),this.options.close()}onInputFocus(){this.onInputStart()}onInputBlur(){this.onInputEnd()}onKeyDown(n){n.key==="/"&&(n.preventDefault(),this.startInput())}onInputKeydown(n){n.key==="Escape"&&this.endInput(),n.stopPropagation()}onInput(n){n.target===this.input&&this.onInputChanged(this.input.value)}};i(W,"name","app-drawer");let O=W;const p=class p extends HTMLElement{constructor(){super(),this.addEventListener("mousedown",this.onMouseDown.bind(this)),this.addEventListener("click",this.onClick.bind(this))}static register(){customElements.define(p.name,p)}show(){this.classList.remove("hidden")}hide(){this.classList.add("hidden")}onMouseDown(o){o.target===this&&this.hide()}onClick(o){if(o.target instanceof HTMLButtonElement)switch(o.target.getAttribute("data-action")){case"close":this.hide();break}}};i(p,"name","app-modal");let T=p;const f=class f extends HTMLElement{constructor(){super(),this.addEventListener("click",this.onClick.bind(this))}static register(){customElements.define(f.name,f)}onClick(o){if(o.target instanceof HTMLElement)switch(o.target.getAttribute("data-action")){case"modal":{const n=A(o.target.getAttribute("data-target")),e=A(document.getElementById(n));u(e instanceof T),e.show()}}}};i(f,"name","app-menu");let M=f;Y.register();D.register();O.register();w.register();b.register();l.register();M.register();T.register();const v=document.getElementById("board");u(v!==null&&v instanceof Y);const N=document.getElementById("about");u(N!==null&&N instanceof T);const x="fridgeProse";let J;const _=new MutationObserver(()=>{window.clearTimeout(J),J=setTimeout(()=>{localStorage.setItem(x,v.saveTo())},100)});_.observe(v,{subtree:!0,childList:!0,attributes:!0});const R=localStorage.getItem(x);R===null?N.show():(N.hide(),v.loadFrom(R));
