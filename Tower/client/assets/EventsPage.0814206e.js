import{l as I,b as k,m as V,c as d,d as _,o as n,e as a,f as e,n as r,t as l,g,w,h as f,i as u,v as h,F as x,C as E,k as b}from"./vendor.7246176c.js";import{_ as j,c as C,l as m,A as i,t as y,e as p,P as M}from"./index.4fa78d72.js";const D={name:"Events",setup(){const c=I(),s=k({eventId:c.params.id}),v=k({});return c.params.id&&V(async()=>{try{await p.getEventById(c.params.id),await C.getEventComments(c.params.id),await y.getEventTickets(c.params.id),await y.getMyTickets()}catch(t){m.error(t)}}),{editable:s,route:c,edited:v,async createComment(){try{await C.createComment(s.value)}catch(t){m.error(t)}},async createTicket(){let t={accountId:i.account.id,eventId:i.activeEvent.id};y.createTicket(t)},async editEvent(){try{await p.editEvent(v.value,c.params.id)}catch(t){m.error(t)}},async cancelEvent(){try{await M.confirm()&&await p.cancelEvent(c.params.id)}catch(t){m.error(t)}},tActive:d(()=>i.activeEvent),comments:d(()=>i.comments),myTickets:d(()=>i.myTickets),eTickets:d(()=>i.eTickets),account:d(()=>i.account),rsvpCheck:d(()=>i.eTickets.find(t=>t.account.id==i.account.id))}}},N={class:"container-fluid bg-secondary"},P=e("div",{class:"p-5"},null,-1),B=e("div",{class:"p-3 mt-5"},null,-1),U={class:"row"},F={class:"col-lg-6 col-md-6 col-sm-12 align-items-top p-2"},R={class:"d-flex justify-content-center"},q=["src"],L={class:"d-flex justify-content-center"},O={key:0,class:"col-12 bg-danger p-2 mt-4 text-center text-dark rounded"},z=e("a",{class:"text-black"},"Canceled",-1),G=[z],H={key:0,class:"col-12 bg-warning p-2 mt-4 text-center text-dark rounded"},J={class:"border-start border-warning col-lg-6 col-md-6 col-sm-12"},K={class:"border-bottom border-warning text-warning"},Q={class:"p-3"},W={class:"p-3"},X={class:"p-3"},Y={class:"p-3 mb-2"},Z={class:"row d-flex justify-content-end p-5"},$={key:1,"data-bs-toggle":"modal","data-bs-target":"#editEventModal",class:"col-lg-3 col-md-3 col-sm-12 p-2 mt-2 ms-1 hoverable text-center bg-warning text-white rounded"},tt=b(" Edit Event "),et={class:"row"},ot={class:"col-12"},st=b(" Event Name "),ct=b(" Description "),nt=e("div",{class:"row p-3 mt-2"},[e("button",{class:"col-12 btn btn-success"},"Save Changes")],-1),at={class:"row p-3 mt-2"},it={class:"row p-3"},dt=e("h4",{class:"text-center mt-3 p-2 border-bottom border-warning text-warning"}," Event Attendees ",-1),rt={class:"col-12 bg-dark rounded p-1"},lt={class:"row"},mt={class:"row d-flex mt-3 justify-content-center"},vt={class:"col-lg-8 col-md-8 col-sm-12 p-4 mb-5 rounded bg-light"},_t={class:"row"},gt=e("div",{class:"d-flex justify-content-end mt-3"},[e("button",{class:"btn hoverable col-lg-3 col-md-3 col-sm-12 bg-success"}," Add Comment ")],-1);function ut(c,s,v,t,ht,bt){const A=_("Modal"),T=_("Attendees"),S=_("Comment");return n(),a("div",N,[P,B,e("div",U,[e("div",F,[e("div",R,[e("img",{class:"img-fluid rounded ms-0 shadow",src:t.tActive.coverImg,alt:""},null,8,q)]),e("div",L,[t.tActive.isCanceled==!0?(n(),a("div",O,G)):r("",!0)]),t.tActive.capacity==0?(n(),a("div",H," Sold Out ")):r("",!0)]),e("div",J,[e("ul",null,[e("h1",K,l(t.tActive.name),1),e("li",Q,l(t.tActive.location),1),e("li",W," Starts at "+l(new Date(t.tActive.startDate).toDateString()),1),e("li",X,l(t.tActive.capacity)+" remaining tickets",1),e("p",Y,l(t.tActive.description),1),e("div",Z,[t.rsvpCheck==c.accountId&&t.tActive.capacity!==0&&t.tActive.isCanceled!==!0?(n(),a("div",{key:0,onClick:s[0]||(s[0]=o=>t.createTicket(t.account.id)),class:"col-lg-3 col-md-3 col-sm-12 p-2 mt-2 hoverable text-center bg-success text-white rounded"}," RSVP ")):r("",!0),t.account.id==t.tActive.creatorId&&t.tActive.isCanceled!==!0?(n(),a("div",$," Edit Event ")):r("",!0)])]),g(A,{id:"editEventModal"},{title:w(()=>[tt]),body:w(()=>[e("div",et,[e("div",ot,[e("form",{onSubmit:s[3]||(s[3]=f((...o)=>t.editEvent&&t.editEvent(...o),["prevent"]))},[st,u(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>t.edited.name=o),type:"text",class:"col-12 bg-secondary text-light rounded"},null,512),[[h,t.edited.name]]),ct,u(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>t.edited.description=o),type:"text",class:"col-12 bg-secondary text-light rounded"},null,512),[[h,t.edited.description]]),nt],32),e("div",at,[t.account.id==t.tActive.creatorId?(n(),a("button",{key:0,onClick:s[4]||(s[4]=(...o)=>t.cancelEvent&&t.cancelEvent(...o)),"data-bs-dismiss":"modal",class:"col-12 btn btn-danger"}," Cancel Event ")):r("",!0)])])])]),_:1})])]),e("div",it,[dt,e("div",rt,[e("div",lt,[(n(!0),a(x,null,E(t.eTickets,o=>(n(),a("div",{key:o.id,class:"col-2"},[g(T,{eTicket:o},null,8,["eTicket"])]))),128))])])]),e("div",mt,[e("div",vt,[e("div",_t,[e("form",{onSubmit:s[6]||(s[6]=f((...o)=>t.createComment&&t.createComment(...o),["prevent"]))},[u(e("textarea",{required:"","onUpdate:modelValue":s[5]||(s[5]=o=>t.editable.body=o),class:"rounded col-12",type:"text",placeholder:"Add a comment about this event..."},null,512),[[h,t.editable.body]]),gt],32)]),(n(!0),a(x,null,E(t.comments,o=>(n(),a("div",{key:o.id},[g(S,{comment:o},null,8,["comment"])]))),128))])])])}var kt=j(D,[["render",ut]]);export{kt as default};
