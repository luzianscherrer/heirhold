"use strict";(self.webpackChunkwebapp=self.webpackChunkwebapp||[]).push([[825],{6825:(e,a,t)=>{t.d(a,{offchainLookup:()=>w,offchainLookupSignature:()=>m});var s=t(1642),r=t(3855),n=t(6026),o=t(8283);class c extends n.C{constructor(e){let{callbackSelector:a,cause:t,data:s,extraData:r,sender:n,urls:c}=e;super(t.shortMessage||"An error occurred while fetching for an offchain result.",{cause:t,metaMessages:[...t.metaMessages||[],t.metaMessages?.length?"":[],"Offchain Gateway Call:",c&&["  Gateway URL(s):",...c.map((e=>`    ${(0,o.I)(e)}`))],`  Sender: ${n}`,`  Data: ${s}`,`  Callback selector: ${a}`,`  Extra data: ${r}`].flat(),name:"OffchainLookupError"})}}class d extends n.C{constructor(e){let{result:a,url:t}=e;super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,o.I)(t)}`,`Response: ${(0,r.A)(a)}`],name:"OffchainLookupResponseMalformedError"})}}class l extends n.C{constructor(e){let{sender:a,to:t}=e;super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${t}`,`OffchainLookup sender address: ${a}`],name:"OffchainLookupSenderMismatchError"})}}var u=t(9779),i=t(9510),f=t(3),p=t(7197),h=t(2651),y=t(7466);const m="0x556f1830",b={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function w(e,a){let{blockNumber:t,blockTag:r,data:n,to:o}=a;const{args:d}=(0,i.W)({data:n,abi:[b]}),[u,y,m,w,g]=d,{ccipRead:x}=e,C=x&&"function"===typeof x?.request?x.request:k;try{if(!(0,p.h)(o,u))throw new l({sender:u,to:o});const a=await C({data:m,sender:u,urls:y}),{data:n}=await(0,s.T)(e,{blockNumber:t,blockTag:r,data:(0,h.xW)([w,(0,f.h)([{type:"bytes"},{type:"bytes"}],[a,g])]),to:o});return n}catch(O){throw new c({callbackSelector:w,cause:O,data:n,extraData:g,sender:u,urls:y})}}async function k(e){let{data:a,sender:t,urls:s}=e,n=new Error("An unknown error occurred.");for(let c=0;c<s.length;c++){const e=s[c],l=e.includes("{data}")?"GET":"POST",i="POST"===l?{data:a,sender:t}:void 0;try{const s=await fetch(e.replace("{sender}",t).replace("{data}",a),{body:JSON.stringify(i),method:l});let o;if(o=s.headers.get("Content-Type")?.startsWith("application/json")?(await s.json()).data:await s.text(),!s.ok){n=new u.Ci({body:i,details:o?.error?(0,r.A)(o.error):s.statusText,headers:s.headers,status:s.status,url:e});continue}if(!(0,y.q)(o)){n=new d({result:o,url:e});continue}return o}catch(o){n=new u.Ci({body:i,details:o.message,url:e})}}throw n}}}]);