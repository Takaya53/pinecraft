(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,ee=1029,te=1030,O=1031,ne=1033,k=33776,A=33777,re=33778,ie=33779,j=35840,ae=35841,oe=35842,se=35843,ce=36196,le=37492,ue=37496,de=37488,fe=37489,pe=37490,me=37491,he=37808,ge=37809,_e=37810,ve=37811,ye=37812,be=37813,xe=37814,Se=37815,Ce=37816,we=37817,Te=37818,Ee=37819,De=37820,Oe=37821,ke=36492,Ae=36494,je=36495,Me=36283,Ne=36284,M=36285,Pe=36286,Fe=2300,Ie=2301,N=2302,Le=2303,P=2400,Re=2401,ze=2402,Be=3200,Ve=`srgb`,He=`srgb-linear`,Ue=`linear`,We=`srgb`,Ge=7680,Ke=35044,qe=2e3;function Je(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ye(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Xe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ze(){let e=Xe(`canvas`);return e.style.display=`block`,e}var Qe={},$e=null;function et(...e){let t=`THREE.`+e.shift();$e?$e(`log`,t,...e):console.log(t,...e)}function tt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function F(...e){e=tt(e);let t=`THREE.`+e.shift();if($e)$e(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function I(...e){e=tt(e);let t=`THREE.`+e.shift();if($e)$e(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function nt(...e){let t=e.join(` `);t in Qe||(Qe[t]=!0,F(...e))}function rt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var it={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},at=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ot=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),st=Math.PI/180,ct=180/Math.PI;function lt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ot[e&255]+ot[e>>8&255]+ot[e>>16&255]+ot[e>>24&255]+`-`+ot[t&255]+ot[t>>8&255]+`-`+ot[t>>16&15|64]+ot[t>>24&255]+`-`+ot[n&63|128]+ot[n>>8&255]+`-`+ot[n>>16&255]+ot[n>>24&255]+ot[r&255]+ot[r>>8&255]+ot[r>>16&255]+ot[r>>24&255]).toLowerCase()}function ut(e,t,n){return Math.max(t,Math.min(n,e))}function dt(e,t){return(e%t+t)%t}function ft(e,t,n){return(1-n)*e+n*t}function pt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function mt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var L=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ht=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:F(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_t.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_t.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return gt.copy(this).projectOnVector(e),this.sub(gt)}reflect(e){return this.sub(gt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gt=new R,_t=new ht,z=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(vt.makeScale(e,t)),this}rotate(e){return this.premultiply(vt.makeRotation(-e)),this}translate(e,t){return this.premultiply(vt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vt=new z,yt=new z().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bt=new z().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xt(){let e={enabled:!0,workingColorSpace:He,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Ct(e.r),e.g=Ct(e.g),e.b=Ct(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=wt(e.r),e.g=wt(e.g),e.b=wt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ue:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return nt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return nt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[He]:{primaries:t,whitePoint:r,transfer:Ue,toXYZ:yt,fromXYZ:bt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:r,transfer:We,toXYZ:yt,fromXYZ:bt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),e}var St=xt();function Ct(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function wt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Tt,Et=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Tt===void 0&&(Tt=Xe(`canvas`)),Tt.width=e.width,Tt.height=e.height;let t=Tt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Tt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Xe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ct(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ct(t[e]/255)*255):t[e]=Ct(t[e]);return{data:t,width:e.width,height:e.height}}else return F(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Dt=0,Ot=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dt++}),this.uuid=lt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(kt(r[t].image)):e.push(kt(r[t]))}else e=kt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function kt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Et.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(F(`Texture: Unable to serialize Texture.`),{})}var At=0,jt=new R,Mt=class r extends at{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:At++}),this.uuid=lt(),this.name=``,this.source=new Ot(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new L(0,0),this.repeat=new L(1,1),this.center=new L(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new z,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(jt).x}get height(){return this.source.getSize(jt).y}get depth(){return this.source.getSize(jt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){F(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){F(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x);break}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y);break}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Mt.DEFAULT_IMAGE=null,Mt.DEFAULT_MAPPING=300,Mt.DEFAULT_ANISOTROPY=1;var Nt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Pt=class extends at{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t),this.textures=[];let r=new Mt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ot(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ft=class extends Pt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},It=class extends Mt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Lt=class extends Mt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Rt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/zt.setFromMatrixColumn(e,0).length(),i=1/zt.setFromMatrixColumn(e,1).length(),a=1/zt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vt,e,Ht)}lookAt(e,t,n){let r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Ut.crossVectors(n,Gt),Ut.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Ut.crossVectors(n,Gt)),Ut.normalize(),Wt.crossVectors(Gt,Ut),r[0]=Ut.x,r[4]=Wt.x,r[8]=Gt.x,r[1]=Ut.y,r[5]=Wt.y,r[9]=Gt.y,r[2]=Ut.z,r[6]=Wt.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],te=r[2],O=r[6],ne=r[10],k=r[14],A=r[3],re=r[7],ie=r[11],j=r[15];return i[0]=a*x+o*T+s*te+c*A,i[4]=a*S+o*E+s*O+c*re,i[8]=a*C+o*D+s*ne+c*ie,i[12]=a*w+o*ee+s*k+c*j,i[1]=l*x+u*T+d*te+f*A,i[5]=l*S+u*E+d*O+f*re,i[9]=l*C+u*D+d*ne+f*ie,i[13]=l*w+u*ee+d*k+f*j,i[2]=p*x+m*T+h*te+g*A,i[6]=p*S+m*E+h*O+g*re,i[10]=p*C+m*D+h*ne+g*ie,i[14]=p*w+m*ee+h*k+g*j,i[3]=_*x+v*T+y*te+b*A,i[7]=_*S+v*E+y*O+b*re,i[11]=_*C+v*D+y*ne+b*ie,i[15]=_*w+v*ee+y*k+b*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,ee=d*g-f*h,te=_*ee-v*D+y*E+b*T-x*w+S*C;if(te===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/te;return e[0]=(o*ee-s*D+c*E)*O,e[1]=(r*D-n*ee-i*E)*O,e[2]=(m*S-h*x+g*b)*O,e[3]=(d*x-u*S-f*b)*O,e[4]=(s*T-a*ee-c*w)*O,e[5]=(t*ee-r*T+i*w)*O,e[6]=(h*y-p*S-g*v)*O,e[7]=(l*S-d*y+f*v)*O,e[8]=(a*D-o*T+c*C)*O,e[9]=(n*T-t*D-i*C)*O,e[10]=(p*x-m*y+g*_)*O,e[11]=(u*y-l*x-f*_)*O,e[12]=(o*w-a*E-s*C)*O,e[13]=(t*E-n*w+r*C)*O,e[14]=(m*v-p*b-h*_)*O,e[15]=(l*b-u*v+d*_)*O,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinant();if(i===0)return n.set(1,1,1),t.identity(),this;let a=zt.set(r[0],r[1],r[2]).length(),o=zt.set(r[4],r[5],r[6]).length(),s=zt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Bt.copy(this);let c=1/a,l=1/o,u=1/s;return Bt.elements[0]*=c,Bt.elements[1]*=c,Bt.elements[2]*=c,Bt.elements[4]*=l,Bt.elements[5]*=l,Bt.elements[6]*=l,Bt.elements[8]*=u,Bt.elements[9]*=u,Bt.elements[10]*=u,t.setFromRotationMatrix(Bt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},zt=new R,Bt=new Rt,Vt=new R(0,0,0),Ht=new R(1,1,1),Ut=new R,Wt=new R,Gt=new R,Kt=new Rt,qt=new ht,Jt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ut(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ut(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:F(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Kt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qt.setFromEuler(this),this.setFromQuaternion(qt,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jt.DEFAULT_ORDER=`XYZ`;var Yt=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Xt=0,Zt=new R,Qt=new ht,$t=new Rt,en=new R,tn=new R,nn=new R,rn=new ht,an=new R(1,0,0),on=new R(0,1,0),sn=new R(0,0,1),cn={type:`added`},ln={type:`removed`},un={type:`childadded`,child:null},dn={type:`childremoved`,child:null},fn=class e extends at{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xt++}),this.uuid=lt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new R,n=new Jt,r=new ht,i=new R(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Rt},normalMatrix:{value:new z}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qt.setFromAxisAngle(e,t),this.quaternion.multiply(Qt),this}rotateOnWorldAxis(e,t){return Qt.setFromAxisAngle(e,t),this.quaternion.premultiply(Qt),this}rotateX(e){return this.rotateOnAxis(an,e)}rotateY(e){return this.rotateOnAxis(on,e)}rotateZ(e){return this.rotateOnAxis(sn,e)}translateOnAxis(e,t){return Zt.copy(e).applyQuaternion(this.quaternion),this.position.add(Zt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(an,e)}translateY(e){return this.translateOnAxis(on,e)}translateZ(e){return this.translateOnAxis(sn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($t.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?en.copy(e):en.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),tn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$t.lookAt(tn,en,this.up):$t.lookAt(en,tn,this.up),this.quaternion.setFromRotationMatrix($t),r&&($t.extractRotation(r.matrixWorld),Qt.setFromRotationMatrix($t),this.quaternion.premultiply(Qt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(I(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cn),un.child=e,this.dispatchEvent(un),un.child=null):I(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ln),dn.child=e,this.dispatchEvent(dn),dn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$t.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$t.multiply(e.parent.matrixWorld)),e.applyMatrix4($t),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cn),un.child=e,this.dispatchEvent(un),un.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,e,nn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,rn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};fn.DEFAULT_UP=new R(0,1,0),fn.DEFAULT_MATRIX_AUTO_UPDATE=!0,fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=class extends fn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},mn={type:`move`},hn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},gn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},vn={h:0,s:0,l:0};function yn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var B=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ve){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=St.workingColorSpace){return this.r=e,this.g=t,this.b=n,St.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=St.workingColorSpace){if(e=dt(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=yn(i,r,e+1/3),this.g=yn(i,r,e),this.b=yn(i,r,e-1/3)}return St.colorSpaceToWorking(this,r),this}setStyle(e,t=Ve){function n(t){t!==void 0&&parseFloat(t)<1&&F(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:F(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);F(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ve){let n=gn[e.toLowerCase()];return n===void 0?F(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ct(e.r),this.g=Ct(e.g),this.b=Ct(e.b),this}copyLinearToSRGB(e){return this.r=wt(e.r),this.g=wt(e.g),this.b=wt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ve){return St.workingToColorSpace(bn.copy(this),e),Math.round(ut(bn.r*255,0,255))*65536+Math.round(ut(bn.g*255,0,255))*256+Math.round(ut(bn.b*255,0,255))}getHexString(e=Ve){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.workingToColorSpace(bn.copy(this),t);let n=bn.r,r=bn.g,i=bn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=St.workingColorSpace){return St.workingToColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=Ve){St.workingToColorSpace(bn.copy(this),e);let t=bn.r,n=bn.g,r=bn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(_n),this.setHSL(_n.h+e,_n.s+t,_n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(vn);let n=ft(_n.h,vn.h,t),r=ft(_n.s,vn.s,t),i=ft(_n.l,vn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new B;B.NAMES=gn;var xn=class extends fn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jt,this.environmentIntensity=1,this.environmentRotation=new Jt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sn=new R,Cn=new R,wn=new R,Tn=new R,En=new R,Dn=new R,On=new R,kn=new R,An=new R,jn=new R,Mn=new Nt,Nn=new Nt,Pn=new Nt,Fn=class e{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Sn.subVectors(e,t),r.cross(Sn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Sn.subVectors(r,t),Cn.subVectors(n,t),wn.subVectors(e,t);let a=Sn.dot(Sn),o=Sn.dot(Cn),s=Sn.dot(wn),c=Cn.dot(Cn),l=Cn.dot(wn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Tn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Tn.x),s.addScaledVector(a,Tn.y),s.addScaledVector(o,Tn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Mn.setScalar(0),Nn.setScalar(0),Pn.setScalar(0),Mn.fromBufferAttribute(e,t),Nn.fromBufferAttribute(e,n),Pn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Mn,i.x),a.addScaledVector(Nn,i.y),a.addScaledVector(Pn,i.z),a}static isFrontFacing(e,t,n,r){return Sn.subVectors(n,t),Cn.subVectors(e,t),Sn.cross(Cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),Sn.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;En.subVectors(r,n),Dn.subVectors(i,n),kn.subVectors(e,n);let s=En.dot(kn),c=Dn.dot(kn);if(s<=0&&c<=0)return t.copy(n);An.subVectors(e,r);let l=En.dot(An),u=Dn.dot(An);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(En,a);jn.subVectors(e,i);let f=En.dot(jn),p=Dn.dot(jn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Dn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return On.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(On,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(En,a).addScaledVector(Dn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},In=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Rn):Rn.fromBufferAttribute(r,t),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),zn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),zn.copy(e.boundingBox)),zn.applyMatrix4(e.matrixWorld),this.union(zn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kn),qn.subVectors(this.max,Kn),Bn.subVectors(e.a,Kn),Vn.subVectors(e.b,Kn),Hn.subVectors(e.c,Kn),Un.subVectors(Vn,Bn),Wn.subVectors(Hn,Vn),Gn.subVectors(Bn,Hn);let t=[0,-Un.z,Un.y,0,-Wn.z,Wn.y,0,-Gn.z,Gn.y,Un.z,0,-Un.x,Wn.z,0,-Wn.x,Gn.z,0,-Gn.x,-Un.y,Un.x,0,-Wn.y,Wn.x,0,-Gn.y,Gn.x,0];return!Xn(t,Bn,Vn,Hn,qn)||(t=[1,0,0,0,1,0,0,0,1],!Xn(t,Bn,Vn,Hn,qn))?!1:(Jn.crossVectors(Un,Wn),t=[Jn.x,Jn.y,Jn.z],Xn(t,Bn,Vn,Hn,qn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ln=[new R,new R,new R,new R,new R,new R,new R,new R],Rn=new R,zn=new In,Bn=new R,Vn=new R,Hn=new R,Un=new R,Wn=new R,Gn=new R,Kn=new R,qn=new R,Jn=new R,Yn=new R;function Xn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Yn.fromArray(e,a);let o=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),s=t.dot(Yn),c=n.dot(Yn),l=r.dot(Yn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Zn=new R,Qn=new L,$n=0,er=class extends at{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$n++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ke,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qn.fromBufferAttribute(this,t),Qn.applyMatrix3(e),this.setXY(t,Qn.x,Qn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyMatrix3(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyMatrix4(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyNormalMatrix(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.transformDirection(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pt(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pt(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pt(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array),i=mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},tr=class extends er{constructor(e,t,n){super(new Uint16Array(e),t,n)}},nr=class extends er{constructor(e,t,n){super(new Uint32Array(e),t,n)}},rr=class extends er{constructor(e,t,n){super(new Float32Array(e),t,n)}},ir=new In,ar=new R,or=new R,sr=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ir.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);let t=ar.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(ar,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(or.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(or)),this.expandByPoint(ar.copy(e.center).sub(or))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},cr=0,lr=new Rt,ur=new fn,dr=new R,fr=new In,pr=new In,mr=new R,hr=class e extends at{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cr++}),this.uuid=lt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Je(e)?nr:tr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new z().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return lr.makeRotationFromQuaternion(e),this.applyMatrix4(lr),this}rotateX(e){return lr.makeRotationX(e),this.applyMatrix4(lr),this}rotateY(e){return lr.makeRotationY(e),this.applyMatrix4(lr),this}rotateZ(e){return lr.makeRotationZ(e),this.applyMatrix4(lr),this}translate(e,t,n){return lr.makeTranslation(e,t,n),this.applyMatrix4(lr),this}scale(e,t,n){return lr.makeScale(e,t,n),this.applyMatrix4(lr),this}lookAt(e){return ur.lookAt(e),ur.updateMatrix(),this.applyMatrix4(ur.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new rr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&F(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){I(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];fr.setFromBufferAttribute(n),this.morphTargetsRelative?(mr.addVectors(this.boundingBox.min,fr.min),this.boundingBox.expandByPoint(mr),mr.addVectors(this.boundingBox.max,fr.max),this.boundingBox.expandByPoint(mr)):(this.boundingBox.expandByPoint(fr.min),this.boundingBox.expandByPoint(fr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&I(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){I(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(fr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];pr.setFromBufferAttribute(n),this.morphTargetsRelative?(mr.addVectors(fr.min,pr.min),fr.expandByPoint(mr),mr.addVectors(fr.max,pr.max),fr.expandByPoint(mr)):(fr.expandByPoint(pr.min),fr.expandByPoint(pr.max))}fr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)mr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(mr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)mr.fromBufferAttribute(a,t),o&&(dr.fromBufferAttribute(e,t),mr.add(dr)),r=Math.max(r,n.distanceToSquared(mr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&I(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){I(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new er(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new R,s[e]=new R;let c=new R,l=new R,u=new R,d=new L,f=new L,p=new L,m=new R,h=new R;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new R,y=new R,b=new R,x=new R;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new er(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new R,i=new R,a=new R,o=new R,s=new R,c=new R,l=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mr.fromBufferAttribute(e,t),mr.normalize(),e.setXYZ(t,mr.x,mr.y,mr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new er(a,r,i)}if(this.index===null)return F(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ke,this.updateRanges=[],this.version=0,this.uuid=lt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=lt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=lt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},_r=new R,vr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix4(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyNormalMatrix(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.transformDirection(e),this.setXYZ(t,_r.x,_r.y,_r.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array),i=mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){et(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new er(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){et(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},yr=0,br=class extends at{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yr++}),this.uuid=lt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new B(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ge,this.stencilZFail=Ge,this.stencilZPass=Ge,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){F(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){F(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},xr=class extends br{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new B(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Sr,Cr=new R,wr=new R,Tr=new R,Er=new L,Dr=new L,Or=new Rt,kr=new R,Ar=new R,jr=new R,Mr=new L,Nr=new L,Pr=new L,Fr=class extends fn{constructor(e=new xr){if(super(),this.isSprite=!0,this.type=`Sprite`,Sr===void 0){Sr=new hr;let e=new gr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Sr.setIndex([0,1,2,0,2,3]),Sr.setAttribute(`position`,new vr(e,3,0,!1)),Sr.setAttribute(`uv`,new vr(e,2,3,!1))}this.geometry=Sr,this.material=e,this.center=new L(.5,.5),this.count=1}raycast(e,t){e.camera===null&&I(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),wr.setFromMatrixScale(this.matrixWorld),Or.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Tr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wr.multiplyScalar(-Tr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Ir(kr.set(-.5,-.5,0),Tr,a,wr,r,i),Ir(Ar.set(.5,-.5,0),Tr,a,wr,r,i),Ir(jr.set(.5,.5,0),Tr,a,wr,r,i),Mr.set(0,0),Nr.set(1,0),Pr.set(1,1);let o=e.ray.intersectTriangle(kr,Ar,jr,!1,Cr);if(o===null&&(Ir(Ar.set(-.5,.5,0),Tr,a,wr,r,i),Nr.set(0,1),o=e.ray.intersectTriangle(kr,jr,Ar,!1,Cr),o===null))return;let s=e.ray.origin.distanceTo(Cr);s<e.near||s>e.far||t.push({distance:s,point:Cr.clone(),uv:Fn.getInterpolation(Cr,kr,Ar,jr,Mr,Nr,Pr,new L),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ir(e,t,n,r,i,a){Er.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Dr.copy(Er):(Dr.x=a*Er.x-i*Er.y,Dr.y=i*Er.x+a*Er.y),e.copy(t),e.x+=Dr.x,e.y+=Dr.y,e.applyMatrix4(Or)}var Lr=new R,Rr=new R,zr=new R,Br=new R,Vr=new R,Hr=new R,Ur=new R,Wr=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Lr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Lr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Lr.copy(this.origin).addScaledVector(this.direction,t),Lr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rr.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),Br.copy(this.origin).sub(Rr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(zr),o=Br.dot(this.direction),s=-Br.dot(zr),c=Br.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Rr).addScaledVector(zr,d),f}intersectSphere(e,t){Lr.subVectors(e.center,this.origin);let n=Lr.dot(this.direction),r=Lr.dot(Lr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Lr)!==null}intersectTriangle(e,t,n,r,i){Vr.subVectors(t,e),Hr.subVectors(n,e),Ur.crossVectors(Vr,Hr);let a=this.direction.dot(Ur),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Br.subVectors(this.origin,e);let s=o*this.direction.dot(Hr.crossVectors(Br,Hr));if(s<0)return null;let c=o*this.direction.dot(Vr.cross(Br));if(c<0||s+c>a)return null;let l=-o*Br.dot(Ur);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gr=class extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Kr=new Rt,qr=new Wr,Jr=new sr,Yr=new R,Xr=new R,Zr=new R,Qr=new R,$r=new R,ei=new R,ti=new R,ni=new R,V=class extends fn{constructor(e=new hr,t=new Gr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ei.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&($r.fromBufferAttribute(s,e),a?ei.addScaledVector($r,r):ei.addScaledVector($r.sub(t),r))}t.add(ei)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(i),qr.copy(e.ray).recast(e.near),!(Jr.containsPoint(qr.origin)===!1&&(qr.intersectSphere(Jr,Yr)===null||qr.origin.distanceToSquared(Yr)>(e.far-e.near)**2))&&(Kr.copy(i).invert(),qr.copy(e.ray).applyMatrix4(Kr),!(n.boundingBox!==null&&qr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ii(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ii(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ii(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ii(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function ri(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ni.copy(s),ni.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ni);return l<n.near||l>n.far?null:{distance:l,point:ni.clone(),object:e}}function ii(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Xr),e.getVertexPosition(c,Zr),e.getVertexPosition(l,Qr);let u=ri(e,t,n,r,Xr,Zr,Qr,ti);if(u){let e=new R;Fn.getBarycoord(ti,Xr,Zr,Qr,e),i&&(u.uv=Fn.getInterpolatedAttribute(i,s,c,l,e,new L)),a&&(u.uv1=Fn.getInterpolatedAttribute(a,s,c,l,e,new L)),o&&(u.normal=Fn.getInterpolatedAttribute(o,s,c,l,e,new R),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new R,materialIndex:0};Fn.getNormal(Xr,Zr,Qr,t.normal),u.face=t,u.barycoord=e}return u}var ai=class extends Mt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},oi=new R,si=new R,ci=new z,li=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=oi.subVectors(n,t).cross(si.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(oi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ci.getNormalMatrix(e),r=this.coplanarPoint(oi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ui=new sr,di=new L(.5,.5),fi=new R,pi=class{constructor(e=new li,t=new li,n=new li,r=new li,i=new li,a=new li){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){return ui.center.set(0,0,0),ui.radius=.7071067811865476+di.distanceTo(e.center),ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(fi.x=r.normal.x>0?e.max.x:e.min.x,fi.y=r.normal.y>0?e.max.y:e.min.y,fi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},mi=class extends br{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new B(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hi=new R,gi=new R,_i=new Rt,vi=new Wr,yi=new sr,bi=new R,xi=new R,Si=class extends fn{constructor(e=new hr,t=new mi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)hi.fromBufferAttribute(t,e-1),gi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=hi.distanceTo(gi);e.setAttribute(`lineDistance`,new rr(n,1))}else F(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yi.copy(n.boundingSphere),yi.applyMatrix4(r),yi.radius+=i,e.ray.intersectsSphere(yi)===!1)return;_i.copy(r).invert(),vi.copy(e.ray).applyMatrix4(_i);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Ci(this,e,vi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Ci(this,e,vi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Ci(this,e,vi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Ci(this,e,vi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ci(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(hi.fromBufferAttribute(s,i),gi.fromBufferAttribute(s,a),n.distanceSqToSegment(hi,gi,bi,xi)>r)return;bi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(bi);if(!(c<t.near||c>t.far))return{distance:c,point:xi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var wi=new R,Ti=new R,Ei=class extends Si{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)wi.fromBufferAttribute(t,e),Ti.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+wi.distanceTo(Ti);e.setAttribute(`lineDistance`,new rr(n,1))}else F(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Di=class extends Mt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Oi=class extends Mt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ki=class extends Mt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ot(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ai=class extends ki{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ji=class extends Mt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},H=class e extends hr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new rr(c,3)),this.setAttribute(`normal`,new rr(l,3)),this.setAttribute(`uv`,new rr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new R;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Mi=new R,Ni=new R,Pi=new R,Fi=new Fn,Ii=class extends hr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=10**4,r=Math.cos(st*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=Fi;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),Fi.getNormal(Pi),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,!(l[0]===l[1]||l[1]===l[2]||l[2]===l[0]))for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=Fi[c[e]],o=Fi[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(Pi.dot(u[p].normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:Pi.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];Mi.fromBufferAttribute(a,t),Ni.fromBufferAttribute(a,n),d.push(Mi.x,Mi.y,Mi.z),d.push(Ni.x,Ni.y,Ni.z)}this.setAttribute(`position`,new rr(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Li=class e extends hr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new rr(p,3)),this.setAttribute(`normal`,new rr(m,3)),this.setAttribute(`uv`,new rr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ri(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Bi(i))i.isRenderTargetTexture?(F(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(Bi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function zi(e){let t={};for(let n=0;n<e.length;n++){let r=Ri(e[n]);for(let e in r)t[e]=r[e]}return t}function Bi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Vi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Hi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:St.workingColorSpace}var Ui={clone:Ri,merge:zi},Wi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gi=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ki=class extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wi,this.fragmentShader=Gi,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=Vi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},qi=class extends Ki{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ji=class extends br{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new L(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jt,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Yi=class extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Be,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xi=class extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Zi(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var Qi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},$i=class extends Qi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:P,endingEnd:P}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Re:i=e,o=2*t-n;break;case ze:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Re:a=e,s=2*n-t;break;case ze:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ea=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ta=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},na=class extends Qi{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.settings||this.DefaultSettings_,u=l.inTangents,d=l.outTangents;if(!u||!d){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let f=o*2,p=e-1;for(let l=0;l!==o;++l){let o=a[c+l],m=a[s+l],h=p*f+l*2,g=d[h],_=d[h+1],v=e*f+l*2,y=u[v],b=u[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[l]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},ra=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Zi(t,this.TimeBufferType),this.values=Zi(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Zi(e.times,Array),values:Zi(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ta(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $i(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new na(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Fe:t=this.InterpolantFactoryMethodDiscrete;break;case Ie:t=this.InterpolantFactoryMethodLinear;break;case N:t=this.InterpolantFactoryMethodSmooth;break;case Le:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return F(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fe;case this.InterpolantFactoryMethodLinear:return Ie;case this.InterpolantFactoryMethodSmooth:return N;case this.InterpolantFactoryMethodBezier:return Le}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(I(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(I(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){I(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){I(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ye(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){I(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===N,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ra.prototype.ValueTypeName=``,ra.prototype.TimeBufferType=Float32Array,ra.prototype.ValueBufferType=Float32Array,ra.prototype.DefaultInterpolation=Ie;var ia=class extends ra{constructor(e,t,n){super(e,t,n)}};ia.prototype.ValueTypeName=`bool`,ia.prototype.ValueBufferType=Array,ia.prototype.DefaultInterpolation=Fe,ia.prototype.InterpolantFactoryMethodLinear=void 0,ia.prototype.InterpolantFactoryMethodSmooth=void 0;var aa=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}};aa.prototype.ValueTypeName=`color`;var oa=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}};oa.prototype.ValueTypeName=`number`;var sa=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ht.slerpFlat(i,0,a,c-o,a,c,s);return i}},ca=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new sa(this.times,this.values,this.getValueSize(),e)}};ca.prototype.ValueTypeName=`quaternion`,ca.prototype.InterpolantFactoryMethodSmooth=void 0;var la=class extends ra{constructor(e,t,n){super(e,t,n)}};la.prototype.ValueTypeName=`string`,la.prototype.ValueBufferType=Array,la.prototype.DefaultInterpolation=Fe,la.prototype.InterpolantFactoryMethodLinear=void 0,la.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}};ua.prototype.ValueTypeName=`vector`;var da=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},fa=class{constructor(e){this.manager=e===void 0?da:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};fa.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var pa=class extends fn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new B(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ma=new Rt,ha=new R,ga=new R,_a=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new L(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pi,this._frameExtents=new L(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ha.setFromMatrixPosition(e.matrixWorld),t.position.copy(ha),ga.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ga),t.updateMatrixWorld(),ma.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ma,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ma)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new R,ya=new ht,ba=new R,xa=class extends fn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=qe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,ya,ba),ba.x===1&&ba.y===1&&ba.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,ba.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(va,ya,ba),ba.x===1&&ba.y===1&&ba.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,ya,ba.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Sa=new R,Ca=new L,wa=new L,Ta=class extends xa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ct*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(st*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ct*2*Math.atan(Math.tan(st*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Sa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Sa.x,Sa.y).multiplyScalar(-e/Sa.z),Sa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Sa.x,Sa.y).multiplyScalar(-e/Sa.z)}getViewSize(e,t){return this.getViewBounds(e,Ca,wa),t.subVectors(wa,Ca)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(st*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ea=class extends xa{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Da=class extends _a{constructor(){super(new Ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oa=class extends pa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(fn.DEFAULT_UP),this.updateMatrix(),this.target=new fn,this.shadow=new Da}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ka=class extends pa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Aa=-90,ja=1,Ma=class extends fn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ta(Aa,ja,e,t);r.layers=this.layers,this.add(r);let i=new Ta(Aa,ja,e,t);i.layers=this.layers,this.add(i);let a=new Ta(Aa,ja,e,t);a.layers=this.layers,this.add(a);let o=new Ta(Aa,ja,e,t);o.layers=this.layers,this.add(o);let s=new Ta(Aa,ja,e,t);s.layers=this.layers,this.add(s);let c=new Ta(Aa,ja,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Na=class extends Ta{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Pa=`\\[\\]\\.:\\/`,Fa=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ia=`[^\\[\\]\\.:\\/]`,La=`[^`+Pa.replace(`\\.`,``)+`]`,Ra=`((?:WC+[\\/:])*)`.replace(`WC`,Ia),za=`(WCOD+)?`.replace(`WCOD`,La),Ba=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ia),Va=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ia),Ha=RegExp(`^`+Ra+za+Ba+Va+`$`),Ua=[`material`,`materials`,`bones`,`map`],Wa=class{constructor(e,t,n){let r=n||Ga.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ga=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Fa,``)}static parseTrackName(e){let t=Ha.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ua.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){F(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){I(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){I(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){I(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){I(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){I(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){I(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){I(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;I(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){I(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){I(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ga.Composite=Wa,Ga.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ga.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ga.prototype.GetterByBindingType=[Ga.prototype._getValue_direct,Ga.prototype._getValue_array,Ga.prototype._getValue_arrayElement,Ga.prototype._getValue_toArray],Ga.prototype.SetterByBindingTypeAndVersioning=[[Ga.prototype._setValue_direct,Ga.prototype._setValue_direct_setNeedsUpdate,Ga.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_array,Ga.prototype._setValue_array_setNeedsUpdate,Ga.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_arrayElement,Ga.prototype._setValue_arrayElement_setNeedsUpdate,Ga.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ga.prototype._setValue_fromArray,Ga.prototype._setValue_fromArray_setNeedsUpdate,Ga.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};var Ka=class extends Ei{constructor(e=10,t=10,n=4473924,r=8947848){n=new B(n),r=new B(r);let i=t/2,a=e/t,o=e/2,s=[],c=[];for(let e=0,l=0,u=-o;e<=t;e++,u+=a){s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);let t=e===i?n:r;t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3}let l=new hr;l.setAttribute(`position`,new rr(s,3)),l.setAttribute(`color`,new rr(c,3));let u=new mi({vertexColors:!0,toneMapped:!1});super(l,u),this.type=`GridHelper`}dispose(){this.geometry.dispose(),this.material.dispose()}};function qa(e,t,n,r){let i=Ja(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case k:case A:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case re:case ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ae:case se:return Math.max(e,16)*Math.max(t,8)/4;case j:case oe:return Math.max(e,8)*Math.max(t,8)/2;case ce:case le:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ue:case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case _e:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Oe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ke:case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*8;case M:case Pe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ja(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`184`}})),typeof window<`u`&&(window.__THREE__?F(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`184`);function Ya(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Xa(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var U={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},W={common:{diffuse:{value:new B(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new z},alphaMap:{value:null},alphaMapTransform:{value:new z},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new z}},envmap:{envMap:{value:null},envMapRotation:{value:new z},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new z}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new z}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new z},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new z},normalScale:{value:new L(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new z},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new z}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new z}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new z}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new B(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new B(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new z},alphaTest:{value:0},uvTransform:{value:new z}},sprite:{diffuse:{value:new B(16777215)},opacity:{value:1},center:{value:new L(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new z},alphaMap:{value:null},alphaMapTransform:{value:new z},alphaTest:{value:0}}},Za={basic:{uniforms:zi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.fog]),vertexShader:U.meshbasic_vert,fragmentShader:U.meshbasic_frag},lambert:{uniforms:zi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new B(0)},envMapIntensity:{value:1}}]),vertexShader:U.meshlambert_vert,fragmentShader:U.meshlambert_frag},phong:{uniforms:zi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new B(0)},specular:{value:new B(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:U.meshphong_vert,fragmentShader:U.meshphong_frag},standard:{uniforms:zi([W.common,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.roughnessmap,W.metalnessmap,W.fog,W.lights,{emissive:{value:new B(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag},toon:{uniforms:zi([W.common,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.gradientmap,W.fog,W.lights,{emissive:{value:new B(0)}}]),vertexShader:U.meshtoon_vert,fragmentShader:U.meshtoon_frag},matcap:{uniforms:zi([W.common,W.bumpmap,W.normalmap,W.displacementmap,W.fog,{matcap:{value:null}}]),vertexShader:U.meshmatcap_vert,fragmentShader:U.meshmatcap_frag},points:{uniforms:zi([W.points,W.fog]),vertexShader:U.points_vert,fragmentShader:U.points_frag},dashed:{uniforms:zi([W.common,W.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:U.linedashed_vert,fragmentShader:U.linedashed_frag},depth:{uniforms:zi([W.common,W.displacementmap]),vertexShader:U.depth_vert,fragmentShader:U.depth_frag},normal:{uniforms:zi([W.common,W.bumpmap,W.normalmap,W.displacementmap,{opacity:{value:1}}]),vertexShader:U.meshnormal_vert,fragmentShader:U.meshnormal_frag},sprite:{uniforms:zi([W.sprite,W.fog]),vertexShader:U.sprite_vert,fragmentShader:U.sprite_frag},background:{uniforms:{uvTransform:{value:new z},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:U.background_vert,fragmentShader:U.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new z}},vertexShader:U.backgroundCube_vert,fragmentShader:U.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:U.cube_vert,fragmentShader:U.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:U.equirect_vert,fragmentShader:U.equirect_frag},distance:{uniforms:zi([W.common,W.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:U.distance_vert,fragmentShader:U.distance_frag},shadow:{uniforms:zi([W.lights,W.fog,{color:{value:new B(0)},opacity:{value:1}}]),vertexShader:U.shadow_vert,fragmentShader:U.shadow_frag}};Za.physical={uniforms:zi([Za.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new z},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new z},clearcoatNormalScale:{value:new L(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new z},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new z},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new z},sheen:{value:0},sheenColor:{value:new B(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new z},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new z},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new z},transmissionSamplerSize:{value:new L},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new z},attenuationDistance:{value:0},attenuationColor:{value:new B(0)},specularColor:{value:new B(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new z},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new z},anisotropyVector:{value:new L},anisotropyMap:{value:null},anisotropyMapTransform:{value:new z}}]),vertexShader:U.meshphysical_vert,fragmentShader:U.meshphysical_frag};var Qa={r:0,b:0,g:0},$a=new Rt,eo=new z;eo.set(-1,0,0,0,1,0,0,0,1);function to(e,t,n,r,i,a){let o=new B(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new V(new H(1,1,1),new Ki({name:`BackgroundCubeMaterial`,uniforms:Ri(Za.backgroundCube.uniforms),vertexShader:Za.backgroundCube.vertexShader,fragmentShader:Za.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4($a.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(eo),l.material.toneMapped=St.getTransfer(i.colorSpace)!==We,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new V(new Li(2,2),new Ki({name:`BackgroundMaterial`,uniforms:Ri(Za.background.uniforms),vertexShader:Za.background.vertexShader,fragmentShader:Za.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=St.getTransfer(i.colorSpace)!==We,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Qa,Hi(e)),n.buffers.color.setClear(Qa.r,Qa.g,Qa.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function no(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ro(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function io(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(F(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&F(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ao(e){let t=this,n=null,r=0,i=!1,a=!1,o=new li,s=new z,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var oo=4,so=[.125,.215,.35,.446,.526,.582],co=20,lo=256,uo=new Ea,fo=new B,po=null,mo=0,ho=0,go=!1,_o=new R,vo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=_o}=i;po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=To(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(po,mo,ho),this._renderer.xr.enabled=go,e.scissorTest=!1,xo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),ho=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:He,depthBuffer:!1},r=bo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=yo(r)),this._blurMaterial=Co(r,e,t),this._ggxMaterial=So(r,e,t)}return r}_compileMaterial(e){let t=new V(new hr,e);this._renderer.compile(t,uo)}_sceneToCubeUV(e,t,n,r,i){let a=new Ta(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(fo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new V(new H,new Gr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(fo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;xo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=To()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;xo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,uo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-oo?n-d+oo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,xo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,uo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,xo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,uo)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&I(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*co-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):co;m>co&&F(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${co}`);let h=[],g=0;for(let e=0;e<co;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];xo(t,3*v*(r>_-oo?r-_+oo:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,uo)}};function yo(e){let t=[],n=[],r=[],i=e,a=e-oo+1+so.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-oo?s=so[o-e+oo-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new hr;h.setAttribute(`position`,new er(f,3)),h.setAttribute(`uv`,new er(p,2)),h.setAttribute(`faceIndex`,new er(m,1)),r.push(new V(h,null)),i>oo&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function bo(e,t,n){let r=new Ft(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function xo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function So(e,t,n){return new Ki({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:lo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Eo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Co(e,t,n){let r=new Float32Array(co),i=new R(0,1,0);return new Ki({name:`SphericalGaussianBlur`,defines:{n:co,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wo(){return new Ki({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function To(){return new Ki({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Eo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Do=class extends Ft{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Di(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new H(5,5,5),i=new Ki({name:`CubemapFromEquirect`,uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new V(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Ma(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Oo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new Do(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new vo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new vo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ko(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&nt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ao(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?nr:tr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function jo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Mo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:I(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function No(e,t,n){let r=new WeakMap,i=new Nt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new It(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new L(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Po(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Fo={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Io(e,t,n,r,i){let a=new Ft(t,n,{type:e,depthBuffer:r,stencilBuffer:i,depthTexture:r?new ki(t,n):void 0}),o=new Ft(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),s=new hr;s.setAttribute(`position`,new rr([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute(`uv`,new rr([0,2,0,0,2,0],2));let c=new qi({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new V(s,c),u=new Ea(-1,1,1,-1,0,1),d=null,f=null,p=!1,m,h=null,_=[],v=!1;this.setSize=function(e,t){a.setSize(e,t),o.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=a.width,n=a.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(p||e.toneMapping===0&&_.length===0)return!1;if(h=t,t!==null){let e=t.width,n=t.height;(a.width!==e||a.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(a),m=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=m,p=!0;let n=a,r=o;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(d!==e.outputColorSpace||f!==e.toneMapping){d=e.outputColorSpace,f=e.toneMapping,c.defines={},St.getTransfer(d)===`srgb`&&(c.defines.SRGB_TRANSFER=``);let t=Fo[f];t&&(c.defines[t]=``),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(h),e.render(l,u),h=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),s.dispose(),c.dispose()}}var Lo=new Mt,Ro=new ki(1,1),zo=new It,Bo=new Lt,Vo=new Di,Ho=[],Uo=[],Wo=new Float32Array(16),Go=new Float32Array(9),Ko=new Float32Array(4);function qo(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ho[i];if(a===void 0&&(a=new Float32Array(i),Ho[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Jo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Yo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Xo(e,t){let n=Uo[t];n===void 0&&(n=new Int32Array(t),Uo[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Zo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jo(n,t))return;e.uniform2fv(this.addr,t),Yo(n,t)}}function $o(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Jo(n,t))return;e.uniform3fv(this.addr,t),Yo(n,t)}}function es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jo(n,t))return;e.uniform4fv(this.addr,t),Yo(n,t)}}function ts(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Yo(n,t)}else{if(Jo(n,r))return;Ko.set(r),e.uniformMatrix2fv(this.addr,!1,Ko),Yo(n,r)}}function ns(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Yo(n,t)}else{if(Jo(n,r))return;Go.set(r),e.uniformMatrix3fv(this.addr,!1,Go),Yo(n,r)}}function rs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Jo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Yo(n,t)}else{if(Jo(n,r))return;Wo.set(r),e.uniformMatrix4fv(this.addr,!1,Wo),Yo(n,r)}}function is(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function as(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jo(n,t))return;e.uniform2iv(this.addr,t),Yo(n,t)}}function os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Jo(n,t))return;e.uniform3iv(this.addr,t),Yo(n,t)}}function ss(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jo(n,t))return;e.uniform4iv(this.addr,t),Yo(n,t)}}function cs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Jo(n,t))return;e.uniform2uiv(this.addr,t),Yo(n,t)}}function us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Jo(n,t))return;e.uniform3uiv(this.addr,t),Yo(n,t)}}function ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Jo(n,t))return;e.uniform4uiv(this.addr,t),Yo(n,t)}}function fs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Ro.compareFunction=n.isReversedDepthBuffer()?518:515,a=Ro):a=Lo,n.setTexture2D(t||a,i)}function ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Bo,i)}function ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Vo,i)}function hs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||zo,i)}function gs(e){switch(e){case 5126:return Zo;case 35664:return Qo;case 35665:return $o;case 35666:return es;case 35674:return ts;case 35675:return ns;case 35676:return rs;case 5124:case 35670:return is;case 35667:case 35671:return as;case 35668:case 35672:return os;case 35669:case 35673:return ss;case 5125:return cs;case 36294:return ls;case 36295:return us;case 36296:return ds;case 35678:case 36198:case 36298:case 36306:case 35682:return fs;case 35679:case 36299:case 36307:return ps;case 35680:case 36300:case 36308:case 36293:return ms;case 36289:case 36303:case 36311:case 36292:return hs}}function _s(e,t){e.uniform1fv(this.addr,t)}function vs(e,t){let n=qo(t,this.size,2);e.uniform2fv(this.addr,n)}function ys(e,t){let n=qo(t,this.size,3);e.uniform3fv(this.addr,n)}function bs(e,t){let n=qo(t,this.size,4);e.uniform4fv(this.addr,n)}function xs(e,t){let n=qo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ss(e,t){let n=qo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Cs(e,t){let n=qo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ws(e,t){e.uniform1iv(this.addr,t)}function Ts(e,t){e.uniform2iv(this.addr,t)}function Es(e,t){e.uniform3iv(this.addr,t)}function Ds(e,t){e.uniform4iv(this.addr,t)}function Os(e,t){e.uniform1uiv(this.addr,t)}function ks(e,t){e.uniform2uiv(this.addr,t)}function As(e,t){e.uniform3uiv(this.addr,t)}function js(e,t){e.uniform4uiv(this.addr,t)}function Ms(e,t,n){let r=this.cache,i=t.length,a=Xo(n,i);Jo(r,a)||(e.uniform1iv(this.addr,a),Yo(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ro:Lo;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ns(e,t,n){let r=this.cache,i=t.length,a=Xo(n,i);Jo(r,a)||(e.uniform1iv(this.addr,a),Yo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Bo,a[e])}function Ps(e,t,n){let r=this.cache,i=t.length,a=Xo(n,i);Jo(r,a)||(e.uniform1iv(this.addr,a),Yo(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Vo,a[e])}function Fs(e,t,n){let r=this.cache,i=t.length,a=Xo(n,i);Jo(r,a)||(e.uniform1iv(this.addr,a),Yo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||zo,a[e])}function Is(e){switch(e){case 5126:return _s;case 35664:return vs;case 35665:return ys;case 35666:return bs;case 35674:return xs;case 35675:return Ss;case 35676:return Cs;case 5124:case 35670:return ws;case 35667:case 35671:return Ts;case 35668:case 35672:return Es;case 35669:case 35673:return Ds;case 5125:return Os;case 36294:return ks;case 36295:return As;case 36296:return js;case 35678:case 36198:case 36298:case 36306:case 35682:return Ms;case 35679:case 36299:case 36307:return Ns;case 35680:case 36300:case 36308:case 36293:return Ps;case 36289:case 36303:case 36311:case 36292:return Fs}}var Ls=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gs(t.type)}},Rs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Is(t.type)}},zs=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Bs=/(\w+)(\])?(\[|\.)?/g;function Vs(e,t){e.seq.push(t),e.map[t.id]=t}function Hs(e,t,n){let r=e.name,i=r.length;for(Bs.lastIndex=0;;){let a=Bs.exec(r),o=Bs.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Vs(n,l===void 0?new Ls(s,e,t):new Rs(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new zs(s),Vs(n,e)),n=e}}}var Us=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Hs(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ws(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Gs=37297,Ks=0;function qs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Js=new z;function Ys(e){St._getMatrix(Js,St.workingColorSpace,e);let t=`mat3( ${Js.elements.map(e=>e.toFixed(4))} )`;switch(St.getTransfer(e)){case Ue:return[t,`LinearTransferOETF`];case We:return[t,`sRGBTransferOETF`];default:return F(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Xs(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+qs(e.getShaderSource(t),r)}else return i}function Zs(e,t){let n=Ys(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Qs={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function $s(e,t){let n=Qs[t];return n===void 0?(F(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ec=new R;function tc(){return St.getLuminanceCoefficients(ec),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ec.x.toFixed(4)}, ${ec.y.toFixed(4)}, ${ec.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function nc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ac).join(`
`)}function rc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ic(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ac(e){return e!==``}function oc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var cc=/^[ \t]*#include +<([\w\d./]+)>/gm;function lc(e){return e.replace(cc,dc)}var uc=new Map;function dc(e,t){let n=U[t];if(n===void 0){let e=uc.get(t);if(e!==void 0)n=U[e],F(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return lc(n)}var fc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pc(e){return e.replace(fc,mc)}function mc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function hc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var gc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function _c(e){return gc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var vc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function yc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:vc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var bc={302:`ENVMAP_MODE_REFRACTION`};function xc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:bc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Sc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Cc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Sc[e.combine]||`ENVMAP_BLENDING_NONE`}function wc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Tc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=_c(n),l=yc(n),u=xc(n),d=Cc(n),f=wc(n),p=nc(n),m=rc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ac).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ac).join(`
`),_.length>0&&(_+=`
`)):(g=[hc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ac).join(`
`),_=[hc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:U.tonemapping_pars_fragment,n.toneMapping===0?``:$s(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,U.colorspace_pars_fragment,Zs(`linearToOutputTexel`,n.outputColorSpace),tc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ac).join(`
`)),o=lc(o),o=oc(o,n),o=sc(o,n),s=lc(s),s=oc(s,n),s=sc(s,n),o=pc(o),s=pc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ws(i,i.VERTEX_SHADER,y),S=Ws(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Xs(i,x,`vertex`),n=Xs(i,S,`fragment`);I(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):F(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Us(i,h),T=ic(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Gs)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ks++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Ec=0,Dc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Oc(e),t.set(e,n)),n}},Oc=class{constructor(e){this.id=Ec++,this.code=e,this.usedTimes=0}};function kc(e){return e===1030||e===37490||e===36285}function Ac(e,t,n,r,i,a){let o=new Yt,s=new Dc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&F(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,te,O;if(C){let e=Za[C];D=e.vertexShader,ee=e.fragmentShader}else D=i.vertexShader,ee=i.fragmentShader,s.update(i),te=s.getVertexShaderID(i),O=s.getFragmentShaderID(i);let ne=e.getRenderTarget(),k=e.state.buffers.depth.getReversed(),A=h.isInstancedMesh===!0,re=h.isBatchedMesh===!0,ie=!!i.map,j=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,fe=!!i.metalnessMap,pe=!!i.roughnessMap,me=i.anisotropy>0,he=i.clearcoat>0,ge=i.dispersion>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=me&&!!i.anisotropyMap,xe=he&&!!i.clearcoatMap,Se=he&&!!i.clearcoatNormalMap,Ce=he&&!!i.clearcoatRoughnessMap,we=_e&&!!i.iridescenceMap,Te=_e&&!!i.iridescenceThicknessMap,Ee=ve&&!!i.sheenColorMap,De=ve&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=ye&&!!i.transmissionMap,Me=ye&&!!i.thicknessMap,Ne=!!i.gradientMap,M=!!i.alphaMap,Pe=i.alphaTest>0,Fe=!!i.alphaHash,Ie=!!i.extensions,N=0;i.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(N=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:te,customFragmentShaderID:O,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:re,batchingColor:re&&h._colorsTexture!==null,instancing:A,instancingColor:A&&h.instanceColor!==null,instancingMorph:A&&h.morphTexture!==null,outputColorSpace:ne===null?e.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:St.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ie,matcap:j,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&kc(i.normalMap.format),metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:be,clearcoat:he,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:ge,iridescence:_e,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:ve,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:ye,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:M,alphaTest:Pe,alphaHash:Fe,combine:i.combine,mapUv:ie&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:fe&&m(i.metalnessMap.channel),roughnessMapUv:pe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&m(i.sheenRoughnessMap.channel),specularMapUv:Oe&&m(i.specularMap.channel),specularColorMapUv:ke&&m(i.specularColorMap.channel),specularIntensityMapUv:Ae&&m(i.specularIntensityMap.channel),transmissionMapUv:je&&m(i.transmissionMap.channel),thicknessMapUv:Me&&m(i.thicknessMap.channel),alphaMapUv:M&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ie||M),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:k,skinning:h.isSkinnedMesh===!0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:N,decodeVideoTexture:ie&&i.map.isVideoTexture===!0&&St.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&St.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ie&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ie&&i.extensions.multiDraw===!0||re)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Za[t];n=Ui.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Tc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function jc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Mc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Nc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Pc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Mc),r.length>1&&r.sort(t||Nc),i.length>1&&i.sort(t||Nc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Fc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Pc,e.set(t,[i])):n>=r.length?(i=new Pc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ic(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new R,color:new B};break;case`SpotLight`:n={position:new R,direction:new R,color:new B,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new R,color:new B,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new R,skyColor:new B,groundColor:new B};break;case`RectAreaLight`:n={color:new B,position:new R,halfWidth:new R,halfHeight:new R};break}return e[t.id]=n,n}}}function Lc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new L,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var Rc=0;function zc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Bc(e){let t=new Ic,n=Lc(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new R);let i=new R,a=new Rt,o=new Rt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(zc);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=W.LTC_FLOAT_1,r.rectAreaLTC2=W.LTC_FLOAT_2):(r.rectAreaLTC1=W.LTC_HALF_1,r.rectAreaLTC2=W.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=Rc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Vc(e){let t=new Bc(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Hc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Vc(e),t.set(n,[a])):r>=i.length?(a=new Vc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Uc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Gc=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Kc=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],qc=new Rt,Jc=new R,Yc=new R;function Xc(e,t,n){let i=new pi,a=new L,s=new L,c=new Nt,l=new Yi,u=new Xi,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new L},radius:{value:4}},vertexShader:Uc,fragmentShader:Wc}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new hr;y.setAttribute(`position`,new er(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new V(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(F(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){F(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){F(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Ft(a.x,a.y,{format:te,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new ki(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Do(a.x),p.map.depthTexture=new Ai(a.x,m)):(p.map=new Ft(a.x,a.y),p.map.depthTexture=new ki(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}let x=p.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<x;t++){if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Jc.setFromMatrixPosition(d.matrixWorld),e.position.copy(Jc),Yc.copy(e.position),Yc.add(Gc[t]),e.up.copy(Kc[t]),e.lookAt(Yc),e.updateMatrixWorld(),n.makeTranslation(-Jc.x,-Jc.y,-Jc.z),qc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(qc,e.coordinateSystem,e.reversedDepth)}else p.updateMatrices(d);i=p.getFrustum(),E(n,l,p.camera,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ft(a.x,a.y,{format:te,type:g})),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value=n.mapSize,_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value=n.mapSize,v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||i.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Zc(e,t){function n(){let t=!1,n=new Nt,r=null,i=new Nt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=it[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new B(0,0,0),T=0,E=!1,D=null,ee=null,te=null,O=null,ne=null,k=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,re=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),A=re>=2):(re=parseFloat(/^WebGL (\d)/.exec(ie)[1]),A=re>=1);let j=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Nt().fromArray(oe),le=new Nt().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),xe(!1),Se(1),fe(e.CULL_FACE),ye(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(pe(e.BLEND),g=!1);return}if(g===!1&&(fe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:I(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:I(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:I(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:I(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(_e[n],_e[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function be(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),xe(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),we(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function Se(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function Ce(t){t!==te&&(A&&e.lineWidth(t),te=t)}function we(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(O!==n||ne!==r)&&(O=n,ne=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):pe(e.POLYGON_OFFSET_FILL)}function Te(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function Ee(t){t===void 0&&(t=e.TEXTURE0+k-1),j!==t&&(e.activeTexture(t),j=t)}function De(t,n,r){r===void 0&&(r=j===null?e.TEXTURE0+k-1:j);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(j!==r&&(e.activeTexture(r),j=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function Oe(){let t=ae[j];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ke(){try{e.compressedTexImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ae(){try{e.compressedTexImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function je(){try{e.texSubImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Me(){try{e.texSubImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function M(){try{e.compressedTexSubImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Pe(){try{e.texStorage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Fe(){try{e.texStorage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Ie(){try{e.texImage2D(...arguments)}catch(e){I(`WebGLState:`,e)}}function N(){try{e.texImage3D(...arguments)}catch(e){I(`WebGLState:`,e)}}function Le(t){return d[t]===void 0?e.getParameter(t):d[t]}function P(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Re(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Be(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ve(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function He(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},j=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new B(0,0,0),T=0,E=!1,D=null,ee=null,te=null,O=null,ne=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:be,setFlipSided:xe,setCullFace:Se,setLineWidth:Ce,setPolygonOffset:we,setScissorTest:Te,activeTexture:Ee,bindTexture:De,unbindTexture:Oe,compressedTexImage2D:ke,compressedTexImage3D:Ae,texImage2D:Ie,texImage3D:N,pixelStorei:P,getParameter:Le,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:je,texSubImage3D:Me,compressedTexSubImage2D:Ne,compressedTexSubImage3D:M,scissor:Re,viewport:ze,reset:He}}function Qc(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new L,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Xe(`canvas`)}function T(e,t,n){let r=1,i=Le(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),F(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&F(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function D(e){return e.generateMipmaps}function ee(e){l.generateMipmap(e)}function te(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function O(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];F(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||F(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?Ue:St.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function ne(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,F(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function k(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),ie(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function re(e){let t=e.target;t.removeEventListener(`dispose`,re),ae(t)}function ie(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&j(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function j(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ae(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let oe=0;function se(){oe=0}function ce(){return oe}function le(e){oe=e}function ue(){let e=oe;return e>=p.maxTextures&&F(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),oe+=1,e}function de(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function fe(e,t){let n=f.get(e);if(e.isVideoTexture&&Ie(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)F(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)F(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function pe(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){Ce(n,e,t);return}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function me(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){Ce(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function he(e,t){let n=f.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){we(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let ge={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},_e={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},ve={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function ye(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&F(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,ge[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,ge[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,ge[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,_e[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,_e[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,ve[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function be(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,A));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=de(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&j(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function xe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=xe(r.start,t.width,4),c=xe(n.start,t.width,4);r.start<=o+1&&s===c&&xe(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function Ce(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=be(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=St.getPrimaries(St.workingColorSpace),n=t.colorSpace===``?null:St.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=N(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=O(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);ye(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=k(t,e);if(t.isDepthTexture)u=ne(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture)if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&Se(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data);else if(t.isCompressedTexture)if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023)if(s!==null)if(g){if(v)if(t.layerUpdates.size>0){let e=qa(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}t.clearLayerUpdates()}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0);else F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data)}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}else if(t.isDataArrayTexture)if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v)if(t.layerUpdates.size>0){let n=qa(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_)if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}let r=l.RGBA,i=l.RGBA,a=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,r,i,a,e),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Le(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Le(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&ee(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function we(e,t,n){if(t.image.length!==6)return;let r=be(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=St.getPrimaries(St.workingColorSpace),o=t.colorSpace===``?null:St.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=N(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=O(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=k(t,h);ye(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?F(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Le(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&ee(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Te(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=O(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Fe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Pe(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function Ee(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=ne(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Fe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Pe(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Pe(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=O(i.internalFormat,a,o,i.normalized,i.colorSpace);Fe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Pe(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Pe(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function De(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,A)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),ye(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else fe(t.depthTexture,0);let a=i.__webglTexture,o=Pe(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Fe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Fe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`Unknown depthTexture format`)}function Oe(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer)if(n)for(let n=0;n<6;n++)De(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?De(t.__webglFramebuffer[0],e,0):De(t.__webglFramebuffer,e,0)}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),Ee(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),Ee(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function ke(e,t,n){let r=f.get(e);t!==void 0&&Te(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Oe(e)}function Ae(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,re);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Fe(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=O(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Pe(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),Ee(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),ye(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Te(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Te(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&ee(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),ye(o,r),Te(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&ee(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),ye(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Te(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Te(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&ee(i),d.unbindTexture()}e.depthBuffer&&Oe(e)}function je(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=te(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),ee(t),d.unbindTexture()}}}let Me=[],Ne=[];function M(e){if(e.samples>0){if(Fe(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Me.length=0,Ne.length=0,Me.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.resolveDepthBuffer===!1&&(Me.push(a),Ne.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Ne)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Me))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.resolveDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Pe(e){return Math.min(p.maxSamples,e.samples)}function Fe(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Ie(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function N(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(St.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&F(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):I(`WebGLTextures: Unsupported texture color space:`,n)),t}function Le(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ue,this.resetTextureUnits=se,this.getTextureUnits=ce,this.setTextureUnits=le,this.setTexture2D=fe,this.setTexture2DArray=pe,this.setTexture3D=me,this.setTextureCube=he,this.rebindTextures=ke,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=M,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function $c(e,t){function n(n,r=``){let i,a=St.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var el=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ji(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ki({vertexShader:el,fragmentShader:tl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new V(new Li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rl=class extends at{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new nl,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],ee=new L,te=null,O=new Ta;O.viewport=new Nt;let ne=new Ta;ne.viewport=new Nt;let k=[O,ne],A=new Na,re=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new hn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new hn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new hn,C[e]=t),t.getHandSpace()};function j(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ae(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ae),r.removeEventListener(`inputsourceschange`,oe);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}re=null,ie=null,_.reset();for(let e in v)delete v[e];e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(te),e.setSize(ee.width,ee.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&F(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&F(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ae),r.addEventListener(`inputsourceschange`,oe),b.xrCompatible!==!0&&await t.makeXRCompatible(),te=e.getPixelRatio(),e.getSize(ee),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Ft(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new ki(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Ft(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function oe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let se=new R,ce=new R;function le(e,t,n){se.setFromMatrixPosition(t.matrixWorld),ce.setFromMatrixPosition(n.matrixWorld);let r=se.distanceTo(ce),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ue(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),A.near=ne.near=O.near=t,A.far=ne.far=O.far=n,(re!==A.near||ie!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),re=A.near,ie=A.far),A.layers.mask=e.layers.mask|6,O.layers.mask=A.layers.mask&-5,ne.layers.mask=A.layers.mask&-3;let i=e.parent,a=A.cameras;ue(A,i);for(let e=0;e<a.length;e++)ue(a[e],i);a.length===2?le(A,O,ne):A.projectionMatrix.copy(O.projectionMatrix),de(e,A,i)};function de(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ct*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(f===null&&p===null))return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(e){return v[e]};let fe=null;function pe(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==A.cameras.length&&(A.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=k[n];o===void 0&&(o=new Ta,o.layers.enable(n),o.viewport=new Nt,k[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),i===!0&&A.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new ji,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}fe&&fe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let me=new Ya;me.setAnimationLoop(pe),this.setAnimationLoop=function(e){fe=e},this.dispose=function(){}}},il=new Rt,al=new z;al.set(-1,0,0,0,1,0,0,0,1);function ol(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Hi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(il.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(al),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function sl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return I(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):ArrayBuffer.isView(o)?i.__data.set(new o.constructor(o.buffer,o.byteOffset,i.__data.length)):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?F(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):F(`WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var cl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ll=null;function ul(){return ll===null&&(ll=new ai(cl,16,16,te,g),ll.name=`DFG_LUT`,ll.minFilter=o,ll.magFilter=o,ll.wrapS=t,ll.wrapT=t,ll.generateMipmaps=!1,ll.needsUpdate=!0),ll}var dl=class{constructor(e={}){let{canvas:t=Ze(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([ne,O,ee]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new R,te=null,k=null,A=[],re=[],ie=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,ae=!1,oe=null;this._outputColorSpace=Ve;let se=0,ce=0,le=null,ue=-1,de=null,fe=new Nt,pe=new Nt,me=null,he=new B(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new Nt(0,0,_e,ve),Ce=new Nt(0,0,_e,ve),we=!1,Te=new pi,Ee=!1,De=!1,Oe=new Rt,ke=new R,Ae=new Nt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return le===null?ye:1}let M=n;function Pe(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r184`),t.addEventListener(`webglcontextlost`,lt,!1),t.addEventListener(`webglcontextrestored`,ut,!1),t.addEventListener(`webglcontextcreationerror`,dt,!1),M===null){let t=`webgl2`;if(M=Pe(t,e),M===null)throw Pe(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw I(`WebGLRenderer: `+e.message),e}let Fe,Ie,N,Le,P,Re,ze,Be,He,Ue,We,Ge,Ke,Je,Ye,Xe,Qe,$e,tt,nt,it,at,ot;function st(){Fe=new ko(M),Fe.init(),it=new $c(M,Fe),Ie=new io(M,Fe,e,it),N=new Zc(M,Fe),Ie.reversedDepthBuffer&&h&&N.buffers.depth.setReversed(!0),Le=new Mo(M),P=new jc,Re=new Qc(M,Fe,N,P,Ie,it,Le),ze=new Oo(j),Be=new Xa(M),at=new no(M,Be),He=new Ao(M,Be,Le,at),Ue=new Po(M,He,Be,at,Le),$e=new No(M,Ie,Re),Ye=new ao(P),We=new Ac(j,ze,Fe,Ie,at,Ye),Ge=new ol(j,P),Ke=new Fc,Je=new Hc(Fe),Qe=new to(j,ze,N,Ue,x,s),Xe=new Xc(j,Ue,Ie),ot=new sl(M,Le,Ie,N),tt=new ro(M,Fe,Le),nt=new jo(M,Fe,Le),Le.programs=We.programs,j.capabilities=Ie,j.extensions=Fe,j.properties=P,j.renderLists=Ke,j.shadowMap=Xe,j.state=N,j.info=Le}st(),S!==1009&&(ie=new Io(S,t.width,t.height,r,i));let ct=new rl(j,M);this.xr=ct,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){if(ct.isPresenting){F(`WebGLRenderer: Can't change size while VR device is presenting.`);return}_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ie!==null&&ie.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){I(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){F(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ie.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),N.viewport(fe.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),N.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){N.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(le!==null){let t=le.texture.format;e=C.has(t)}if(e){let e=le.texture.type,t=w.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,M.clearBufferuiv(M.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,M.clearBufferiv(M.COLOR,0,E))}else r|=M.COLOR_BUFFER_BIT}t&&(r|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&M.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),oe=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,lt,!1),t.removeEventListener(`webglcontextrestored`,ut,!1),t.removeEventListener(`webglcontextcreationerror`,dt,!1),Qe.dispose(),Ke.dispose(),Je.dispose(),P.dispose(),ze.dispose(),Ue.dispose(),at.dispose(),ot.dispose(),We.dispose(),ct.dispose(),ct.removeEventListener(`sessionstart`,_t),ct.removeEventListener(`sessionend`,z),vt.stop()};function lt(e){e.preventDefault(),et(`WebGLRenderer: Context Lost.`),ae=!0}function ut(){et(`WebGLRenderer: Context Restored.`),ae=!1;let e=Le.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;st(),Le.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function dt(e){I(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ft(e){let t=e.target;t.removeEventListener(`dispose`,ft),pt(t)}function pt(e){mt(e),P.remove(e)}function mt(e){let t=P.get(e).programs;t!==void 0&&(t.forEach(function(e){We.releaseProgram(e)}),e.isShaderMaterial&&We.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=kt(e,t,n,r,i);N.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=He.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;at.setup(i,r,s,n,c);let h,g=tt;if(c!==null&&(h=Be.get(c),g=nt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(N.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(M.LINES)):g.setMode(M.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),N.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(M.LINES):i.isLineLoop?g.setMode(M.LINE_LOOP):g.setMode(M.LINE_STRIP)}else i.isPoints?g.setMode(M.POINTS):i.isSprite&&g.setMode(M.TRIANGLES);if(i.isBatchedMesh)if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=P.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(M,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function L(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Tt(e,t,n),e.side=0,e.needsUpdate=!0,Tt(e,t,n),e.side=2):Tt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),k=Je.get(n),k.init(t),re.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];L(a,n,e),r.add(a)}else L(t,n,e),r.add(t)}),k=re.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){P.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ht=null;function gt(e){ht&&ht(e)}function _t(){vt.stop()}function z(){vt.start()}let vt=new Ya;vt.setAnimationLoop(gt),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){ht=e,ct.setAnimationLoop(e),e===null?vt.stop():vt.start()},ct.addEventListener(`sessionstart`,_t),ct.addEventListener(`sessionend`,z),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){I(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ae===!0)return;oe!==null&&oe.renderStart(e,t);let n=ct.enabled===!0&&ct.isPresenting===!0,r=ie!==null&&(le===null||n)&&ie.begin(j,le);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ie===null||ie.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(t),t=ct.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,le),k=Je.get(e,re.length),k.init(t),k.state.textureUnits=Re.getTextureUnits(),re.push(k),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,qe,t.reversedDepth),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),te=Ke.get(e,A.length),te.init(),A.push(te),ct.enabled===!0&&ct.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,j.sortObjects)}yt(e,t,0,j.sortObjects),te.finish(),j.sortObjects===!0&&te.sort(be,xe),Me=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Me&&Qe.addToRenderList(te,e),this.info.render.frame++,Ee===!0&&Ye.beginShadows();let i=k.state.shadowsArray;if(Xe.render(i,e,t),Ee===!0&&Ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(r&&ie.hasRenderPass())===!1){let n=te.opaque,r=te.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}Me&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(te,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),Me&&Qe.render(e),bt(te,e,t)}le!==null&&ce===0&&(Re.updateMultisampleRenderTarget(le),Re.updateRenderTargetMipmap(le)),r&&ie.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),at.resetDefaultState(),ue=-1,de=null,re.pop(),re.length>0?(k=re[re.length-1],Re.setTextureUnits(k.state.textureUnits),Ee===!0&&Ye.setGlobalState(j.clippingPlanes,k.state.camera)):k=null,A.pop(),te=A.length>0?A[A.length-1]:null,oe!==null&&oe.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||Te.intersectsSprite(e)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let t=Ue.update(e),i=e.material;i.visible&&te.push(e,t,i,n,Ae.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||Te.intersectsObject(e))){let t=Ue.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),Ae.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&te.push(e,t,s,n,Ae.z,o)}}else i.visible&&te.push(e,t,i,n,Ae.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Ee===!0&&Ye.setGlobalState(j.clippingPlanes,n),r&&N.viewport(fe.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Ft(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),u=j.getActiveCubeFace(),d=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(he),ge=j.getClearAlpha(),ge<1&&j.setClearColor(16777215,.5),j.clear(),Me&&Qe.render(n);let f=j.toneMapping;j.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Ee===!0&&Ye.setGlobalState(j.clippingPlanes,r),Ct(e,n,r),Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Re.updateMultisampleRenderTarget(a),Re.updateRenderTargetMipmap(a))}j.setRenderTarget(s,u,d),j.setClearColor(he,ge),p!==void 0&&(r.viewport=p),j.toneMapping=f}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function Tt(e,t,n){t.isScene!==!0&&(t=je);let r=P.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=We.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=We.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ft),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=We.getUniforms(e),oe!==null&&e.isNodeMaterial&&oe.build(e,n,s),e.onBeforeCompile(s,j),d=We.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Us.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=P.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function kt(e,t,n,r,i){t.isScene!==!0&&(t=je),Re.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=le===null?j.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:St.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=P.get(r),y=k.state.lights;if(Ee===!0&&(De===!0||e!==de)){let t=e===de&&r.id===ue;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Tt(r,t,i),oe&&r.isNodeMaterial&&oe.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(N.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ue&&(ue=r.id,C=!0),v.needsLights){let e=Ot(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||de!==e){N.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(M,`projectionMatrix`,e.projectionMatrix),T.setValue(M,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(M,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&T.setValue(M,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(M,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,C=!0,w=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&T.setValue(M,`directionalShadowMap`,y.state.directionalShadowMap,Re),y.state.spotShadowMap.length>0&&T.setValue(M,`spotShadowMap`,y.state.spotShadowMap,Re),y.state.pointShadowMap.length>0&&T.setValue(M,`pointShadowMap`,y.state.pointShadowMap,Re)),i.isSkinnedMesh){T.setOptional(M,i,`bindMatrix`),T.setOptional(M,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(M,`boneTexture`,e.boneTexture,Re))}i.isBatchedMesh&&(T.setOptional(M,i,`batchingTexture`),T.setValue(M,`batchingTexture`,i._matricesTexture,Re),T.setOptional(M,i,`batchingIdTexture`),T.setValue(M,`batchingIdTexture`,i._indirectTexture,Re),T.setOptional(M,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(M,`batchingColorTexture`,i._colorsTexture,Re));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&$e.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(M,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=ul()),C){if(T.setValue(M,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&At(E,w),a&&r.fog===!0&&Ge.refreshFogUniforms(E,a),Ge.refreshMaterialUniforms(E,r,ye,ve,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Us.upload(M,Et(v),E,Re)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Us.upload(M,Et(v),E,Re),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(M,`center`,i.center),T.setValue(M,`modelViewMatrix`,i.modelViewMatrix),T.setValue(M,`normalMatrix`,i.normalMatrix),T.setValue(M,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ot.update(n,x),ot.bind(n,x)}}return x}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(e,t,n){let r=P.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),P.get(e.texture).__webglTexture=t,P.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=P.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let Mt=M.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){le=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=P.get(e);if(o.__useDefaultFramebuffer!==void 0){N.bindFramebuffer(M.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,N.viewport(fe),N.scissor(pe),N.setScissorTest(me),ue=-1;return}else if(o.__webglFramebuffer===void 0)Re.setupRenderTarget(e);else if(o.__hasExternalTextures)Re.rebindTextures(e,P.get(e.texture).__webglTexture,P.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&P.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);Re.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=P.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Re.useMultisampledRTT(e)===!1?P.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=Mt),N.bindFramebuffer(M.FRAMEBUFFER,r)&&N.drawBuffers(e,r),N.viewport(fe),N.scissor(pe),N.setScissorTest(me),i){let r=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=P.get(e.textures[t]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,t.__webglTexture,n)}ue=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){N.bindFramebuffer(M.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!Ie.textureFormatReadable(c)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ie.textureTypeReadable(l)){I(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&M.readPixels(t,n,r,i,it.convert(c),it.convert(l),a)}finally{let e=le===null?null:P.get(le).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){N.bindFramebuffer(M.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!Ie.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ie.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.bufferData(M.PIXEL_PACK_BUFFER,a.byteLength,M.STREAM_READ),M.readPixels(t,n,r,i,it.convert(l),it.convert(u),0);let f=le===null?null:P.get(le).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,f);let p=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await rt(M,p,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,a),M.deleteBuffer(d),M.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Re.setTexture2D(e,0),M.copyTexSubImage2D(M.TEXTURE_2D,n,0,0,o,s,i,a),N.unbindTexture()};let Pt=M.createFramebuffer(),It=M.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=it.convert(t.format),_=it.convert(t.type),v;t.isData3DTexture?(Re.setTexture3D(t,0),v=M.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Re.setTexture2DArray(t,0),v=M.TEXTURE_2D_ARRAY):(Re.setTexture2D(t,0),v=M.TEXTURE_2D),N.activeTexture(M.TEXTURE0),N.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,t.flipY),N.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),N.pixelStorei(M.UNPACK_ALIGNMENT,t.unpackAlignment);let y=N.getParameter(M.UNPACK_ROW_LENGTH),b=N.getParameter(M.UNPACK_IMAGE_HEIGHT),x=N.getParameter(M.UNPACK_SKIP_PIXELS),S=N.getParameter(M.UNPACK_SKIP_ROWS),C=N.getParameter(M.UNPACK_SKIP_IMAGES);N.pixelStorei(M.UNPACK_ROW_LENGTH,h.width),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,h.height),N.pixelStorei(M.UNPACK_SKIP_PIXELS,l),N.pixelStorei(M.UNPACK_SKIP_ROWS,u),N.pixelStorei(M.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=P.get(e),r=P.get(t),h=P.get(n.__renderTarget),g=P.get(r.__renderTarget);N.bindFramebuffer(M.READ_FRAMEBUFFER,h.__webglFramebuffer),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(e).__webglTexture,i,d+n),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(t).__webglTexture,a,m+n)),M.blitFramebuffer(l,u,o,s,f,p,o,s,M.DEPTH_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||P.has(e)){let n=P.get(e),r=P.get(t);N.bindFramebuffer(M.READ_FRAMEBUFFER,Pt),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,It);for(let e=0;e<c;e++)w?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,n.__webglTexture,i),T?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,r.__webglTexture,a),i===0?T?M.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):M.copyTexSubImage2D(v,a,f,p,l,u,o,s):M.blitFramebuffer(l,u,o,s,f,p,o,s,M.COLOR_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?M.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h);N.pixelStorei(M.UNPACK_ROW_LENGTH,y),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,b),N.pixelStorei(M.UNPACK_SKIP_PIXELS,x),N.pixelStorei(M.UNPACK_SKIP_ROWS,S),N.pixelStorei(M.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&M.generateMipmap(v),N.unbindTexture()},this.initRenderTarget=function(e){P.get(e).__webglFramebuffer===void 0&&Re.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Re.setTextureCube(e,0):e.isData3DTexture?Re.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Re.setTexture2DArray(e,0):Re.setTexture2D(e,0),N.unbindTexture()},this.resetState=function(){se=0,ce=0,le=null,N.reset(),at.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}},fl={grass:{baseFrequency:160,duration:.08,gain:.22},dirt:{baseFrequency:120,duration:.08,gain:.2},sand:{baseFrequency:260,duration:.07,gain:.16},stone:{baseFrequency:80,duration:.06,gain:.18},wood:{baseFrequency:190,duration:.08,gain:.2},leaves:{baseFrequency:300,duration:.07,gain:.12},glass:{baseFrequency:520,duration:.09,gain:.14}},pl=class{context=null;master=null;unlocked=!1;resumeFromGesture(){let e=this.ensureContext();e.state===`suspended`&&e.resume(),this.unlocked=!0}playStep(e){let t=fl[e];this.playNoiseBurst(t,.55,hl(.92,1.08))}playMineHit(e){let t=fl[e];this.playNoiseBurst({...t,duration:t.duration*.72,gain:t.gain*.75},.9,hl(.82,1.18))}playBlockBreak(e){let t=fl[e];this.playNoiseBurst({...t,duration:t.duration*1.55,gain:t.gain*1.25},1.2,hl(.88,1.08)),this.playTone(t.baseFrequency*.7,.08,`triangle`,t.gain*.25)}playPlace(e){let t=fl[e];this.playNoiseBurst({...t,duration:t.duration*.75,gain:t.gain*.8},.85,hl(.95,1.1))}playBell(){let e=hl(.97,1.03);this.playTone(740*e,.78,`sine`,.12,.72),this.playTone(1110*e,.48,`triangle`,.07,.86),this.playTone(1480*e,.28,`sine`,.04,.92)}playPickup(){this.playTone(740,.09,`sine`,.08,1.4),this.playTone(990,.08,`sine`,.055,1.9)}playSwing(){this.playNoiseBurst({baseFrequency:420,duration:.07,gain:.075},.35,hl(.85,1.15))}playMobHit(){this.playNoiseBurst({baseFrequency:130,duration:.12,gain:.15},.8,hl(.88,1.05)),this.playTone(180,.08,`square`,.045,.7)}playMobDeath(){this.playNoiseBurst({baseFrequency:95,duration:.22,gain:.18},.55,hl(.82,.95)),this.playTone(150,.24,`triangle`,.07,.42)}playEat(){this.playNoiseBurst({baseFrequency:360,duration:.13,gain:.16},.65,hl(.9,1.05)),this.playTone(210,.06,`triangle`,.035)}playDamage(){this.playTone(94,.18,`sawtooth`,.12,.55)}playDeath(){this.playTone(180,.32,`triangle`,.14,.42),this.playTone(88,.42,`sine`,.12,.34)}playNoiseBurst(e,t,n){let r=this.activeContext();if(!r||!this.master)return;let i=r.createBufferSource();i.buffer=ml(r,e.duration);let a=r.createBiquadFilter();a.type=`bandpass`,a.frequency.value=e.baseFrequency*n,a.Q.value=t;let o=r.createGain(),s=r.currentTime;o.gain.setValueAtTime(e.gain,s),o.gain.exponentialRampToValueAtTime(.001,s+e.duration),i.connect(a),a.connect(o),o.connect(this.master),i.start(s),i.stop(s+e.duration)}playTone(e,t,n,r,i=1){let a=this.activeContext();if(!a||!this.master)return;let o=a.createOscillator(),s=a.createGain(),c=a.currentTime;o.type=n,o.frequency.setValueAtTime(e,c),o.frequency.exponentialRampToValueAtTime(Math.max(24,e*i),c+t),s.gain.setValueAtTime(r,c),s.gain.exponentialRampToValueAtTime(.001,c+t),o.connect(s),s.connect(this.master),o.start(c),o.stop(c+t)}activeContext(){if(!this.unlocked)return null;let e=this.ensureContext();return e.state===`suspended`?null:e}ensureContext(){if(!this.context){let e=window.AudioContext??window.webkitAudioContext;this.context=new e,this.master=this.context.createGain(),this.master.gain.value=.45,this.master.connect(this.context.destination)}return this.context}};function ml(e,t){let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0),a=0;for(let e=0;e<n;e+=1){let t=Math.random()*2-1;a=a*.62+t*.38,i[e]=a}return r}function hl(e,t){return e+Math.random()*(t-e)}function gl(e={}){return Object.keys(e).sort().map(t=>[t,e[t]])}function _l(e,t={}){let n=gl(t);return n.length===0?e:`${e}[${n.map(([e,t])=>`${e}=${String(t)}`).join(`,`)}]`}function vl(e={}){return Object.fromEntries(gl(e))}var yl=class{definitions;states;stateIdsByKey;defaultStateByType;constructor(e){this.definitions=new Map,this.states=[],this.stateIdsByKey=new Map,this.defaultStateByType=new Map;for(let t of e)this.register(t);let t=this.resolveState(`air`);if(t!==0)throw Error(`air state must be 0, got ${t}`)}register(e){if(this.definitions.has(e.id))throw Error(`duplicate block definition: ${e.id}`);Sl(e),this.definitions.set(e.id,e);let t=wl(e.properties??{});for(let n of t){let t=_l(e.id,n),r=this.states.length;this.states.push({id:r,typeId:e.id,properties:vl(n),key:t}),this.stateIdsByKey.set(t,r)}let n=Cl(e,e.defaultProperties??{}),r=_l(e.id,n),i=this.stateIdsByKey.get(r);if(i===void 0)throw Error(`default state was not generated: ${r}`);this.defaultStateByType.set(e.id,i)}resolveState(e,t={}){let n=_l(e,Cl(this.requireDefinition(e),{...this.getState(this.getDefaultState(e)).properties,...t})),r=this.stateIdsByKey.get(n);if(r===void 0)throw Error(`unknown block state: ${n}`);return r}getState(e){let t=this.states[e];if(!t)throw RangeError(`unknown state id: ${e}`);return t}getDefinitionForState(e){return this.requireDefinition(this.getState(e).typeId)}getDefaultState(e){let t=this.defaultStateByType.get(e);if(t===void 0)throw Error(`unknown block type: ${e}`);return t}isAir(e){return e===0}requireDefinition(e){let t=this.definitions.get(e);if(!t)throw Error(`unknown block type: ${e}`);return t}},bl=[{id:`air`,opacity:0,lightEmission:0,hardness:0,collision:`none`,renderLayer:`none`,replaceable:!0},{id:`stone`,opacity:15,lightEmission:0,hardness:1.5,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`dirt`,opacity:15,lightEmission:0,hardness:.5,collision:`solid`,renderLayer:`solid`,soundGroup:`dirt`},{id:`grass`,properties:{snowy:[!1,!0]},defaultProperties:{snowy:!1},opacity:15,lightEmission:0,hardness:.6,collision:`solid`,renderLayer:`solid`,soundGroup:`grass`},{id:`sand`,opacity:15,lightEmission:0,hardness:.5,collision:`solid`,renderLayer:`solid`,soundGroup:`sand`},{id:`water`,properties:{level:Tl(0,15)},defaultProperties:{level:0},opacity:1,lightEmission:0,hardness:100,collision:`fluid`,renderLayer:`fluid`,soundGroup:`sand`,liquid:!0,replaceable:!0},{id:`log`,properties:{axis:[`x`,`y`,`z`]},defaultProperties:{axis:`y`},opacity:15,lightEmission:0,hardness:2,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`leaves`,properties:{distance:Tl(1,7),persistent:[!1,!0]},defaultProperties:{distance:7,persistent:!1},opacity:1,lightEmission:0,hardness:.2,collision:`solid`,renderLayer:`cutout`,soundGroup:`leaves`},{id:`coal_ore`,opacity:15,lightEmission:0,hardness:3,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`iron_ore`,opacity:15,lightEmission:0,hardness:3,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`gold_ore`,opacity:15,lightEmission:0,hardness:3,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`diamond_ore`,opacity:15,lightEmission:0,hardness:3,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`torch`,opacity:0,lightEmission:14,hardness:.1,collision:`none`,renderLayer:`cutout`,soundGroup:`wood`},{id:`lamp`,opacity:15,lightEmission:15,hardness:.3,collision:`solid`,renderLayer:`solid`,soundGroup:`glass`},{id:`crafting_table`,opacity:15,lightEmission:0,hardness:2.5,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`gravel`,opacity:15,lightEmission:0,hardness:.6,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`snow`,opacity:15,lightEmission:0,hardness:.2,collision:`solid`,renderLayer:`solid`,soundGroup:`sand`},{id:`lava`,properties:{level:Tl(0,15)},defaultProperties:{level:0},opacity:3,lightEmission:15,hardness:100,collision:`fluid`,renderLayer:`fluid`,soundGroup:`stone`,liquid:!0,replaceable:!0},{id:`planks`,opacity:15,lightEmission:0,hardness:2,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`cobblestone`,opacity:15,lightEmission:0,hardness:2,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`furnace`,opacity:15,lightEmission:0,hardness:3.5,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`chest`,opacity:15,lightEmission:0,hardness:2.5,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`bed`,opacity:15,lightEmission:0,hardness:.2,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`composter`,opacity:15,lightEmission:0,hardness:.6,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`lectern`,opacity:15,lightEmission:0,hardness:2.5,collision:`solid`,renderLayer:`solid`,soundGroup:`wood`},{id:`stonecutter`,opacity:15,lightEmission:0,hardness:3.5,collision:`solid`,renderLayer:`solid`,soundGroup:`stone`},{id:`farmland`,opacity:15,lightEmission:0,hardness:.6,collision:`solid`,renderLayer:`solid`,soundGroup:`dirt`},{id:`wheat`,properties:{age:Tl(0,7)},defaultProperties:{age:7},opacity:0,lightEmission:0,hardness:.1,collision:`none`,renderLayer:`cutout`,soundGroup:`grass`},{id:`door`,properties:{facing:[`north`,`south`,`east`,`west`],half:[`lower`,`upper`],open:[!1,!0]},defaultProperties:{facing:`north`,half:`lower`,open:!1},opacity:0,lightEmission:0,hardness:3,collision:`solid`,renderLayer:`cutout`,soundGroup:`wood`},{id:`bell`,opacity:0,lightEmission:0,hardness:5,collision:`none`,renderLayer:`cutout`,soundGroup:`stone`}];function xl(){return new yl(bl)}function Sl(e){if(!e.id||e.id.trim()!==e.id)throw Error(`invalid block id: ${e.id}`);if(e.opacity<0||e.opacity>15)throw RangeError(`opacity must be 0..15 for ${e.id}`);if(e.lightEmission<0||e.lightEmission>15)throw RangeError(`lightEmission must be 0..15 for ${e.id}`)}function Cl(e,t){let n=e.properties??{},r={};for(let i of Object.keys(n).sort()){let a=n[i],o=t[i]??e.defaultProperties?.[i]??a[0];if(!a.includes(o))throw Error(`invalid value for ${e.id}.${i}: ${String(o)}`);r[i]=o}for(let r of Object.keys(t))if(!n[r])throw Error(`unknown property for ${e.id}: ${r}`);return r}function wl(e){let t=Object.keys(e).sort();if(t.length===0)return[{}];let n=[],r=(i,a)=>{if(i===t.length){n.push(vl(a));return}let o=t[i];for(let t of e[o])a[o]=t,r(i+1,a);delete a[o]};return r(0,{}),n}function Tl(e,t){let n=[];for(let r=e;r<=t;r+=1)n.push(r);return n}var El=256*16,Dl=-4,Ol=19;function kl(e,t){if(!Number.isInteger(t))throw RangeError(`${e} must be an integer: ${t}`)}function Al(e,t,n,r){if(kl(e,t),t<n||t>r)throw RangeError(`${e} must be in ${n}..${r}: ${t}`)}function jl(e,t){if(kl(`value`,e),kl(`divisor`,t),t<=0)throw RangeError(`divisor must be positive: ${t}`);return Math.floor(e/t)}function Ml(e,t){let n=e-jl(e,t)*t;return n===t?0:n}function G(e){return jl(e,16)}function Nl(e){return Ml(e,16)}function Pl(e){return kl(`blockY`,e),jl(e,16)}function Fl(e){kl(`sectionY`,e);let t=e-Dl;return Al(`section index`,t,0,23),t}function Il(e){return Nl(e)}function Ll(e,t){Al(e,t,0,15)}function Rl(e,t,n){return Ll(`x`,e),Ll(`y`,t),Ll(`z`,n),t<<8|n<<4|e}function zl(e,t){return kl(`chunkX`,e),kl(`chunkZ`,t),`${e},${t}`}function Bl(){if(typeof SharedArrayBuffer>`u`)throw Error(`SharedArrayBuffer is required for engine storage`);return SharedArrayBuffer}var Vl=18,Hl=.12,Ul=1.35,Wl=.45,Gl=class{items;nextId;constructor(){this.items=[],this.nextId=1}spawn(e){let t={id:this.nextId,stateId:e.stateId,label:e.label,count:e.count??1,maxStackSize:e.maxStackSize??64,food:e.food?{...e.food}:void 0,item:e.item?{...e.item}:void 0,tool:e.tool?{...e.tool}:void 0,armor:e.armor?{...e.armor}:void 0,position:{...e.position},velocity:e.velocity?{...e.velocity}:{x:0,y:2.4,z:0},ageSeconds:0,pickupDelaySeconds:e.pickupDelaySeconds??Wl};return this.nextId+=1,this.items.push(t),t}step(e,t,n,r){let i=[];for(let a of this.items)a.ageSeconds+=r,a.pickupDelaySeconds=Math.max(0,a.pickupDelaySeconds-r),Kl(e,a,r),!(a.pickupDelaySeconds>0||ql(a.position,n)>Ul)&&(a.food?t.addFoodStack(a.label,a.food,a.count,a.maxStackSize):a.item?t.addItemStack(a.label,a.count,a.maxStackSize):a.tool?t.addToolStack({label:a.label,stateId:null,count:1,maxStackSize:1,tool:a.tool}):a.armor?t.addArmorStack({label:a.label,stateId:null,count:1,maxStackSize:1,armor:a.armor}):a.stateId!==null&&t.addStack(a.stateId,a.label,a.count,a.maxStackSize))&&i.push(a.id);if(i.length>0){let e=new Set(i);this.items=this.items.filter(t=>!e.has(t.id))}return{pickedUpIds:i}}};function Kl(e,t,n){t.velocity.y-=Vl*n,t.velocity.x*=Math.max(0,1-2.2*n),t.velocity.z*=Math.max(0,1-2.2*n),t.position.x+=t.velocity.x*n,t.position.y+=t.velocity.y*n,t.position.z+=t.velocity.z*n;let r=Math.floor(t.position.x),i=Math.floor(t.position.y-Hl),a=Math.floor(t.position.z);t.velocity.y<=0&&e.isSolidBlockLoaded(r,i,a)&&(t.position.y=i+1+Hl,t.velocity.y=0)}function ql(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function Jl(e,t,n){let r=null;for(let n of e)n.canRun(t)&&(!r||n.priority<r.priority)&&(r=n);return r?r.run(t):n}var Yl=22,Xl=2.15,Zl=28,Ql=1.25,$l=2,eu=1.15,tu=8,nu=22,ru=2.15,iu=10.8,au=3,ou=5,su=4.2,cu=2,lu=1,uu=5,du=8,fu=1,pu=.2,mu=7,hu=260,gu=34,_u=.55,vu=class{mobs;projectiles;nextId;nextProjectileId;spawnCooldownSeconds;maxMobs;spawnIntervalSeconds;constructor(e={}){this.mobs=[],this.projectiles=[],this.nextId=1,this.nextProjectileId=1,this.spawnCooldownSeconds=1,this.maxMobs=e.maxMobs??du,this.spawnIntervalSeconds=e.spawnIntervalSeconds??uu}spawn(e){let t={id:this.nextId,role:e.role??`zombie`,position:{...e.position},velocity:{x:0,y:0,z:0},health:20,ageSeconds:0,hurtTimeSeconds:0,knockbackSeconds:0,fireTimeSeconds:0,burnDamageTimerSeconds:0,attackCooldownSeconds:e.role===`skeleton`?1.2:.5,strafeClockwise:qu(this.nextId,e.position.x,e.position.z)>.5,strafeSeconds:1.2,activeGoal:`idle`,path:[],pathTarget:null,pathCooldownSeconds:0,bellRevealSeconds:0};return this.nextId+=1,this.mobs.push(t),t}step(e,t,n,r={}){let i=[];if(this.spawnCooldownSeconds=Math.max(0,this.spawnCooldownSeconds-n),r.allowSpawning&&this.mobs.length<this.maxMobs&&this.spawnCooldownSeconds<=0){let n=this.trySpawnAroundPlayer(e,t);n&&i.push(n),this.spawnCooldownSeconds=this.spawnIntervalSeconds}let a=[],o=[],s=[],c=[],l=[],u=[],d=0;for(let i of this.mobs){if(i.ageSeconds+=n,i.hurtTimeSeconds=Math.max(0,i.hurtTimeSeconds-n),i.knockbackSeconds=Math.max(0,i.knockbackSeconds-n),i.fireTimeSeconds=Math.max(0,i.fireTimeSeconds-n),i.attackCooldownSeconds=Math.max(0,i.attackCooldownSeconds-n),i.pathCooldownSeconds=Math.max(0,i.pathCooldownSeconds-n),i.bellRevealSeconds=Math.max(0,i.bellRevealSeconds-n),r.burnInDaylight&&zu(e,i)){if(i.fireTimeSeconds=.35,i.burnDamageTimerSeconds+=n,c.push(i.id),i.burnDamageTimerSeconds>=lu&&(i.burnDamageTimerSeconds=0,i.health=Math.max(0,i.health-cu),i.hurtTimeSeconds=.2,i.health<=0)){l.push(i);continue}}else i.burnDamageTimerSeconds=0;let f=bu(i,t,r.villagerTargets??[],r.guardTargets??[]),p=Gu(i.position,t);if(Su(e,i,f.position,n),i.role===`skeleton`&&Bu(e,i,t,p)){if(i.attackCooldownSeconds<=0){i.attackCooldownSeconds=ru;let e=this.spawnArrow(i,t);u.push(e)}continue}let m=Wu(i.position,f.position),h=Math.abs(i.position.y-f.position.y);m<=Ql&&h<1.8&&i.attackCooldownSeconds<=0&&(i.attackCooldownSeconds=eu,f.kind===`villager`?o.push({mobId:i.id,villagerId:f.id,damage:$l,position:{...f.position}}):f.kind===`guard`?s.push({mobId:i.id,guardId:f.id,damage:$l,position:{...f.position}}):(a.push(i.id),d+=$l))}if(l.length>0){let e=new Set(l.map(e=>e.id));this.mobs=this.mobs.filter(t=>!e.has(t.id))}let f=this.stepProjectiles(e,t,n);return{spawned:i,attackedIds:a,villagerAttacks:o,guardAttacks:s,burningIds:c,died:l,damage:d,projectilesSpawned:u,projectileHits:f.hits,projectileDamage:f.damage}}damageMob(e,t,n){let r=this.mobs.find(t=>t.id===e)??null;return r?(r.health=Math.max(0,r.health-Math.max(0,t)),r.hurtTimeSeconds=.24,r.knockbackSeconds=.22,r.velocity.x=n.x,r.velocity.y=Math.max(r.velocity.y,n.y),r.velocity.z=n.z,r.health>0?{mob:r,died:!1}:(this.mobs=this.mobs.filter(t=>t.id!==e),{mob:r,died:!0})):{mob:null,died:!1}}clear(){this.mobs=[],this.projectiles=[],this.spawnCooldownSeconds=1}spawnArrow(e,t){let n={x:e.position.x,y:e.position.y+1.52,z:e.position.z},r={x:t.x,y:t.y+1.12,z:t.z},i=Math.max(1,Gu(n,r)),a={x:(r.x-n.x)/i*iu,y:(r.y-n.y)/i*iu+Math.min(1.2,i*.035),z:(r.z-n.z)/i*iu},o={id:this.nextProjectileId,ownerId:e.id,role:`arrow`,position:n,velocity:a,ageSeconds:0};return this.nextProjectileId+=1,this.projectiles.push(o),o}stepProjectiles(e,t,n){let r=[],i=[],a=0;for(let o of this.projectiles)if(o.ageSeconds+=n,o.velocity.y-=su*n,o.position.x+=o.velocity.x*n,o.position.y+=o.velocity.y*n,o.position.z+=o.velocity.z*n,!(o.ageSeconds>ou)&&!e.isSolidBlockLoaded(Math.floor(o.position.x),Math.floor(o.position.y),Math.floor(o.position.z))){if(Uu(o,t)){r.push(o),a+=au;continue}i.push(o)}return this.projectiles=i,{hits:r,damage:a}}trySpawnAroundPlayer(e,t){for(let n=0;n<12;n+=1){let n=Math.random()*Math.PI*2,r=12+Math.random()*14,i=Math.floor(t.x+Math.cos(n)*r),a=Math.floor(t.z+Math.sin(n)*r),o=Ru(e,i,Math.floor(t.y)+8,a);if(o===null)continue;let s=Math.random()<.28?`skeleton`:`zombie`;return this.spawn({role:s,position:{x:i+.5,y:o,z:a+.5}})}return null}};function yu(e,t=10){e.bellRevealSeconds=Math.max(e.bellRevealSeconds,Math.max(0,t))}function bu(e,t,n,r){let i={kind:`player`,id:0,position:t};if(e.role!==`zombie`)return i;let a=i,o=Gu(e.position,t);for(let t of n){let n=Gu(e.position,t.position);n>Zl||n>=o||(a={kind:`villager`,id:t.id,position:t.position},o=n)}for(let t of r){let n=Gu(e.position,t.position);n>Zl||n>=o||(a={kind:`guard`,id:t.id,position:t.position},o=n)}return a}var xu=[{id:`knockback`,priority:0,canRun:({mob:e})=>e.knockbackSeconds>0,run:()=>({goal:`knockback`,velocityX:0,velocityZ:0,dampKnockback:!0})},{id:`skeleton_backoff`,priority:1,canRun:({mob:e,distanceToPlayer:t})=>e.role===`skeleton`&&t>.001&&t<tu-2,run:({mob:e,playerPosition:t,distanceToPlayer:n})=>{let r=e.position.x-t.x,i=e.position.z-t.z,a=Xl*.78;return{goal:`skeleton_backoff`,velocityX:r/n*a,velocityZ:i/n*a}}},{id:`skeleton_strafe`,priority:2,canRun:({world:e,mob:t,playerPosition:n,distanceToPlayer:r})=>t.role===`skeleton`&&r>=tu-2&&r<=nu&&Vu(e,{x:t.position.x,y:t.position.y+1.55,z:t.position.z},{x:n.x,y:n.y+1.15,z:n.z}),run:({mob:e,playerPosition:t,distanceToPlayer:n})=>{let r=(t.x-e.position.x)/Math.max(.001,n),i=(t.z-e.position.z)/Math.max(.001,n),a=e.strafeClockwise?1:-1,o=-i*a,s=r*a,c=Hu(n),l=Xl*.62;return{goal:`skeleton_strafe`,velocityX:o*l+r*c,velocityZ:s*l+i*c}}},{id:`chase`,priority:3,canRun:({distanceToPlayer:e})=>e<=Zl&&e>.001,run:({mob:e,playerPosition:t,distanceToPlayer:n})=>({goal:`chase`,velocityX:(t.x-e.position.x)/n*(e.role===`skeleton`?Xl*.82:Xl),velocityZ:(t.z-e.position.z)/n*(e.role===`skeleton`?Xl*.82:Xl)})}];function Su(e,t,n,r){let i=Tu(e,t,n),a=Cu({world:e,mob:t,playerPosition:i,distanceToPlayer:Wu(t.position,i),deltaSeconds:r});t.activeGoal=a.goal,t.role===`zombie`&&i!==n&&a.goal===`chase`&&(t.activeGoal=`path_chase`),a.dampKnockback?(t.velocity.x*=Math.max(0,1-3.8*r),t.velocity.z*=Math.max(0,1-3.8*r)):(t.velocity.x=a.velocityX,t.velocity.z=a.velocityZ),t.velocity.y-=Yl*r;let o=t.position.x+t.velocity.x*r,s=t.position.z+t.velocity.z*r;if(Ou(e,o,t.position.y,s))t.position.x=o,t.position.z=s;else if(Lu(e,t)&&Ou(e,o,t.position.y+fu,s)&&e.isSolidBlockLoaded(Math.floor(o),Math.floor(t.position.y),Math.floor(s)))t.position.x=o,t.position.y+=fu,t.position.z=s,t.velocity.y=Math.max(0,t.velocity.y);else if(t.role===`zombie`&&a.goal===`chase`){let r=t.pathCooldownSeconds<=0?Au(e,t.position,n):[];t.pathCooldownSeconds=_u,r.length>0&&(t.path=r,t.pathTarget={...n},t.activeGoal=`path_chase`)}Iu(e,t,r)}function Cu(e){return wu(e.mob,e.deltaSeconds),Jl(xu,e,{goal:`idle`,velocityX:0,velocityZ:0})}function wu(e,t){e.role===`skeleton`&&(e.strafeSeconds=Math.max(0,e.strafeSeconds-t),!(e.strafeSeconds>0)&&(e.strafeClockwise=!e.strafeClockwise,e.strafeSeconds=1.6+qu(e.id,Math.floor(e.ageSeconds*4),173)*2.4))}function Tu(e,t,n){if(t.role!==`zombie`)return n;if(t.pathTarget&&!Ku(t.pathTarget,n)&&Du(t),Vu(e,{x:t.position.x,y:t.position.y+1.45,z:t.position.z},{x:n.x,y:n.y+1.25,z:n.z}))return Du(t),n;if(t.path.length===0&&t.pathCooldownSeconds<=0){let r=Au(e,t.position,n);t.pathCooldownSeconds=_u,r.length>0&&(t.path=r,t.pathTarget={...n})}return Eu(t)??n}function Eu(e){for(;e.path.length>0&&Wu(e.position,e.path[0])<pu;)e.path.shift();return e.path[0]??null}function Du(e){e.path=[],e.pathTarget=null}function Ou(e,t,n,r){let i=Math.floor(t),a=Math.floor(r);return!e.isSolidBlockLoaded(i,Math.floor(n+.2),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+1.2),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+2),a)}var ku=[[1,0],[-1,0],[0,1],[0,-1]];function Au(e,t,n){let r=Math.floor(t.x),i=Math.floor(t.z),a=Math.floor(n.x),o=Math.floor(n.z),s=ju(e,r,i,t.y),c=ju(e,a,o,n.y);if(s===null||c===null||r===a&&i===o)return[];let l=Math.min(r,a)-mu,u=Math.max(r,a)+mu,d=Math.min(i,o)-mu,f=Math.max(i,o)+mu,p=[{x:r,z:i,y:s,g:0,f:Fu(r,i,a,o),parent:null}],m=new Map([[Pu(r,i),0]]),h=new Set,g=0;for(;p.length>0&&g<hu;){g+=1;let t=Nu(p),r=p.splice(t,1)[0],i=Pu(r.x,r.z);if(!h.has(i)){if(h.add(i),r.x===a&&r.z===o)return Mu(r,{x:n.x,y:c,z:n.z});for(let[t,n]of ku){let i=r.x+t,s=r.z+n;if(i<l||i>u||s<d||s>f)continue;let c=Pu(i,s);if(h.has(c))continue;let g=ju(e,i,s,r.y);if(g===null||Math.abs(g-r.y)>1.1)continue;let _=r.g+1+Math.max(0,g-r.y)*.4,v=m.get(c);v!==void 0&&v<=_||(m.set(c,_),p.push({x:i,z:s,y:g,g:_,f:_+Fu(i,s,a,o),parent:r}))}}}return[]}function ju(e,t,n,r){let i=e.getMotionBlockingHeightLoaded?.(t,n);if(i!=null){let a=i+1;if(Math.abs(a-r)<=2.1&&Ou(e,t+.5,a,n+.5))return a}let a=Math.floor(r)+fu,o=Math.floor(r)-2;for(let r=a;r>=o;--r)if(e.isSolidBlockLoaded(t,r-1,n)&&Ou(e,t+.5,r,n+.5))return r;return null}function Mu(e,t){let n=[],r=e;for(;r?.parent;)n.push({x:r.x+.5,y:r.y,z:r.z+.5}),r=r.parent;return n.reverse(),n.length>0&&(n[n.length-1]={...t}),n.slice(0,gu)}function Nu(e){let t=0,n=e[0].f;for(let r=1;r<e.length;r+=1)e[r].f<n&&(n=e[r].f,t=r);return t}function Pu(e,t){return`${e},${t}`}function Fu(e,t,n,r){return Math.abs(n-e)+Math.abs(r-t)}function Iu(e,t,n){let r=t.position.y+t.velocity.y*n,i=Math.floor(t.position.x),a=Math.floor(t.position.z);if(t.velocity.y<=0){let n=Math.floor(t.position.y-.04),o=Math.floor(r-.04);for(let r=n;r>=o;--r)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r+1,t.velocity.y=0;return}}else{let n=Math.floor(t.position.y+2),o=Math.floor(r+2);for(let r=n;r<=o;r+=1)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r-2.01,t.velocity.y=0;return}}t.position.y=r}function Lu(e,t){return e.isSolidBlockLoaded(Math.floor(t.position.x),Math.floor(t.position.y-.04),Math.floor(t.position.z))}function Ru(e,t,n,r){let i=e.getMotionBlockingHeightLoaded?.(t,r),a=i==null?n:Math.min(n,i+1);for(let n=a;n>=-64;--n)if(e.isSolidBlockLoaded(t,n-1,r)&&!e.isSolidBlockLoaded(t,n,r)&&!e.isSolidBlockLoaded(t,n+1,r)&&(e.getBlockLightLevelLoaded?.(t,n,r)??0)<=7)return n;return null}function zu(e,t){let n=Math.floor(t.position.x),r=Math.floor(t.position.z),i=e.getMotionBlockingHeightLoaded?.(n,r);if(i!=null)return i<Math.floor(t.position.y+2);for(let i=Math.floor(t.position.y+2);i<=319;i+=1)if(e.isSolidBlockLoaded(n,i,r))return!1;return!0}function Bu(e,t,n,r){return r>=4&&r<=nu&&Math.abs(t.position.y-n.y)<=4&&Vu(e,{x:t.position.x,y:t.position.y+1.55,z:t.position.z},{x:n.x,y:n.y+1.15,z:n.z})}function Vu(e,t,n){let r=Gu(t,n),i=Math.max(1,Math.ceil(r*2.5));for(let r=1;r<i;r+=1){let a=r/i,o=t.x+(n.x-t.x)*a,s=t.y+(n.y-t.y)*a,c=t.z+(n.z-t.z)*a;if(e.isSolidBlockLoaded(Math.floor(o),Math.floor(s),Math.floor(c)))return!1}return!0}function Hu(e){return e<tu?-2.15*.42:e>13?Xl*.46:0}function Uu(e,t){let n=Math.hypot(e.position.x-t.x,e.position.z-t.z),r=e.position.y-(t.y+.95);return n<=.58&&r>=-.9&&r<=.95}function Wu(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function Gu(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function Ku(e,t){return Math.floor(e.x)===Math.floor(t.x)&&Math.floor(e.y)===Math.floor(t.y)&&Math.floor(e.z)===Math.floor(t.z)}function qu(e,t,n){let r=Math.imul(Math.floor(e*131)+2654435769,2246822507);return r^=Math.imul(Math.floor(t*137)+3266489909,668265261),r^=Math.imul(Math.floor(n*149)+374761393,2654435761),r=Math.imul(r^r>>>15,2246822507),((r^r>>>13)>>>0)/4294967295}var Ju=22,Yu=1.25,Xu=2.7,Zu=4.8,Qu=7,$u=10,ed=1,td=class{mobs;nextId;spawnCooldownSeconds;maxMobs;constructor(e={}){this.mobs=[],this.nextId=1,this.spawnCooldownSeconds=1.5,this.maxMobs=e.maxMobs??$u}spawn(e){let t={id:this.nextId,role:e.role??`cow`,position:{...e.position},velocity:{x:0,y:0,z:0},health:e.role===`pig`?10:12,ageSeconds:0,hurtTimeSeconds:0,wanderAngle:ld(e.position.x,e.position.y,e.position.z)*Math.PI*2,wanderSeconds:.5,panicAngle:0,panicSeconds:0,activeGoal:`idle`};return this.nextId+=1,this.mobs.push(t),t}step(e,t,n,r={}){let i=[];if(this.spawnCooldownSeconds=Math.max(0,this.spawnCooldownSeconds-n),r.allowSpawning&&this.mobs.length<this.maxMobs&&this.spawnCooldownSeconds<=0){let n=this.trySpawnAroundPlayer(e,t);n&&i.push(n),this.spawnCooldownSeconds=Qu}for(let r of this.mobs)r.ageSeconds+=n,r.hurtTimeSeconds=Math.max(0,r.hurtTimeSeconds-n),r.panicSeconds=Math.max(0,r.panicSeconds-n),r.wanderSeconds=Math.max(0,r.wanderSeconds-n),rd(e,r,t,n);return i}damageMob(e,t,n){let r=this.mobs.find(t=>t.id===e)??null;return r?(r.health=Math.max(0,r.health-Math.max(0,t)),r.hurtTimeSeconds=.24,r.panicSeconds=3.5,Math.hypot(n.x,n.z)>.001?r.panicAngle=Math.atan2(n.z,n.x):r.panicAngle=ld(r.id,Math.floor(r.ageSeconds*10),89)*Math.PI*2,r.velocity.x=n.x,r.velocity.y=Math.max(r.velocity.y,n.y),r.velocity.z=n.z,r.health>0?{mob:r,died:!1}:(this.mobs=this.mobs.filter(t=>t.id!==e),{mob:r,died:!0})):{mob:null,died:!1}}clear(){this.mobs=[],this.spawnCooldownSeconds=1.5}trySpawnAroundPlayer(e,t){for(let n=0;n<12;n+=1){let r=ld(t.x,t.z,n+this.nextId)*Math.PI*2,i=10+ld(t.z,n,this.nextId)*18,a=Math.floor(t.x+Math.cos(r)*i),o=Math.floor(t.z+Math.sin(r)*i),s=cd(e,a,o);if(s===null)continue;let c=ld(a,s,o)<.58?`cow`:`pig`;return this.spawn({role:c,position:{x:a+.5,y:s,z:o+.5}})}return null}},nd=[{id:`panic`,priority:0,canRun:({mob:e})=>e.panicSeconds>0,run:({mob:e})=>{let t=(ld(e.id,Math.floor(e.ageSeconds*12),101)-.5)*.7,n=e.panicAngle+t;return{goal:`panic`,velocityX:Math.cos(n)*Xu*1.25,velocityZ:Math.sin(n)*Xu*1.25}}},{id:`avoid_player`,priority:1,canRun:({distanceToPlayer:e})=>e>.001&&e<Zu,run:({distanceToPlayer:e,playerDx:t,playerDz:n,mob:r})=>(r.wanderSeconds=.8,{goal:`avoid_player`,velocityX:t/e*Xu,velocityZ:n/e*Xu})},{id:`wander`,priority:4,canRun:()=>!0,run:({mob:e})=>{e.wanderSeconds<=0&&(e.wanderAngle=ld(e.id,Math.floor(e.ageSeconds*10),31)*Math.PI*2,e.wanderSeconds=1.5+ld(e.id,Math.floor(e.ageSeconds*10),47)*2.5);let t=ld(e.id,Math.floor(e.ageSeconds*2),61)>.28;return{goal:t?`wander`:`idle`,velocityX:t?Math.cos(e.wanderAngle)*Yu:0,velocityZ:t?Math.sin(e.wanderAngle)*Yu:0}}}];function rd(e,t,n,r){let i=t.position.x-n.x,a=t.position.z-n.z,o=id({mob:t,playerPosition:n,distanceToPlayer:Math.hypot(i,a),playerDx:i,playerDz:a});t.activeGoal=o.goal,t.velocity.x=o.velocityX,t.velocity.z=o.velocityZ,t.velocity.y-=Ju*r;let s=t.position.x+t.velocity.x*r,c=t.position.z+t.velocity.z*r;ad(e,s,t.position.y,c)?(t.position.x=s,t.position.z=c):sd(e,t)&&ad(e,s,t.position.y+ed,c)?(t.position.x=s,t.position.y+=ed,t.position.z=c,t.velocity.y=Math.max(0,t.velocity.y)):t.wanderSeconds=0,od(e,t,r)}function id(e){return Jl(nd,e,{goal:`idle`,velocityX:0,velocityZ:0})}function ad(e,t,n,r){let i=Math.floor(t),a=Math.floor(r);return!e.isSolidBlockLoaded(i,Math.floor(n+.15),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+.95),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+1.45),a)}function od(e,t,n){let r=t.position.y+t.velocity.y*n,i=Math.floor(t.position.x),a=Math.floor(t.position.z);if(t.velocity.y<=0){let n=Math.floor(t.position.y-.04),o=Math.floor(r-.04);for(let r=n;r>=o;--r)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r+1,t.velocity.y=0;return}}else{let n=Math.floor(t.position.y+1.45),o=Math.floor(r+1.45);for(let r=n;r<=o;r+=1)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r-1.5,t.velocity.y=0;return}}t.position.y=r}function sd(e,t){return e.isSolidBlockLoaded(Math.floor(t.position.x),Math.floor(t.position.y-.04),Math.floor(t.position.z))}function cd(e,t,n){let r=e.getMotionBlockingHeightLoaded?.(t,n);return r==null?null:e.isSolidBlockLoaded(t,r,n)&&!e.isSolidBlockLoaded(t,r+1,n)&&!e.isSolidBlockLoaded(t,r+2,n)&&(e.getBlockLightLevelLoaded?.(t,r+1,n)??15)>=9?r+1:null}function ld(e,t,n){let r=Math.imul(Math.floor(e*131)+2654435769,2246822507);return r^=Math.imul(Math.floor(t*137)+3266489909,668265261),r^=Math.imul(Math.floor(n*149)+374761393,2654435761),r=Math.imul(r^r>>>15,2246822507),((r^r>>>13)>>>0)/4294967295}var ud=22,dd=1.65,fd=2.55,pd=18,md=1.85,hd=8,gd=7,_d=1.35,vd=1,yd=2.65,bd=.24,xd=7,Sd=240,Cd=30,wd=.65,Td=16,Ed=24,Dd=class{guards;nextId;guardedVillageIds;constructor(){this.guards=[],this.nextId=1,this.guardedVillageIds=new Set}ensureVillage(e,t,n){if(n<3||this.guardedVillageIds.has(e.id))return[];let r=Yd(t,e);return r?(this.guardedVillageIds.add(e.id),[this.spawn({villageId:e.id,position:r,home:{x:e.centerX+.5,y:e.centerY,z:e.centerZ+.5}})]):[]}spawn(e){let t={id:this.nextId,villageId:e.villageId,position:{...e.position},velocity:{x:0,y:0,z:0},home:e.home?{...e.home}:{...e.position},patrolTarget:e.home?{...e.home}:{...e.position},health:100,ageSeconds:0,hurtTimeSeconds:0,knockbackSeconds:0,attackCooldownSeconds:.4,swingSeconds:0,playerAngerSeconds:0,activeGoal:`idle`,targetKind:null,targetMobId:null,path:[],pathTarget:null,pathCooldownSeconds:0,alarmSeconds:0,alarmPoint:null};return this.nextId+=1,this.guards.push(t),this.guardedVillageIds.add(e.villageId),t}step(e,t,n,r={}){let i=[],a=[],o=0;for(let s of this.guards){Jd(e,s),s.ageSeconds+=t,s.hurtTimeSeconds=Math.max(0,s.hurtTimeSeconds-t),s.knockbackSeconds=Math.max(0,s.knockbackSeconds-t),s.playerAngerSeconds=Math.max(0,s.playerAngerSeconds-t),s.attackCooldownSeconds=Math.max(0,s.attackCooldownSeconds-t),s.swingSeconds=Math.max(0,s.swingSeconds-t),s.pathCooldownSeconds=Math.max(0,s.pathCooldownSeconds-t),s.alarmSeconds=Math.max(0,s.alarmSeconds-t),s.alarmSeconds<=0&&(s.alarmPoint=null);let c=jd(s,n,r.playerPosition);if(s.targetKind=c?.kind??null,s.targetMobId=c?.kind===`hostile`?c.id:null,s.knockbackSeconds>0)s.activeGoal=`knockback`,s.velocity.x*=Math.max(0,1-3.2*t),s.velocity.z*=Math.max(0,1-3.2*t);else{let t=c?Nd(e,s,c.position):null,n=Ad({guard:s,target:c&&t?{...c,position:t}:null});s.activeGoal=n.goal,c&&t&&!sf(t,c.position)&&n.goal===`attack`&&(s.activeGoal=`path_attack`),s.velocity.x=n.velocityX,s.velocity.z=n.velocityZ}if(c&&s.knockbackSeconds<=0){let e=af(s.position,c.position),t=Math.abs(s.position.y-c.position.y);if(e<=md&&t<=2.2&&s.attackCooldownSeconds<=0){s.attackCooldownSeconds=_d,s.swingSeconds=.38;let e=rf(c.position.x-s.position.x,c.position.z-s.position.z);c.kind===`player`?(o+=gd,a.push({guardId:s.id,damage:gd,position:{...c.position}})):i.push({guardId:s.id,mobId:c.id,damage:hd,position:{...c.position},knockback:{x:e.x*7.2,y:6.6,z:e.z*7.2}})}}Pd(e,s,t,c?.position??s.patrolTarget),Jd(e,s)}return{attacks:i,playerAttacks:a,playerDamage:o}}damageGuard(e,t,n,r={}){let i=this.guards.find(t=>t.id===e)??null;return i?(i.health=Math.max(0,i.health-Math.max(0,t)),i.hurtTimeSeconds=.28,i.knockbackSeconds=.18,r.angerAtPlayer&&(i.playerAngerSeconds=22),i.velocity.x=n.x,i.velocity.y=Math.max(i.velocity.y,n.y),i.velocity.z=n.z,i.health>0?{guard:i,died:!1}:(this.guards=this.guards.filter(t=>t.id!==e),{guard:i,died:!0})):{guard:null,died:!1}}clear(){this.guards=[],this.nextId=1,this.guardedVillageIds.clear()}};function Od(e,t,n,r=14){e.alarmSeconds=Math.max(e.alarmSeconds,Math.max(0,r)),e.alarmPoint={...t},e.patrolTarget={...n},e.pathCooldownSeconds=0,Bd(e)}var kd=[{id:`attack`,priority:0,canRun:({target:e})=>e!==null,run:({guard:e,target:t})=>{let n=(t?.position.x??e.position.x)-e.position.x,r=(t?.position.z??e.position.z)-e.position.z,i=Math.max(.001,Math.hypot(n,r)),a=i<=md&&e.path.length===0?0:fd;return{goal:`attack`,velocityX:n/i*a,velocityZ:r/i*a}}},{id:`patrol`,priority:4,canRun:()=>!0,run:({guard:e})=>{(af(e.position,e.patrolTarget)<.8||cf(e.id,Math.floor(e.ageSeconds*.25),311)<.02)&&(e.patrolTarget=e.alarmSeconds>0?nf(e):tf(e),Bd(e));let t=zd(e)??e.patrolTarget,n=t.x-e.position.x,r=t.z-e.position.z,i=Math.max(.001,Math.hypot(n,r)),a=i>.8&&cf(e.id,Math.floor(e.ageSeconds*2),313)>.18;return{goal:a?`patrol`:`idle`,velocityX:a?n/i*dd:0,velocityZ:a?r/i*dd:0}}}];function Ad(e){return Jl(kd,e,{goal:`idle`,velocityX:0,velocityZ:0})}function jd(e,t,n){if(e.playerAngerSeconds>0&&n&&of(e.position,n)<=pd)return{kind:`player`,id:0,position:n};let r=Md(e,t);return r?{kind:`hostile`,id:r.id,position:r.position}:null}function Md(e,t){let n=null;for(let r of t){let t=of(e.position,r.position);t>pd||n&&t>=n.distance||(n={target:r,distance:t})}return n?.target??null}function Nd(e,t,n){if(t.pathTarget&&!sf(t.pathTarget,n)&&Bd(t),Gd(e,{x:t.position.x,y:t.position.y+1.65,z:t.position.z},{x:n.x,y:n.y+1.25,z:n.z}))return Bd(t),n;if(t.path.length===0&&t.pathCooldownSeconds<=0){let r=Ld(e,t.position,n);t.pathCooldownSeconds=wd,r.length>0&&(t.path=r,t.pathTarget={...n})}return zd(t)??n}function Pd(e,t,n,r){t.velocity.y-=ud*n;let i=t.position.x+t.velocity.x*n,a=t.position.z+t.velocity.z*n;if(Fd(e,i,t.position.y,a))t.position.x=i,t.position.z=a;else if(qd(e,t)&&Fd(e,i,t.position.y+vd,a)&&e.isSolidBlockLoaded(Math.floor(i),Math.floor(t.position.y),Math.floor(a)))t.position.x=i,t.position.y+=vd,t.position.z=a,t.velocity.y=Math.max(0,t.velocity.y);else if((t.activeGoal===`attack`||t.activeGoal===`path_attack`||t.activeGoal===`patrol`)&&t.pathCooldownSeconds<=0){let n=Ld(e,t.position,r);t.pathCooldownSeconds=wd,n.length>0?(t.path=n,t.pathTarget={...r},t.activeGoal===`attack`&&(t.activeGoal=`path_attack`)):t.activeGoal===`patrol`&&(t.patrolTarget=tf(t))}else t.activeGoal===`patrol`&&(t.patrolTarget=tf(t));Kd(e,t,n)}function Fd(e,t,n,r){let i=Math.floor(t),a=Math.floor(r);return!e.isSolidBlockLoaded(i,Math.floor(n+.2),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+1.4),a)&&!e.isSolidBlockLoaded(i,Math.floor(n+yd),a)}var Id=[[1,0],[-1,0],[0,1],[0,-1]];function Ld(e,t,n){let r=Math.floor(t.x),i=Math.floor(t.z),a=Math.floor(n.x),o=Math.floor(n.z),s=Rd(e,r,i,t.y),c=Rd(e,a,o,n.y);if(s===null||c===null||r===a&&i===o)return[];let l=Math.min(r,a)-xd,u=Math.max(r,a)+xd,d=Math.min(i,o)-xd,f=Math.max(i,o)+xd,p=[{x:r,z:i,y:s,g:0,f:Wd(r,i,a,o),parent:null}],m=new Map([[Ud(r,i),0]]),h=new Set,g=0;for(;p.length>0&&g<Sd;){g+=1;let t=Hd(p),r=p.splice(t,1)[0],i=Ud(r.x,r.z);if(!h.has(i)){if(h.add(i),r.x===a&&r.z===o)return Vd(r,{x:n.x,y:c,z:n.z});for(let[t,n]of Id){let i=r.x+t,s=r.z+n;if(i<l||i>u||s<d||s>f)continue;let c=Ud(i,s);if(h.has(c))continue;let g=Rd(e,i,s,r.y);if(g===null||Math.abs(g-r.y)>1.1)continue;let _=r.g+1+Math.max(0,g-r.y)*.45,v=m.get(c);v!==void 0&&v<=_||(m.set(c,_),p.push({x:i,z:s,y:g,g:_,f:_+Wd(i,s,a,o),parent:r}))}}}return[]}function Rd(e,t,n,r){let i=e.getMotionBlockingHeightLoaded?.(t,n);if(i!=null){let a=i+1;if(Math.abs(a-r)<=2.1&&!Qd(e,t+.5,n+.5,i,r)&&Fd(e,t+.5,a,n+.5))return a}let a=Math.floor(r)+vd,o=Math.floor(r)-2;for(let r=a;r>=o;--r)if(e.isSolidBlockLoaded(t,r-1,n)&&Fd(e,t+.5,r,n+.5))return r;return null}function zd(e){for(;e.path.length>0&&af(e.position,e.path[0])<bd;)e.path.shift();return e.path[0]??null}function Bd(e){e.path=[],e.pathTarget=null}function Vd(e,t){let n=[],r=e;for(;r?.parent;)n.push({x:r.x+.5,y:r.y,z:r.z+.5}),r=r.parent;return n.reverse(),n.length>0&&(n[n.length-1]={...t}),n.slice(0,Cd)}function Hd(e){let t=0,n=e[0].f;for(let r=1;r<e.length;r+=1)e[r].f<n&&(n=e[r].f,t=r);return t}function Ud(e,t){return`${e},${t}`}function Wd(e,t,n,r){return Math.abs(n-e)+Math.abs(r-t)}function Gd(e,t,n){let r=of(t,n),i=Math.max(1,Math.ceil(r*2));for(let r=1;r<i;r+=1){let a=r/i,o=t.x+(n.x-t.x)*a,s=t.y+(n.y-t.y)*a,c=t.z+(n.z-t.z)*a;if(e.isSolidBlockLoaded(Math.floor(o),Math.floor(s),Math.floor(c)))return!1}return!0}function Kd(e,t,n){let r=t.position.y+t.velocity.y*n,i=Math.floor(t.position.x),a=Math.floor(t.position.z);if(t.velocity.y<=0){let n=Math.floor(t.position.y-.04),o=Math.floor(r-.04);for(let r=n;r>=o;--r)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r+1,t.velocity.y=0;return}}else{let n=Math.floor(t.position.y+yd),o=Math.floor(r+yd);for(let r=n;r<=o;r+=1)if(e.isSolidBlockLoaded(i,r,a)){t.position.y=r-yd-.01,t.velocity.y=0;return}}t.position.y=r}function qd(e,t){return e.isSolidBlockLoaded(Math.floor(t.position.x),Math.floor(t.position.y-.04),Math.floor(t.position.z))}function Jd(e,t){let n=Math.floor(t.position.y)-1;if(!$d(e,t.position.x,t.position.z,n))return;let r=Zd(e,t.home,Td,Ed)??Zd(e,t.position,Td,Ed);r&&(t.position={...r},t.velocity={x:0,y:0,z:0},t.patrolTarget={...r},t.pathCooldownSeconds=0,Bd(t))}function Yd(e,t){let n=[{x:t.centerX+2.5,z:t.centerZ+2.5},{x:t.centerX-2.5,z:t.centerZ+2.5},{x:t.centerX+2.5,z:t.centerZ-2.5},{x:t.centerX-2.5,z:t.centerZ-2.5},{x:t.centerX+.5,z:t.centerZ+.5}];for(let r of n){let n=Xd(e,r.x,r.z,t.centerY);if(n!==null&&Fd(e,r.x,n,r.z))return{x:r.x,y:n,z:r.z}}return Zd(e,{x:t.centerX+.5,y:t.centerY,z:t.centerZ+.5},Td,Ed)}function Xd(e,t,n,r){let i=e.getMotionBlockingHeightLoaded?.(Math.floor(t),Math.floor(n));return i==null||r!==void 0&&Qd(e,t,n,i,r)?null:i+1}function Zd(e,t,n,r){let i=Math.floor(t.x)+.5,a=Math.floor(t.z)+.5;for(let o=0;o<=n;o+=1)for(let n=-o;n<=o;n+=1)for(let s=-o;s<=o;s+=1){if(Math.max(Math.abs(n),Math.abs(s))!==o)continue;let c=i+n,l=a+s,u=Xd(e,c,l,t.y);if(!(u===null||Math.abs(u-t.y)>r||!Fd(e,c,u,l)))return{x:c,y:u,z:l}}return null}function Qd(e,t,n,r,i){return e.getBlockTypeIdLoaded?.(Math.floor(t),r,Math.floor(n))!==`sand`&&$d(e,t,n,r)?!0:r>=Math.floor(i)+3&&$d(e,t,n,r)}function $d(e,t,n,r){let i=Math.floor(t),a=Math.floor(n),o=e.getBlockTypeIdLoaded?.(i,r,a);if(!ef(o))return!1;let s=0;for(let[t,n]of[[1,0],[-1,0],[0,1],[0,-1]])e.getBlockTypeIdLoaded?.(i+t,r,a+n)===o&&(s+=1);return s>=2}function ef(e){return e===`cobblestone`||e===`planks`||e===`sand`}function tf(e){let t=Math.floor(e.ageSeconds*4)+e.id*23,n=cf(e.id,t,331)*Math.PI*2,r=4+cf(t,e.id,337)*9;return{x:e.home.x+Math.cos(n)*r,y:e.home.y,z:e.home.z+Math.sin(n)*r}}function nf(e){let t=e.alarmPoint??e.home,n=Math.floor(e.ageSeconds*6)+e.id*41,r=cf(e.id,n,401)*Math.PI*2,i=2.2+cf(n,e.id,409)*4.4;return{x:t.x+Math.cos(r)*i,y:t.y,z:t.z+Math.sin(r)*i}}function rf(e,t){let n=Math.hypot(e,t);return n<.001?{x:0,z:0}:{x:e/n,z:t/n}}function af(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function of(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function sf(e,t){return Math.floor(e.x)===Math.floor(t.x)&&Math.floor(e.y)===Math.floor(t.y)&&Math.floor(e.z)===Math.floor(t.z)}function cf(e,t,n){let r=Math.imul(Math.floor(e*131)+2654435769,2246822507);return r^=Math.imul(Math.floor(t*137)+3266489909,668265261),r^=Math.imul(Math.floor(n*149)+374761393,2654435761),r=Math.imul(r^r>>>15,2246822507),((r^r>>>13)>>>0)/4294967295}var lf=1.35,uf=2.15,df=14,ff=.8,pf=12,mf=.32,hf=4,gf=5,_f=14,vf=24,yf=.18,bf=7,xf=220,Sf=28,Cf=.45,wf=2.1,Tf=8,Ef=2,Df=24e3,Of=[0,10,30,70,150],kf=-30,Af=30,jf=5.4,Mf=7,Nf=2,Pf=7,Ff=class{villagers;nextId;spawnedVillageIds;villageHomes;villageWorkstations;constructor(){this.villagers=[],this.nextId=1,this.spawnedVillageIds=new Set,this.villageHomes=new Map,this.villageWorkstations=new Map}ensureVillage(e,t){if(this.villageHomes.set(e.id,(e.homePositions??e.villagerPositions).map(e=>({...e}))),e.workstations&&this.villageWorkstations.set(e.id,e.workstations.map(e=>({profession:e.profession,position:{...e.position}}))),this.spawnedVillageIds.has(e.id))return[];this.spawnedVillageIds.add(e.id);let n=[],r=[`farmer`,`librarian`,`mason`];for(let i=0;i<e.villagerPositions.length;i+=1){let a=e.villagerPositions[i],o=cp(t,a,hf)??sp(a),s=cp(t,e.homePositions?.[i]??a,hf)??sp(e.homePositions?.[i]??a),c=lp(t,e.workstations?.find(e=>e.profession===r[i%r.length])?.position),l={id:this.nextId,villageId:e.id,position:{...o},home:s,homeValid:!0,meetingPoint:cp(t,{x:e.centerX,y:e.centerY,z:e.centerZ},hf)??sp({x:e.centerX,y:e.centerY,z:e.centerZ}),workstation:c,target:{...o},schedule:`morning`,ageSeconds:0,idleSeconds:.5+i*.45,repathCooldownSeconds:0,health:20,hurtTimeSeconds:0,profession:r[i%r.length],activeGoal:`idle`,path:[],pathTarget:null,tradeUses:{},tradeXp:0,tradeLevel:1,reputation:0,carriedFood:{},foodShareCooldownSeconds:0,foodShareFlashSeconds:0,gossipCooldownSeconds:0,restocksThisWorkday:0,restockCooldownSeconds:0,bellAlarmSeconds:0,bellAlarmSource:null};this.nextId+=1,this.villagers.push(l),n.push(l)}return n}step(e,t,n={}){for(let r of this.villagers){r.ageSeconds+=t,r.idleSeconds=Math.max(0,r.idleSeconds-t),r.repathCooldownSeconds=Math.max(0,r.repathCooldownSeconds-t),r.restockCooldownSeconds=Math.max(0,r.restockCooldownSeconds-t),r.foodShareCooldownSeconds=Math.max(0,r.foodShareCooldownSeconds-t),r.foodShareFlashSeconds=Math.max(0,r.foodShareFlashSeconds-t),r.gossipCooldownSeconds=Math.max(0,r.gossipCooldownSeconds-t),r.hurtTimeSeconds=Math.max(0,r.hurtTimeSeconds-t),r.bellAlarmSeconds=Math.max(0,r.bellAlarmSeconds-t),r.bellAlarmSeconds<=0&&(r.bellAlarmSource=null);let i=Xf(n.timeOfDay,n.night===!0),a=i!==r.schedule;a&&(r.schedule=i,i!==`work`&&(r.restocksThisWorkday=0,r.restockCooldownSeconds=0),r.idleSeconds=0,zp(r)),ep(e,r,this.villagers,this.villageWorkstations.get(r.villageId)??[]),tp(e,r,this.villagers,this.villageHomes.get(r.villageId)??[]);let o=Math.hypot(r.target.x-r.position.x,r.target.z-r.position.z),s=Yf({world:e,villager:r,schedule:i,scheduleChanged:a,nearestThreat:_p(e,r,n.threats??[]),shouldPickTarget:o<ff||r.idleSeconds<=0});r.activeGoal=s.goal,s.target&&(Gp(r.target,s.target)||zp(r),r.target=s.target),s.idleSeconds!==null&&(r.idleSeconds=Math.max(r.idleSeconds,s.idleSeconds)),gp(e,r,t,s.speed),Zf(r)}Qf(this.villagers),$f(this.villagers)}damageVillager(e,t){let n=this.villagers.find(t=>t.id===e)??null;return n?(n.health=Math.max(0,n.health-Math.max(0,t)),n.hurtTimeSeconds=.28,n.idleSeconds=0,n.health>0?{villager:n,died:!1}:(this.villagers=this.villagers.filter(t=>t.id!==e),{villager:n,died:!0})):{villager:null,died:!1}}clear(){this.villagers=[],this.nextId=1,this.spawnedVillageIds.clear(),this.villageHomes.clear(),this.villageWorkstations.clear()}};function If(e,t,n){return Math.max(0,Math.max(0,n)-(e.tradeUses[t]??0))}function Lf(e,t,n){return If(e,t,n)>0}function Rf(e,t,n){return Lf(e,t,n)?(e.tradeUses[t]=(e.tradeUses[t]??0)+1,!0):!1}function zf(e,t){return e.tradeXp=Math.max(0,e.tradeXp+Math.max(0,t)),e.tradeLevel=Bf(e.tradeXp),e.tradeLevel}function Bf(e){let t=Math.max(0,e);return t>=Of[4]?5:t>=Of[3]?4:t>=Of[2]?3:t>=Of[1]?2:1}function Vf(e){return Of[e.tradeLevel]??null}function Hf(e,t){return e.reputation=qf(e.reputation+t),e.reputation}function Uf(e,t,n){let r=Math.max(0,Math.floor(n));return r<=0?e.carriedFood[t]??0:(e.carriedFood[t]=(e.carriedFood[t]??0)+r,e.carriedFood[t])}function Wf(e,t){return e.carriedFood[t]??0}function Gf(e,t,n=9){e.bellAlarmSeconds=Math.max(e.bellAlarmSeconds,Math.max(0,n)),e.bellAlarmSource={...t},e.idleSeconds=0,e.repathCooldownSeconds=0,zp(e)}function Kf(e){let t=qf(e);return t>=0?Math.max(.7,1-t*.012):Math.min(1.9,1+Math.abs(t)*.035)}function qf(e){return Math.max(kf,Math.min(Af,e))}var Jf=[{id:`avoid_threat`,priority:0,canRun:({nearestThreat:e})=>e!==null,run:({world:e,villager:t,nearestThreat:n})=>({goal:`avoid_threat`,target:hp(e,t,n??t.position),speed:uf,idleSeconds:.45})},{id:`bell_alarm`,priority:1,canRun:({villager:e})=>e.bellAlarmSeconds>0,run:({world:e,villager:t})=>({goal:`home`,target:dp(e,t),speed:uf*.92,idleSeconds:.35})},{id:`sleep`,priority:2,canRun:({schedule:e})=>e===`sleep`,run:({world:e,villager:t})=>({goal:`sleep`,target:dp(e,t),speed:lf*1.25,idleSeconds:2.8})},{id:`home`,priority:3,canRun:({schedule:e,shouldPickTarget:t,scheduleChanged:n})=>e===`home`&&(t||n),run:({world:e,villager:t})=>({goal:`home`,target:dp(e,t),speed:lf*1.12,idleSeconds:1.4})},{id:`work`,priority:4,canRun:({schedule:e,villager:t,shouldPickTarget:n,scheduleChanged:r})=>e===`work`&&t.workstation!==null&&(n||r),run:({world:e,villager:t})=>({goal:`work`,target:mp(e,t.workstation??t.home)??{...t.home},speed:lf,idleSeconds:3.5+Yp(t.id,Math.floor(t.ageSeconds*.1),71)*2.5})},{id:`meet`,priority:5,canRun:({schedule:e,shouldPickTarget:t,scheduleChanged:n})=>e===`meet`&&(t||n),run:({world:e,villager:t})=>({goal:`meet`,target:fp(e,t),speed:lf*.92,idleSeconds:2.4+Yp(t.id,Math.floor(t.ageSeconds*.2),91)*2})},{id:`day_target`,priority:6,canRun:({shouldPickTarget:e})=>e,run:({world:e,villager:t})=>{let n=up(e,t);return{goal:n.goal,target:n.position,speed:lf,idleSeconds:2.2+Yp(t.id,Math.floor(t.ageSeconds*.2),0)*2.4}}}];function Yf(e){return Jl(Jf,e,{goal:e.villager.activeGoal===`avoid_threat`?`idle`:e.villager.activeGoal,target:null,speed:lf,idleSeconds:null})}function Xf(e,t){if(e===void 0)return t?`sleep`:`work`;let n=(e%Df+Df)%Df;return n>=12542&&n<23e3?`sleep`:n>=11e3&&n<12542?`home`:n>=9e3&&n<11e3?`meet`:n>=2e3&&n<9e3?`work`:`morning`}function Zf(e){e.schedule!==`work`||!e.workstation||Object.keys(e.tradeUses).length===0||e.restocksThisWorkday>=Ef||e.restockCooldownSeconds>0||Math.hypot(e.position.x-e.workstation.x,e.position.z-e.workstation.z)>wf||Math.abs(e.position.y-e.workstation.y)>2||(e.tradeUses={},e.restocksThisWorkday+=1,e.restockCooldownSeconds=Tf)}function Qf(e){let t=e.filter(e=>e.schedule===`meet`&&e.activeGoal===`meet`&&e.gossipCooldownSeconds<=0&&Wp(e.position,e.meetingPoint)<=jf),n=new Map,r=new Set;for(let e=0;e<t.length;e+=1){let i=t[e];for(let a=e+1;a<t.length;a+=1){let e=t[a];if(i.villageId!==e.villageId||Wp(i.position,e.position)>jf)continue;let o=n.get(i.id)??i.reputation,s=n.get(e.id)??e.reputation,c=o-s;if(Math.abs(c)<2)continue;let l=Math.sign(c)*Math.min(Nf,Math.floor(Math.abs(c)/2));n.set(i.id,qf(o-l)),n.set(e.id,qf(s+l)),r.add(i.id),r.add(e.id)}}for(let t of e){let e=n.get(t.id);e!==void 0&&(t.reputation=e),r.has(t.id)&&(t.gossipCooldownSeconds=Mf)}}function $f(e){let t=e.filter(e=>e.schedule===`meet`&&e.activeGoal===`meet`&&e.foodShareCooldownSeconds<=0&&Wp(e.position,e.meetingPoint)<=jf);for(let e of t){let n=e.carriedFood.wheat??0;if(n<3)continue;let r=t.find(t=>t.id!==e.id&&t.villageId===e.villageId&&Wp(t.position,e.position)<=jf&&(t.carriedFood.wheat??0)+2<n);r&&(e.carriedFood.wheat=n-1,r.carriedFood.wheat=(r.carriedFood.wheat??0)+1,e.foodShareCooldownSeconds=5,r.foodShareCooldownSeconds=4,e.foodShareFlashSeconds=.75,r.foodShareFlashSeconds=.75)}}function ep(e,t,n,r){if(!e.getBlockTypeIdLoaded||r.length===0||(t.workstation&&!ip(e,t.profession,t.workstation)&&(t.workstation=null,t.restocksThisWorkday=0,t.restockCooldownSeconds=0,zp(t)),t.workstation))return;let i=rp(e,t,n,r);i&&(t.workstation=cp(e,i.position,2)??sp(i.position),t.idleSeconds=0,zp(t))}function tp(e,t,n,r){if(!e.getBlockTypeIdLoaded||r.length===0||(t.homeValid&&!ap(e,t.home)&&(t.homeValid=!1,zp(t)),t.homeValid))return;let i=np(e,t,n,r);i&&(t.home=cp(e,i,2)??sp(i),t.homeValid=!0,t.idleSeconds=0,zp(t))}function np(e,t,n,r){let i=null;for(let a of r){if(!ap(e,a))continue;let r=cp(e,a,2)??sp(a);if(n.some(e=>e.id!==t.id&&e.homeValid&&Gp(e.home,r)))continue;let o=Wp(t.position,r);(!i||o<i.distance)&&(i={home:a,distance:o})}return i?.home??null}function rp(e,t,n,r){let i=null;for(let a of r){if(a.profession!==t.profession||!ip(e,t.profession,a.position))continue;let r=cp(e,a.position,2)??sp(a.position);if(n.some(e=>e.id!==t.id&&e.workstation!==null&&Gp(e.workstation,r)))continue;let o=Wp(t.position,r);(!i||o<i.distance)&&(i={workstation:a,distance:o})}return i?.workstation??null}function ip(e,t,n){let r=op(t);for(let t=-1;t<=1;t+=1)for(let i=-1;i<=1;i+=1)for(let a=-1;a<=1;a+=1)if(e.getBlockTypeIdLoaded?.(Math.floor(n.x)+a,Math.floor(n.y)+t,Math.floor(n.z)+i)===r)return!0;return!1}function ap(e,t){for(let n=-1;n<=1;n+=1)for(let r=-2;r<=2;r+=1)for(let i=-2;i<=2;i+=1)if(e.getBlockTypeIdLoaded?.(Math.floor(t.x)+i,Math.floor(t.y)+n,Math.floor(t.z)+r)===`bed`)return!0;return!1}function op(e){switch(e){case`farmer`:return`composter`;case`librarian`:return`lectern`;case`mason`:return`stonecutter`}}function sp(e){return{x:e.x+.5,y:e.y,z:e.z+.5}}function cp(e,t,n){let r=sp(t);return e?Ap(e,r)||Pp(e,r,n,gf):r}function lp(e,t){return t?cp(e,t,hf)??sp(t):null}function up(e,t){let n=Math.floor(t.ageSeconds*.13)+t.id*23;if(t.workstation&&Yp(t.id,n,41)<.45){let n=mp(e,t.workstation);if(n&&Math.abs(n.y-t.home.y)<=3)return{goal:`work`,position:n}}return{goal:`wander`,position:pp(e,t)}}function dp(e,t){let n=t.homeValid?t.home:t.meetingPoint;return mp(e,n)??{...n}}function fp(e,t){let n=Math.floor(t.ageSeconds*.15)+t.id*13;for(let r=0;r<6;r+=1){let i=Yp(t.id,n,r+401)*Math.PI*2,a=1.4+Yp(n,t.id,r+409)*4.2,o=t.meetingPoint.x+Math.cos(i)*a,s=t.meetingPoint.z+Math.sin(i)*a,c=Cp(e,o,s);if(c!==null&&Math.abs(c-t.meetingPoint.y)<=3&&kp(e,o,c,s))return{x:o,y:c,z:s}}return mp(e,t.meetingPoint)??{...t.meetingPoint}}function pp(e,t){let n=Math.floor(t.ageSeconds*10)+t.id*17;for(let r=0;r<8;r+=1){let i=Yp(t.id,n,r)*Math.PI*2,a=3+Yp(n,t.id,r+11)*df,o=t.home.x+Math.cos(i)*a,s=t.home.z+Math.sin(i)*a,c=Cp(e,o,s);if(c!==null&&!(Math.abs(c-t.home.y)>3)&&kp(e,o,c,s))return{x:o,y:c,z:s}}return{...t.home}}function mp(e,t){let n=Cp(e,t.x,t.z);return n===null||!kp(e,t.x,n,t.z)?null:{x:t.x,y:n,z:t.z}}function hp(e,t,n){let r=t.position.x-n.x,i=t.position.z-n.z,a=Math.hypot(r,i)>.001?Math.atan2(i,r):Yp(t.id,Math.floor(t.ageSeconds*10),199)*Math.PI*2,o=Math.floor(t.ageSeconds*10)+t.id*37;for(let n=0;n<9;n+=1){let r=a+(n-4)*.38,i=6+Yp(t.id,o,n+211)*5,s=t.position.x+Math.cos(r)*i,c=t.position.z+Math.sin(r)*i,l=Cp(e,s,c);if(!(l===null||Math.abs(l-t.position.y)>2)&&kp(e,s,l,c))return{x:s,y:l,z:c}}return mp(e,t.home)??{...t.home}}function gp(e,t,n,r){bp(e,t),Lp(t);let i=Rp(t),a=i.x-t.position.x,o=i.z-t.position.z,s=Math.hypot(a,o);if(s<.05){t.path.length>0&&t.path.shift(),yp(e,t);return}let c=Math.min(s,r*n),l=t.position.x+a/s*c,u=t.position.z+o/s*c,d=Cp(e,l,u);if(d!==null&&Math.abs(d-t.position.y)<=1.1&&kp(e,l,d,u))t.position.x=l,t.position.y=d,t.position.z=u;else{let n=t.repathCooldownSeconds<=0?Fp(e,t.position,t.target):[];t.repathCooldownSeconds=Cf,n.length>0?(t.path=n,t.pathTarget={...t.target}):(t.target=mp(e,t.home)??{...t.home},zp(t))}yp(e,t)}function _p(e,t,n){let r=null;for(let i of n){let n=Math.hypot(i.x-t.position.x,i.y-t.position.y,i.z-t.position.z);n>pf||r&&n>=r.distance||vp(e,{x:t.position.x,y:t.position.y+1.5,z:t.position.z},{x:i.x,y:i.y+1.4,z:i.z})&&(r={position:i,distance:n})}return r?.position??null}function vp(e,t,n){let r=Math.hypot(t.x-n.x,t.y-n.y,t.z-n.z),i=Math.max(1,Math.ceil(r*2));for(let r=1;r<i;r+=1){let a=r/i,o=t.x+(n.x-t.x)*a,s=t.y+(n.y-t.y)*a,c=t.z+(n.z-t.z)*a;if(e.isSolidBlockLoaded(Math.floor(o),Math.floor(s),Math.floor(c)))return!1}return!0}function yp(e,t){let n=Cp(e,t.position.x,t.position.z);if(n!==null&&Math.abs(n-t.position.y)<=1.6&&kp(e,t.position.x,n,t.position.z)){t.position.y=n;return}bp(e,t)}function bp(e,t){let n=xp(e,t);if(n){Sp(t,n);return}let r=Cp(e,t.position.x,t.position.z);if(r!==null&&Math.abs(r-t.position.y)<=gf&&kp(e,t.position.x,r,t.position.z)){t.position.y=r;return}let i=Pp(e,t.position,hf,gf)??Pp(e,t.home,hf,gf*2);i&&Sp(t,i)}function xp(e,t){let n=Math.floor(t.position.y)-1;return!Tp(e,t.position.x,t.position.z,n)&&!Ep(e,t.position.x,t.position.z,n,t.home.y)?null:Ap(e,t.home)??Pp(e,t.home,_f,vf)??Pp(e,t.meetingPoint,_f,vf)??Pp(e,t.position,_f,vf)}function Sp(e,t){e.position={...t},e.target={...t},e.idleSeconds=0,e.repathCooldownSeconds=0,zp(e)}function Cp(e,t,n){let r=[];for(let i of Jp(t,n)){let t=e.getMotionBlockingHeightLoaded?.(Math.floor(i.x),Math.floor(i.z));if(t==null)return null;r.push(t)}let i=Math.min(...r),a=Math.max(...r);if(a-i>1)return null;let o=e.getMotionBlockingHeightLoaded?.(Math.floor(t),Math.floor(n));if(o==null)return null;let s=wp(e,t,n,a);return s===null?Tp(e,t,n,a)||Kp(e,Math.floor(t),Math.floor(n),o)?null:a+1:s}function wp(e,t,n,r){let i=e.getBlockTypeIdLoaded?.(Math.floor(t),r,Math.floor(n));if(!Op(i))return null;for(let i=r-1;i>=r-Pf;--i)if(kp(e,t,i,n)&&jp(e,t,i,n)&&Mp(e,t,i,n,r)&&!Np(e,Math.floor(t),i,Math.floor(n)))return i;return null}function Tp(e,t,n,r){if(!Dp(e,t,n,r))return!1;let i=Math.floor(t),a=Math.floor(n),o=0;for(let t=r-1;t>=r-2;--t)e.isSolidBlockLoaded(i,t,a)||(o+=1);return o>0}function Ep(e,t,n,r,i){return r>=Math.floor(i)+3&&Dp(e,t,n,r)}function Dp(e,t,n,r){let i=Math.floor(t),a=Math.floor(n),o=e.getBlockTypeIdLoaded?.(i,r,a);if(!Op(o))return!1;let s=0;for(let[t,n]of[[1,0],[-1,0],[0,1],[0,-1]])e.getBlockTypeIdLoaded?.(i+t,r,a+n)===o&&(s+=1);return s>=2}function Op(e){return e===`cobblestone`||e===`planks`||e===`sand`}function kp(e,t,n,r){let i=Math.floor(n);for(let n of Jp(t,r)){let t=Math.floor(n.x),r=Math.floor(n.z);if(e.isSolidBlockLoaded(t,i,r)||e.isSolidBlockLoaded(t,i+1,r))return!1}return!0}function Ap(e,t){let n=Math.floor(t.y);return!kp(e,t.x,n,t.z)||!jp(e,t.x,n,t.z)||Tp(e,t.x,t.z,n-1)||Np(e,Math.floor(t.x),n,Math.floor(t.z))?null:{x:t.x,y:n,z:t.z}}function jp(e,t,n,r){for(let i of Jp(t,r))if(!e.isSolidBlockLoaded(Math.floor(i.x),n-1,Math.floor(i.z)))return!1;return!0}function Mp(e,t,n,r,i){let a=Math.floor(t),o=Math.floor(r);for(let t=Math.floor(n)+2;t<=i;t+=1)if(e.isSolidBlockLoaded(a,t,o))return!0;return!1}function Np(e,t,n,r){let i=0;for(let[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])(e.isSolidBlockLoaded(t+a,n,r+o)||e.isSolidBlockLoaded(t+a,n+1,r+o))&&(i+=1);return i>=3}function Pp(e,t,n,r){let i=Math.floor(t.x)+.5,a=Math.floor(t.z)+.5;for(let o=0;o<=n;o+=1)for(let n=-o;n<=o;n+=1)for(let s=-o;s<=o;s+=1){if(Math.max(Math.abs(n),Math.abs(s))!==o)continue;let c=i+n,l=a+s,u=Cp(e,c,l);if(!(u===null||Math.abs(u-t.y)>r||!kp(e,c,u,l)))return{x:c,y:u,z:l}}return null}function Fp(e,t,n){let r=Pp(e,t,1,gf),i=Pp(e,n,2,gf*2);if(!r||!i)return[];let a=Math.floor(r.x),o=Math.floor(r.z),s=Math.floor(i.x),c=Math.floor(i.z);if(a===s&&o===c)return[];let l=Math.min(a,s)-bf,u=Math.max(a,s)+bf,d=Math.min(o,c)-bf,f=Math.max(o,c)+bf,p=[{x:a,z:o,y:r.y,g:0,f:Up(a,o,s,c),parent:null}],m=new Map([[Hp(a,o),0]]),h=new Set,g=0;for(;p.length>0&&g<xf;){g+=1;let t=Vp(p),n=p.splice(t,1)[0],a=Hp(n.x,n.z);if(!h.has(a)){if(h.add(a),n.x===s&&n.z===c)return Bp(n,i);for(let[t,i]of Ip){let a=n.x+t,o=n.z+i;if(a<l||a>u||o<d||o>f)continue;let g=Hp(a,o);if(h.has(g))continue;let _=Cp(e,a+.5,o+.5);if(_===null||Math.abs(_-n.y)>1.1||Math.abs(_-r.y)>gf||!kp(e,a+.5,_,o+.5))continue;let v=1+Math.max(0,_-n.y)*.35,y=n.g+v,b=m.get(g);b!==void 0&&b<=y||(m.set(g,y),p.push({x:a,z:o,y:_,g:y,f:y+Up(a,o,s,c),parent:n}))}}}return[]}var Ip=[[1,0],[-1,0],[0,1],[0,-1]];function Lp(e){e.pathTarget&&!Gp(e.pathTarget,e.target)&&zp(e)}function Rp(e){for(;e.path.length>0&&Wp(e.position,e.path[0])<yf;)e.path.shift();return e.path[0]??e.target}function zp(e){e.path=[],e.pathTarget=null}function Bp(e,t){let n=[],r=e;for(;r?.parent;)n.push({x:r.x+.5,y:r.y,z:r.z+.5}),r=r.parent;return n.reverse(),n.length>0&&(n[n.length-1]={...t}),n.slice(0,Sf)}function Vp(e){let t=0,n=e[0].f;for(let r=1;r<e.length;r+=1)e[r].f<n&&(n=e[r].f,t=r);return t}function Hp(e,t){return`${e},${t}`}function Up(e,t,n,r){return Math.abs(n-e)+Math.abs(r-t)}function Wp(e,t){return Math.hypot(e.x-t.x,e.z-t.z)}function Gp(e,t){return!e||!t?e===t:Math.floor(e.x)===Math.floor(t.x)&&Math.floor(e.y)===Math.floor(t.y)&&Math.floor(e.z)===Math.floor(t.z)}function Kp(e,t,n,r){let i=qp(e,t,n-1),a=qp(e,t,n+1),o=qp(e,t-1,n),s=qp(e,t+1,n),c=i!==null&&i>r,l=a!==null&&a>r,u=o!==null&&o>r,d=s!==null&&s>r;return Number(c)+Number(l)+Number(u)+Number(d)>=3||c&&l||u&&d}function qp(e,t,n){return e.getMotionBlockingHeightLoaded?.(t,n)??null}function Jp(e,t){return[{x:e-mf,y:0,z:t-mf},{x:e+mf,y:0,z:t-mf},{x:e-mf,y:0,z:t+mf},{x:e+mf,y:0,z:t+mf}]}function Yp(e,t,n){let r=Math.imul(e+2654435769,2246822507);return r^=Math.imul(t+3266489909,668265261),r^=Math.imul(n+374761393,2654435761),r=Math.imul(r^r>>>15,2246822507),((r^r>>>13)>>>0)/4294967295}var Xp=(1n<<64n)-1n,Zp=11400714819323198485n,Qp=14695981039346656037n,$p=1099511628211n;function em(e){if(typeof e==`bigint`)return e&Xp;if(typeof e==`number`){if(!Number.isFinite(e))throw RangeError(`seed must be finite: ${e}`);return BigInt(Math.trunc(e))&Xp}let t=Qp;for(let n=0;n<e.length;n+=1)t^=BigInt(e.charCodeAt(n)),t=t*$p&Xp;return t}function tm(e){let t=e&Xp;return t=(t^t>>30n)*13787848793156543929n&Xp,t=(t^t>>27n)*10723151780598845931n&Xp,(t^t>>31n)&Xp}function nm(e,t){return tm(em(e)^em(t))}var rm=class e{state;constructor(e){this.state=em(e)}nextBigUint64(){return this.state=this.state+Zp&Xp,tm(this.state)}nextFloat(){let e=this.nextBigUint64()>>11n;return Number(e)/9007199254740992}nextInt(e){if(!Number.isInteger(e)||e<=0)throw RangeError(`maxExclusive must be a positive integer: ${e}`);return Math.floor(this.nextFloat()*e)}fork(t){return new e(nm(this.nextBigUint64(),t))}},im=.5*(Math.sqrt(3)-1),am=(3-Math.sqrt(3))/6,om=1/3,sm=1/6,cm=[[1,0],[-1,0],[0,1],[0,-1],[Math.SQRT1_2,Math.SQRT1_2],[-Math.SQRT1_2,Math.SQRT1_2],[Math.SQRT1_2,-Math.SQRT1_2],[-Math.SQRT1_2,-Math.SQRT1_2]],lm=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],um=class{perm;constructor(e){let t=new rm(e),n=new Uint8Array(256);for(let e=0;e<n.length;e+=1)n[e]=e;for(let e=n.length-1;e>0;--e){let r=t.nextInt(e+1),i=n[e];n[e]=n[r],n[r]=i}this.perm=new Uint8Array(512);for(let e=0;e<this.perm.length;e+=1)this.perm[e]=n[e&255]}noise2(e,t){let n=(e+t)*im,r=Math.floor(e+n),i=Math.floor(t+n),a=(r+i)*am,o=e-(r-a),s=t-(i-a),c=+(o>s),l=o>s?0:1,u=o-c+am,d=s-l+am,f=o-1+2*am,p=s-1+2*am,m=r&255,h=i&255,g=this.corner2(m,h,o,s),_=this.corner2(m+c,h+l,u,d),v=this.corner2(m+1,h+1,f,p);return fm((g+_+v)*70)}noise3(e,t,n){let r=(e+t+n)*om,i=Math.floor(e+r),a=Math.floor(t+r),o=Math.floor(n+r),s=(i+a+o)*sm,c=e-(i-s),l=t-(a-s),u=n-(o-s),d=0,f=0,p=0,m=0,h=0,g=0;c>=l?l>=u?(d=1,m=1,h=1):c>=u?(d=1,m=1,g=1):(p=1,m=1,g=1):l<u?(p=1,h=1,g=1):c<u?(f=1,h=1,g=1):(f=1,m=1,h=1);let _=c-d+sm,v=l-f+sm,y=u-p+sm,b=c-m+2*sm,x=l-h+2*sm,S=u-g+2*sm,C=c-1+3*sm,w=l-1+3*sm,T=u-1+3*sm,E=i&255,D=a&255,ee=o&255,te=this.corner3(E,D,ee,c,l,u),O=this.corner3(E+d,D+f,ee+p,_,v,y),ne=this.corner3(E+m,D+h,ee+g,b,x,S),k=this.corner3(E+1,D+1,ee+1,C,w,T);return fm((te+O+ne+k)*32)}corner2(e,t,n,r){let i=.5-n*n-r*r;if(i<0)return 0;let a=cm[this.perm[e+this.perm[t]]%cm.length],o=i*i;return o*o*(a[0]*n+a[1]*r)}corner3(e,t,n,r,i,a){let o=.6-r*r-i*i-a*a;if(o<0)return 0;let s=lm[this.perm[e+this.perm[t+this.perm[n]]]%lm.length],c=o*o;return c*c*(s[0]*r+s[1]*i+s[2]*a)}};function dm(e){return new um(e)}function fm(e){return e<-1?-1:e>1?1:e}var pm=[{id:`ocean`,temperature:0,humidity:.1,continentalness:-.85,erosion:.4,weirdness:0,surfaceOffset:-11,treeDensity:0,top:`sand`,filler:`sand`},{id:`river`,temperature:0,humidity:.25,continentalness:-.15,erosion:.8,weirdness:0,surfaceOffset:-8,treeDensity:0,top:`sand`,filler:`sand`},{id:`beach`,temperature:.25,humidity:.1,continentalness:-.28,erosion:.2,weirdness:0,surfaceOffset:-3,treeDensity:.002,top:`sand`,filler:`sand`},{id:`plains`,temperature:.25,humidity:0,continentalness:.25,erosion:.2,weirdness:-.1,surfaceOffset:0,treeDensity:.008,top:`grass`,filler:`dirt`},{id:`forest`,temperature:.1,humidity:.65,continentalness:.3,erosion:-.1,weirdness:0,surfaceOffset:2,treeDensity:.032,top:`grass`,filler:`dirt`},{id:`desert`,temperature:.82,humidity:-.75,continentalness:.2,erosion:.15,weirdness:-.1,surfaceOffset:-1,treeDensity:.001,top:`sand`,filler:`sand`},{id:`snowy_plains`,temperature:-.72,humidity:.2,continentalness:.22,erosion:.18,weirdness:-.1,surfaceOffset:1,treeDensity:.006,top:`snow`,filler:`dirt`},{id:`mountains`,temperature:-.35,humidity:.15,continentalness:.68,erosion:-.75,weirdness:.72,surfaceOffset:13,treeDensity:.01,top:`snow`,filler:`stone`}],mm=class{continentalness;erosion;temperature;humidity;weirdness;constructor(e){this.continentalness=dm(nm(e,`biome-continentalness`)),this.erosion=dm(nm(e,`biome-erosion`)),this.temperature=dm(nm(e,`biome-temperature`)),this.humidity=dm(nm(e,`biome-humidity`)),this.weirdness=dm(nm(e,`biome-weirdness`))}sampleClimate(e,t){return{continentalness:this.continentalness.noise2(e*.0016,t*.0016),erosion:this.erosion.noise2(e*.0024,t*.0024),temperature:this.temperature.noise2(e*.0018,t*.0018),humidity:this.humidity.noise2(e*.002,t*.002),weirdness:this.weirdness.noise2(e*.0022,t*.0022)}}blend(e,t){let n=pm.map(n=>({biome:n,distance:hm(e,n)+(n.id===`river`?(1-t)*2.5:0)})).sort((e,t)=>e.distance-t.distance).slice(0,4),r=new Map,i=0;for(let e of n){let t=1/Math.max(1e-4,e.distance*e.distance);r.set(e.biome.id,t),i+=t}let a=0,o=0;for(let e of n){let t=(r.get(e.biome.id)??0)/i;r.set(e.biome.id,t),a+=e.biome.surfaceOffset*t,o+=e.biome.treeDensity*t}let s=t>.62?pm.find(e=>e.id===`river`)??n[0].biome:n[0].biome;return{primary:s,weights:r,surfaceOffset:a,treeDensity:o,top:s.top,filler:s.filler}}};function hm(e,t){return Math.hypot((e.continentalness-t.continentalness)*1.35,(e.erosion-t.erosion)*.95,(e.temperature-t.temperature)*1.1,(e.humidity-t.humidity)*.9,(e.weirdness-t.weirdness)*.7)}var gm={x:12,z:12},_m=28,vm=8,ym=2,bm=[{offsetX:-13,offsetZ:-9,width:7,depth:6,profession:`farmer`},{offsetX:8,offsetZ:-10,width:7,depth:6,profession:`librarian`},{offsetX:-12,offsetZ:8,width:8,depth:6,profession:`mason`},{offsetX:9,offsetZ:8,width:7,depth:7,profession:`farmer`}],xm=class{seed;registry;seaLevel;minTerrainY;continentalness;erosion;weirdness;detail;river;lake;caveShape;caveDetail;caveMouth;ravine;lavaPocket;biomeSampler;stone;dirt;grass;sand;gravel;snow;water;lava;log;leaves;planks;cobblestone;torch;lamp;coalOre;ironOre;goldOre;diamondOre;bed;doorNorthLowerOpen;doorNorthUpperOpen;doorSouthLowerOpen;doorSouthUpperOpen;composter;lectern;stonecutter;farmland;wheat;bell;starterCaveEntranceSurfaceY=null;constructor(e){this.seed=e.seed,this.registry=e.registry,this.seaLevel=e.seaLevel??63,this.minTerrainY=e.minTerrainY??40,this.continentalness=dm(nm(this.seed,`continentalness`)),this.erosion=dm(nm(this.seed,`erosion`)),this.weirdness=dm(nm(this.seed,`weirdness`)),this.detail=dm(nm(this.seed,`surface-detail`)),this.river=dm(nm(this.seed,`river-network`)),this.lake=dm(nm(this.seed,`lake-basins`)),this.caveShape=dm(nm(this.seed,`cave-shape`)),this.caveDetail=dm(nm(this.seed,`cave-detail`)),this.caveMouth=dm(nm(this.seed,`cave-mouth`)),this.ravine=dm(nm(this.seed,`ravine`)),this.lavaPocket=dm(nm(this.seed,`lava-pocket`)),this.biomeSampler=new mm(this.seed),this.stone=this.registry.resolveState(`stone`),this.dirt=this.registry.resolveState(`dirt`),this.grass=this.registry.resolveState(`grass`),this.sand=this.registry.resolveState(`sand`),this.gravel=this.registry.resolveState(`gravel`),this.snow=this.registry.resolveState(`snow`),this.water=this.registry.resolveState(`water`,{level:0}),this.lava=this.registry.resolveState(`lava`,{level:0}),this.log=this.registry.resolveState(`log`),this.leaves=this.registry.resolveState(`leaves`,{distance:7,persistent:!0}),this.planks=this.registry.resolveState(`planks`),this.cobblestone=this.registry.resolveState(`cobblestone`),this.torch=this.registry.resolveState(`torch`),this.lamp=this.registry.resolveState(`lamp`),this.coalOre=this.registry.resolveState(`coal_ore`),this.ironOre=this.registry.resolveState(`iron_ore`),this.goldOre=this.registry.resolveState(`gold_ore`),this.diamondOre=this.registry.resolveState(`diamond_ore`),this.bed=this.registry.resolveState(`bed`),this.doorNorthLowerOpen=this.registry.resolveState(`door`,{facing:`north`,half:`lower`,open:!0}),this.doorNorthUpperOpen=this.registry.resolveState(`door`,{facing:`north`,half:`upper`,open:!0}),this.doorSouthLowerOpen=this.registry.resolveState(`door`,{facing:`south`,half:`lower`,open:!0}),this.doorSouthUpperOpen=this.registry.resolveState(`door`,{facing:`south`,half:`upper`,open:!0}),this.composter=this.registry.resolveState(`composter`),this.lectern=this.registry.resolveState(`lectern`),this.stonecutter=this.registry.resolveState(`stonecutter`),this.farmland=this.registry.resolveState(`farmland`),this.wheat=this.registry.resolveState(`wheat`,{age:7}),this.bell=this.registry.resolveState(`bell`)}generateChunk(e,t){for(let t=0;t<16;t+=1)for(let n=0;n<16;n+=1){let r=e.chunkX*16+n,i=e.chunkZ*16+t,a=this.sampleTerrain(r,i);this.fillColumn(e,n,t,r,i,a)}this.placeTrees(e),this.placeStructures(e),e.recomputeHeightmapsFromRegistry(this.registry),e.dirty=!1,e.blockDeltas.clear()}sampleSurfaceHeight(e,t){return this.sampleTerrain(e,t).height}sampleTerrain(e,t){let n=this.biomeSampler.sampleClimate(e,t),r=wm(n.continentalness,this.continentalness.noise2(e*.0022,t*.0022),.35),i=wm(n.erosion,this.erosion.noise2(e*.006,t*.006),.25),a=wm(n.weirdness,this.weirdness.noise2(e*.011,t*.011),.35),o=this.detail.noise2(e*.045,t*.045),s=this.river.noise2(e*.0065,t*.0065)+o*.12,c=this.lake.noise2(e*.0032,t*.0032),l=Sm(-.34,.15,r),u=(1-Sm(.018,.12,Math.abs(s)))*l,d=Sm(.68,.9,c)*l*Sm(-.2,.65,i),f=this.biomeSampler.blend({...n,continentalness:r,erosion:i,weirdness:a},u),p=Sm(-.35,.85,r),m=1-Sm(-.62,-.08,r),h=1-Sm(-.25,.8,i),g=Math.max(0,a)**2,_=1-m*.72,v=46+p*32-m*10,y=h*15*_,b=g*20*_,x=o*(2.2+p*1.8),S=u*11+d*7,C=Cm(Math.round(v+y+b+x+f.surfaceOffset-S),this.minTerrainY,128);return f.primary.id===`ocean`&&(C=Math.min(C,this.seaLevel-5)),u>.62&&(C=Math.min(C,this.seaLevel-2)),d>.74&&(C=Math.min(C,this.seaLevel-1)),{height:C,climate:n,biome:f,riverStrength:u,lakeStrength:d}}fillColumn(e,t,n,r,i,a){let o=a.height,s=o<=this.seaLevel+1||a.biome.primary.id===`beach`||a.riverStrength>.48,c=Math.max(-64,o-5),l=s?this.sand:a.biome.top===`snow`?this.snow:a.biome.top===`sand`?this.sand:this.grass,u=s||a.biome.filler===`sand`?this.sand:a.biome.filler===`stone`?this.stone:this.dirt;for(let s=-64;s<=o;s+=1){let d=this.stone;if(s>=o-3&&(d=u),s===o&&(d=l),s<this.seaLevel-5&&s>=o-1&&a.biome.primary.id===`ocean`&&(d=this.shouldPlaceGravelPatch(r,s,i)?this.gravel:this.sand),this.shouldCarveCave(r,s,i,o)){e.setGeneratedStateId(t,s,n,this.shouldFillCaveWithLava(r,s,i)?this.lava:0);continue}s<c&&this.shouldPlaceOre(r,s,i,`diamond`)?d=this.diamondOre:s<c&&this.shouldPlaceOre(r,s,i,`gold`)?d=this.goldOre:s<c&&this.shouldPlaceOre(r,s,i,`iron`)?d=this.ironOre:s<c&&this.shouldPlaceOre(r,s,i,`coal`)&&(d=this.coalOre),e.setGeneratedStateId(t,s,n,d)}for(let r=o+1;r<=this.seaLevel;r+=1)e.setGeneratedStateId(t,r,n,this.water);let d=Math.max(o,o<this.seaLevel?this.seaLevel:o);e.heightmaps.set(`WORLD_SURFACE`,t,n,d),e.heightmaps.set(`OCEAN_FLOOR`,t,n,o),e.heightmaps.set(`MOTION_BLOCKING`,t,n,d),e.heightmaps.set(`MOTION_BLOCKING_NO_LEAVES`,t,n,d)}placeTrees(e){for(let t=2;t<14;t+=1)for(let n=2;n<14;n+=1){let r=e.chunkX*16+n,i=e.chunkZ*16+t,a=this.sampleTerrain(r,i),o=a.height;if(o<=this.seaLevel+2||e.getStateId(n,o,t)!==this.grass&&e.getStateId(n,o,t)!==this.snow)continue;let s=new rm(nm(this.seed,`tree:${r},${i}`));s.nextFloat()>a.biome.treeDensity||this.placeTree(e,{x:n,y:o+1,z:t},4+s.nextInt(2))}}placeTree(e,t,n){for(let r=0;r<n;r+=1){let n=t.y+r;e.setGeneratedStateId(t.x,n,t.z,this.log),km(e,t.x,t.z,n,{includeNoLeaves:!0})}let r=t.y+n;for(let n=-2;n<=1;n+=1){let i=n===1?1:2;for(let a=-i;a<=i;a+=1)for(let o=-i;o<=i;o+=1){let s=t.x+o,c=t.z+a,l=r+n;s<0||s>=16||c<0||c>=16||Math.abs(o)===i&&Math.abs(a)===i&&n>-2||e.getStateId(s,l,c)===0&&(e.setGeneratedStateId(s,l,c,this.leaves),km(e,s,c,l,{includeNoLeaves:!1}))}}}shouldCarveCave(e,t,n,r){if(t<=-59||t>r)return!1;if(this.shouldCarveStarterCave(e,t,n))return!0;if(r<=this.seaLevel+2)return!1;if(this.shouldCarveRavine(e,t,n,r))return!0;let i=r-t;if(i<14)return!1;let a=Sm(14,34,i)*Sm(-54,-30,t);if(a<=0)return!1;let o=this.caveShape.noise3(e*.026,t*.038,n*.026),s=this.caveDetail.noise3(e*.074,t*.06,n*.074),c=this.caveMouth.noise3(e*.015,t*.018,n*.015),l=.038+a*.024,u=Math.abs(o+s*.22)<l,d=c>.86&&Math.abs(o)<.28,f=Math.abs(this.caveDetail.noise3(e*.045,t*.12,n*.045))<.018&&a>.7;return u||d||f}shouldPlaceOre(e,t,n,r){let i=this.detail.noise3(e*.085,t*.085,n*.085),a=this.weirdness.noise3(e*.12,t*.12,n*.12),o=Math.abs(this.caveDetail.noise3(e*.18,t*.18,n*.18));if(r===`coal`){let e=Sm(24,96,t)*(1-Sm(128,176,t));return t>0&&t<160&&i>.72-e*.07&&o<.6}if(r===`iron`){let e=1-Math.min(1,Math.abs(t-16)/70);return t>-48&&t<112&&i<-.76+e*.05&&o<.58}if(r===`gold`){let e=1-Sm(24,64,t);return t>-64&&t<48&&i>.79-e*.04&&a>.32&&o<.5}let s=1-Sm(-52,20,t);return t>-64&&t<20&&i<-.84+s*.05&&a<-.38&&o<.42}shouldPlaceGravelPatch(e,t,n){return this.detail.noise3(e*.08,t*.08,n*.08)>.42}shouldFillCaveWithLava(e,t,n){return t>-51?!1:this.lavaPocket.noise3(e*.035,t*.045,n*.035)>.58}shouldCarveRavine(e,t,n,r){let i=r-t;if(i<10||i>52)return!1;let a=this.ravine.noise2(e*.004,n*.004),o=this.ravine.noise2(e*.014+40,n*.014-40),s=Math.abs(t-(r-24-a*8)),c=.03+Sm(14,28,i)*.055;return Math.abs(o)<c&&s<12}placeStructures(e){this.placeDungeon(e),this.placeMineshaft(e),this.placeVillage(e)}placeDungeon(e){let t=new rm(nm(this.seed,`dungeon:${e.chunkX},${e.chunkZ}`));if(t.nextFloat()>.055)return;let n=4+t.nextInt(8),r=4+t.nextInt(8),i=e.heightmaps.get(`OCEAN_FLOOR`,n,r),a=Math.max(-52,i-18-t.nextInt(22));for(let t=r-3;t<=r+3;t+=1)for(let i=n-3;i<=n+3;i+=1)if(Tm(i,t))for(let o=a-1;o<=a+3;o+=1){let s=i===n-3||i===n+3||t===r-3||t===r+3||o===a-1||o===a+3;e.setGeneratedStateId(i,o,t,s?this.cobblestone:0)}e.setGeneratedStateId(n,a,r,this.lamp)}placeMineshaft(e){let t=new rm(nm(this.seed,`mineshaft:${e.chunkX},${e.chunkZ}`));if(t.nextFloat()>.13)return;let n=3+t.nextInt(10),r=Math.max(-50,Math.min(52,e.heightmaps.get(`OCEAN_FLOOR`,8,n)-24));for(let t=1;t<15;t+=1){for(let i=0;i<=2;i+=1)for(let a=-1;a<=1;a+=1)e.setGeneratedStateId(t,r+i,n+a,0);t%5==0&&(e.setGeneratedStateId(t,r,n-1,this.planks),e.setGeneratedStateId(t,r+1,n-1,this.planks),e.setGeneratedStateId(t,r,n+1,this.planks),e.setGeneratedStateId(t,r+1,n+1,this.planks),e.setGeneratedStateId(t,r+2,n,this.planks))}}placeVillage(e){for(let t of this.villageSitesForChunk(e.chunkX,e.chunkZ)){this.placeVillageRoads(e,t),this.placeVillageWell(e,t),this.placeVillageFarm(e,t,{offsetX:-4,offsetZ:-19,width:9,depth:7});for(let n of bm)this.placeVillageHouse(e,t,n)}}villageSitesForChunk(e,t){let n=[],r=Math.floor(e/vm),i=Math.floor(t/vm);for(let a=i-1;a<=i+1;a+=1)for(let i=r-1;i<=r+1;i+=1){let r=this.villageSiteForRegion(i,a);if(!r)continue;let o=Math.floor(r.centerX/16),s=Math.floor(r.centerZ/16);Math.abs(e-o)<=ym&&Math.abs(t-s)<=ym&&n.push(r)}return n}villageSiteForRegion(e,t){let n=e===0&&t===0,r=new rm(nm(this.seed,`village:${e},${t}`));if(!n&&r.nextFloat()>.42)return null;let i=n?2:e*vm+2+r.nextInt(vm-4),a=n?2:t*vm+2+r.nextInt(vm-4),o=i*16+8,s=a*16+8,c=this.sampleTerrain(o,s);if(!Om(c.biome.primary.id)||c.height<=this.seaLevel+2)return null;let l=bm.slice(0,3).map(e=>this.villageStandingPoint(o,s,e,`home`)),u=bm.filter(e=>!!e.profession).map(e=>({profession:e.profession,position:this.villageStandingPoint(o,s,e,`work`)}));return{id:`${e},${t}`,centerX:o,centerZ:s,centerY:c.height+1,biomeId:c.biome.primary.id,villagerPositions:[{x:o-4,y:c.height+1,z:s},{x:o+5,y:c.height+1,z:s-3},{x:o-2,y:c.height+1,z:s+5}],homePositions:l,workstations:u}}villageStandingPoint(e,t,n,r){let i=e+n.offsetX,a=t+n.offsetZ,o=i+n.width-1,s=a+n.depth-1,c=r===`home`?i+2:o-2,l=r===`home`?s-3:a+2;return{x:c,y:this.sampleTerrain(Math.floor((i+o)/2),Math.floor((a+s)/2)).height+1,z:l}}placeVillageRoads(e,t){let n=t.biomeId===`desert`?this.sand:this.gravel;for(let r=-20;r<=20;r+=1)for(let i=-1;i<=1;i+=1)this.placeRoadBlock(e,t.centerX+r,t.centerZ+i,n),this.placeRoadBlock(e,t.centerX+i,t.centerZ+r,n)}placeRoadBlock(e,t,n,r){if(!Em(e,t,n))return;let i=this.sampleTerrain(t,n);i.height<=this.seaLevel+1||(this.setGeneratedWorldBlock(e,t,i.height,n,r,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,t,i.height+1,n,0,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,t,i.height+2,n,0,{includeNoLeaves:!0}))}placeVillageWell(e,t){let n=t.centerY;for(let r=-2;r<=2;r+=1)for(let i=-2;i<=2;i+=1){let a=Math.abs(i)===2||Math.abs(r)===2;this.setGeneratedWorldBlock(e,t.centerX+i,n-1,t.centerZ+r,a?this.cobblestone:this.water,{includeNoLeaves:!0}),a&&(Math.abs(i)===2||Math.abs(r)===2)&&this.setGeneratedWorldBlock(e,t.centerX+i,n,t.centerZ+r,this.cobblestone,{includeNoLeaves:!0})}for(let[r,i]of[[-1,-1],[1,-1],[-1,1],[1,1]])this.setGeneratedWorldBlock(e,t.centerX+r,n+1,t.centerZ+i,this.log,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,t.centerX+r,n+2,t.centerZ+i,this.log,{includeNoLeaves:!0});for(let r=-2;r<=2;r+=1)for(let i=-2;i<=2;i+=1)this.setGeneratedWorldBlock(e,t.centerX+i,n+3,t.centerZ+r,this.cobblestone,{includeNoLeaves:!0});this.setGeneratedWorldBlock(e,t.centerX,n+2,t.centerZ,this.bell,{includeNoLeaves:!0,includeHeightmap:!1})}placeVillageFarm(e,t,n){let r=t.centerX+n.offsetX,i=t.centerZ+n.offsetZ,a=r+n.width-1,o=i+n.depth-1,s=Math.floor((r+a)/2),c=Math.floor((i+o)/2),l=this.sampleTerrain(s,c);if(l.height<=this.seaLevel+1)return;let u=l.height+1,d=c;for(let t=i-1;t<=o+1;t+=1)for(let n=r-1;n<=a+1;n+=1){let s=n<r||n>a||t<i||t>o,c=s?this.log:t===d?this.water:this.farmland;this.setGeneratedWorldBlock(e,n,u-1,t,c,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,n,u,t,0,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,n,u+1,t,0,{includeNoLeaves:!0}),!s&&t!==d&&(n+t)%5!=0&&this.setGeneratedWorldBlock(e,n,u,t,this.wheat,{includeNoLeaves:!1,includeHeightmap:!1})}}placeVillageHouse(e,t,n){let r=t.centerX+n.offsetX,i=t.centerZ+n.offsetZ,a=r+n.width-1,o=i+n.depth-1,s=Math.floor((r+a)/2),c=Math.floor((i+o)/2),l=this.sampleTerrain(s,c);if(l.height<=this.seaLevel+1)return;let u=l.height+1,d=t.biomeId===`desert`,f=d?this.sand:this.planks,p=d?this.sand:this.planks,m=d?this.sand:this.cobblestone,h=c<t.centerZ,g=s,_=h?i:o;for(let t=i-1;t<=o+1;t+=1)for(let n=r-1;n<=a+1;n+=1){if(!(n<r||n>a||t<i||t>o)){this.setGeneratedWorldBlock(e,n,u-1,t,f,{includeNoLeaves:!0});for(let s=u;s<=u+3;s+=1){let c=n===r||n===a||t===i||t===o,l=n===g&&t===_&&s<=u+1,d=c&&!l&&s===u+2&&(n+t)%3==0;this.setGeneratedWorldBlock(e,n,s,t,c&&!l&&!d?p:0,{includeNoLeaves:!0})}}this.setGeneratedWorldBlock(e,n,u+4,t,m,{includeNoLeaves:!0})}this.setGeneratedWorldBlock(e,g,u,_,0,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,g,u+1,_,0,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,g,u,_,h?this.doorNorthLowerOpen:this.doorSouthLowerOpen,{includeNoLeaves:!0,includeHeightmap:!1}),this.setGeneratedWorldBlock(e,g,u+1,_,h?this.doorNorthUpperOpen:this.doorSouthUpperOpen,{includeNoLeaves:!0,includeHeightmap:!1}),this.setGeneratedWorldBlock(e,g,u+2,_,this.torch,{includeNoLeaves:!0}),this.placeVillageInterior(e,n.profession,r,a,i,o,u)}placeVillageInterior(e,t,n,r,i,a,o){let s=n+1,c=a-2,l=r-1,u=i+2;if(this.setGeneratedWorldBlock(e,s,o,c,this.bed,{includeNoLeaves:!0}),this.setGeneratedWorldBlock(e,s+1,o,c,this.bed,{includeNoLeaves:!0}),!t)return;let d=t===`farmer`?this.composter:t===`librarian`?this.lectern:this.stonecutter;this.setGeneratedWorldBlock(e,l,o,u,d,{includeNoLeaves:!0})}setGeneratedWorldBlock(e,t,n,r,i,a){if(!Em(e,t,r))return;let o=t-e.chunkX*16,s=r-e.chunkZ*16;e.setGeneratedStateId(o,n,s,i),i!==0&&a.includeHeightmap!==!1&&km(e,o,s,n,a)}shouldCarveStarterCave(e,t,n){let r=e-gm.x;if(r<-1||r>_m)return!1;let i=this.starterCaveEntranceSurfaceY??=this.sampleSurfaceHeight(gm.x,gm.z),a=Math.max(0,Math.min(1,r/_m)),o=gm.z+Math.sin(a*Math.PI*1.05)*2.1,s=i-1.1-a*12,c=a<.12?1.55:1.18,l=a<.12?2.25:1.48,u=Math.abs(n-o)/c,d=Math.abs(t-s)/l;return u*u+d*d<1}};function Sm(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function Cm(e,t,n){return Math.max(t,Math.min(n,e))}function wm(e,t,n){return e*(1-n)+t*n}function Tm(e,t){return e>=0&&e<16&&t>=0&&t<16}function Em(e,t,n){return Dm(t,e.chunkX)>=0&&Dm(t,e.chunkX)<16&&Dm(n,e.chunkZ)>=0&&Dm(n,e.chunkZ)<16}function Dm(e,t){return e-t*16}function Om(e){return e===`plains`||e===`forest`||e===`desert`}function km(e,t,n,r,i){e.heightmaps.set(`WORLD_SURFACE`,t,n,Math.max(e.heightmaps.get(`WORLD_SURFACE`,t,n),r)),e.heightmaps.set(`MOTION_BLOCKING`,t,n,Math.max(e.heightmaps.get(`MOTION_BLOCKING`,t,n),r)),i.includeNoLeaves&&e.heightmaps.set(`MOTION_BLOCKING_NO_LEAVES`,t,n,Math.max(e.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,t,n),r))}function Am(e){return e.side1&&e.side2?0:3-Number(e.side1)-Number(e.side2)-Number(e.corner)}function jm(e){if(!Number.isInteger(e)||e<0||e>3)throw RangeError(`ao must be 0..3: ${e}`);return(e+1)/4}var Mm=[`solid`,`cutout`,`translucent`,`fluid`],Nm=.1875,Pm=[{direction:`east`,normal:{x:1,y:0,z:0},u:{x:0,y:0,z:1},v:{x:0,y:1,z:0},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:1,y:0,z:0},{x:1,y:0,z:1},{x:1,y:1,z:1},{x:1,y:1,z:0}]},{direction:`west`,normal:{x:-1,y:0,z:0},u:{x:0,y:0,z:-1},v:{x:0,y:1,z:0},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:0,y:0,z:1},{x:0,y:0,z:0},{x:0,y:1,z:0},{x:0,y:1,z:1}]},{direction:`up`,normal:{x:0,y:1,z:0},u:{x:1,y:0,z:0},v:{x:0,y:0,z:1},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:0,y:1,z:0},{x:1,y:1,z:0},{x:1,y:1,z:1},{x:0,y:1,z:1}]},{direction:`down`,normal:{x:0,y:-1,z:0},u:{x:1,y:0,z:0},v:{x:0,y:0,z:-1},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:0,y:0,z:1},{x:1,y:0,z:1},{x:1,y:0,z:0},{x:0,y:0,z:0}]},{direction:`south`,normal:{x:0,y:0,z:1},u:{x:-1,y:0,z:0},v:{x:0,y:1,z:0},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:1,y:0,z:1},{x:0,y:0,z:1},{x:0,y:1,z:1},{x:1,y:1,z:1}]},{direction:`north`,normal:{x:0,y:0,z:-1},u:{x:1,y:0,z:0},v:{x:0,y:1,z:0},corners:[[-1,-1],[1,-1],[1,1],[-1,1]],vertices:[{x:0,y:0,z:0},{x:1,y:0,z:0},{x:1,y:1,z:0},{x:0,y:1,z:0}]}],Fm=class{registry;constructor(e){this.registry=e}buildChunkMesh(e,t){let n=Bm();for(let r=0;r<16;r+=1)for(let i=0;i<16;i+=1){let a=this.columnMeshRange(e,i,r,t);if(a)for(let o=a.minY;o<=a.maxY;o+=1){let a=e.getStateId(i,o,r),s=this.registry.getDefinitionForState(a);if(s.renderLayer===`none`)continue;let c=n[s.renderLayer],l=this.registry.getState(a);if(l.typeId===`door`){Gm(c,e,this,i,o,r,a,l,t);continue}if(l.typeId===`bell`){Km(c,e,this,i,o,r,a,t);continue}for(let n of Pm)this.shouldEmitFace(e,i,o,r,s,n.normal,t)&&Wm(c,e,this,i,o,r,a,n,t)}}return n}shouldEmitFace(e,t,n,r,i,a,o){let s=this.sampleDefinition(e,t+a.x,n+a.y,r+a.z,o);return!s||s.renderLayer===`none`?!0:$m(i,s)||i.renderLayer===`fluid`&&s.renderLayer===`fluid`?!1:!Qm(s)}occludesAo(e,t,n,r,i){let a=this.sampleDefinition(e,t,n,r,i);return a?Qm(a):!1}sampleDefinition(e,t,n,r,i){if(!eh(t,n,r)){if(!i||n<-64||n>319)return null;let a=i.getStateIdIfLoaded(e.chunkX*16+t,n,e.chunkZ*16+r);return a===null?null:this.registry.getDefinitionForState(a)}return this.registry.getDefinitionForState(e.getStateId(t,n,r))}columnMeshRange(e,t,n,r){let i=319,a=-64,o=!1,s=this.registry,c=(e,t=2)=>{e<-64||e>319||(i=Math.min(i,Math.max(-64,e-t)),a=Math.max(a,Math.min(319,e+t)),o=!0)},l=(t,n)=>{let i=Lm(e,t,n,r);i&&(c(i.worldSurface),c(i.oceanFloor),i.motionBlockingNoLeaves>i.oceanFloor+3?u(i.oceanFloor-2,i.motionBlockingNoLeaves+2):c(i.motionBlockingNoLeaves))};if(l(t,n),l(t-1,n),l(t+1,n),l(t,n-1),l(t,n+1),d(t,n),t===0||t===15||n===0||n===15){let s=e.heightmaps.get(`WORLD_SURFACE`,t,n);s>=-64&&zm(e,t,n,r)&&(i=-64,a=Math.max(a,Math.min(319,s+2)),o=!0)}for(let r of e.blockDeltas.values())Math.abs(r.localX-t)<=1&&Math.abs(r.localZ-n)<=1&&c(r.worldY,3);return o?{minY:i,maxY:a}:null;function u(e,t){i=Math.min(i,Math.max(-64,e)),a=Math.max(a,Math.min(319,t)),o=!0}function d(t,n){let i=Lm(e,t,n,r);if(!i)return;let a=Math.min(319,i.motionBlockingNoLeaves-1);for(let i=-64;i<=a;i+=1){let a=e.getStateId(t,i,n);s.getDefinitionForState(a).renderLayer!==`none`&&Im(e,t,i,n,s,r)&&c(i,1)}}}};function Im(e,t,n,r,i,a){for(let o of Pm){let s=t+o.normal.x,c=n+o.normal.y,l=r+o.normal.z;if(!eh(s,c,l)){if(!a||c<-64||c>319)continue;let t=a.getStateIdIfLoaded(e.chunkX*16+s,c,e.chunkZ*16+l);if(t===null)continue;let n=i.getDefinitionForState(t);if(n.renderLayer===`none`||n.renderLayer===`fluid`)return!0;continue}let u=e.getStateId(s,c,l),d=i.getDefinitionForState(u);if(d.renderLayer===`none`||d.renderLayer===`fluid`)return!0}return!1}function Lm(e,t,n,r){if(t>=0&&t<16&&n>=0&&n<16)return Rm(e,t,n);if(!r)return null;let i=e.chunkX*16+t,a=e.chunkZ*16+n,o=r.getChunk(G(i),G(a));return o?Rm(o,Nl(i),Nl(a)):null}function Rm(e,t,n){let r=e.heightmaps.get(`WORLD_SURFACE`,t,n),i=e.heightmaps.get(`OCEAN_FLOOR`,t,n),a=e.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,t,n);return r<-64&&i<-64&&a<-64?null:{worldSurface:Math.max(-64,r),oceanFloor:Math.max(-64,i),motionBlockingNoLeaves:Math.max(-64,a)}}function zm(e,t,n,r){return r?[t===0?{x:-1,z:n}:null,t===15?{x:16,z:n}:null,n===0?{x:t,z:-1}:null,n===15?{x:t,z:16}:null].some(t=>{if(!t)return!1;let n=e.chunkX*16+t.x,i=e.chunkZ*16+t.z;return!r.getChunk(G(n),G(i))}):!0}function Bm(){return Object.fromEntries(Mm.map(e=>[e,Vm()]))}function Vm(){return{positions:[],normals:[],indices:[],stateIds:[],skyLight:[],blockLight:[],ao:[],faceDirections:[]}}function Hm(e){return e.indices.length/6}function Um(e){return e.renderSections&&e.renderSections.length>0?e.renderSections.reduce((e,t)=>e+Mm.reduce((e,n)=>e+Hm(t.layers[n]),0),0):Mm.reduce((t,n)=>t+Hm(e[n]),0)}function Wm(e,t,n,r,i,a,o,s,c){let l=e.positions.length/3,u=Zm(t,r,i,a,s.normal);for(let l=0;l<s.vertices.length;l+=1){let d=s.vertices[l],[f,p]=s.corners[l],m=Xm(t,n,r,i,a,s,f,p,c);e.positions.push(r+d.x,i+d.y,a+d.z),e.normals.push(s.normal.x,s.normal.y,s.normal.z),e.stateIds.push(o),e.skyLight.push(u.skyLight),e.blockLight.push(u.blockLight),e.ao.push(m)}e.indices.push(l,l+2,l+1,l,l+3,l+2),e.faceDirections.push(s.direction)}function Gm(e,t,n,r,i,a,o,s,c){let l=Ym(s);for(let s of Pm)qm(e,t,n,r,i,a,o,s,l,c)}function Km(e,t,n,r,i,a,o,s){for(let c of[{minX:.36,minY:.78,minZ:.34,maxX:.64,maxY:1,maxZ:.66},{minX:.28,minY:.58,minZ:.26,maxX:.72,maxY:.84,maxZ:.74},{minX:.2,minY:.28,minZ:.18,maxX:.8,maxY:.64,maxZ:.82},{minX:.15,minY:.18,minZ:.13,maxX:.85,maxY:.34,maxZ:.87},{minX:.44,minY:.08,minZ:.42,maxX:.56,maxY:.22,maxZ:.58}])for(let l of Pm)qm(e,t,n,r,i,a,o,l,c,s)}function qm(e,t,n,r,i,a,o,s,c,l){let u=e.positions.length/3,d=Zm(t,r,i,a,s.normal),f=Jm(c,s.direction);for(let c=0;c<f.length;c+=1){let u=f[c],[p,m]=s.corners[c],h=Xm(t,n,r,i,a,s,p,m,l);e.positions.push(r+u.x,i+u.y,a+u.z),e.normals.push(s.normal.x,s.normal.y,s.normal.z),e.stateIds.push(o),e.skyLight.push(d.skyLight),e.blockLight.push(d.blockLight),e.ao.push(h)}e.indices.push(u,u+2,u+1,u,u+3,u+2),e.faceDirections.push(s.direction)}function Jm(e,t){switch(t){case`east`:return[{x:e.maxX,y:e.minY,z:e.minZ},{x:e.maxX,y:e.minY,z:e.maxZ},{x:e.maxX,y:e.maxY,z:e.maxZ},{x:e.maxX,y:e.maxY,z:e.minZ}];case`west`:return[{x:e.minX,y:e.minY,z:e.maxZ},{x:e.minX,y:e.minY,z:e.minZ},{x:e.minX,y:e.maxY,z:e.minZ},{x:e.minX,y:e.maxY,z:e.maxZ}];case`up`:return[{x:e.minX,y:e.maxY,z:e.minZ},{x:e.maxX,y:e.maxY,z:e.minZ},{x:e.maxX,y:e.maxY,z:e.maxZ},{x:e.minX,y:e.maxY,z:e.maxZ}];case`down`:return[{x:e.minX,y:e.minY,z:e.maxZ},{x:e.maxX,y:e.minY,z:e.maxZ},{x:e.maxX,y:e.minY,z:e.minZ},{x:e.minX,y:e.minY,z:e.minZ}];case`south`:return[{x:e.maxX,y:e.minY,z:e.maxZ},{x:e.minX,y:e.minY,z:e.maxZ},{x:e.minX,y:e.maxY,z:e.maxZ},{x:e.maxX,y:e.maxY,z:e.maxZ}];case`north`:return[{x:e.minX,y:e.minY,z:e.minZ},{x:e.maxX,y:e.minY,z:e.minZ},{x:e.maxX,y:e.maxY,z:e.minZ},{x:e.minX,y:e.maxY,z:e.minZ}]}}function Ym(e){let t=e.properties.facing;if(e.properties.open===!0)switch(t){case`south`:return{minX:1-Nm,minY:0,minZ:0,maxX:1,maxY:1,maxZ:1};case`east`:return{minX:0,minY:0,minZ:0,maxX:1,maxY:1,maxZ:Nm};case`west`:return{minX:0,minY:0,minZ:1-Nm,maxX:1,maxY:1,maxZ:1};default:return{minX:0,minY:0,minZ:0,maxX:Nm,maxY:1,maxZ:1}}switch(t){case`south`:return{minX:0,minY:0,minZ:1-Nm,maxX:1,maxY:1,maxZ:1};case`east`:return{minX:1-Nm,minY:0,minZ:0,maxX:1,maxY:1,maxZ:1};case`west`:return{minX:0,minY:0,minZ:0,maxX:Nm,maxY:1,maxZ:1};default:return{minX:0,minY:0,minZ:0,maxX:1,maxY:1,maxZ:Nm}}}function Xm(e,t,n,r,i,a,o,s,c){let l=th({x:n,y:r,z:i},a.normal),u=th(l,nh(a.u,o)),d=th(l,nh(a.v,s)),f=th(th(l,nh(a.u,o)),nh(a.v,s));return Am({side1:t.occludesAo(e,u.x,u.y,u.z,c),side2:t.occludesAo(e,d.x,d.y,d.z,c),corner:t.occludesAo(e,f.x,f.y,f.z,c)})}function Zm(e,t,n,r,i){let a=t+i.x,o=n+i.y,s=r+i.z;return eh(a,o,s)?{skyLight:e.getSkyLight(a,o,s),blockLight:e.getBlockLight(a,o,s)}:{skyLight:e.getSkyLight(t,n,r),blockLight:e.getBlockLight(t,n,r)}}function Qm(e){return e.renderLayer===`solid`&&e.opacity>=15}function $m(e,t){return e.renderLayer===t.renderLayer&&e.renderLayer===`cutout`?e.opacity>0&&t.opacity>0:!1}function eh(e,t,n){return e>=0&&e<16&&n>=0&&n<16&&t>=-64&&t<=319}function th(e,t){return{x:e.x+t.x,y:e.y+t.y,z:e.z+t.z}}function nh(e,t){return{x:e.x*t,y:e.y*t,z:e.z*t}}function rh(e,t,n){let r=t/2;return{minX:e.x-r,minY:e.y,minZ:e.z-r,maxX:e.x+r,maxY:e.y+n,maxZ:e.z+r}}function ih(e,t,n,r){return{minX:e.minX+t,minY:e.minY+n,minZ:e.minZ+r,maxX:e.maxX+t,maxY:e.maxY+n,maxZ:e.maxZ+r}}function ah(e,t,n,r){return e<r.maxX&&e+1>r.minX&&t<r.maxY&&t+1>r.minY&&n<r.maxZ&&n+1>r.minZ}var oh=.6,sh=1.8,ch=1.62,lh=1.01,uh=24,dh=8.4,fh=4.3,ph=5.6,mh=-90,hh=2.05,gh=2.7,_h=2.8,vh=13,yh=3.2,bh=.58,xh=-3.9,Sh=1e-4,Ch=class{state;constructor(e){this.state={position:{...e},velocity:{x:0,y:0,z:0},onGround:!1,inWater:!1,eyesInWater:!1}}eyePosition(){return{x:this.state.position.x,y:this.state.position.y+ch,z:this.state.position.z}}step(e,t,n){let r=kh(e,rh(this.state.position,oh,sh)).length>0;this.state.inWater=r,this.state.eyesInWater=Ah(e,this.eyePosition());let i=r?t.sprint?gh:hh:t.sprint?ph:fh,a=wh(t.forward,t.strafe,t.yaw,i);this.state.velocity.x=a.x,this.state.velocity.z=a.z,r?(this.state.onGround=!1,this.state.velocity.y*=bh**(n*20),t.jump?this.state.velocity.y=Math.min(yh,this.state.velocity.y+vh*n):this.state.velocity.y-=_h*n,this.state.velocity.y=Math.max(xh,this.state.velocity.y)):t.jump&&this.state.onGround&&(this.state.velocity.y=dh,this.state.onGround=!1),r||(this.state.velocity.y=Math.max(mh,this.state.velocity.y-uh*n));let o=rh(this.state.position,oh,sh),s=this.state.velocity.x*n,c=Eh(e,o,`x`,s,this.state.onGround);this.state.position.x+=c.delta,this.state.position.y+=c.stepUp,this.state.velocity.x=c.collided?0:this.state.velocity.x,o=ih(o,c.delta,c.stepUp,0);let l=this.state.velocity.y*n,u=Th(e,o,`y`,l);this.state.position.y+=u.delta,this.state.onGround=u.collided&&l<0,this.state.velocity.y=u.collided?0:this.state.velocity.y,o=ih(o,0,u.delta,0);let d=this.state.velocity.z*n,f=Eh(e,o,`z`,d,this.state.onGround);this.state.position.z+=f.delta,this.state.position.y+=f.stepUp,this.state.velocity.z=f.collided?0:this.state.velocity.z;let p=rh(this.state.position,oh,sh);this.state.inWater=kh(e,p).length>0,this.state.eyesInWater=Ah(e,this.eyePosition())}};function wh(e,t,n,r){let i=Math.hypot(e,t);if(i===0)return{x:0,z:0};let a=e/i,o=t/i,s=Math.sin(n),c=Math.cos(n);return{x:(o*c-a*s)*r,z:(-o*s-a*c)*r}}function Th(e,t,n,r){if(r===0)return{delta:r,collided:!1};let i=r,a=Dh(t,ih(t,n===`x`?i:0,n===`y`?i:0,n===`z`?i:0));for(let o of Oh(e,a))i=n===`x`?r>0?Math.min(i,o.x-t.maxX-Sh):Math.max(i,o.x+1-t.minX+Sh):n===`y`?r>0?Math.min(i,o.y-t.maxY-Sh):Math.max(i,o.y+1-t.minY+Sh):r>0?Math.min(i,o.z-t.maxZ-Sh):Math.max(i,o.z+1-t.minZ+Sh);return{delta:i,collided:Math.abs(i-r)>Sh}}function Eh(e,t,n,r,i){let a=Th(e,t,n,r);if(!a.collided||!i||r===0)return{...a,stepUp:0};let o=ih(t,0,lh,0);if(Oh(e,o).length>0)return{...a,stepUp:0};let s=Th(e,o,n,r);return s.collided?{...a,stepUp:0}:{delta:s.delta,stepUp:lh,collided:!1}}function Dh(e,t){return{minX:Math.min(e.minX,t.minX),minY:Math.min(e.minY,t.minY),minZ:Math.min(e.minZ,t.minZ),maxX:Math.max(e.maxX,t.maxX),maxY:Math.max(e.maxY,t.maxY),maxZ:Math.max(e.maxZ,t.maxZ)}}function Oh(e,t){let n=[],r=Math.floor(t.minX),i=Math.floor(t.maxX-Sh),a=Math.floor(t.minY),o=Math.floor(t.maxY-Sh),s=Math.floor(t.minZ),c=Math.floor(t.maxZ-Sh);for(let l=a;l<=o;l+=1)for(let a=s;a<=c;a+=1)for(let o=r;o<=i;o+=1)e.isSolidBlockLoaded(o,l,a)&&ah(o,l,a,t)&&n.push({x:o,y:l,z:a});return n}function kh(e,t){if(!e.isFluidBlockLoaded)return[];let n=[],r=Math.floor(t.minX),i=Math.floor(t.maxX-Sh),a=Math.floor(t.minY),o=Math.floor(t.maxY-Sh),s=Math.floor(t.minZ),c=Math.floor(t.maxZ-Sh);for(let l=a;l<=o;l+=1)for(let a=s;a<=c;a+=1)for(let o=r;o<=i;o+=1)e.isFluidBlockLoaded(o,l,a)&&ah(o,l,a,t)&&n.push({x:o,y:l,z:a});return n}function Ah(e,t){return e.isFluidBlockLoaded?.(Math.floor(t.x),Math.floor(t.y),Math.floor(t.z))??!1}function jh(e){switch(e){case`fall`:return`高所からの落下で力尽きました`;case`zombie`:return`ゾンビに倒されました`;case`skeleton`:return`スケルトンの矢に射抜かれました`;case`drowning`:return`溺れて力尽きました`;case`guard`:return`村の守護者に倒されました`;case`generic`:return`力尽きました`}}var Mh=class{slots;selectedIndex;constructor(e,t=0){this.slots=e.map(Ph),this.selectedIndex=t}select(e){if(!Number.isInteger(e)||e<0||e>=this.slots.length)throw RangeError(`invalid hotbar slot: ${e}`);this.selectedIndex=e}selectedSlot(){return this.slots[this.selectedIndex]}removeOneSelected(){let e=this.selectedSlot();if(e.stateId===null||e.count<=0||e.tool||e.armor)return null;let t=e.stateId;return--e.count,e.count<=0&&(e.stateId=null,e.label=`empty`,e.count=0,delete e.food,delete e.item,delete e.tool,delete e.armor),t}consumeOneSelected(){let e=this.selectedSlot();if(e.count<=0||e.tool||e.armor||e.stateId===null&&!e.food)return null;let t=Ph(e);return--e.count,e.count<=0&&(e.stateId=null,e.label=`empty`,e.count=0,delete e.food,delete e.item,delete e.tool,delete e.armor),t}takeSelectedArmorStack(){let e=this.selectedSlot();if(!e.armor||e.count<=0)return null;let t=Ph(e);return Fh(e),t}damageSelectedTool(e=1){return this.damageToolAt(this.selectedIndex,e)}damageToolAt(e,t=1){let n=this.slots[e];return!n?.tool||t<=0||(n.tool.durability=Math.max(0,n.tool.durability-t),n.tool.durability>0)?!1:(n.label=`empty`,n.stateId=null,n.count=0,n.maxStackSize=64,delete n.food,delete n.item,delete n.tool,delete n.armor,!0)}countItem(e){return this.slots.reduce((t,n)=>n.label!==e||n.tool||n.armor||n.count<=0?t:t+n.count,0)}hasItems(e){return e.every(e=>this.countItem(e.label)>=e.count)}removeItems(e){if(!this.hasItems(e))return!1;for(let t of e){let e=t.count;for(let n of this.slots){if(n.label!==t.label||n.tool||n.armor||e<=0)continue;let r=Math.min(e,n.count);n.count-=r,e-=r,n.count<=0&&Fh(n)}}return!0}addToolStack(e){if(!e.tool||e.count<=0)return!1;for(let t of this.slots){if(!Nh(t))continue;let n=Ph(e);return t.label=n.label,t.stateId=null,t.count=1,t.maxStackSize=1,delete t.food,delete t.item,delete t.armor,t.tool=n.tool,!0}return!1}addArmorStack(e){if(!e.armor||e.count<=0)return!1;for(let t of this.slots){if(!Nh(t))continue;let n=Ph(e);return t.label=n.label,t.stateId=null,t.count=1,t.maxStackSize=1,delete t.food,delete t.item,delete t.tool,t.armor=n.armor,!0}return!1}addItemStack(e,t=1,n=64){let r=t;for(let t of this.slots){if(t.item&&t.label===e&&t.count<t.maxStackSize){let e=Math.min(r,t.maxStackSize-t.count);t.count+=e,r-=e}if(r===0)return!0}for(let t of this.slots){if(Nh(t)){let i=Math.min(r,n);t.stateId=null,t.label=e,t.count=i,t.maxStackSize=n,delete t.food,delete t.tool,delete t.armor,t.item={id:e,kind:`material`},r-=i}if(r===0)return!0}return!1}addStack(e,t,n=1,r=64){let i=n;for(let t of this.slots){if(t.stateId===e&&t.count<t.maxStackSize){let e=Math.min(i,t.maxStackSize-t.count);t.count+=e,i-=e}if(i===0)return!0}for(let n of this.slots){if(Nh(n)){let a=Math.min(i,r);n.stateId=e,n.label=t,n.count=a,n.maxStackSize=r,delete n.food,delete n.item,delete n.tool,delete n.armor,i-=a}if(i===0)return!0}return!1}addFoodStack(e,t,n=1,r=64){let i=n;for(let t of this.slots){if(t.food&&t.label===e&&t.count<t.maxStackSize){let e=Math.min(i,t.maxStackSize-t.count);t.count+=e,i-=e}if(i===0)return!0}for(let n of this.slots){if(Nh(n)){let a=Math.min(i,r);n.stateId=null,n.label=e,n.count=a,n.maxStackSize=r,delete n.item,delete n.tool,delete n.armor,n.food={...t},i-=a}if(i===0)return!0}return!1}};function Nh(e){return e.stateId===null&&!e.food&&!e.item&&!e.tool&&!e.armor&&e.count<=0}function Ph(e){return{...e,food:e.food?{...e.food}:void 0,item:e.item?{...e.item}:void 0,tool:e.tool?{...e.tool}:void 0,armor:e.armor?{...e.armor}:void 0}}function Fh(e){e.label=`empty`,e.stateId=null,e.count=0,e.maxStackSize=64,delete e.food,delete e.item,delete e.tool,delete e.armor}var Ih=class{state;regenTimerSeconds;starvationTimerSeconds;drowningTimerSeconds;constructor(e={}){this.state={health:e.health??20,foodLevel:e.foodLevel??20,saturation:e.saturation??5,exhaustion:e.exhaustion??0,airTicks:e.airTicks??300},this.regenTimerSeconds=0,this.starvationTimerSeconds=0,this.drowningTimerSeconds=0}tick(e,t={}){let n={drowningDamage:0};return this.isDead()?n:(this.consumeExhaustion(),n.drowningDamage=this.tickAir(e,t.eyesInWater===!0),this.state.foodLevel>=18&&this.state.health<20?(this.regenTimerSeconds+=e,this.regenTimerSeconds>=4&&(this.heal(1),this.addExhaustion(6),this.regenTimerSeconds=0)):this.regenTimerSeconds=0,this.state.foodLevel<=0&&this.state.health>1?(this.starvationTimerSeconds+=e,this.starvationTimerSeconds>=4&&(this.applyDamage(1),this.starvationTimerSeconds=0)):this.starvationTimerSeconds=0,n)}addExhaustion(e){this.state.exhaustion=Math.max(0,this.state.exhaustion+e),this.consumeExhaustion()}applyDamage(e){this.state.health=Lh(this.state.health-Math.max(0,e),0,20)}heal(e){this.state.health=Lh(this.state.health+Math.max(0,e),0,20)}eat(e,t){let n=Math.max(0,e);this.state.foodLevel=Lh(this.state.foodLevel+n,0,20),this.state.saturation=Lh(this.state.saturation+n*Math.max(0,t)*2,0,this.state.foodLevel)}canEat(){return this.state.foodLevel<20&&!this.isDead()}isDead(){return this.state.health<=0}reset(e={}){this.state={health:e.health??20,foodLevel:e.foodLevel??20,saturation:e.saturation??5,exhaustion:e.exhaustion??0,airTicks:e.airTicks??300},this.regenTimerSeconds=0,this.starvationTimerSeconds=0,this.drowningTimerSeconds=0}applyFallDamage(e){let t=Math.max(0,Math.floor(e-3));return t>0&&this.applyDamage(t),t}consumeExhaustion(){for(;this.state.exhaustion>=4;)this.state.exhaustion-=4,this.state.saturation>0?this.state.saturation=Math.max(0,this.state.saturation-1):this.state.foodLevel=Math.max(0,this.state.foodLevel-1)}tickAir(e,t){if(!t)return this.state.airTicks=Lh(this.state.airTicks+e*20*4,0,300),this.drowningTimerSeconds=0,0;let n=this.state.airTicks,r=e*20;if(this.state.airTicks=Math.max(0,n-r),this.state.airTicks>0)return this.drowningTimerSeconds=0,0;let i=Math.max(0,(r-n)/20);if(this.drowningTimerSeconds+=i,this.drowningTimerSeconds<1)return 0;let a=Math.floor(this.drowningTimerSeconds);this.drowningTimerSeconds-=a;let o=a*2;return this.applyDamage(o),o}};function Lh(e,t,n){return Math.max(t,Math.min(n,e))}var Rh=class{chunks;constructor(e=[]){this.chunks=new Map;for(let t of e)this.set(t)}get size(){return this.chunks.size}entries(){return Array.from(this.chunks.values()).map(e=>Vh(e))}replace(e){this.chunks.clear();for(let t of e)this.set(t)}get(e,t){return Vh(this.chunks.get(zl(e,t))??null)}set(e){if(e.blockDeltas.length===0){this.chunks.delete(zl(e.chunkX,e.chunkZ));return}this.chunks.set(zl(e.chunkX,e.chunkZ),Vh(e))}capture(e){this.set(zh(e))}applyToChunk(e,t){let n=this.chunks.get(zl(e.chunkX,e.chunkZ));n&&Bh(e,n.blockDeltas,t)}};function zh(e){return{chunkX:e.chunkX,chunkZ:e.chunkZ,blockDeltas:Array.from(e.blockDeltas.values()).map(e=>({...e}))}}function Bh(e,t,n){for(let n of t)e.setStateId(n.localX,n.worldY,n.localZ,n.stateId);t.length>0&&e.recomputeHeightmapsFromRegistry(n)}function Vh(e){return e?{chunkX:e.chunkX,chunkZ:e.chunkZ,blockDeltas:e.blockDeltas.map(e=>({...e}))}:null}function Hh(e,t=Array.from(e.blockDeltas.values())){return{chunkX:e.chunkX,chunkZ:e.chunkZ,status:e.status,blockDeltas:t}}function Uh(e){return e.map(e=>({...e,food:e.food?{...e.food}:void 0,item:e.item?{...e.item}:void 0,tool:e.tool?{...e.tool}:void 0,armor:e.armor?{...e.armor}:void 0}))}function Wh(e){return!rg(e)||e.version!==0||typeof e.seed!=`string`||typeof e.dimensionId!=`string`||!ig(e.time)||!Array.isArray(e.chunks)||!e.chunks.every(Gh)||`containers`in e&&e.containers!==void 0&&!qh(e.containers)?!1:Yh(e.player)}function Gh(e){return rg(e)?Number.isInteger(e.chunkX)&&Number.isInteger(e.chunkZ)&&typeof e.status==`string`&&Array.isArray(e.blockDeltas)&&e.blockDeltas.every(Kh):!1}function Kh(e){return rg(e)?Number.isInteger(e.localX)&&Number.isInteger(e.worldY)&&Number.isInteger(e.localZ)&&Number.isInteger(e.stateId):!1}function qh(e){return Array.isArray(e)&&e.every(Jh)}function Jh(e){return rg(e)?Number.isInteger(e.x)&&Number.isInteger(e.y)&&Number.isInteger(e.z)&&Array.isArray(e.slots)&&e.slots.every(Xh):!1}function Yh(e){return rg(e)?ng(e.position)&&ng(e.velocity)&&(!(`respawnPoint`in e)||e.respawnPoint===void 0||ng(e.respawnPoint))&&ig(e.health)&&ig(e.foodLevel)&&ig(e.saturation)&&ig(e.exhaustion)&&ig(e.airTicks)&&Number.isInteger(e.selectedHotbarSlot)&&Array.isArray(e.hotbar)&&e.hotbar.every(Xh)&&(!(`equippedArmor`in e)||e.equippedArmor===void 0||eg(e.equippedArmor)):!1}function Xh(e){return!rg(e)||typeof e.label!=`string`||!(e.stateId===null||Number.isInteger(e.stateId))||!ig(e.count)||!ig(e.maxStackSize)||`food`in e&&e.food!==void 0&&!Zh(e.food)||`item`in e&&e.item!==void 0&&!Qh(e.item)||`tool`in e&&e.tool!==void 0&&!$h(e.tool)?!1:!(`armor`in e&&e.armor!==void 0&&!tg(e.armor))}function Zh(e){return rg(e)&&ig(e.nutrition)&&ig(e.saturationModifier)}function Qh(e){return rg(e)&&typeof e.id==`string`&&e.kind===`material`}function $h(e){if(!rg(e))return!1;let t=e.kind===`sword`||e.kind===`pickaxe`||e.kind===`axe`||e.kind===`shovel`||e.kind===`hoe`,n=e.level===`wood`||e.level===`stone`||e.level===`iron`;return t&&n&&ig(e.attackDamage)&&ig(e.miningSpeed)&&ig(e.durability)&&ig(e.maxDurability)}function eg(e){return rg(e)?[`helmet`,`chestplate`,`leggings`,`boots`].every(t=>{let n=e[t];return n==null||tg(n)}):!1}function tg(e){return rg(e)?(e.slot===`helmet`||e.slot===`chestplate`||e.slot===`leggings`||e.slot===`boots`)&&e.material===`iron`&&ig(e.points)&&ig(e.durability)&&ig(e.maxDurability):!1}function ng(e){return rg(e)&&ig(e.x)&&ig(e.y)&&ig(e.z)}function rg(e){return typeof e==`object`&&!!e}function ig(e){return typeof e==`number`&&Number.isFinite(e)}var ag=class{prefix;storage;constructor(e={}){this.prefix=e.prefix??`voxel-survival`,this.storage=e.storage??window.localStorage}async loadWorld(e){let t=this.storage.getItem(this.storageKey(e));if(!t)return null;let n=JSON.parse(t);if(!Wh(n))throw Error(`unsupported or malformed world save`);return sg(n)}async saveWorld(e,t){this.storage.setItem(this.storageKey(e),JSON.stringify(t))}async deleteWorld(e){this.storage.removeItem(this.storageKey(e))}storageKey(e){return`${this.prefix}:${og(e)}`}};function og(e){return e.worldId}function sg(e){return e===null?null:structuredClone(e)}var cg=new Map([`UNLOADED`,`BIOMES`,`NOISE`,`SURFACE`,`CARVERS`,`FEATURES`,`LIGHT_PENDING`,`LIT`,`FULL`].map((e,t)=>[e,t]));function lg(e){let t=cg.get(e);if(t===void 0)throw Error(`unknown chunk status: ${e}`);return t}function ug(e,t){return lg(e)>=lg(t)}function dg(e,t){return lg(t)===lg(e)+1}function fg(e,t){if(!dg(e,t))throw Error(`invalid chunk status transition: ${e} -> ${t}`)}var pg=[`WORLD_SURFACE`,`OCEAN_FLOOR`,`MOTION_BLOCKING`,`MOTION_BLOCKING_NO_LEAVES`],mg=256,hg=-65,gg=class{maps;constructor(){this.maps=new Map;for(let e of pg){let t=new(Bl())(mg*Int16Array.BYTES_PER_ELEMENT),n=new Int16Array(t);n.fill(hg),this.maps.set(e,n)}}get(e,t,n){return this.requireMap(e)[_g(t,n)]}set(e,t,n,r){Al(`worldY`,r,hg,319),Atomics.store(this.requireMap(e),_g(t,n),r)}recomputeColumn(e,t,n,r,i){for(let a=319;a>=-64;--a)if(i(r(a)))return this.set(e,t,n,a),a;return this.set(e,t,n,hg),hg}requireMap(e){let t=this.maps.get(e);if(!t)throw Error(`unknown heightmap type: ${e}`);return t}};function _g(e,t){return Al(`x`,e,0,15),Al(`z`,t,0,15),t<<4|e}var vg=class{length;bytes;constructor(e,t){if(!Number.isInteger(e)||e<=0)throw RangeError(`nibble array length must be positive: ${e}`);this.length=e;let n=Math.ceil(e/2),r=t??new(Bl())(n);if(this.bytes=new Uint8Array(r),this.bytes.length!==n)throw RangeError(`buffer has ${this.bytes.length} bytes, expected ${n}`)}get(e){this.assertIndex(e);let t=e>>1,n=Atomics.load(this.bytes,t);return e&1?n>>4&15:n&15}set(e,t){this.assertIndex(e),this.assertValue(t);let n=e>>1,r=Atomics.load(this.bytes,n),i=e&1?r&15|t<<4:r&240|t;Atomics.store(this.bytes,n,i)}fill(e){this.assertValue(e);let t=e|e<<4;for(let e=0;e<this.bytes.length;e+=1)Atomics.store(this.bytes,e,t)}assertIndex(e){if(!Number.isInteger(e)||e<0||e>=this.length)throw RangeError(`nibble index out of range: ${e}`)}assertValue(e){if(!Number.isInteger(e)||e<0||e>15)throw RangeError(`nibble value must be 0..15: ${e}`)}},yg=class e{length;bitsPerEntry;entriesPerWord;mask;words;constructor(e,t,n){Sg(e,t),this.length=e,this.bitsPerEntry=t,this.entriesPerWord=Math.floor(64/t),this.mask=(1n<<BigInt(t))-1n;let r=xg(e,t),i=n??new(Bl())(r*BigUint64Array.BYTES_PER_ELEMENT);if(this.words=new BigUint64Array(i),this.words.length!==r)throw RangeError(`buffer has ${this.words.length} words, expected ${r}`)}get(e){this.assertIndex(e);let t=Math.floor(e/this.entriesPerWord),n=BigInt(e%this.entriesPerWord*this.bitsPerEntry),r=Atomics.load(this.words,t);return Number(r>>n&this.mask)}set(e,t){this.assertIndex(e),this.assertValue(t);let n=Math.floor(e/this.entriesPerWord),r=BigInt(e%this.entriesPerWord*this.bitsPerEntry),i=~(this.mask<<r),a=BigInt(t)<<r,o=Atomics.load(this.words,n)&i|a;Atomics.store(this.words,n,o)}resize(t){let n=new e(this.length,t);for(let e=0;e<this.length;e+=1)n.set(e,this.get(e));return n}snapshot(){return{length:this.length,bitsPerEntry:this.bitsPerEntry,words:Array.from(this.words)}}assertIndex(e){if(!Number.isInteger(e)||e<0||e>=this.length)throw RangeError(`packed index out of range: ${e}`)}assertValue(e){if(!Number.isInteger(e)||e<0||BigInt(e)>this.mask)throw RangeError(`packed value does not fit in ${this.bitsPerEntry} bits: ${e}`)}};function bg(e){if(!Number.isInteger(e)||e<=0)throw RangeError(`palette size must be positive: ${e}`);return Math.max(4,Math.ceil(Math.log2(e)))}function xg(e,t){return Sg(e,t),Math.ceil(e/Math.floor(64/t))}function Sg(e,t){if(!Number.isInteger(e)||e<=0)throw RangeError(`length must be positive: ${e}`);if(!Number.isInteger(t)||t<1||t>32)throw RangeError(`bitsPerEntry must be 1..32: ${t}`);if(Math.floor(64/t)<1)throw RangeError(`bitsPerEntry leaves no entries per word: ${t}`)}var Cg=class{sectionY;palette;paletteIndexByState;blocks;skyLight;blockLight;constructor(e){kl(`sectionY`,e.sectionY);let t=e.defaultStateId??0;this.sectionY=e.sectionY,this.palette=[t],this.paletteIndexByState=new Map([[t,0]]),this.blocks=new yg(El,4),this.skyLight=new vg(El),this.blockLight=new vg(El)}getStateId(e,t,n){return this.getStateIdByIndex(Rl(e,t,n))}setStateId(e,t,n,r){this.setStateIdByIndex(Rl(e,t,n),r)}getStateIdByIndex(e){let t=this.blocks.get(e),n=this.palette[t];if(n===void 0)throw Error(`section palette index missing: ${t}`);return n}setStateIdByIndex(e,t){kl(`stateId`,t);let n=this.getOrInsertPaletteIndex(t);this.blocks.set(e,n)}getSkyLight(e,t,n){return this.skyLight.get(Rl(e,t,n))}setSkyLight(e,t,n,r){this.skyLight.set(Rl(e,t,n),r)}getBlockLight(e,t,n){return this.blockLight.get(Rl(e,t,n))}setBlockLight(e,t,n,r){this.blockLight.set(Rl(e,t,n),r)}fillState(e){this.palette=[e],this.paletteIndexByState=new Map([[e,0]]),this.blocks=new yg(El,4)}snapshot(){let e=[],t=[];for(let n=0;n<El;n+=1)e.push(this.skyLight.get(n)),t.push(this.blockLight.get(n));return{sectionY:this.sectionY,palette:[...this.palette],blocks:this.blocks.snapshot(),skyLight:e,blockLight:t}}getOrInsertPaletteIndex(e){let t=this.paletteIndexByState.get(e);if(t!==void 0)return t;let n=this.palette.length;this.palette.push(e),this.paletteIndexByState.set(e,n);let r=bg(this.palette.length);return r>this.blocks.bitsPerEntry&&(this.blocks=this.blocks.resize(r)),n}},wg=class{chunkX;chunkZ;status;sections;heightmaps;blockDeltas;dirty;constructor(e){this.chunkX=e.chunkX,this.chunkZ=e.chunkZ,this.status=`UNLOADED`,this.sections=[],this.heightmaps=new gg,this.blockDeltas=new Map,this.dirty=!1;for(let t=0;t<24;t+=1)this.sections.push(new Cg({sectionY:Dl+t,defaultStateId:e.defaultStateId??0}))}getSection(e){return Al(`sectionY`,e,Dl,Ol),this.sections[Fl(e)]}getSectionForWorldY(e){return Al(`worldY`,e,-64,319),this.getSection(Pl(e))}getStateId(e,t,n){return Tg(e,n),this.getSectionForWorldY(t).getStateId(e,Il(t),n)}setStateId(e,t,n,r){Tg(e,n),this.getSectionForWorldY(t).setStateId(e,Il(t),n,r),this.blockDeltas.set(Dg(e,t,n),{localX:e,worldY:t,localZ:n,stateId:r}),this.dirty=!0}setGeneratedStateId(e,t,n,r){Tg(e,n),this.getSectionForWorldY(t).setStateId(e,Il(t),n,r),this.dirty=!0}getSkyLight(e,t,n){return Tg(e,n),this.getSectionForWorldY(t).getSkyLight(e,Il(t),n)}setSkyLight(e,t,n,r){Tg(e,n),this.getSectionForWorldY(t).setSkyLight(e,Il(t),n,r)}getBlockLight(e,t,n){return Tg(e,n),this.getSectionForWorldY(t).getBlockLight(e,Il(t),n)}setBlockLight(e,t,n,r){Tg(e,n),this.getSectionForWorldY(t).setBlockLight(e,Il(t),n,r)}fillState(e){for(let t of this.sections)t.fillState(e),t.skyLight.fill(0),t.blockLight.fill(0);this.blockDeltas.clear(),this.dirty=!0}advanceStatus(e){fg(this.status,e),this.status=e}markStatusAtLeast(e){ug(this.status,e)||(this.status=e)}recomputeHeightmap(e,t,n,r){return Tg(t,n),this.heightmaps.recomputeColumn(e,t,n,e=>this.getStateId(t,e,n),r)}recomputeHeightmapsFromRegistry(e){for(let t=0;t<16;t+=1)for(let n=0;n<16;n+=1)this.recomputeHeightmap(`WORLD_SURFACE`,n,t,t=>e.getDefinitionForState(t).renderLayer!==`none`),this.recomputeHeightmap(`OCEAN_FLOOR`,n,t,t=>{let n=e.getDefinitionForState(t);return n.renderLayer!==`none`&&!n.liquid}),this.recomputeHeightmap(`MOTION_BLOCKING`,n,t,t=>{let n=e.getDefinitionForState(t);return n.collision!==`none`||n.liquid===!0}),this.recomputeHeightmap(`MOTION_BLOCKING_NO_LEAVES`,n,t,t=>{let n=e.getState(t),r=e.getDefinitionForState(t);return n.typeId!==`leaves`&&(r.collision!==`none`||r.liquid===!0)})}};function Tg(e,t){Al(`localX`,e,0,15),Al(`localZ`,t,0,15)}function Eg(e){for(let t=-64;t<=319;t+=1)for(let n=0;n<16;n+=1)for(let r=0;r<16;r+=1)e(r,t,n)}function Dg(e,t,n){return`${e},${t},${n}`}var Og=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],kg=class{registry;constructor(e){this.registry=e}recomputeChunkLocal(e){this.clearLights(e),Ag(e)?(this.initializeHeightmapSkyLight(e),this.initializeBlockLightFromDeltas(e)):(this.initializeVerticalSkyLight(e),this.propagateSkyLight(e),this.initializeBlockLight(e)),e.markStatusAtLeast(`LIT`)}clearLights(e){for(let t of e.sections)t.skyLight.fill(0),t.blockLight.fill(0)}initializeVerticalSkyLight(e){for(let t=0;t<16;t+=1)for(let n=0;n<16;n+=1){let r=15;for(let i=319;i>=-64;--i){let a=this.opacity(e.getStateId(t,i,n));if(a>=15){r=0,e.setSkyLight(t,i,n,0);continue}e.setSkyLight(t,i,n,r),a>0&&(r=Math.max(0,r-a))}}}propagateSkyLight(e){let t=[];Eg((n,r,i)=>{let a=e.getSkyLight(n,r,i);a>1&&t.push({x:n,y:r,z:i,level:a})}),this.propagate(e,`sky`,t)}initializeBlockLight(e){let t=[];Eg((n,r,i)=>{let a=this.registry.getDefinitionForState(e.getStateId(n,r,i)).lightEmission;a>0&&(e.setBlockLight(n,r,i,a),t.push({x:n,y:r,z:i,level:a}))}),this.propagate(e,`block`,t)}initializeHeightmapSkyLight(e){for(let t=0;t<16;t+=1)for(let n=0;n<16;n+=1){let r=e.heightmaps.get(`WORLD_SURFACE`,t,n),i=jg(e,t,n),a=Math.max(-64,r),o=Math.min(319,Math.max(r+2,i+2));for(let r=a;r<=o;r+=1){let i=this.opacity(e.getStateId(t,r,n));e.setSkyLight(t,r,n,i>=15?0:15)}}}initializeBlockLightFromDeltas(e){let t=[];for(let n of e.blockDeltas.values()){let r=this.registry.getDefinitionForState(n.stateId).lightEmission;r<=0||(e.setBlockLight(n.localX,n.worldY,n.localZ,r),t.push({x:n.localX,y:n.worldY,z:n.localZ,level:r}))}this.propagate(e,`block`,t)}propagate(e,t,n){let r=0;for(;r<n.length;){let i=n[r];if(r+=1,(t===`sky`?e.getSkyLight(i.x,i.y,i.z):e.getBlockLight(i.x,i.y,i.z))===i.level)for(let[r,a,o]of Og){let s=i.x+r,c=i.y+a,l=i.z+o;if(!Mg(s,c,l))continue;let u=this.opacity(e.getStateId(s,c,l)),d=Math.max(1,u),f=i.level-d;f<=0||f<=(t===`sky`?e.getSkyLight(s,c,l):e.getBlockLight(s,c,l))||(t===`sky`?e.setSkyLight(s,c,l,f):e.setBlockLight(s,c,l,f),n.push({x:s,y:c,z:l,level:f}))}}}opacity(e){return this.registry.getDefinitionForState(e).opacity}};function Ag(e){for(let t=0;t<16;t+=1)for(let n=0;n<16;n+=1)if(e.heightmaps.get(`WORLD_SURFACE`,t,n)>=-64)return!0;return!1}function jg(e,t,n){let r=e.heightmaps.get(`WORLD_SURFACE`,t,n),i=[[t-1,n],[t+1,n],[t,n-1],[t,n+1]];for(let[t,n]of i)t<0||t>=16||n<0||n>=16||(r=Math.max(r,e.heightmaps.get(`WORLD_SURFACE`,t,n)));return r}function Mg(e,t,n){return e>=0&&e<16&&n>=0&&n<16&&t>=-64&&t<=319}var Ng=class{world;registry;lightEngine;mesher;generator;meshes;constructor(e){this.world=e.world,this.registry=this.world.blockRegistry,this.lightEngine=e.lightEngine??new kg(this.registry),this.mesher=e.mesher??new Fm(this.registry),this.generator=e.generator,this.meshes=new Map}ensureChunkFull(e,t){let n=this.world.getOrCreateChunk(e,t);return this.advanceGenerated(n),n.status===`LIGHT_PENDING`&&this.lightEngine.recomputeChunkLocal(n),n.status===`LIT`&&(this.meshes.set(Pg(e,t),this.mesher.buildChunkMesh(n,this.world)),n.advanceStatus(`FULL`)),{chunk:n,mesh:this.meshes.get(Pg(e,t))??null}}remeshChunk(e,t){let n=this.world.getOrCreateChunk(e,t);this.lightEngine.recomputeChunkLocal(n);let r=this.mesher.buildChunkMesh(n,this.world);return this.meshes.set(Pg(e,t),r),n.markStatusAtLeast(`FULL`),r}setBlockAndRemesh(e,t,n,r){if(t<-64||t>319)return[];this.world.setStateId(e,t,n,r);let i=G(e),a=G(n),o=Nl(e),s=Nl(n),c=new Set([Pg(i,a)]);o===0&&c.add(Pg(i-1,a)),o===15&&c.add(Pg(i+1,a)),s===0&&c.add(Pg(i,a-1)),s===15&&c.add(Pg(i,a+1));let l=[];for(let e of c){let[t,n]=e.split(`,`).map(Number),r=this.world.getChunk(t,n);r&&l.push({chunk:r,mesh:this.remeshChunk(t,n)})}return l}advanceGenerated(e){e.status===`UNLOADED`&&e.advanceStatus(`BIOMES`),e.status===`BIOMES`&&e.advanceStatus(`NOISE`),e.status===`NOISE`&&e.advanceStatus(`SURFACE`),e.status===`SURFACE`&&e.advanceStatus(`CARVERS`),e.status===`CARVERS`&&(e.advanceStatus(`FEATURES`),this.generator(e,this.world)),e.status===`FEATURES`&&e.advanceStatus(`LIGHT_PENDING`)}ensureAreaFull(e,t,n,r){return this.ensureAreaReadyForMeshing(e,t,n,r).map(e=>(e.status===`LIT`&&(this.meshes.set(Pg(e.chunkX,e.chunkZ),this.mesher.buildChunkMesh(e,this.world)),e.advanceStatus(`FULL`)),{chunk:e,mesh:this.meshes.get(Pg(e.chunkX,e.chunkZ))??null}))}ensureAreaReadyForMeshing(e,t,n,r){let i=[];for(let a=n;a<=r;a+=1)for(let n=e;n<=t;n+=1){let e=this.world.getOrCreateChunk(n,a);this.advanceGenerated(e),i.push(e)}for(let e of i)e.status===`LIGHT_PENDING`&&this.lightEngine.recomputeChunkLocal(e);return i}};function Pg(e,t){return`${e},${t}`}var Fg=`grass_top.grass_side.dirt.stone.sand.gravel.snow.lava.log_side.log_top.planks.cobblestone.leaves.water.coal_ore.iron_ore.gold_ore.diamond_ore.torch.lamp.crafting_table.furnace.chest.bed.door.composter.lectern.stonecutter.farmland.wheat_young.wheat_mid.wheat.bell`.split(`.`);Lg(9408390),Lg(5216839),Lg(11065599),Lg(4027608);var Ig=[`east`,`west`,`up`,`down`,`south`,`north`];function Lg(e){return{r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255}}var Rg={solid:new B(9408390),cutout:new B(5216839),translucent:new B(11065599),fluid:new B(4027608)},zg=[`solid`,`cutout`,`translucent`,`fluid`],Bg=16,Vg=16,Hg=null,Ug=null,Wg=new Map,Gg=new Map,Kg=new Map,qg={east:0,west:1,up:2,down:3,south:4,north:5};function Jg(e,t){let n=new pn;n.name=`chunk-mesh`;let r=d_(),i=f_();if(e.renderSections&&e.renderSections.length>0){for(let a of e.renderSections)for(let e of zg){let o=a.layers[e];if(o.indices.length===0)continue;let s=o_(e,e===`fluid`?i:r),c=new V(e_(o,Rg[e],t,e,a.sectionY),s);c.name=`chunk-layer-${e}-section-${a.sectionY}`,n.add(c)}return n}for(let a of zg){let o=e[a];if(o.indices.length===0)continue;let s=o_(a,a===`fluid`?i:r);for(let e of Yg(o)){let r=new V(e_(e.layer,Rg[a],t,a,e.sectionY),s);r.name=`chunk-layer-${a}-section-${e.sectionY}`,n.add(r)}}return n}function Yg(e){let t=e.faceDirections.length;if(t===0)return[];let n=new Map;for(let r=0;r<t;r+=1){let t=$g(e.positions,r);n.set(t,(n.get(t)??0)+1)}if(n.size===1)return[{sectionY:n.keys().next().value,layer:e}];let r=new Map;for(let[t,i]of n)r.set(t,Xg(t,i,!!e.colors,!!e.uvs));for(let n=0;n<t;n+=1){let t=$g(e.positions,n),i=r.get(t);i&&Zg(e,n,i)}return Array.from(r.values()).sort((e,t)=>e.sectionY-t.sectionY).map(e=>({sectionY:e.sectionY,layer:{positions:e.positions,normals:e.normals,indices:e.indices,stateIds:e.stateIds,skyLight:e.skyLight,blockLight:e.blockLight,ao:e.ao,faceDirections:e.faceDirections,colors:e.colors,uvs:e.uvs}}))}function Xg(e,t,n,r){let i=t*4;return{sectionY:e,nextFace:0,positions:new Float32Array(i*3),normals:new Float32Array(i*3),indices:new Uint32Array(t*6),stateIds:new Uint16Array(i),skyLight:new Uint8Array(i),blockLight:new Uint8Array(i),ao:new Uint8Array(i),faceDirections:new Uint8Array(t),colors:n?new Float32Array(i*3):void 0,uvs:r?new Float32Array(i*2):void 0}}function Zg(e,t,n){let r=n.nextFace;n.nextFace+=1;let i=t*4,a=r*4;Qg(e.positions,i*3,n.positions,a*3,12),Qg(e.normals,i*3,n.normals,a*3,12),Qg(e.stateIds,i,n.stateIds,a,4),Qg(e.skyLight,i,n.skyLight,a,4),Qg(e.blockLight,i,n.blockLight,a,4),Qg(e.ao,i,n.ao,a,4),e.colors&&n.colors&&Qg(e.colors,i*3,n.colors,a*3,12),e.uvs&&n.uvs&&Qg(e.uvs,i*2,n.uvs,a*2,8);let o=r*4,s=r*6;n.indices[s]=o,n.indices[s+1]=o+2,n.indices[s+2]=o+1,n.indices[s+3]=o,n.indices[s+4]=o+3,n.indices[s+5]=o+2,n.faceDirections[r]=a_(e.faceDirections,t)}function Qg(e,t,n,r,i){for(let a=0;a<i;a+=1)n[r+a]=e[t+a]}function $g(e,t){let n=t*12,r=e[n+1];return r=Math.min(r,e[n+4],e[n+7],e[n+10]),Math.floor(r/Bg)}function e_(e,t,n,r=`solid`,i){let a=new hr,o=e.colors??t_(e,t,n),s=e.uvs??n_(e,n,r);return a.setAttribute(`position`,r_(e.positions,3)),a.setAttribute(`normal`,r_(e.normals,3)),a.setAttribute(`color`,r_(o,3)),a.setAttribute(`uv`,r_(s,2)),e.indices instanceof Uint32Array||e.indices instanceof Uint16Array?a.setIndex(new er(e.indices,1)):a.setIndex(e.indices),i===void 0?a.computeBoundingSphere():a.boundingSphere=new sr(new R(8,i*Bg+Bg/2,8),15),a}function t_(e,t,n){let r=new Float32Array(e.stateIds.length*3);for(let i=0;i<e.stateIds.length;i+=1){let a=Math.max(e.skyLight[i],e.blockLight[i])/15,o=jm(e.ao[i]),s=Math.max(.12,a*o),c=n?s_(n,e.stateIds[i],t):t,l=i*3;r[l]=c.r*s,r[l+1]=c.g*s,r[l+2]=c.b*s}return r}function n_(e,t,n=`solid`){let r=new Float32Array(e.stateIds.length*2),i=[[0,0],[1,0],[1,1],[0,1]];for(let a=0;a<e.faceDirections.length;a+=1){let o=e.stateIds[a*4],s=i_(e.faceDirections,a),c=t?c_(t,o,s):`stone`;for(let e=0;e<i.length;e+=1){let[t,o]=i[e],s=n===`fluid`?{u:t,v:o}:u_(c,t,o),l=(a*4+e)*2;r[l]=s.u,r[l+1]=s.v}}return r}function r_(e,t){return e instanceof Float32Array?new er(e,t):new rr(e,t)}function i_(e,t){let n=e[t];return typeof n==`number`?Ig[n]:n}function a_(e,t){let n=e[t];return typeof n==`number`?n:qg[n]}function o_(e,t){let n=Wg.get(e);if(n)return n;let r=new Gr({map:t,vertexColors:!0,transparent:e===`translucent`||e===`fluid`,opacity:e===`fluid`?.56:1,alphaTest:e===`cutout`?.35:0,depthWrite:e!==`fluid`,side:0});return r.userData.sharedTerrainMaterial=!0,Wg.set(e,r),r}function s_(e,t,n){let r=e.getState(t).typeId,i=Gg.get(r);if(i)return i;let a;switch(r){case`grass`:a=new B(6266698);break;case`dirt`:a=new B(7753785);break;case`stone`:a=new B(8750469);break;case`sand`:a=new B(14140283);break;case`gravel`:a=new B(8092533);break;case`snow`:a=new B(15134193);break;case`water`:a=new B(3698392);break;case`lava`:a=new B(16740122);break;case`log`:a=new B(8017717);break;case`planks`:a=new B(12026958);break;case`cobblestone`:a=new B(7631983);break;case`leaves`:a=new B(4165443);break;case`coal_ore`:a=new B(5197647);break;case`iron_ore`:a=new B(10978920);break;case`gold_ore`:a=new B(13805383);break;case`diamond_ore`:a=new B(6540752);break;case`torch`:a=new B(16762967);break;case`lamp`:a=new B(16765286);break;case`crafting_table`:a=new B(10185275);break;case`furnace`:a=new B(6118744);break;case`chest`:a=new B(10906933);break;case`bed`:a=new B(12006709);break;case`door`:a=new B(9394735);break;case`bell`:a=new B(14263872);break;case`composter`:a=new B(9133105);break;case`lectern`:a=new B(10119742);break;case`stonecutter`:a=new B(9144962);break;case`farmland`:a=new B(7031343);break;case`wheat`:a=new B(14267978);break;default:a=n}return Gg.set(r,a),a}function c_(e,t,n){let r=`${t}:${n}`,i=Kg.get(r);if(i)return i;let a=l_(e,t,n);return Kg.set(r,a),a}function l_(e,t,n){switch(e.getState(t).typeId){case`grass`:return n===`up`?`grass_top`:n===`down`?`dirt`:`grass_side`;case`dirt`:return`dirt`;case`stone`:return`stone`;case`sand`:return`sand`;case`gravel`:return`gravel`;case`snow`:return`snow`;case`water`:return`water`;case`lava`:return`lava`;case`log`:return n===`up`||n===`down`?`log_top`:`log_side`;case`planks`:return`planks`;case`cobblestone`:return`cobblestone`;case`leaves`:return`leaves`;case`coal_ore`:return`coal_ore`;case`iron_ore`:return`iron_ore`;case`gold_ore`:return`gold_ore`;case`diamond_ore`:return`diamond_ore`;case`torch`:return`torch`;case`lamp`:return`lamp`;case`crafting_table`:return n===`up`?`crafting_table`:`log_side`;case`furnace`:return n===`up`||n===`down`?`cobblestone`:`furnace`;case`chest`:return n===`up`||n===`down`?`planks`:`chest`;case`bed`:return`bed`;case`door`:return`door`;case`bell`:return`bell`;case`composter`:return n===`up`?`dirt`:`composter`;case`lectern`:return n===`up`?`lectern`:`planks`;case`stonecutter`:return n===`up`?`stonecutter`:`cobblestone`;case`farmland`:return n===`up`?`farmland`:`dirt`;case`wheat`:{let n=e.getState(t).properties.age;return typeof n==`number`&&n<3?`wheat_young`:typeof n==`number`&&n<6?`wheat_mid`:`wheat`}default:return`stone`}}function u_(e,t,n){let r=Fg.indexOf(e),i=.5/(Fg.length*Vg),a=.5/Vg,o=r/Fg.length+i,s=(r+1)/Fg.length-i,c=a,l=1-a;return{u:o+(s-o)*t,v:c+(l-c)*n}}function d_(){if(Hg)return Hg;let e=document.createElement(`canvas`);e.width=Fg.length*Vg,e.height=Vg;let t=e.getContext(`2d`);if(!t)throw Error(`failed to create terrain atlas context`);return t.imageSmoothingEnabled=!1,Fg.forEach((e,n)=>p_(t,e,n*Vg,0)),Hg=new Oi(e),Hg.colorSpace=Ve,Hg.magFilter=r,Hg.minFilter=r,Hg.generateMipmaps=!1,Hg}function f_(){if(Ug)return Ug;let t=document.createElement(`canvas`);t.width=Vg,t.height=Vg;let n=t.getContext(`2d`);if(!n)throw Error(`failed to create water texture context`);return n.imageSmoothingEnabled=!1,p_(n,`water`,0,0),Ug=new Oi(t),Ug.colorSpace=Ve,Ug.magFilter=r,Ug.minFilter=r,Ug.wrapS=e,Ug.wrapT=e,Ug.generateMipmaps=!1,Ug}function p_(e,t,n,r){for(let i=0;i<Vg;i+=1)for(let a=0;a<Vg;a+=1)e.fillStyle=m_(t,a,i),e.fillRect(n+a,r+i,1,1)}function m_(e,t,n){let r=__(t,n,Fg.indexOf(e)*31+17),i=__(t*3,n*3,Fg.indexOf(e)*47+5);switch(e){case`grass_top`:return K(4423477,7976795,r);case`grass_side`:return n<4||n<7&&i>.62?K(4161076,7779162,r):h_(r,i);case`dirt`:return h_(r,i);case`stone`:return K(i>.78?5658198:7303023,r<.22?10526880:8750469,r);case`sand`:return K(i>.82?12167263:13812090,r<.24?15786916:14207362,r);case`gravel`:return K(i>.72?5197644:7631983,r<.24?10263701:8355705,r);case`snow`:return K(i>.82?13621471:15331571,r<.2?16777215:14674157,r);case`lava`:return i>.72||(t+n+Math.floor(r*8))%7==0?K(16765002,16777114,r):K(12136208,16739098,r);case`log_side`:return K(t%5==0||i>.76?5059617:7622445,10712130,r);case`log_top`:{let e=Math.hypot(t-7.5,n-7.5);return K(Math.floor(e*1.6)%3==0?10317105:12883787,14729072,r)}case`planks`:return n%5==0||t%8==0?K(7096104,10118712,r):K(11040579,13672543,r);case`cobblestone`:return(t+Math.floor(r*5))%7==0||(n+Math.floor(i*4))%6==0?K(5197643,6579295,r):K(7105639,9868943,r);case`leaves`:return i<.13?`rgba(29, 71, 31, 0)`:K(2514222,r>.7?6267210:4096571,r);case`water`:return`rgba(${Math.floor(47+r*28)}, ${Math.floor(96+r*38)}, ${Math.floor(190+r*35)}, 180)`;case`coal_ore`:return i>.73?K(2039583,3947580,r):m_(`stone`,t,n);case`iron_ore`:return i>.75?K(10449750,13672826,r):m_(`stone`,t,n);case`gold_ore`:return i>.77?K(11829795,16765286,r):m_(`stone`,t,n);case`diamond_ore`:return i>.79?K(3981250,11075576,r):m_(`stone`,t,n);case`torch`:return t<6||t>9||n<2||n>15?`rgba(0, 0, 0, 0)`:n<5?K(16747050,16773258,r):K(5977889,10513208,r);case`lamp`:return K((t+n)%5==0?9198112:14722104,16767858,r);case`crafting_table`:return t<2||n<2||t>13||n>13?K(5912351,9132853,r):t===7||t===8||n===7||n===8?K(7226664,12024387,r):K(10119742,13673323,r);case`furnace`:return t>3&&t<12&&n>4&&n<13?t===4||t===11||n===5||n===12?K(2434341,4539717,r):K(1776411,i>.76?16747050:3158064,r):m_(`cobblestone`,t,n);case`chest`:return t===0||t===15||n===0||n===15?K(4860952,8146982,r):n===7||n===8?K(5977112,9132842,r):t>6&&t<10&&n>5&&n<10?K(13146955,16766059,r):K(9263660,12945990,r);case`bed`:return n<4?K(15065032,16777215,r):t<2||t>13||n>13?K(5975842,9063218,r):K(i>.76?8331296:10823720,14701138,r);case`door`:return t<2||t>13||n<1||n>14?K(4072468,7094050,r):(t===7||t===8)&&n>2&&n<14?K(4992024,7950381,r):t>3&&t<7&&n>3&&n<8||t>9&&t<13&&n>3&&n<8?K(5911068,9198900,r):t===12&&n===8?K(13806165,16766573,r):i<.12&&t>3&&t<13&&n>9&&n<14?`rgba(0, 0, 0, 0)`:K(9131310,12417602,r);case`composter`:return t<2||t>13||n<2||n>13?K(4927256,8014375,r):t%5==0||n%5==0?K(7160610,10709560,r):K(3876631,i>.72?3234596:6373921,r);case`lectern`:return n<4?K(13146968,15912838,r):t<3||t>12?K(5190172,8278572,r):m_(`planks`,t,n);case`stonecutter`:return n<5&&Math.abs(t-7.5)<5-n*.35?K(12105906,15789796,r):n===5||n===6?K(6052952,9276806,r):m_(`cobblestone`,t,n);case`farmland`:return t%4==0||t%4==1?K(4138777,5912867,r):K(7030060,9200192,r);case`wheat`:return i<.26?`rgba(0, 0, 0, 0)`:n<4||r>.7?K(16045151,16772e3,r):K(9152074,13674564,r);case`wheat_mid`:return i<.38||n<3?`rgba(0, 0, 0, 0)`:K(7314237,13940040,r);case`wheat_young`:return i<.5||n<7?`rgba(0, 0, 0, 0)`:K(5081906,11124299,r);case`bell`:return t<2||t>13||n<2||n>13?`rgba(0, 0, 0, 0)`:n<4||t<4||t>11?K(8015634,11564834,r):n>10&&(t<3||t>12)?`rgba(0, 0, 0, 0)`:n>11?K(8409881,12880428,r):K(i>.72?9132573:12879916,16765286,r)}}function h_(e,t){return K(t>.8?4861730:7227701,e<.25?10120008:8083005,e)}function K(e,t,n){return`rgb(${g_(e>>16&255,t>>16&255,n)}, ${g_(e>>8&255,t>>8&255,n)}, ${g_(e&255,t&255,n)})`}function g_(e,t,n){return Math.round(e+(t-e)*n)}function __(e,t,n){let r=Math.imul(e+n*101,374761393)^Math.imul(t-n*53,668265263);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295}var v_=24e3,y_={dayStart:0,timeSetDay:1e3,noon:6e3,sunsetStart:12e3,nightStart:13e3,midnight:18e3,sunriseStart:23e3,nextDay:24e3,clearLightStartsFalling:12040,clearLightReachesFour:13670,clearLightStartsRising:22331,clearLightReachesFifteen:23961},b_=class{timeOfDay;constructor(e=1e3){this.timeOfDay=O_(e)}advance(e){this.timeOfDay=O_(this.timeOfDay+e*20)}visuals(){let e=w_(this.timeOfDay),t=(e-4)/11,n=E_(this.timeOfDay),r=A_(A_(1053986,10274796,t),15835482,n*.48),i=T_(this.timeOfDay),a={x:-i.x,y:-i.y,z:-i.z};return{phase:x_(this.timeOfDay),skyColor:r,ambientIntensity:k_(.16,.8,t),sunlightIntensity:k_(.02,1.8,t),skyDarkness:k_(.52,0,t),skyLightLevel:e,sunDirection:i,moonDirection:a,sunVisible:i.y>-.08,moonVisible:a.y>-.08}}};function x_(e){let t=O_(e);return t>=y_.sunriseStart||t<y_.dayStart?`sunrise`:t<y_.sunsetStart?`day`:t<y_.nightStart?`sunset`:`night`}function S_(e){let t=O_(e);return t>=12542&&t<y_.sunriseStart}function C_(){return y_.timeSetDay}function w_(e){let t=O_(e);return t>=y_.clearLightStartsFalling&&t<=y_.clearLightReachesFour?k_(15,4,(t-y_.clearLightStartsFalling)/(y_.clearLightReachesFour-y_.clearLightStartsFalling)):t>y_.clearLightReachesFour&&t<y_.clearLightStartsRising?4:t>=y_.clearLightStartsRising&&t<=y_.clearLightReachesFifteen?k_(4,15,(t-y_.clearLightStartsRising)/(y_.clearLightReachesFifteen-y_.clearLightStartsRising)):15}function T_(e){let t=O_(e)/v_*Math.PI*2;return{x:-Math.cos(t),y:Math.sin(t),z:-.18}}function E_(e){let t=O_(e),n=D_(t,12e3,13670),r=t>=22331?D_(t,22331,24e3):0;return Math.max(n,r)}function D_(e,t,n){if(e<t||e>n)return 0;let r=(e-t)/(n-t);return Math.sin(r*Math.PI)}function O_(e){return(e%v_+v_)%v_}function k_(e,t,n){return e+(t-e)*n}function A_(e,t,n){let r=Math.round(k_(e>>16&255,t>>16&255,n)),i=Math.round(k_(e>>8&255,t>>8&255,n)),a=Math.round(k_(e&255,t&255,n));return r<<16|i<<8|a}var j_=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}],M_=new Map,N_=new Map;function P_(e,t,n){let r=[],i=n.maxEdits??48,a=t.resolveState(`water`,{level:0}),o=t.resolveState(`lava`,{level:0}),s=G(n.centerX),c=G(n.centerZ),l=Nl(n.centerX),u=Nl(n.centerZ),d=n.maxColumnScans??1/0,f=0;for(let p of F_(n.radiusChunks)){let n=s+p.x,m=c+p.z,h=e.getChunk(n,m);if(!h)continue;let g=I_(n===s?l:16/2,m===c?u:16/2);for(let s of g){if(f+=1,f>d)return r.slice(0,i);let c=s.x,l=s.z,u=n*16+c,p=m*16+l,g=Math.max(h.heightmaps.get(`WORLD_SURFACE`,c,l),-64);for(let n=Math.min(319,g+2);n>=-64;--n){let s=h.getStateId(c,n,l),d=t.getState(s);if(!(d.typeId!==`water`&&d.typeId!==`lava`)&&(L_(e,t,r,{x:u,y:n,z:p,typeId:d.typeId,stateId:s,sourceStateId:d.typeId===`water`?a:o,maxLevel:d.typeId===`water`?7:4}),r.length>=i))return r.slice(0,i)}}}return r}function F_(e){let t=M_.get(e);if(t)return t;let n=[];for(let t=-e;t<=e;t+=1)for(let r=-e;r<=e;r+=1)n.push({x:r,z:t});return n.sort((e,t)=>e.x*e.x+e.z*e.z-(t.x*t.x+t.z*t.z)),M_.set(e,n),n}function I_(e,t){let n=`${Math.round(e*2)/2},${Math.round(t*2)/2}`,r=N_.get(n);if(r)return r;let i=[];for(let e=0;e<16;e+=1)for(let t=0;t<16;t+=1)i.push({x:t,z:e});return i.sort((n,r)=>{let i=n.x+.5-e,a=n.z+.5-t,o=r.x+.5-e,s=r.z+.5-t;return i*i+a*a-(o*o+s*s)})}function L_(e,t,n,r){let i=Number(t.getState(r.stateId).properties.level??0),a={x:r.x,y:r.y-1,z:r.z};if(a.y>=-64&&R_(e,t,a.x,a.y,a.z,r.typeId)){n.push({...a,stateId:r.sourceStateId});return}if(i>=r.maxLevel)return;let o=i+1,s=t.resolveState(r.typeId,{level:o});for(let i of j_){let a={x:r.x+i.x,y:r.y,z:r.z+i.z};R_(e,t,a.x,a.y,a.z,r.typeId)&&n.push({...a,stateId:s})}}function R_(e,t,n,r,i,a){if(r<-64||r>319)return!1;let o=e.getStateIdIfLoaded(n,r,i);if(o===null)return!1;let s=t.getState(o);if(s.typeId===a)return Number(s.properties.level??0)>0;let c=t.getDefinitionForState(o);return c.replaceable===!0||c.renderLayer===`none`}function z_(e,t){let n=new Set;for(let r of t)e.setStateId(r.x,r.y,r.z,r.stateId),n.add(`${G(r.x)},${G(r.z)}`),Nl(r.x)===0&&n.add(`${G(r.x)-1},${G(r.z)}`),Nl(r.x)===15&&n.add(`${G(r.x)+1},${G(r.z)}`),Nl(r.z)===0&&n.add(`${G(r.x)},${G(r.z)-1}`),Nl(r.z)===15&&n.add(`${G(r.x)},${G(r.z)+1}`);return n}var B_={id:`overworld`,minY:-64,maxY:319,height:384,hasSkyLight:!0,hasCeiling:!1,skyType:`overworld`,timeProgression:`normal`,generator:`overworld`,defaultSpawn:{x:0,y:80,z:0}},V_=class{dimensions;constructor(e=[B_]){this.dimensions=new Map;for(let t of e)this.register(t)}register(e){if(this.dimensions.has(e.id))throw Error(`duplicate dimension: ${e.id}`);if(e.height!==e.maxY-e.minY+1)throw Error(`invalid dimension height for ${e.id}`);this.dimensions.set(e.id,e)}get(e){let t=this.dimensions.get(e);if(!t)throw Error(`unknown dimension: ${e}`);return t}},H_=class{seed;blockRegistry;dimensionRegistry;dimension;chunks;constructor(e){this.seed=e.seed,this.blockRegistry=e.blockRegistry??xl(),this.dimensionRegistry=e.dimensionRegistry??new V_([B_]),this.dimension=this.dimensionRegistry.get(e.dimensionId??`overworld`),this.chunks=new Map}getChunk(e,t){return this.chunks.get(zl(e,t))}getOrCreateChunk(e,t){let n=zl(e,t),r=this.chunks.get(n);return r||(r=new wg({chunkX:e,chunkZ:t}),this.chunks.set(n,r)),r}unloadChunk(e,t){let n=zl(e,t),r=this.chunks.get(n);return this.chunks.delete(n),r}getStateId(e,t,n){return this.getOrCreateChunk(G(e),G(n)).getStateId(Nl(e),t,Nl(n))}getStateIdIfLoaded(e,t,n){if(t<-64||t>319)return null;let r=this.getChunk(G(e),G(n));return r?r.getStateId(Nl(e),t,Nl(n)):null}getBlockTypeIdLoaded(e,t,n){let r=this.getStateIdIfLoaded(e,t,n);return r===null?null:this.blockRegistry.getState(r).typeId}isSolidBlockLoaded(e,t,n){let r=this.getStateIdIfLoaded(e,t,n);if(r===null)return!1;let i=this.blockRegistry.getState(r);return i.typeId===`door`&&i.properties.open===!0?!1:this.blockRegistry.getDefinitionForState(r).collision===`solid`}isFluidBlockLoaded(e,t,n){let r=this.getStateIdIfLoaded(e,t,n);return r===null?!1:this.blockRegistry.getDefinitionForState(r).collision===`fluid`}getBlockLightLevelLoaded(e,t,n){if(t<-64||t>319)return 0;let r=this.getChunk(G(e),G(n));return r?r.getBlockLight(Nl(e),t,Nl(n)):0}getMotionBlockingHeightLoaded(e,t){let n=this.getChunk(G(e),G(t));return n?n.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,Nl(e),Nl(t)):null}setStateId(e,t,n,r){this.getOrCreateChunk(G(e),G(n)).setStateId(Nl(e),t,Nl(n),r)}};function U_(e,t,n,r){let i=Math.hypot(n.x,n.y,n.z);if(i===0)return null;let a={x:n.x/i,y:n.y/i,z:n.z/i},o=Math.floor(t.x),s=Math.floor(t.y),c=Math.floor(t.z),l={x:0,y:0,z:0},u=0,d=W_(a.x),f=W_(a.y),p=W_(a.z),m=d===0?1/0:Math.abs(1/a.x),h=f===0?1/0:Math.abs(1/a.y),g=p===0?1/0:Math.abs(1/a.z),_=G_(t.x,o,a.x,d),v=G_(t.y,s,a.y,f),y=G_(t.z,c,a.z,p);for(;u<=r;){let t=e.getStateIdIfLoaded(o,s,c);if(t!==null&&e.blockRegistry.getDefinitionForState(t).collision===`solid`)return{block:{x:o,y:s,z:c},normal:l,distance:u,stateId:t};_<v&&_<y?(o+=d,u=_,_+=m,l={x:-d,y:0,z:0}):v<y?(s+=f,u=v,v+=h,l={x:0,y:-f,z:0}):(c+=p,u=y,y+=g,l={x:0,y:0,z:-p})}return null}function W_(e){return e>0?1:e<0?-1:0}function G_(e,t,n,r){return r===0?1/0:((r>0?t+1:t)-e)/n}function K_(e,t){if(!(e.blockDeltas.size>0)){for(let n of t.sections){let t=e.getSection(n.sectionY);t.palette=[...n.palette],t.paletteIndexByState=new Map(t.palette.map((e,t)=>[e,t])),t.blocks=new yg(El,n.bitsPerEntry),t.blocks.words.set(n.words)}for(let n of t.heightmaps)e.heightmaps.requireMap(n.type).set(n.values);e.status=t.status,e.dirty=!1}}`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})});var q_=document.querySelector(`#app`);if(!q_)throw Error(`missing app root`);var q=xl(),J_=`viewer-seed`,J=new H_({seed:J_,blockRegistry:q}),Y_=new xm({seed:J_,registry:q}),X_=new Rh,Z_=new URLSearchParams(window.location.search),Q_=new ag,$_={worldId:`overworld:${J_}`},ev=new Ng({world:J,generator:e=>{Y_.generateChunk(e,J),X_.applyToChunk(e,q)}}),Y=new xn;Y.background=new B(10274796);var tv=new b_(Z_.get(`startNight`)===`1`?13e3:1e3),X=new pl,nv=new Ta(65,window.innerWidth/window.innerHeight,.1,1200),rv=new dl({antialias:!0}),iv=Z_.get(`highRes`)===`1`?2:1.5;rv.setPixelRatio(Math.min(window.devicePixelRatio,iv)),rv.setSize(window.innerWidth,window.innerHeight),q_.appendChild(rv.domElement),q_.addEventListener(`pointerdown`,()=>X.resumeFromGesture(),{capture:!0});var av=document.createElement(`div`);av.className=`world-tint`,q_.appendChild(av);var ov=document.createElement(`div`);ov.className=`underwater-tint`,q_.appendChild(ov);var sv=document.createElement(`div`);sv.className=`game-notice`,q_.appendChild(sv);var cv=null,lv=new Oa(16777215,1.8);lv.position.set(30,80,20),Y.add(lv);var uv=new ka(8359846,.8);Y.add(uv);var dv=Y.background instanceof B?Y.background:new B(10274796);Y.background=dv;var fv=Lx(`sun`),pv=Lx(`moon`);Y.add(fv,pv);var mv=new R,hv=tv.visuals(),gv=0,_v=5,vv=8,yv=1,bv=ev.ensureAreaFull(-0,gv,-0,gv),xv=new Map,Sv=new Map,Cv=new Map,wv=new Map,Tv=new Map,Ev=new Set,Dv=new Map,Ov=new Map,kv=new Map,Av=new Map,jv=new Set,Mv=1,Nv=ew(),Pv=Array(Nv.length).fill(0),Fv=0,Iv=new Gl,Lv=new Map,Rv=new vu,zv=new Map,Bv=new Map,Vv=new td,Hv=new Map,Uv=new Ff,Wv=new Map,Gv=new Dd,Kv=new Map,qv=[],Jv=0,Yv=0,Xv=0,Zv=new Set,Qv=.035,$v=Px(180),ey=Px(900),ty=Px(80),ny=Px(80),ry=Px(180),iy=Px(180),ay=Px(180),oy=Px(80),sy=Px(120),cy=Px(180),ly=Px(120),uy={};window.__pinecraftPerf=()=>uy,jx();for(let e of bv)e.mesh&&zC(e.chunk.chunkX,e.chunk.chunkZ,e.mesh);hw();var dy=UT(),fy={...dy},Z=new Ch(fy),py=new Ih,my=G(Math.floor(Z.state.position.x)),hy=G(Math.floor(Z.state.position.z)),gy=Z.eyePosition().y,_y=Z.state.position.y,vy=GT(tv.visuals().sunDirection),yy=KT(tv.visuals().sunDirection);VC(!0);var by=performance.now(),xy=!1,Sy=!1,Cy=!1,wy=!1,Ty=!1,Ey=!1,Dy=!1,Oy=null,ky=new Set,Q=null,Ay=0,jy=0,My=0,Ny=0,Py=0,Fy=0,Iy=``,Ly=0,Ry=9,zy=36,By=27,Vy=34,Hy=48,Uy=48,Wy=.55,Gy=12,Ky=2.45,$=new Mh(TT(),0),qy=new Map,Jy=null,Yy=null,Xy=new Map,Zy={helmet:null,chestplate:null,leggings:null,boots:null},Qy=[{id:`planks`,label:`木材 x4`,gridSize:2,ingredients:[{label:`log`,count:1}],output:()=>DT(`planks`,q.resolveState(`planks`),4)},{id:`stick`,label:`棒 x4`,gridSize:2,ingredients:[{label:`planks`,count:2}],output:()=>jT(`stick`,4)},{id:`crafting_table`,label:`作業台`,gridSize:2,ingredients:[{label:`planks`,count:4}],output:()=>DT(`crafting_table`,q.resolveState(`crafting_table`),1)},{id:`wood_sword`,label:`木の剣`,gridSize:3,ingredients:[{label:`planks`,count:2},{label:`stick`,count:1}],output:()=>kT(`wood_sword`,`sword`,`wood`,5,1,59)},{id:`wood_pickaxe`,label:`木のツルハシ`,gridSize:3,ingredients:[{label:`planks`,count:3},{label:`stick`,count:2}],output:()=>kT(`wood_pickaxe`,`pickaxe`,`wood`,3,2,59)},{id:`wood_axe`,label:`木の斧`,gridSize:3,ingredients:[{label:`planks`,count:3},{label:`stick`,count:2}],output:()=>kT(`wood_axe`,`axe`,`wood`,6,2.2,59)},{id:`wood_shovel`,label:`木のシャベル`,gridSize:3,ingredients:[{label:`planks`,count:1},{label:`stick`,count:2}],output:()=>kT(`wood_shovel`,`shovel`,`wood`,4,1.8,59)},{id:`wood_hoe`,label:`木のクワ`,gridSize:3,ingredients:[{label:`planks`,count:2},{label:`stick`,count:2}],output:()=>kT(`wood_hoe`,`hoe`,`wood`,2,1.4,59)},{id:`stone_sword`,label:`石の剣`,gridSize:3,ingredients:[{label:`stone`,count:2},{label:`stick`,count:1}],output:()=>kT(`stone_sword`,`sword`,`stone`,7,1,131)},{id:`stone_pickaxe`,label:`石のツルハシ`,gridSize:3,ingredients:[{label:`stone`,count:3},{label:`stick`,count:2}],output:()=>kT(`stone_pickaxe`,`pickaxe`,`stone`,5,3.2,131)},{id:`stone_axe`,label:`石の斧`,gridSize:3,ingredients:[{label:`stone`,count:3},{label:`stick`,count:2}],output:()=>kT(`stone_axe`,`axe`,`stone`,8,3.8,131)},{id:`stone_shovel`,label:`石のシャベル`,gridSize:3,ingredients:[{label:`stone`,count:1},{label:`stick`,count:2}],output:()=>kT(`stone_shovel`,`shovel`,`stone`,5,3,131)},{id:`stone_hoe`,label:`石のクワ`,gridSize:3,ingredients:[{label:`stone`,count:2},{label:`stick`,count:2}],output:()=>kT(`stone_hoe`,`hoe`,`stone`,3,2.2,131)},{id:`furnace`,label:`かまど`,gridSize:3,ingredients:[{label:`cobblestone`,count:8}],output:()=>DT(`furnace`,q.resolveState(`furnace`),1)},{id:`chest`,label:`チェスト`,gridSize:3,ingredients:[{label:`planks`,count:8}],output:()=>DT(`chest`,q.resolveState(`chest`),1)},{id:`door`,label:`ドア x3`,gridSize:3,ingredients:[{label:`planks`,count:6}],output:()=>DT(`door`,q.resolveState(`door`),3)},{id:`bread`,label:`パン`,gridSize:3,ingredients:[{label:`wheat`,count:3}],output:()=>OT(`bread`,1,5,.6)},{id:`torch`,label:`松明 x4`,gridSize:3,ingredients:[{label:`coal`,count:1},{label:`stick`,count:1}],output:()=>DT(`torch`,q.resolveState(`torch`),4)},{id:`iron_ingot`,label:`鉄インゴット`,gridSize:0,station:`furnace`,ingredients:[{label:`raw_iron`,count:1},{label:`coal`,count:1}],output:()=>jT(`iron_ingot`,1)},{id:`gold_ingot`,label:`金インゴット`,gridSize:0,station:`furnace`,ingredients:[{label:`raw_gold`,count:1},{label:`coal`,count:1}],output:()=>jT(`gold_ingot`,1)},{id:`cooked_beef`,label:`ステーキ`,gridSize:0,station:`furnace`,ingredients:[{label:`raw_beef`,count:1},{label:`coal`,count:1}],output:()=>OT(`cooked_beef`,1,8,.8)},{id:`cooked_porkchop`,label:`焼き豚`,gridSize:0,station:`furnace`,ingredients:[{label:`raw_porkchop`,count:1},{label:`coal`,count:1}],output:()=>OT(`cooked_porkchop`,1,8,.8)},{id:`iron_sword`,label:`鉄の剣`,gridSize:3,ingredients:[{label:`iron_ingot`,count:2},{label:`stick`,count:1}],output:()=>kT(`iron_sword`,`sword`,`iron`,9,1,250)},{id:`iron_pickaxe`,label:`鉄のツルハシ`,gridSize:3,ingredients:[{label:`iron_ingot`,count:3},{label:`stick`,count:2}],output:()=>kT(`iron_pickaxe`,`pickaxe`,`iron`,6,5.2,250)},{id:`iron_axe`,label:`鉄の斧`,gridSize:3,ingredients:[{label:`iron_ingot`,count:3},{label:`stick`,count:2}],output:()=>kT(`iron_axe`,`axe`,`iron`,9,5.5,250)},{id:`iron_shovel`,label:`鉄のシャベル`,gridSize:3,ingredients:[{label:`iron_ingot`,count:1},{label:`stick`,count:2}],output:()=>kT(`iron_shovel`,`shovel`,`iron`,6,4.6,250)},{id:`iron_hoe`,label:`鉄のクワ`,gridSize:3,ingredients:[{label:`iron_ingot`,count:2},{label:`stick`,count:2}],output:()=>kT(`iron_hoe`,`hoe`,`iron`,4,3.2,250)},{id:`iron_helmet`,label:`鉄のヘルメット`,gridSize:3,ingredients:[{label:`iron_ingot`,count:5}],output:()=>AT(`iron_helmet`,`helmet`,2,165)},{id:`iron_chestplate`,label:`鉄のチェストプレート`,gridSize:3,ingredients:[{label:`iron_ingot`,count:8}],output:()=>AT(`iron_chestplate`,`chestplate`,6,240)},{id:`iron_leggings`,label:`鉄のレギンス`,gridSize:3,ingredients:[{label:`iron_ingot`,count:7}],output:()=>AT(`iron_leggings`,`leggings`,5,225)},{id:`iron_boots`,label:`鉄のブーツ`,gridSize:3,ingredients:[{label:`iron_ingot`,count:4}],output:()=>AT(`iron_boots`,`boots`,2,195)}],$y=[{id:`farmer_apple`,villager:`farmer`,label:`リンゴ x3`,maxUses:8,requiredLevel:1,xp:2,ingredients:[{label:`emerald`,count:1}],output:()=>OT(`apple`,3,4,.3)},{id:`farmer_emerald_for_logs`,villager:`farmer`,label:`エメラルド`,maxUses:6,requiredLevel:1,xp:3,ingredients:[{label:`log`,count:12}],output:()=>jT(`emerald`,1)},{id:`librarian_torches`,villager:`librarian`,label:`松明 x12`,maxUses:8,requiredLevel:1,xp:2,ingredients:[{label:`emerald`,count:1},{label:`coal`,count:1}],output:()=>DT(`torch`,q.resolveState(`torch`),12)},{id:`librarian_emerald_for_coal`,villager:`librarian`,label:`エメラルド`,maxUses:6,requiredLevel:1,xp:3,ingredients:[{label:`coal`,count:10}],output:()=>jT(`emerald`,1)},{id:`mason_emerald_for_cobble`,villager:`mason`,label:`エメラルド`,maxUses:6,requiredLevel:1,xp:3,ingredients:[{label:`cobblestone`,count:18}],output:()=>jT(`emerald`,1)},{id:`mason_stone_bundle`,villager:`mason`,label:`石 x24`,maxUses:8,requiredLevel:1,xp:2,ingredients:[{label:`emerald`,count:1}],output:()=>DT(`stone`,q.resolveState(`stone`),24)},{id:`farmer_bread`,villager:`farmer`,label:`パン x4`,maxUses:6,requiredLevel:2,xp:5,ingredients:[{label:`emerald`,count:1},{label:`wheat`,count:3}],output:()=>OT(`bread`,4,5,.6)},{id:`librarian_lamp`,villager:`librarian`,label:`ランプ`,maxUses:5,requiredLevel:2,xp:6,ingredients:[{label:`emerald`,count:2},{label:`coal`,count:2}],output:()=>DT(`lamp`,q.resolveState(`lamp`),1)},{id:`mason_stonecutter`,villager:`mason`,label:`石切台`,maxUses:4,requiredLevel:2,xp:6,ingredients:[{label:`emerald`,count:2},{label:`cobblestone`,count:8}],output:()=>DT(`stonecutter`,q.resolveState(`stonecutter`),1)}],eb=!1,tb=null,nb=0,rb=0,ib=0,ab=!1,ob=`player`,sb=new Ei(new Ii(new H(1.02,1.02,1.02)),new mi({color:16054271,linewidth:2}));sb.visible=!1,Y.add(sb);var cb=new mi({color:1052688,transparent:!0,opacity:0}),lb=new Ei(new Ii(new H(1.06,1.06,1.06)),cb);lb.visible=!1,Y.add(lb);var ub=Z_.get(`debugGrid`)===`1`;if(ub){let e=new Ka(64,64,3028032,7635082);e.position.set(8,63.01,8),Y.add(e)}var db=document.createElement(`div`);db.className=`hud`,db.textContent=`Phase 1 terrain | seed: ${J_} | chunks: ${bv.length} | faces: ${Jv}${ub?` | debug grid`:``}`,q_.appendChild(db);var fb=document.createElement(`div`);fb.className=`crosshair`,q_.appendChild(fb);var pb=document.createElement(`div`);pb.className=`mining-bar`,pb.innerHTML=`<div class="mining-bar-fill"></div>`,q_.appendChild(pb);var mb=document.createElement(`div`);mb.className=`damage-flash`,q_.appendChild(mb);var hb=document.createElement(`div`);hb.className=`eat-effect`,hb.textContent=`+`,q_.appendChild(hb);var gb=document.createElement(`div`);gb.className=`attack-swipe`,q_.appendChild(gb);var _b=document.createElement(`div`);_b.className=`held-item`,_b.innerHTML=`<div class="held-arm"></div><div class="held-item-icon"></div>`,q_.appendChild(_b);var vb=document.createElement(`div`);vb.className=`survival-hud`,vb.innerHTML=`<div class="air"></div><div class="armor"></div><div class="hearts"></div><div class="hunger"></div>`,q_.appendChild(vb);var yb=vb.querySelector(`.air`),bb=vb.querySelector(`.armor`),xb=vb.querySelector(`.hearts`),Sb=vb.querySelector(`.hunger`),Cb=!1,wb=-1,Tb=-1,Eb=-1,Db=-1,Ob={forward:0,strafe:0,jump:!1,sprint:!1,movePointerId:null,moveCenterX:0,moveCenterY:0,lookPointerId:null,lookX:0,lookY:0},kb=navigator.maxTouchPoints>0||window.matchMedia(`(pointer: coarse)`).matches,Ab=0;vT();var jb=document.createElement(`div`);jb.className=`game-over`,jb.innerHTML=`
  <div class="game-over-panel">
    <h1>Game Over</h1>
    <p class="game-over-message">力尽きました</p>
    <button type="button">Respawn</button>
  </div>
`;var Mb=jb.querySelector(`.game-over-message`);jb.querySelector(`button`)?.addEventListener(`click`,()=>Wx()),q_.appendChild(jb);var Nb=document.createElement(`div`);Nb.className=`pause-menu`,Nb.innerHTML=`
  <div class="pause-panel">
    <h2>Game Menu</h2>
    <button type="button" data-action="resume">ゲームに戻る</button>
    <button type="button" data-action="save">保存</button>
    <button type="button" data-action="export">保存データを書き出す</button>
    <button type="button" data-action="import">保存データを読み込む</button>
    <button type="button" data-action="save-title">保存してタイトルへ</button>
    <button type="button" data-action="title">タイトルへ戻る</button>
    <p>Esc で閉じる</p>
  </div>
`,Nb.querySelector(`[data-action="resume"]`)?.addEventListener(`click`,()=>Kx()),Nb.querySelector(`[data-action="save"]`)?.addEventListener(`click`,()=>void Yx()),Nb.querySelector(`[data-action="export"]`)?.addEventListener(`click`,()=>void Qx()),Nb.querySelector(`[data-action="import"]`)?.addEventListener(`click`,()=>$x()),Nb.querySelector(`[data-action="save-title"]`)?.addEventListener(`click`,()=>void qx()),Nb.querySelector(`[data-action="title"]`)?.addEventListener(`click`,()=>void Jx(`タイトルへ戻りました`)),q_.appendChild(Nb);var Pb=document.createElement(`div`);Pb.className=`title-screen visible`,Pb.innerHTML=`
  <canvas class="title-panorama" width="768" height="432" aria-hidden="true"></canvas>
  <div class="title-vignette"></div>
  <div class="title-content">
    <div class="title-logo" aria-label="PINECRAFT">
      <span>PINECRAFT</span>
    </div>
    <div class="title-splash">Needles included!</div>
    <div class="title-menu">
      <button type="button" data-action="continue">続きから</button>
      <button type="button" data-action="new">新しく始める</button>
      <button type="button" data-action="import">保存データを取り込む</button>
      <button type="button" data-action="delete">保存データを削除</button>
    </div>
    <div class="title-submenu">
      <span>WASD 移動</span>
      <span>Mouse 視点</span>
      <span>F5 保存</span>
      <span>F9 読込</span>
    </div>
  </div>
  <div class="title-footer">
    <span>Voxel Survival Prototype</span>
    <span>Java Edition inspired systems</span>
  </div>
`;var Fb=Pb.querySelector(`[data-action="continue"]`),Ib=Pb.querySelector(`[data-action="new"]`),Lb=Pb.querySelector(`[data-action="import"]`),Rb=Pb.querySelector(`[data-action="delete"]`);Fb?.addEventListener(`click`,()=>void aS()),Ib?.addEventListener(`click`,()=>oS()),Lb?.addEventListener(`click`,()=>$x()),Rb?.addEventListener(`click`,()=>void Zx({refreshTitle:!0})),q_.appendChild(Pb);var zb=Pb.querySelector(`.title-panorama`);zb&&xS(zb);var Bb=document.createElement(`div`);Bb.className=`hotbar`;var Vb=Array.from({length:Ry},(e,t)=>{let n=document.createElement(`button`);return n.className=`hotbar-slot`,n.type=`button`,n.title=$.slots[t]?.label??`empty`,n.innerHTML=`<span class="hotbar-key">${t+1}</span><span class="hotbar-item"></span><span class="hotbar-count"></span>`,n.addEventListener(`click`,()=>{Cy&&(wT(t),Jb())}),Bb.appendChild(n),n});q_.appendChild(Bb);var Hb=document.createElement(`div`);Hb.className=`crafting-panel`,q_.appendChild(Hb),Dw(),Nw();var Ub=document.createElement(`div`);Ub.className=`controls-help`,Ub.innerHTML=[`<strong>操作</strong>`,`WASD 移動`,`Mouse 視点`,`左長押し 採掘`,`右クリック 設置/食べる/装備`,`村人 右クリック 取引`,`左クリック 敵を攻撃`,`1-9 スロット選択`,`E/I インベントリ`,`取引画面 Esc/×で閉じる`,`作業台 右クリック`,`Space ジャンプ`,`Shift ダッシュ`,`スマホ 左スティック移動`,`スマホ 右側ドラッグ視点`,`スマホ A/B 採掘/設置`,`N 夜にする`,`F5 保存`,`F9 読込`,`Esc メニュー`].map(e=>`<div>${e}</div>`).join(``),q_.appendChild(Ub);var Wb=Zb();q_.appendChild(Wb);var Gb=document.createElement(`div`);Gb.className=`save-panel`,Gb.innerHTML=`
  <button type="button" data-action="save">Save</button>
  <button type="button" data-action="load">Load</button>
  <button type="button" data-action="export">Export</button>
  <button type="button" data-action="import">Import</button>
  <button type="button" data-action="delete">Reset Save</button>
  <span class="save-status">未保存</span>
`;var Kb=Gb.querySelector(`.save-status`);Gb.querySelector(`[data-action="save"]`)?.addEventListener(`click`,()=>void Yx()),Gb.querySelector(`[data-action="load"]`)?.addEventListener(`click`,()=>void Xx()),Gb.querySelector(`[data-action="export"]`)?.addEventListener(`click`,()=>void Qx()),Gb.querySelector(`[data-action="import"]`)?.addEventListener(`click`,()=>$x()),Gb.querySelector(`[data-action="delete"]`)?.addEventListener(`click`,()=>void Zx()),q_.appendChild(Gb);var qb=document.createElement(`input`);qb.type=`file`,qb.accept=`application/json,.json`,qb.className=`save-import-input`,qb.addEventListener(`change`,()=>void eS()),q_.appendChild(qb),window.addEventListener(`keydown`,e=>{if(X.resumeFromGesture(),!Cy){(e.code===`Enter`||e.code===`NumpadEnter`)&&(e.preventDefault(),Fb&&!Fb.disabled?aS():oS());return}if(e.code===`Escape`){if(e.preventDefault(),ab){kw({requestPointerLock:!0});return}Ty?Kx():Sy||Gx();return}if(e.code===`F5`){e.preventDefault(),Yx();return}if(e.code===`F9`){e.preventDefault(),Xx();return}if(Sy)return;let t=zT(e.code);if(t!==null&&t<Ry&&wT(t),e.code===`KeyN`&&(tv.timeOfDay=13e3),e.code===`KeyE`||e.code===`KeyI`){e.preventDefault(),Ow();return}ky.add(e.code),e.code===`Space`&&e.preventDefault()}),window.addEventListener(`keyup`,e=>{ky.delete(e.code)}),rv.domElement.addEventListener(`click`,()=>{X.resumeFromGesture(),!nx()&&Cy&&(Ty||Sy||Jb())}),rv.domElement.addEventListener(`contextmenu`,e=>{e.preventDefault()}),rv.domElement.addEventListener(`mousedown`,e=>{if(X.resumeFromGesture(),!nx()&&Cy&&!Ty&&!Sy){if(document.pointerLockElement!==rv.domElement){Jb();return}if(e.button===0){ix();return}e.button===2&&ox()}}),window.addEventListener(`mouseup`,e=>{e.button===0&&US()}),document.addEventListener(`pointerlockchange`,()=>{let e=document.pointerLockElement===rv.domElement;e||(US(),Ey&&Cy&&!Sy&&!ab&&!Ty&&(Dy?Dy=!1:Gx({pointerAlreadyReleased:!0}))),Ey=e}),window.addEventListener(`mousemove`,e=>{Cy&&(Ty||Sy||document.pointerLockElement===rv.domElement&&(vy-=e.movementX*.0022,yy-=e.movementY*.0022,yy=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,yy))))}),rv.domElement.addEventListener(`pointerdown`,e=>{!ex(e)||e.target!==rv.domElement||!Cy||Ty||Sy||(tx(),Ob.lookPointerId=e.pointerId,Ob.lookX=e.clientX,Ob.lookY=e.clientY,rv.domElement.setPointerCapture(e.pointerId))}),rv.domElement.addEventListener(`pointermove`,e=>{if(!ex(e)||Ob.lookPointerId!==e.pointerId||Ty||Sy)return;tx();let t=e.clientX-Ob.lookX,n=e.clientY-Ob.lookY;Ob.lookX=e.clientX,Ob.lookY=e.clientY,vy-=t*.0042,yy-=n*.0042,yy=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,yy))}),rv.domElement.addEventListener(`pointerup`,e=>{Ob.lookPointerId===e.pointerId&&(Ob.lookPointerId=null)}),rv.domElement.addEventListener(`pointercancel`,e=>{Ob.lookPointerId===e.pointerId&&(Ob.lookPointerId=null)});function Jb(){rv.domElement.requestPointerLock()?.catch(()=>{})}function Yb(){document.exitPointerLock()?.catch(()=>{})}function Xb(){document.pointerLockElement===rv.domElement&&(Dy=!0,Yb())}function Zb(){let e=document.createElement(`div`);e.className=`mobile-controls`,e.innerHTML=`
    <div class="mobile-joystick" data-mobile-control="move" aria-label="移動">
      <div class="mobile-joystick-knob"></div>
    </div>
    <div class="mobile-buttons" data-mobile-control="buttons">
      <button type="button" class="mobile-button small" data-action="pause" aria-label="メニュー">☰</button>
      <button type="button" class="mobile-button small" data-action="craft" aria-label="クラフト">E</button>
      <button type="button" class="mobile-button" data-action="sprint" aria-label="ダッシュ">RUN</button>
      <button type="button" class="mobile-button" data-action="jump" aria-label="ジャンプ">JMP</button>
      <button type="button" class="mobile-button primary" data-action="attack" aria-label="攻撃と採掘">A</button>
      <button type="button" class="mobile-button secondary" data-action="place" aria-label="設置と食べる">B</button>
    </div>
  `;let t=e.querySelector(`.mobile-joystick`),n=e.querySelector(`.mobile-joystick-knob`);t?.addEventListener(`pointerdown`,e=>{if(!ex(e)&&e.pointerType!==`mouse`)return;tx(),e.preventDefault(),Ob.movePointerId=e.pointerId;let r=t.getBoundingClientRect();Ob.moveCenterX=r.left+r.width/2,Ob.moveCenterY=r.top+r.height/2,t.setPointerCapture(e.pointerId),$b(e.clientX,e.clientY,n)}),t?.addEventListener(`pointermove`,e=>{Ob.movePointerId===e.pointerId&&(tx(),e.preventDefault(),$b(e.clientX,e.clientY,n))});let r=e=>{Ob.movePointerId===e.pointerId&&(tx(),Ob.movePointerId=null,Ob.forward=0,Ob.strafe=0,n&&(n.style.transform=`translate(-50%, -50%)`))};return t?.addEventListener(`pointerup`,r),t?.addEventListener(`pointercancel`,r),Qb(e,`attack`,{down:ix,up:ax}),Qb(e,`place`,{down:ox}),Qb(e,`jump`,{down:()=>{Ob.jump=!0},up:()=>{Ob.jump=!1}}),Qb(e,`sprint`,{down:()=>{Ob.sprint=!0},up:()=>{Ob.sprint=!1}}),Qb(e,`craft`,{down:Ow}),Qb(e,`pause`,{down:()=>{Ty?Kx():Cy&&!Sy&&Gx({pointerAlreadyReleased:!0})}}),e.classList.toggle(`enabled`,kb),e}function Qb(e,t,n){let r=e.querySelector(`[data-action="${t}"]`);if(!r)return;r.addEventListener(`pointerdown`,e=>{tx(),e.preventDefault(),r.setPointerCapture(e.pointerId),r.classList.add(`pressed`),n.down?.()});let i=e=>{tx(),e.preventDefault(),r.classList.remove(`pressed`),n.up?.()};r.addEventListener(`pointerup`,i),r.addEventListener(`pointercancel`,i)}function $b(e,t,n){let r=e-Ob.moveCenterX,i=t-Ob.moveCenterY,a=Math.min(54,Math.hypot(r,i)),o=Math.atan2(i,r),s=Math.cos(o)*a,c=Math.sin(o)*a,l=Math.abs(s)<8?0:s/54,u=Math.abs(c)<8?0:c/54;Ob.strafe=l,Ob.forward=-u,n&&(n.style.transform=`translate(calc(-50% + ${s.toFixed(1)}px), calc(-50% + ${c.toFixed(1)}px))`)}function ex(e){return e.pointerType===`touch`||e.pointerType===`pen`}function tx(){Ab=performance.now()}function nx(){return kb&&performance.now()-Ab<700}function rx(e){return Math.max(-1,Math.min(1,e))}function ix(){if(X.resumeFromGesture(),!(!Cy||Ty||Sy||ab)){if(kS()){US();return}eb=!0}}function ax(){US()}function ox(){if(X.resumeFromGesture(),!Cy||Ty||Sy)return;let e=$.selectedSlot(),t=Q?q.getState(Q.stateId).typeId:null;if(t===`door`&&Q){dx(Q.block.x,Q.block.y,Q.block.z,Q.stateId);return}if(t===`bell`&&Q){fx(Q.block.x,Q.block.y,Q.block.z);return}if(e.armor){wS();return}let n=NS();if(n&&n.distance<(Q?.distance??1/0)+.05){Mw(n.villager.id);return}if(t===`bed`&&Q){sx(Q.block.x,Q.block.y,Q.block.z);return}if(t===`farmland`&&Q&&e.item?.id===`seeds`){cx(Q.block.x,Q.block.y,Q.block.z);return}if((t===`grass`||t===`dirt`)&&Q&&e.tool?.kind===`hoe`){lx(Q.block.x,Q.block.y,Q.block.z);return}if(t===`crafting_table`){Aw(`workbench`);return}if(t===`furnace`){Aw(`furnace`);return}if(t===`chest`&&Q){jw(Q.block.x,Q.block.y,Q.block.z);return}if(e.food){CS();return}if(!Q)return;let r={x:Q.block.x+Q.normal.x,y:Q.block.y+Q.normal.y,z:Q.block.z+Q.normal.z};if(e.stateId!==null&&q.getState(e.stateId).typeId===`door`){ux(r.x,r.y,r.z);return}if(!ES(r.x,r.y,r.z))return;let i=$.removeOneSelected();if(i===null){Dw();return}SS(r.x,r.y,r.z,i),X.playPlace(HT(i)),IS(`place`),Dw()}function sx(e,t,n){if(!S_(tv.timeOfDay)){wx(e,t,n),Dx(`リスポーン地点を設定しました。夜だけ眠れます。`);return}if(Ex(e,t,n)){Dx(`近くにモンスターがいるため眠れません`);return}wx(e,t,n),tv.timeOfDay=C_(),hv=tv.visuals(),kx(0),FC(),py.reset({...py.state,airTicks:300}),vT(),Dx(`夜を明かしました`,{sleeping:!0})}function cx(e,t,n){let r=t+1;J.getStateIdIfLoaded(e,r,n)===0&&$.removeItems([{label:`seeds`,count:1}])&&(SS(e,r,n,q.resolveState(`wheat`,{age:0})),X.playPlace(`grass`),IS(`place`),Dw())}function lx(e,t,n){if(J.getStateIdIfLoaded(e,t+1,n)!==0){Dx(`上が空いていないため耕せません`);return}SS(e,t,n,q.resolveState(`farmland`)),LT(1),py.addExhaustion(.005),X.playPlace(`dirt`),IS(`mine`),Dw()}function ux(e,t,n){if(!ES(e,t,n)||!ES(e,t+1,n)){Dx(`ドアを置くには2ブロック分の空きが必要です`);return}if($.removeOneSelected()===null){Dw();return}let r=Sx(vy);SS(e,t,n,q.resolveState(`door`,{facing:r,half:`lower`,open:!1})),SS(e,t+1,n,q.resolveState(`door`,{facing:r,half:`upper`,open:!1})),X.playPlace(`wood`),IS(`place`),Dw()}function dx(e,t,n,r){let i=q.getState(r);i.typeId===`door`&&(bx(e,t,n,r,i.properties.open!==!0),X.playPlace(`wood`),IS(`place`))}function fx(e,t,n){let r={x:e+.5,y:t+.5,z:n+.5},i=px(r),a=mx(r),o=hx(r);vx(r),X.playBell(),IS(`place`),i+a>0||o>0?Dx(`鐘が鳴りました。${[i>0?`${i}人が避難`:``,a>0?`${a}人が警戒`:``,o>0?`敵${o}体を発見`:``].filter(Boolean).join(` / `)}`):Dx(`鐘が鳴りました`)}function px(e){let t=0;for(let n of Uv.villagers)yx(e,n.position)>Vy||(Gf(n,e,9),t+=1);return t}function mx(e){let t=0;for(let n of Gv.guards)yx(e,n.position)>Hy||(Od(n,e,gx(e,n.id+700)??{x:e.x,y:n.home.y,z:e.z},14),t+=1);return t}function hx(e){let t=0;for(let n of Rv.mobs)yx(e,n.position)>Uy||(yu(n,10),t+=1);return t}function gx(e,t){let n=Math.floor(e.x),r=Math.floor(e.z),i=[];for(let e=2;e<=7;e+=1)for(let n=0;n<8;n+=1){let r=(n+t*.37)/8*Math.PI*2;i.push({x:Math.round(Math.cos(r)*e),z:Math.round(Math.sin(r)*e)})}i.sort((e,n)=>_x(e,n,t));for(let t of i){let i=n+t.x,a=r+t.z,o=J.getMotionBlockingHeightLoaded(i,a);if(o==null||o>Math.floor(e.y))continue;let s=o+1;if(!(Math.abs(s-e.y)>6)&&!(J.isSolidBlockLoaded(i,s,a)||J.isSolidBlockLoaded(i,s+1,a))&&!J.isFluidBlockLoaded?.(i,s,a))return{x:i+.5,y:s,z:a+.5}}return null}function _x(e,t,n){return Math.sin((e.x*31+e.z*17+n*13)*12.9898)-Math.sin((t.x*31+t.z*17+n*13)*12.9898)}function vx(e){LS({x:e.x,y:e.y+.12,z:e.z},14,[16765286,14263872,9132573])}function yx(e,t){return Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z)}function bx(e,t,n,r,i){let a=q.getState(r);if(a.typeId!==`door`)return;let o=a.properties.half===`upper`?t-1:t,s=J.getStateIdIfLoaded(e,o,n),c=J.getStateIdIfLoaded(e,o+1,n),l=Cx((s!==null&&q.getState(s).typeId===`door`?q.getState(s):a).properties.facing);xx(e,o,n,s,l,i),xx(e,o+1,n,c,l,i)}function xx(e,t,n,r,i,a){if(r===null)return;let o=q.getState(r);if(o.typeId!==`door`)return;let s=o.properties.half===`upper`?`upper`:`lower`;SS(e,t,n,q.resolveState(`door`,{facing:i,half:s,open:a}))}function Sx(e){let t=(e%(Math.PI*2)+Math.PI*2)%(Math.PI*2);switch(Math.round(t/(Math.PI/2))%4){case 0:return`south`;case 1:return`east`;case 2:return`north`;default:return`west`}}function Cx(e){return e===`north`||e===`south`||e===`east`||e===`west`?e:`north`}function wx(e,t,n){fy=Tx(e,t,n)??{x:e+.5,y:t+1,z:n+.5}}function Tx(e,t,n){let r=[{x:e+1,z:n},{x:e-1,z:n},{x:e,z:n+1},{x:e,z:n-1},{x:e+1,z:n+1},{x:e-1,z:n-1},{x:e+1,z:n-1},{x:e-1,z:n+1}];for(let e of r){let n=J.getMotionBlockingHeightLoaded(e.x,e.z);if(n==null)continue;let r=n+1;if(!(Math.abs(r-(t+1))>2)&&!J.isSolidBlockLoaded(e.x,r,e.z)&&!J.isSolidBlockLoaded(e.x,r+1,e.z))return{x:e.x+.5,y:r,z:e.z+.5}}return null}function Ex(e,t,n){return Rv.mobs.some(r=>Math.hypot(r.position.x-(e+.5),r.position.z-(n+.5))<=8&&Math.abs(r.position.y-t)<=5)}function Dx(e,t={}){sv.textContent=e,sv.classList.toggle(`sleeping`,!!t.sleeping),sv.classList.add(`visible`),cv!==null&&window.clearTimeout(cv),cv=window.setTimeout(()=>{sv.classList.remove(`visible`,`sleeping`)},t.sleeping?1900:1500)}function Ox(){let e=performance.now(),t=Math.min(.05,(e-by)/1e3);by=e;let n=t*1e3;Fx($v,n),Fx(ey,n);let r=rx(Number(ky.has(`KeyW`))-Number(ky.has(`KeyS`))+Ob.forward),i=rx(Number(ky.has(`KeyD`))-Number(ky.has(`KeyA`))+Ob.strafe),a=Z.state.onGround,o=ky.has(`Space`)||Ob.jump,s=ky.has(`ShiftLeft`)||ky.has(`ShiftRight`)||Ob.sprint,c=r!==0||i!==0;if(ib=Math.max(0,ib-t),Cy&&!Ty&&!Sy){let e=performance.now();HC(r,i,t),Fx(iy,performance.now()-e);let n=performance.now();Z.step(J,{forward:r,strafe:i,jump:o,sprint:s,yaw:vy},t),Fx(ay,performance.now()-n),VC(),pw();let l=performance.now();fw(t),Fx(oy,performance.now()-l),gw(t),zx(t,a,o,s,c),Vx(t,s,c),py.tick(t,{eyesInWater:Z.state.eyesInWater}).drowningDamage>0&&(bT(),X.playDamage(),py.isDead()&&Hx(`drowning`)),kx(t);let u=performance.now();sC(t),cC(t),pC(t),_w(t),vC(t),Fx(sy,performance.now()-u),py.isDead()&&Hx(`generic`)}else kx(t);let l=Z.eyePosition();Math.abs(l.y-gy)>2.5||l.y<gy?gy=l.y:gy+=(l.y-gy)*Math.min(1,t*10),nv.position.set(l.x,gy,l.z),nv.rotation.order=`YXZ`,nv.rotation.y=vy,nv.rotation.x=yy,nv.getWorldDirection(mv),Q=Cy&&!Ty?U_(J,{x:l.x,y:gy,z:l.z},{x:mv.x,y:mv.y,z:mv.z},6):null,Q?(sb.visible=!0,sb.position.set(Q.block.x+.5,Q.block.y+.5,Q.block.z+.5)):sb.visible=!1,Cy&&!Ty&&!Sy&&DS(t),Cy&&!Ty&&iC(t),jC(),kC(),bC(),TC(),zS(t),vT(),Bx(),dw(e/1e3),Ax(t);let u=performance.now();if(rv.render(Y,nv),Fx(cy,performance.now()-u),!Sy)if(performance.now()-e<10){let e=performance.now();KC(XC(t)),JC(ZC(t)),Fx(ry,performance.now()-e)}else Fx(ry,0);requestAnimationFrame(Ox)}function kx(e){tv.advance(e);let t=tv.visuals();hv=t,dv.setHex(t.skyColor),lv.intensity=t.sunlightIntensity,uv.intensity=t.ambientIntensity,lv.position.set(t.sunDirection.x*80,t.sunDirection.y*90,t.sunDirection.z*80),av.style.opacity=String(t.skyDarkness),Rx(fv,t.sunDirection,t.sunVisible,38),Rx(pv,t.moonDirection,t.moonVisible,30)}function Ax(e){if(Ly+=e,Ly<.2)return;Ly=0;let t=Y_.sampleTerrain(Math.floor(Z.state.position.x),Math.floor(Z.state.position.z)),n=Ix($v),r=Ix(ey),i=Ix(ty),a=Ix(ny),o=Ix(ry),s=Ix(iy),c=Ix(ay),l=Ix(oy),u=Ix(sy),d=Ix(cy),f=Ix(ly);uy={chunks:xv.size,sections:Yv,loading:Sv.size,remesh:Ev.size,jobs:Cv.size,building:Ov.size,frame:n,longFrame:r,chunkQueue:o,terrainPreload:s,physics:c,fluid:l,mob:u,render:d,longAnimationFrame:f,chunkBuild:i,worker:a,faces:Jv,worldChunks:J.chunks.size},db.textContent=`Phase 1 walk | seed: ${J_} | chunks: ${xv.size} | sections: ${Yv} | loading: ${Sv.size} | remesh: ${Ev.size} | jobs: ${Cv.size}/${ow()} | building: ${Ov.size} | fps: ${Math.round(1e3/Math.max(1,n.average))} | p95: ${n.p95.toFixed(1)}ms | p99: ${r.p99.toFixed(1)}ms | max: ${r.max.toFixed(1)}ms | spikes: ${r.spikes} | q: ${o.last.toFixed(1)} | preload: ${s.last.toFixed(1)} | phys: ${c.last.toFixed(1)} | fluid: ${l.last.toFixed(1)} | mob: ${u.last.toFixed(1)} | render: ${d.last.toFixed(1)} | build: ${i.last.toFixed(1)}ms | worker: ${a.average.toFixed(0)}ms | loaf: ${f.last.toFixed(1)}/${f.max.toFixed(1)} | faces: ${Jv} | biome: ${t.biome.primary.id} | pos: ${Z.state.position.x.toFixed(1)}, ${Z.state.position.y.toFixed(1)}, ${Z.state.position.z.toFixed(1)} | slot ${$.selectedIndex+1}: ${$.selectedSlot().label} | mobs: ${Rv.mobs.length} | villagers: ${Uv.villagers.length} | guards: ${Gv.guards.length} | world: ${J.chunks.size} | saved: ${X_.size}${Z.state.inWater?` | water`:``} | time: ${Math.floor(tv.timeOfDay)}${ub?` | debug grid`:``}`}function jx(){if(`PerformanceObserver`in window)try{new PerformanceObserver(e=>{for(let t of e.getEntries())Cy&&Fx(ly,t.duration)}).observe({type:`long-animation-frame`,buffered:!0})}catch{}}function Mx(){for(let e of[$v,ey,ty,ny,ry,iy,ay,oy,sy,cy,ly])Nx(e)}function Nx(e){e.samples.fill(0),e.index=0,e.count=0,e.last=0}function Px(e){return{samples:new Float32Array(e),index:0,count:0,last:0}}function Fx(e,t){e.samples[e.index]=t,e.index=(e.index+1)%e.samples.length,e.count=Math.min(e.count+1,e.samples.length),e.last=t}function Ix(e){if(e.count===0)return{average:0,p95:0,p99:0,max:0,last:0,spikes:0};let t=Array.from(e.samples.slice(0,e.count)).sort((e,t)=>e-t);return{average:t.reduce((e,t)=>e+t,0)/t.length,p95:t[Math.min(t.length-1,Math.floor(t.length*.95))],p99:t[Math.min(t.length-1,Math.floor(t.length*.99))],max:t[t.length-1],last:e.last,spikes:t.filter(e=>e>34).length}}function Lx(e){let t=document.createElement(`canvas`);t.width=16,t.height=16;let n=t.getContext(`2d`);if(!n)throw Error(`failed to create celestial texture context`);n.imageSmoothingEnabled=!1,e===`sun`?(n.fillStyle=`#fff7d2`,n.fillRect(3,3,10,10),n.fillStyle=`#ffffff`,n.fillRect(4,4,8,8)):(n.fillStyle=`#d8dee9`,n.fillRect(3,3,10,10),n.fillStyle=`#8d96a6`,n.fillRect(4,5,3,2),n.fillRect(9,8,2,3),n.clearRect(10,3,3,10));let i=new Oi(t);i.colorSpace=Ve,i.magFilter=r,i.minFilter=r,i.generateMipmaps=!1;let a=new Fr(new xr({map:i,transparent:!0,depthWrite:!1,depthTest:!0}));return a.name=e,a}function Rx(e,t,n,r){let i=new R(t.x,t.y,t.z).normalize();e.visible=n,e.position.set(nv.position.x+i.x*520,nv.position.y+i.y*520,nv.position.z+i.z*520),e.scale.set(r,r,1)}function zx(e,t,n,r,i){if(i&&Z.state.onGround&&py.addExhaustion((r?.1:.01)*e),n&&!xy&&t&&py.addExhaustion(r?.2:.05),xy=n,Z.state.inWater){_y=Z.state.position.y;return}Z.state.onGround?(t||py.applyFallDamage(_y-Z.state.position.y)>0&&(bT(),X.playDamage(),py.isDead()&&Hx(`fall`)),_y=Z.state.position.y):_y=t?Z.state.position.y:Math.max(_y,Z.state.position.y)}function Bx(){let e=Z.state.eyesInWater?.48:Z.state.inWater?.16:0;ov.style.opacity=String(e)}function Vx(e,t,n){if(!n||!Z.state.onGround){Ay=0;return}Ay-=e,!(Ay>0)&&(X.playStep(VT()),Ay=t?.28:.42)}function Hx(e=`generic`){Sy||(Sy=!0,Ux(e),X.playDeath(),ky.clear(),US(),sb.visible=!1,Ty=!1,Nb.classList.remove(`visible`),document.pointerLockElement===rv.domElement&&Xb(),jb.classList.add(`visible`))}function Ux(e){Mb&&(Mb.textContent=jh(e))}function Wx(){Sy=!1,Ty=!1,Nb.classList.remove(`visible`),py.reset(),Z.state.position={...fy},Z.state.velocity={x:0,y:0,z:0},Z.state.onGround=!1,gy=Z.eyePosition().y,_y=Z.state.position.y,xy=!1,ky.clear(),US(),FC(),IC(),vT(),jb.classList.remove(`visible`)}function Gx(e={}){!Cy||Sy||Ty||(Ty=!0,ky.clear(),US(),kw({requestPointerLock:!1}),sb.visible=!1,Nb.classList.add(`visible`),e.pointerAlreadyReleased||Xb())}function Kx(){Ty&&(Ty=!1,Nb.classList.remove(`visible`),Jb())}async function qx(){await Yx(),await Jx(`保存してタイトルへ戻りました`)}async function Jx(e){Cy=!1,Ty=!1,Sy=!1,ky.clear(),US(),kw({requestPointerLock:!1}),Nw(),sb.visible=!1,Nb.classList.remove(`visible`),jb.classList.remove(`visible`),Pb.classList.add(`visible`),q_.classList.add(`title-active`),Gb.classList.remove(`visible`),Xb(),bS(),await iS(),yS(e)}async function Yx(){if(Cy)try{await Q_.saveWorld($_,lS()),yS(`保存しました`)}catch(e){console.warn(`save failed`,e),yS(`保存に失敗しました`)}}async function Xx(e={}){try{let t=await Q_.loadWorld($_);return t?(uS(t),yS(e.silent?`保存データを自動読込しました`:`読込しました`),!0):(e.silent||yS(`保存データがありません`),!1)}catch(e){return console.warn(`load failed`,e),yS(`読込に失敗しました`),!1}}async function Zx(e={}){try{await Q_.deleteWorld($_),yS(`保存データを削除しました`),e.refreshTitle&&await iS()}catch(e){console.warn(`delete save failed`,e),yS(`削除に失敗しました`)}}async function Qx(){try{let e=Cy?lS():await Q_.loadWorld($_);if(!e){yS(`書き出す保存データがありません`);return}Cy&&await Q_.saveWorld($_,e);let t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=nS(e),r.rel=`noopener`,document.body.appendChild(r),r.click(),r.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),5e3),yS(`保存データを書き出しました`)}catch(e){console.warn(`export save failed`,e),yS(`書き出しに失敗しました`)}}function $x(){qb.value=``,qb.click()}async function eS(){let e=qb.files?.[0];if(e)try{let t=tS(await e.text());await Q_.saveWorld($_,t),uS(t),sS(`保存データを取り込みました`),await iS()}catch(e){console.warn(`import save failed`,e),yS(`取り込みに失敗しました`),await iS()}}function tS(e){let t=JSON.parse(e);if(!Wh(t))throw Error(`unsupported or malformed world save`);return t}function nS(e){let t=new Date().toISOString().replace(/[:.]/g,`-`);return`pinecraft-${e.seed.replace(/[^a-z0-9_-]+/gi,`-`).replace(/^-+|-+$/g,``).slice(0,32)||`world`}-${t}.json`}async function rS(){Cy=!1,q_.classList.add(`title-active`),Pb.classList.add(`visible`),Gb.classList.remove(`visible`),ky.clear(),US(),bS(),await iS()}async function iS(){let e=await Q_.loadWorld($_)!==null;Fb&&(Fb.disabled=!e,Fb.textContent=e?`続きから`:`続きから（保存なし）`),Rb&&(Rb.disabled=!e)}async function aS(){if(!await Xx({silent:!0})){await iS();return}sS(`読込しました`)}function oS(){wy?cS():VC(!0),sS(`新しいワールドを開始しました`)}function sS(e){Mx(),Cy=!0,Ty=!1,Nb.classList.remove(`visible`),q_.classList.remove(`title-active`),Pb.classList.remove(`visible`),Gb.classList.add(`visible`),wy=!0,yS(e),Jb()}function cS(){Sy=!1,Ty=!1,Nb.classList.remove(`visible`),jb.classList.remove(`visible`),ky.clear(),US(),FC(),IC(),wC(),DC(),vS(),qy.clear(),Yy=null,_S(),J.chunks.clear(),ev.meshes.clear(),Sv.clear(),Dv.clear(),Cv.clear(),wv.clear(),Ev.clear(),X_.replace([]),fy={...dy},Z.state.position={...fy},Z.state.velocity={x:0,y:0,z:0},Z.state.onGround=!1,Z.state.inWater=!1,Z.state.eyesInWater=!1,py.reset(),dS(TT(),0),hS({}),tv.timeOfDay=Z_.get(`startNight`)===`1`?13e3:1e3,my=G(Math.floor(Z.state.position.x)),hy=G(Math.floor(Z.state.position.z)),gS(my,hy),gy=Z.eyePosition().y,_y=Z.state.position.y,xy=!1,Dw(),Nw(),vT()}function lS(){let e=new Map;for(let t of X_.entries())e.set(Pg(t.chunkX,t.chunkZ),{chunkX:t.chunkX,chunkZ:t.chunkZ,status:`FULL`,blockDeltas:t.blockDeltas});for(let t of J.chunks.values())t.blockDeltas.size!==0&&e.set(Pg(t.chunkX,t.chunkZ),Hh(t));return{version:0,seed:J_,dimensionId:J.dimension.id,time:tv.timeOfDay,chunks:Array.from(e.values()),containers:fS(),player:{position:{...Z.state.position},velocity:{...Z.state.velocity},respawnPoint:{...fy},health:py.state.health,foodLevel:py.state.foodLevel,saturation:py.state.saturation,exhaustion:py.state.exhaustion,airTicks:py.state.airTicks,selectedHotbarSlot:$.selectedIndex,hotbar:Uh($.slots),equippedArmor:mS()}}}function uS(e){Sy=!1,Ty=!1,Nb.classList.remove(`visible`),jb.classList.remove(`visible`),ky.clear(),US(),FC(),IC(),wC(),DC(),vS(),qy.clear(),Yy=null,_S(),J.chunks.clear(),ev.meshes.clear(),Sv.clear(),Dv.clear(),Cv.clear(),wv.clear(),Ev.clear(),X_.replace(e.chunks.map(e=>({chunkX:e.chunkX,chunkZ:e.chunkZ,blockDeltas:e.blockDeltas}))),pS(e.containers??[]),fy={...e.player.respawnPoint??dy},Z.state.position={...e.player.position},Z.state.velocity={...e.player.velocity},Z.state.onGround=!1,Z.state.inWater=!1,Z.state.eyesInWater=!1,py.reset({health:e.player.health,foodLevel:e.player.foodLevel,saturation:e.player.saturation,exhaustion:e.player.exhaustion,airTicks:e.player.airTicks}),e.player.hotbar.length>0?dS(e.player.hotbar,e.player.selectedHotbarSlot):$.select(Math.max(0,Math.min(Ry-1,e.player.selectedHotbarSlot))),hS(e.player.equippedArmor??{}),tv.timeOfDay=e.time,my=G(Math.floor(Z.state.position.x)),hy=G(Math.floor(Z.state.position.z)),gS(my,hy),gy=Z.eyePosition().y,_y=Z.state.position.y,xy=!1,Dw(),Nw(),vT()}function dS(e,t){let n=Uh(e);for(let e=0;e<$.slots.length;e+=1)$.slots[e]=n[e]??DT(`empty`,null,0);$.select(Math.max(0,Math.min(Ry-1,t)))}function fS(){let e=[];for(let[t,n]of qy){if(n.every(pT))continue;let[r,i,a]=t.split(`,`).map(Number);[r,i,a].every(Number.isInteger)&&e.push({x:r,y:i,z:a,slots:Uh(n)})}return e}function pS(e){qy.clear();for(let t of e){let e=ET(By),n=Uh(t.slots);for(let t=0;t<e.length;t+=1)e[t]=n[t]??DT(`empty`,null,0);qy.set(qS(t.x,t.y,t.z),e)}}function mS(){return{helmet:Zy.helmet?{...Zy.helmet}:null,chestplate:Zy.chestplate?{...Zy.chestplate}:null,leggings:Zy.leggings?{...Zy.leggings}:null,boots:Zy.boots?{...Zy.boots}:null}}function hS(e){Zy.helmet=e.helmet?{...e.helmet}:null,Zy.chestplate=e.chestplate?{...e.chestplate}:null,Zy.leggings=e.leggings?{...e.leggings}:null,Zy.boots=e.boots?{...e.boots}:null,Tb=-1}function gS(e,t){let n=ev.ensureAreaFull(e-gv,e+gv,t-gv,t+gv);for(let e of n)e.mesh&&zC(e.chunk.chunkX,e.chunk.chunkZ,e.mesh);hw(),VC(!0)}function _S(){for(let e of xv.values())Y.remove(e),uw(e);xv.clear(),Ov.clear(),kv.clear(),Av.clear(),Jv=0,Yv=0,jv.clear()}function vS(){Iv.items=[];for(let e of Lv.values())Y.remove(e),uw(e);Lv.clear()}function yS(e){Kb&&(Kb.textContent=e,Gb.classList.add(`saved`),Oy!==null&&window.clearTimeout(Oy),Oy=window.setTimeout(()=>{Gb.classList.remove(`saved`)},1600))}function bS(){zb&&xS(zb)}function xS(e){let t=e.getContext(`2d`);if(!t)return;let n=Math.min(window.devicePixelRatio||1,2),r=Math.min(1920,Math.max(960,Math.round(window.innerWidth*n))),i=Math.min(1440,Math.max(720,Math.round(window.innerHeight*n)));e.width=r,e.height=i,t.imageSmoothingEnabled=!0;let a=new Ta(66,r/i,.1,1200),o=new R(Z.state.position.x,Z.state.position.y+8,Z.state.position.z),s=performance.now()/1e3,c=-.72+Math.sin(s*.06)*.05;a.position.set(o.x+Math.cos(c)*44,o.y+40,o.z+Math.sin(c)*44),a.lookAt(o.x+10,o.y-18,o.z-8);let l=rv.getSize(new L),u=rv.getPixelRatio(),d=nv.aspect,f=nv.position.clone(),p=nv.rotation.clone(),m=Y.background,h=lv.intensity,g=lv.position.clone(),_=uv.intensity,v=fv.visible,y=pv.visible;Y.background=new B(9881840),lv.intensity=1.85,lv.position.set(60,112,38),uv.intensity=.95,fv.visible=!1,pv.visible=!1,rv.setPixelRatio(1),rv.setSize(r,i,!1),rv.render(Y,a),t.drawImage(rv.domElement,0,0,r,i),rv.setPixelRatio(u),rv.setSize(l.x,l.y,!1),Y.background=m,lv.intensity=h,lv.position.copy(g),uv.intensity=_,fv.visible=v,pv.visible=y,nv.aspect=d,nv.position.copy(f),nv.rotation.copy(p),nv.updateProjectionMatrix();let b=t.createRadialGradient(r*.5,i*.48,i*.28,r*.5,i*.48,i*.76);b.addColorStop(0,`rgb(255 255 255 / 0%)`),b.addColorStop(1,`rgb(0 0 0 / 36%)`),t.fillStyle=b,t.fillRect(0,0,r,i)}function SS(e,t,n,r){let i=ev.setBlockAndRemesh(e,t,n,r);for(let e of i)e.mesh&&zC(e.chunk.chunkX,e.chunk.chunkZ,e.mesh);hw()}function CS(){if(!py.canEat())return;let e=$.consumeOneSelected();e?.food&&(py.eat(e.food.nutrition,e.food.saturationModifier),Dw(),vT(),yT(),IS(`eat`),X.playEat())}function wS(){if(!$.selectedSlot().armor)return;let e=$.takeSelectedArmorStack();if(!e?.armor)return;let t=e.armor.slot,n=Zy[t];if(Zy[t]={...e.armor},n&&!$.addArmorStack(AT(TS(n.slot),n.slot,n.points,n.maxDurability,n.durability))){let e=$.selectedSlot();e.label=TS(n.slot),e.stateId=null,e.count=1,e.maxStackSize=1,e.armor={...n}}Tb=-1,Dw(),vT(),IS(`place`),X.playPickup()}function TS(e){return`iron_${e}`}function ES(e,t,n){let r=J.getStateIdIfLoaded(e,t,n);if(r===null)return!1;let i=q.getDefinitionForState(r);return i.replaceable===!0||i.renderLayer===`none`}function DS(e){if(!eb||!Q){WS();return}let t=qS(Q.block.x,Q.block.y,Q.block.z);t!==tb&&(tb=t,nb=0,rb=0);let n=q.getState(Q.stateId).typeId,r=GS(n,q.getDefinitionForState(Q.stateId).hardness);if(nb=Math.min(1,nb+e/r),rb-=e,rb<=0&&(X.playMineHit(HT(Q.stateId)),IS(`mine`),rb=.22),HS(),nb<1)return;let i=Q.stateId,a={...Q.block};if(q.getState(i).typeId===`door`){OS(a.x,a.y,a.z,i),X.playBlockBreak(HT(i)),LT(1),JS(q.resolveState(`door`),{x:a.x+.5,y:a.y+.72,z:a.z+.5}),Dw(),US();return}SS(a.x,a.y,a.z,0),X.playBlockBreak(HT(i)),LT(1),ZS(i,{x:a.x+.5,y:a.y+.72,z:a.z+.5}),Dw(),US()}function OS(e,t,n,r){let i=q.getState(r).properties.half===`upper`?t-1:t,a=J.getStateIdIfLoaded(e,i,n),o=J.getStateIdIfLoaded(e,i+1,n);a!==null&&q.getState(a).typeId===`door`&&SS(e,i,n,0),o!==null&&q.getState(o).typeId===`door`&&SS(e,i+1,n,0)}function kS(){if(ib>0)return!1;let e=new R;nv.getWorldDirection(e);let t=Z.eyePosition(),n=MS({x:t.x,y:gy,z:t.z},{x:e.x,y:e.y,z:e.z},3.25);if(!n||(Q?.distance??1/0)<n.distance-.12)return!1;let r=PS(),i=n.kind===`guard`?n.guard.position:n.mob.position,a=BS(i.x-Z.state.position.x,i.z-Z.state.position.z),o={x:a.x*5.4,y:4.8,z:a.z*5.4},s=n.kind===`hostile`?Rv.damageMob(n.mob.id,r,o):n.kind===`passive`?Vv.damageMob(n.mob.id,r,o):Gv.damageGuard(n.guard.id,r,o,{angerAtPlayer:!0});return n.kind===`guard`&&Bw(n.guard.villageId,s.died?-18:-8),ib=.48,FS(!0),IS(`attack`),X.playMobHit(),LS(i,s.died?18:9,n.kind===`hostile`?[2054965,12139066,5903894]:n.kind===`guard`?[14211538,11450044,12139066]:[14205856,11885397,6238246]),s.died&&(X.playMobDeath(),n.kind===`passive`?jS(n.mob):n.kind===`guard`?AS(n.guard):aC(`apple`,{nutrition:4,saturationModifier:.3},{x:n.mob.position.x,y:n.mob.position.y+.9,z:n.mob.position.z})),LT(1),Dw(),!0}function AS(e){let t=3+Math.floor(RC(e.position.x,e.position.y,e.position.z)*3);YS(`iron_ingot`,{x:e.position.x,y:e.position.y+1.2,z:e.position.z},t)}function jS(e){let t=e.role===`pig`?`raw_porkchop`:`raw_beef`;aC(t,oC(t),{x:e.position.x,y:e.position.y+.9,z:e.position.z})}function MS(e,t,n){let r=null;for(let i of Rv.mobs){let a=VS(e,t,{minX:i.position.x-.42,minY:i.position.y,minZ:i.position.z-.42,maxX:i.position.x+.42,maxY:i.position.y+2.12,maxZ:i.position.z+.42});a===null||a>n||(!r||a<r.distance)&&(r={kind:`hostile`,mob:i,distance:a})}for(let i of Vv.mobs){let a=VS(e,t,{minX:i.position.x-.48,minY:i.position.y,minZ:i.position.z-.48,maxX:i.position.x+.48,maxY:i.position.y+1.5,maxZ:i.position.z+.48});a===null||a>n||(!r||a<r.distance)&&(r={kind:`passive`,mob:i,distance:a})}for(let i of Gv.guards){let a=VS(e,t,{minX:i.position.x-.68,minY:i.position.y,minZ:i.position.z-.68,maxX:i.position.x+.68,maxY:i.position.y+2.8,maxZ:i.position.z+.68});a===null||a>n||(!r||a<r.distance)&&(r={kind:`guard`,guard:i,distance:a})}return r}function NS(e=4.2){let t=new R;nv.getWorldDirection(t);let n=Z.eyePosition(),r=null;for(let i of Uv.villagers){let a=VS({x:n.x,y:gy,z:n.z},{x:t.x,y:t.y,z:t.z},{minX:i.position.x-.42,minY:i.position.y,minZ:i.position.z-.42,maxX:i.position.x+.42,maxY:i.position.y+2.18,maxZ:i.position.z+.42});a===null||a>e||(!r||a<r.distance)&&(r={villager:i,distance:a})}return r}function PS(){let e=$.selectedSlot();if(e.tool)return e.tool.attackDamage;if(e.stateId===null)return 4;let t=q.getState(e.stateId).typeId;return t===`stone`||t===`log`?5:4}function FS(e){gb.classList.remove(`hit`,`miss`),xT(gb,e?`hit`:`miss`),X.playSwing()}function IS(e){_b.classList.remove(`held-attack`,`held-mine`,`held-place`,`held-eat`),xT(_b,`held-${e}`)}function LS(e,t,n=[2054965,12139066]){for(let r=0;r<t;r+=1){let t=new Gr({color:n[r%n.length],transparent:!0,opacity:.95}),i=new V(new H(.09,.09,.09),t);i.position.set(e.x+(Math.random()-.5)*.36,e.y+.95+Math.random()*.72,e.z+(Math.random()-.5)*.36),Y.add(i),qv.push({mesh:i,velocity:new R((Math.random()-.5)*3.4,1.6+Math.random()*2.8,(Math.random()-.5)*3.4),ageSeconds:0,lifetimeSeconds:.42+Math.random()*.26})}}function RS(e,t){LS({x:e.x,y:e.y+.18,z:e.z},t,[16742936,16765286,2829099])}function zS(e){for(let t=qv.length-1;t>=0;--t){let n=qv[t];n.ageSeconds+=e,n.velocity.y-=7.5*e,n.mesh.position.addScaledVector(n.velocity,e),n.mesh.rotation.x+=e*7,n.mesh.rotation.y+=e*9;let r=n.mesh.material;r instanceof Gr&&(r.opacity=Math.max(0,1-n.ageSeconds/n.lifetimeSeconds)),!(n.ageSeconds<n.lifetimeSeconds)&&(Y.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material instanceof br&&n.mesh.material.dispose(),qv.splice(t,1))}}function BS(e,t){let n=Math.hypot(e,t);return n<.001?{x:-Math.sin(vy),z:-Math.cos(vy)}:{x:e/n,z:t/n}}function VS(e,t,n){let r=Math.hypot(t.x,t.y,t.z);if(r===0)return null;let i={x:t.x/r,y:t.y/r,z:t.z/r},a=0,o=1/0,s=[[`x`,n.minX,n.maxX],[`y`,n.minY,n.maxY],[`z`,n.minZ,n.maxZ]];for(let[t,n,r]of s){let s=e[t],c=i[t];if(Math.abs(c)<1e-6){if(s<n||s>r)return null;continue}let l=(n-s)/c,u=(r-s)/c;if(a=Math.max(a,Math.min(l,u)),o=Math.min(o,Math.max(l,u)),o<a)return null}return a>=0?a:o>=0?o:null}function HS(){if(!Q){WS();return}lb.visible=!0,lb.position.set(Q.block.x+.5,Q.block.y+.5,Q.block.z+.5),cb.opacity=.15+nb*.72,pb.classList.add(`visible`);let e=pb.querySelector(`.mining-bar-fill`);e&&(e.style.transform=`scaleX(${nb})`)}function US(){eb=!1,tb=null,nb=0,rb=0,WS()}function WS(){lb.visible=!1,cb.opacity=0,pb.classList.remove(`visible`);let e=pb.querySelector(`.mining-bar-fill`);e&&(e.style.transform=`scaleX(0)`)}function GS(e,t){let n=KS(e,$.selectedSlot().tool);return Math.max(.12,t*.55/n)}function KS(e,t){return t?t.kind===`pickaxe`&&tC(e)||t.kind===`axe`&&nC(e)||t.kind===`shovel`&&rC(e)?t.miningSpeed:t.kind===`sword`&&e===`leaves`?1.5:1:1}function qS(e,t,n){return`${e},${t},${n}`}function JS(e,t){LC(Iv.spawn({stateId:e,label:RT(e),position:t,velocity:{x:(RC(t.x,t.y,t.z)-.5)*1.4,y:2.3,z:(RC(t.z,t.x,t.y)-.5)*1.4}}))}function YS(e,t,n=1){LC(Iv.spawn({stateId:null,label:e,count:n,item:{id:e,kind:`material`},position:t,velocity:{x:(RC(t.x,t.y,t.z)-.5)*1.4,y:2.3,z:(RC(t.z,t.x,t.y)-.5)*1.4}}))}function XS(e,t){if(!pT(e)){if(e.stateId!==null){LC(Iv.spawn({stateId:e.stateId,label:e.label,count:e.count,maxStackSize:e.maxStackSize,position:t,velocity:{x:(RC(t.x,t.y,t.z)-.5)*1.4,y:2.3,z:(RC(t.z,t.x,t.y)-.5)*1.4}}));return}LC(Iv.spawn({stateId:null,label:e.label,count:e.count,maxStackSize:e.maxStackSize,food:e.food,item:e.item,tool:e.tool,armor:e.armor,position:t,velocity:{x:(RC(t.x,t.y,t.z)-.5)*1.4,y:2.3,z:(RC(t.z,t.x,t.y)-.5)*1.4}}))}}function ZS(e,t){let n=q.getState(e).typeId,r=$.selectedSlot().tool;if(QS(n,r)){if(n===`coal_ore`){YS(`coal`,t);return}if(n===`iron_ore`){YS(`raw_iron`,t);return}if(n===`gold_ore`){YS(`raw_gold`,t);return}if(n===`diamond_ore`){YS(`diamond`,t);return}if(n===`stone`){JS(q.resolveState(`cobblestone`),t);return}if(n===`farmland`){JS(q.resolveState(`dirt`),t);return}if(n===`wheat`){let n=q.getState(e).properties.age;typeof n==`number`&&n>=7?(YS(`wheat`,t,1),YS(`seeds`,t,1+Math.floor(RC(t.x,t.y+4,t.z)*3))):RC(t.x,t.y,t.z)>.25&&YS(`seeds`,t,1);return}if(n===`leaves`){RC(t.x,t.y,t.z)>.74&&aC(`apple`,{nutrition:4,saturationModifier:.3},t);return}if(n===`chest`){let e=qS(Math.floor(t.x),Math.floor(t.y),Math.floor(t.z)),n=qy.get(e);if(n){for(let e of n)XS(e,t);qy.delete(e)}}JS(e,t)}}function QS(e,t){return eC(e)?t?.kind===`pickaxe`?e===`iron_ore`?$S(t.level)>=$S(`stone`):e===`gold_ore`||e===`diamond_ore`?$S(t.level)>=$S(`iron`):!0:!1:!0}function $S(e){switch(e){case`wood`:return 0;case`stone`:return 1;case`iron`:return 2}}function eC(e){return tC(e)}function tC(e){return[`stone`,`cobblestone`,`coal_ore`,`iron_ore`,`gold_ore`,`diamond_ore`,`furnace`].includes(e)}function nC(e){return[`log`,`planks`,`crafting_table`,`chest`].includes(e)}function rC(e){return[`dirt`,`grass`,`sand`,`gravel`,`snow`].includes(e)}function iC(e){let t=Iv.step(J,$,Z.state.position,e);for(let e of Iv.items){let t=Lv.get(e.id)??LC(e);t.position.set(e.position.x,e.position.y,e.position.z),t.rotation.y=e.ageSeconds*2.8,t.rotation.x=Math.sin(e.ageSeconds*3.2)*.12}for(let e of t.pickedUpIds){let t=Lv.get(e);t&&(Y.remove(t),uw(t),Lv.delete(e))}t.pickedUpIds.length>0&&(X.playPickup(),Dw())}function aC(e,t,n){LC(Iv.spawn({stateId:null,label:e,food:t,position:n,velocity:{x:(RC(n.x,n.y,n.z)-.5)*1.1,y:2.8,z:(RC(n.z,n.x,n.y)-.5)*1.1}}))}function oC(e){switch(e){case`raw_beef`:case`raw_porkchop`:return{nutrition:3,saturationModifier:.3};case`cooked_beef`:case`cooked_porkchop`:return{nutrition:8,saturationModifier:.8};case`bread`:return{nutrition:5,saturationModifier:.6};default:return{nutrition:4,saturationModifier:.3}}}function sC(e){let t=hv,n=Rv.step(J,Z.state.position,e,{allowSpawning:t.phase===`night`||fC(),burnInDaylight:t.skyLightLevel>=15&&t.sunDirection.y>.12,villagerTargets:Uv.villagers.map(e=>({id:e.id,position:e.position})),guardTargets:Gv.guards.map(e=>({id:e.id,position:e.position}))});for(let e of n.burningIds){let t=Rv.mobs.find(t=>t.id===e);t&&RS(t.position,2)}for(let e of n.died)RS(e.position,18),X.playMobDeath();for(let e of n.villagerAttacks){let t=Uv.damageVillager(e.villagerId,e.damage);t.villager&&(X.playDamage(),LS(t.villager.position,t.died?18:8,[12093794,12139066,5903894]),t.died&&(X.playMobDeath(),Yy===e.villagerId&&(Yy=null,ab=!1,Nw())))}for(let e of n.guardAttacks){let t=Rv.mobs.find(t=>t.id===e.mobId)??null,n=t?BS(e.position.x-t.position.x,e.position.z-t.position.z):{x:0,z:0},r=Gv.damageGuard(e.guardId,e.damage,{x:n.x*2.8,y:2.6,z:n.z*2.8});r.guard&&(X.playDamage(),LS(r.guard.position,r.died?22:8,[14211538,11450044,12139066]),r.died&&X.playMobDeath())}if(n.damage>0){let e=lC(n.damage);e>0&&(py.applyDamage(e),bT(),X.playDamage(),py.isDead()&&Hx(`zombie`))}if(n.projectileDamage>0){let e=lC(n.projectileDamage);e>0&&(py.applyDamage(e),bT(),X.playDamage());for(let e of n.projectileHits)LS(e.position,6,[14211288,9138005,4866104]);e>0&&py.isDead()&&Hx(`skeleton`)}NC()}function cC(e){Vv.step(J,Z.state.position,e,{allowSpawning:hv.phase!==`night`})}function lC(e){let t=uC(),n=Math.min(.8,t*.04),r=Math.max(0,Math.ceil(e*(1-n)));return t>0&&e>0&&dC(Math.max(1,Math.ceil(e))),r}function uC(){return Object.values(Zy).reduce((e,t)=>e+(t?.points??0),0)}function dC(e){for(let t of[`helmet`,`chestplate`,`leggings`,`boots`]){let n=Zy[t];n&&(n.durability=Math.max(0,n.durability-e),n.durability<=0&&(Zy[t]=null))}Tb=-1,vT()}function fC(){let e=Math.floor(Z.state.position.x),t=Math.floor(Z.eyePosition().y),n=Math.floor(Z.state.position.z),r=J.getChunk(G(e),G(n));if(!r)return!1;let i=(e%16+16)%16,a=(n%16+16)%16;return t>r.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,i,a)-5?!1:J.getBlockLightLevelLoaded(e,t,n)<=7}function pC(e){Xv-=e,Xv<=0&&(Xv=1.5,yC()),Uv.step(J,e,{night:hv.phase===`night`,timeOfDay:tv.timeOfDay,threats:Rv.mobs.filter(e=>e.role===`zombie`).map(e=>e.position)}),mC(e)}function mC(e){for(let[t,n]of Array.from(Xy.entries())){let r=n-e;if(r>0){Xy.set(t,r);continue}let[i,a,o]=t.split(`,`).map(Number);if(gC(i,a,o)||_C(i,a,o)){Xy.set(t,1.1);continue}let s=J.getStateIdIfLoaded(i,a,o);s!==null&&q.getState(s).typeId===`door`&&q.getState(s).properties.open===!0&&(bx(i,a,o,s,!1),X.playPlace(`wood`)),Xy.delete(t)}for(let e of Uv.villagers)hC(e)}function hC(e){let t=Math.floor(e.position.x),n=Math.floor(e.position.y),r=Math.floor(e.position.z);for(let e=0;e<=2;e+=1)for(let i=-1;i<=1;i+=1)for(let a=-1;a<=1;a+=1){let o=t+a,s=n+e,c=r+i,l=J.getStateIdIfLoaded(o,s,c);if(l===null)continue;let u=q.getState(l);if(u.typeId!==`door`||u.properties.open===!0)continue;bx(o,s,c,l,!0);let d=u.properties.half===`upper`?s-1:s;Xy.set(qS(o,d,c),2.4),X.playPlace(`wood`);return}}function gC(e,t,n){return Math.hypot(Z.state.position.x-(e+.5),Z.state.position.y-t,Z.state.position.z-(n+.5))<2.1}function _C(e,t,n){return Uv.villagers.some(r=>Math.hypot(r.position.x-(e+.5),r.position.y-t,r.position.z-(n+.5))<1.7)}function vC(e){let t=Gv.step(J,e,Rv.mobs.filter(e=>e.role===`zombie`).map(e=>({id:e.id,position:e.position})),{playerPosition:Z.state.position});for(let e of t.attacks){let t=Rv.damageMob(e.mobId,e.damage,e.knockback);t.mob&&(X.playMobHit(),LS(t.mob.position,t.died?20:10,[14211288,11450044,12139066]),t.died&&X.playMobDeath())}if(t.playerDamage>0){let e=lC(t.playerDamage);e>0&&(py.applyDamage(e),bT(),X.playDamage());for(let e of t.playerAttacks)LS(e.position,7,[14211538,11450044,12139066]);e>0&&py.isDead()&&Hx(`guard`)}}function yC(){for(let e of J.chunks.values()){let t=Pg(e.chunkX,e.chunkZ);if(!Zv.has(t)){Zv.add(t);for(let t of Y_.villageSitesForChunk(e.chunkX,e.chunkZ)){Uv.ensureVillage(t,J);let e=Uv.villagers.filter(e=>e.villageId===t.id).length;Gv.ensureVillage(t,J,e)}}}}function bC(){let e=new Set;for(let t of Uv.villagers){e.add(t.id);let n=Wv.get(t.id)??xC(t),r=t.position.x-n.position.x,i=t.position.z-n.position.z;n.position.set(t.position.x,t.position.y+Qv,t.position.z);let a=t.path[0]??null,o=r,s=i;Math.hypot(o,s)<=.015&&a&&(o=a.x-t.position.x,s=a.z-t.position.z),Math.hypot(o,s)<=.015&&(o=t.target.x-t.position.x,s=t.target.z-t.position.z),Math.hypot(o,s)>.05?n.rotation.y=OC(o,s):n.rotation.y=OC(Z.state.position.x-t.position.x,Z.state.position.z-t.position.z),n.userData.villagerAge=t.ageSeconds;let c=t.activeGoal===`sleep`&&Math.hypot(t.position.x-t.home.x,t.position.z-t.home.z)<1.35;n.rotation.z=c?1.34:0,n.position.y=t.position.y+Qv+(c?.18:0);let l=n.children.find(e=>e.name===`villager-hurt-flash`);l&&(l.visible=t.hurtTimeSeconds>0);let u=n.children.filter(e=>e.name===`villager-arm`),d=t.bellAlarmSeconds>0||t.activeGoal===`avoid_threat`,f=Wf(t,`wheat`)>0;u.forEach((e,n)=>{e.rotation.x=d?-1.02+Math.sin(t.ageSeconds*9+n*Math.PI)*.22:f?-.96+Math.sin(t.ageSeconds*5.8+n*.5)*.1:-.82+Math.sin(t.ageSeconds*4+n*.5)*.08});let p=n.getObjectByName(`villager-alert-icon`);p&&(p.visible=d&&!c,p.position.y=2.58+Math.sin(t.ageSeconds*7)*.06,p.scale.setScalar(1+Math.sin(t.ageSeconds*10)*.08)),n.children.filter(e=>e.name===`villager-level-pip`).forEach((e,n)=>{e.visible=n<t.tradeLevel});let m=n.getObjectByName(`villager-carried-crop`);m&&(m.visible=f||t.foodShareFlashSeconds>0,m.position.y=1+(t.foodShareFlashSeconds>0?Math.sin(t.ageSeconds*18)*.045:0),m.scale.setScalar(t.foodShareFlashSeconds>0?1.16:1)),n.scale.setScalar(t.hurtTimeSeconds>0?1.04:d?1.02:t.foodShareFlashSeconds>0?1.015:1)}for(let[t,n]of Wv)e.has(t)||(Y.remove(n),uw(n),Wv.delete(t))}function xC(e){let t=new pn;t.name=`villager`,t.position.set(e.position.x,e.position.y+Qv,e.position.z);let n=e.profession===`farmer`?8228662:e.profession===`librarian`?9391669:7303282,r=new Ji({color:12093794}),i=new Ji({color:n}),a=new Ji({color:3810327}),o=new Gr({color:4007452}),s=new Gr({color:16247510}),c=new Gr({color:14064248,transparent:!0,opacity:.72}),l=new Gr({color:7092778}),u=new Gr({color:16722731,transparent:!0,opacity:.28,depthWrite:!1}),d=new V(new H(.64,.64,.64),r);d.position.set(0,1.82,0),t.add(d);let f=new V(new H(.13,.16,.1),r);f.position.set(0,1.76,-.37),t.add(f);let p=new V(new H(.74,.88,.42),i);p.position.set(0,1.07,0),t.add(p);let m=new V(new H(.78,.08,.45),a);m.position.set(0,.91,-.01),t.add(m);let h=new V(new H(.22,.82,.22),i);h.name=`villager-arm`,h.position.set(-.44,1.18,-.18),h.rotation.z=-.35,t.add(h);let g=new V(new H(.22,.82,.22),i);g.name=`villager-arm`,g.position.set(.44,1.18,-.18),g.rotation.z=.35,t.add(g);let _=new V(new H(.26,.72,.26),i);_.position.set(-.15,.36,0),t.add(_);let v=new V(new H(.26,.72,.26),i);v.position.set(.15,.36,0),t.add(v);let y=new V(new H(.075,.07,.022),o);y.position.set(-.14,1.9,-.333),t.add(y);let b=new V(new H(.075,.07,.022),o);b.position.set(.14,1.9,-.333),t.add(b);let x=new V(new H(.022,.022,.024),s);x.position.set(-.125,1.915,-.346),t.add(x);let S=new V(new H(.022,.022,.024),s);S.position.set(.155,1.915,-.346),t.add(S);let C=new V(new H(.08,.045,.018),c);C.position.set(-.22,1.76,-.335),t.add(C);let w=new V(new H(.08,.045,.018),c);w.position.set(.22,1.76,-.335),t.add(w);let T=new V(new H(.12,.035,.02),l);T.position.set(0,1.66,-.338),t.add(T),SC(t,e);let E=new V(new H(.86,2.14,.58),u);E.name=`villager-hurt-flash`,E.position.set(0,1.08,0),E.visible=!1,t.add(E);let D=new Gr({color:16765773,transparent:!0,opacity:.95}),ee=new pn;ee.name=`villager-alert-icon`,ee.position.set(0,2.58,-.08),ee.visible=!1;let te=new V(new H(.08,.34,.04),D);te.position.set(0,.09,0),ee.add(te);let O=new V(new H(.09,.08,.04),D);O.position.set(0,-.16,0),ee.add(O),t.add(ee);let ne=new pn;ne.name=`villager-carried-crop`,ne.position.set(.45,1,-.34),ne.rotation.z=-.34,ne.visible=!1;let k=new Ji({color:12161599}),A=new Ji({color:14731110});for(let e=0;e<3;e+=1){let t=new V(new H(.025,.28,.025),k);t.position.set((e-1)*.055,0,0),t.rotation.z=(e-1)*.18,ne.add(t);let n=new V(new H(.075,.09,.045),A);n.position.set((e-1)*.06,.17,0),n.rotation.z=(e-1)*.18,ne.add(n)}return t.add(ne),Wv.set(e.id,t),Y.add(t),t}function SC(e,t){let n=new Gr({color:CC(t.profession)}),r=new Gr({color:2365199});if(t.profession===`farmer`){let t=new Ji({color:14137439}),n=new Ji({color:7227938}),r=new V(new H(.86,.08,.78),t);r.position.set(0,2.18,-.01),e.add(r);let i=new V(new H(.52,.18,.48),t);i.position.set(0,2.3,-.01),e.add(i);let a=new V(new H(.56,.045,.5),n);a.position.set(0,2.225,-.012),e.add(a)}else if(t.profession===`librarian`){let t=new Gr({color:15788758});for(let n of[-.14,.14]){let r=new V(new H(.16,.14,.018),t);r.position.set(n,1.9,-.352),e.add(r)}let n=new V(new H(.08,.025,.018),t);n.position.set(0,1.9,-.354),e.add(n);let r=new V(new H(.24,.28,.06),new Ji({color:6958394}));r.position.set(.37,1,-.34),r.rotation.z=-.18,e.add(r);let i=new V(new H(.2,.22,.025),new Ji({color:15392709}));i.position.set(.37,1,-.375),i.rotation.z=-.18,e.add(i)}else{let t=new Ji({color:5593178}),n=new V(new H(.42,.52,.045),t);n.position.set(0,1.12,-.238),e.add(n);let r=new V(new H(.055,.36,.055),new Ji({color:7029800}));r.position.set(-.39,1.04,-.32),r.rotation.z=-.5,e.add(r);let i=new V(new H(.19,.1,.09),new Ji({color:9409168}));i.position.set(-.48,1.18,-.35),i.rotation.z=-.5,e.add(i)}let i=new V(new H(.25,.13,.025),r);i.position.set(0,1.34,-.235),e.add(i);for(let r=0;r<5;r+=1){let i=new V(new H(.035,.045,.028),n);i.name=`villager-level-pip`,i.position.set(-.084+r*.042,1.34,-.252),i.visible=r<t.tradeLevel,e.add(i)}}function CC(e){switch(e){case`farmer`:return 15124571;case`librarian`:return 9094911;case`mason`:return 13684936}}function wC(){Uv.clear(),Xy.clear();for(let e of Wv.values())Y.remove(e),uw(e);Wv.clear(),Xv=0,Zv.clear()}function TC(){let e=new Set;for(let t of Gv.guards){e.add(t.id);let n=Kv.get(t.id)??EC(t),r=t.position.x-n.position.x,i=t.position.z-n.position.z;n.position.set(t.position.x,t.position.y,t.position.z);let a=t.targetKind===`hostile`&&t.targetMobId!==null?Rv.mobs.find(e=>e.id===t.targetMobId)??null:null,o=t.path[0]??null,s=r,c=i;Math.hypot(s,c)<=.015&&o&&(s=o.x-t.position.x,c=o.z-t.position.z),Math.hypot(s,c)<=.015&&t.targetKind===`player`?(s=Z.state.position.x-t.position.x,c=Z.state.position.z-t.position.z):Math.hypot(s,c)<=.015&&a&&(s=a.position.x-t.position.x,c=a.position.z-t.position.z),Math.hypot(s,c)<=.015&&(s=t.velocity.x,c=t.velocity.z),Math.hypot(s,c)>.05&&(n.rotation.y=OC(s,c));let l=n.getObjectByName(`guard-health-fill`);l&&(l.scale.x=Math.max(.02,t.health/100));let u=n.getObjectByName(`guard-hurt-flash`);u&&(u.visible=t.hurtTimeSeconds>0);let d=t.alarmSeconds>0||t.targetKind!==null,f=n.getObjectByName(`guard-alert-icon`);f&&(f.visible=d,f.position.y=3.08+Math.sin(t.ageSeconds*8)*.055,f.scale.setScalar(1+Math.sin(t.ageSeconds*11)*.08)),n.scale.setScalar(t.hurtTimeSeconds>0?1.035:d?1.018:1);let p=n.getObjectByName(`guard-left-arm`),m=n.getObjectByName(`guard-right-arm`),h=Math.hypot(t.velocity.x,t.velocity.z);p&&(p.rotation.x=t.swingSeconds>0?-1.45+Math.sin(t.swingSeconds*22)*.25:d?-.48+Math.sin(t.ageSeconds*7.2)*Math.min(.28,h*.13):Math.sin(t.ageSeconds*4.5)*Math.min(.22,h*.1)),m&&(m.rotation.x=t.swingSeconds>0?-1.25+Math.sin(t.swingSeconds*24)*.25:d?-.36+Math.sin(t.ageSeconds*7.2+Math.PI)*Math.min(.28,h*.13):Math.sin(t.ageSeconds*4.5+Math.PI)*Math.min(.22,h*.1)),n.children.filter(e=>e.name===`guard-leg`).forEach((e,n)=>{e.rotation.x=Math.sin(t.ageSeconds*4.4+n*Math.PI)*Math.min(.26,h*.12)})}for(let[t,n]of Kv)e.has(t)||(Y.remove(n),uw(n),Kv.delete(t))}function EC(e){let t=new pn;t.name=`village-guard`,t.position.set(e.position.x,e.position.y,e.position.z);let n=new Ji({color:14211538}),r=new Ji({color:11843503}),i=new Ji({color:5148495}),a=new Gr({color:12204594}),o=new V(new H(1.02,1.18,.56),n);o.position.set(0,1.48,0),t.add(o);let s=new V(new H(.74,.24,.04),r);s.position.set(0,1.68,-.3),t.add(s);let c=new V(new H(.72,.64,.62),n);c.position.set(0,2.34,-.03),t.add(c);let l=new V(new H(.52,.08,.04),r);l.position.set(0,2.45,-.36),t.add(l);let u=new V(new H(.08,.08,.03),a);u.position.set(-.16,2.36,-.36),t.add(u);let d=new V(new H(.08,.08,.03),a);d.position.set(.16,2.36,-.36),t.add(d);let f=new V(new H(.14,.22,.14),r);f.position.set(0,2.25,-.42),t.add(f);let p=new V(new H(.3,1.42,.32),n);p.name=`guard-left-arm`,p.position.set(-.72,1.28,-.03),t.add(p);let m=new V(new H(.3,1.42,.32),n);m.name=`guard-right-arm`,m.position.set(.72,1.28,-.03),t.add(m);let h=new V(new H(.34,.88,.34),r);h.name=`guard-leg`,h.position.set(-.24,.44,0),t.add(h);let g=new V(new H(.34,.88,.34),r);g.name=`guard-leg`,g.position.set(.24,.44,0),t.add(g);for(let[e,n,r,a,o]of[[-.32,1.94,-.315,.08,.38],[.24,1.2,-.315,.07,.46],[-.76,1.24,-.22,.055,.52]]){let s=new V(new H(a,o,.035),i);s.position.set(e,n,r),t.add(s)}let _=new V(new H(1.28,2.72,.76),new Gr({color:16768477,transparent:!0,opacity:.32,depthWrite:!1}));_.name=`guard-hurt-flash`,_.position.set(0,1.36,0),_.visible=!1,t.add(_);let v=new V(new H(1.08,.06,.035),new Gr({color:1447446}));v.position.set(0,2.86,0),t.add(v);let y=new V(new H(1.02,.038,.04),new Gr({color:12572611}));y.name=`guard-health-fill`,y.position.set(0,2.86,-.004),t.add(y);let b=new Gr({color:16734797,transparent:!0,opacity:.94}),x=new pn;x.name=`guard-alert-icon`,x.position.set(0,3.08,-.08),x.visible=!1;let S=new V(new H(.09,.38,.045),b);S.position.set(0,.11,0),x.add(S);let C=new V(new H(.1,.09,.045),b);return C.position.set(0,-.18,0),x.add(C),t.add(x),Kv.set(e.id,t),Y.add(t),t}function DC(){Gv.clear();for(let e of Kv.values())Y.remove(e),uw(e);Kv.clear()}function OC(e,t){return Math.atan2(e,t)+Math.PI}function kC(){let e=new Set;for(let t of Vv.mobs){e.add(t.id);let n=Hv.get(t.id)??AC(t);n.position.set(t.position.x,t.position.y,t.position.z);let r=Math.hypot(t.velocity.x,t.velocity.z);r>.05&&(n.rotation.y=Math.atan2(t.velocity.x,t.velocity.z));let i=n.getObjectByName(`passive-hurt-flash`);i&&(i.visible=t.hurtTimeSeconds>0),n.scale.setScalar(t.hurtTimeSeconds>0?1.04:1),n.children.filter(e=>e.name===`passive-leg`).forEach((e,n)=>{e.rotation.x=Math.sin(t.ageSeconds*6+n*Math.PI)*Math.min(.42,r*.18)})}for(let[t,n]of Hv)e.has(t)||(Y.remove(n),uw(n),Hv.delete(t))}function AC(e){let t=new pn;t.name=`passive-mob`,t.position.set(e.position.x,e.position.y,e.position.z);let n=e.role===`pig`,r=new Ji({color:n?15376553:15788764}),i=new Ji({color:n?13992077:3813417}),a=new Ji({color:n?14255761:14267279}),o=new Gr({color:1840402}),s=new V(new H(.9,.72,1.14),r);if(s.position.set(0,.78,0),t.add(s),!n){let e=new V(new H(.34,.28,.03),i);e.position.set(-.2,.92,-.585),t.add(e);let n=new V(new H(.03,.3,.36),i);n.position.set(.465,.76,.18),t.add(n)}let c=new V(new H(.58,.54,.52),r);c.position.set(0,1.08,-.74),t.add(c);let l=new V(new H(n?.34:.24,n?.22:.18,.16),a);l.position.set(0,1.02,-1.04),t.add(l);let u=new V(new H(.055,.055,.022),o);u.position.set(-.14,1.18,-1.01),t.add(u);let d=new V(new H(.055,.055,.022),o);d.position.set(.14,1.18,-1.01),t.add(d);for(let[e,a]of[[-.28,-.33],[.28,-.33],[-.28,.36],[.28,.36]]){let o=new V(new H(.2,.58,.2),n?r:i);o.name=`passive-leg`,o.position.set(e,.29,a),t.add(o)}let f=new V(new H(1.02,.82,1.28),new Gr({color:16768477,transparent:!0,opacity:.36}));return f.name=`passive-hurt-flash`,f.position.set(0,.78,0),f.visible=!1,t.add(f),Hv.set(e.id,t),Y.add(t),t}function jC(){let e=new Set;for(let t of Rv.mobs){e.add(t.id);let n=zv.get(t.id)??MC(t);n.position.set(t.position.x,t.position.y,t.position.z);let r=Z.state.position.x-t.position.x,i=Z.state.position.z-t.position.z;n.rotation.y=Math.atan2(r,i),n.userData.mobAge=t.ageSeconds,n.userData.mobRole=t.role;let a=n.getObjectByName(`mob-health-fill`);a&&(a.scale.x=Math.max(.02,t.health/20));let o=n.getObjectByName(`mob-hurt-flash`);o&&(o.visible=t.hurtTimeSeconds>0);let s=n.getObjectByName(`mob-fire`);s&&(s.visible=t.fireTimeSeconds>0,s.scale.y=.92+Math.sin(t.ageSeconds*18)*.08);let c=t.bellRevealSeconds>0,l=n.getObjectByName(`mob-bell-reveal-marker`);l&&(l.visible=c,l.position.y=2.52+Math.sin(t.ageSeconds*9)*.05,l.scale.setScalar(1+Math.sin(t.ageSeconds*12)*.07));let u=n.getObjectByName(`mob-bell-reveal-ring`);u&&(u.visible=c,u.rotation.y=t.ageSeconds*2.2),n.scale.setScalar(t.hurtTimeSeconds>0?1.06:c?1.025:1),n.children.filter(e=>e.name===`mob-arm`).forEach((e,n)=>{e.rotation.x=t.role===`skeleton`?-.82+Math.sin(t.ageSeconds*9+n*Math.PI)*.12:Math.sin(t.ageSeconds*7+n*Math.PI)*.35})}for(let[t,n]of zv)e.has(t)||(Y.remove(n),uw(n),zv.delete(t))}function MC(e){let t=new pn;t.name=`hostile-mob`,t.position.set(e.position.x,e.position.y,e.position.z);let n=e.role===`skeleton`,r=new Ji({color:n?14209725:4161364}),i=new Ji({color:n?13090986:3234424}),a=new Ji({color:n?10327166:3030896}),o=new Gr({color:n?1447446:16770728}),s=new V(new H(.62,.62,.62),r);s.position.set(0,1.78,0),t.add(s);let c=new V(new H(.72,.78,.34),i);c.position.set(0,1.08,0),t.add(c);let l=new V(new H(.22,.78,.22),r);l.name=`mob-arm`,l.position.set(-.52,1.14,-.08),t.add(l);let u=new V(new H(.22,.78,.22),r);u.name=`mob-arm`,u.position.set(.52,1.14,-.08),t.add(u);let d=new V(new H(.26,.78,.24),a);d.position.set(-.18,.38,0),t.add(d);let f=new V(new H(.26,.78,.24),a);f.position.set(.18,.38,0),t.add(f);let p=new V(new H(.09,.09,.02),o);p.position.set(-.14,1.86,-.32),t.add(p);let m=new V(new H(.09,.09,.02),o);if(m.position.set(.14,1.86,-.32),t.add(m),n){let e=new Ji({color:7029800}),n=new Gr({color:14340804}),r=new pn;r.name=`mob-bow`,r.position.set(.58,1.24,-.32),r.rotation.z=-.28;let i=new V(new H(.055,.56,.055),e);i.position.set(0,.2,0),i.rotation.z=.28,r.add(i);let a=new V(new H(.055,.56,.055),e);a.position.set(0,-.2,0),a.rotation.z=-.28,r.add(a);let o=new V(new H(.025,.84,.025),n);o.position.set(-.13,0,0),r.add(o),t.add(r)}let h=new pn;h.name=`mob-fire`,h.visible=!1;let g=new Gr({color:16742936,transparent:!0,opacity:.64}),_=new Gr({color:16773544,transparent:!0,opacity:.72}),v=new V(new H(.9,1.7,.08),g);v.position.set(0,.95,-.34),v.rotation.z=.16,h.add(v);let y=new V(new H(.54,1.25,.09),_);y.position.set(.02,.9,-.39),y.rotation.z=-.14,h.add(y),t.add(h);let b=new V(new H(.84,2.04,.46),new Gr({color:16724804,transparent:!0,opacity:.42}));b.name=`mob-hurt-flash`,b.position.set(0,1.02,0),b.visible=!1,t.add(b);let x=new V(new H(.82,.06,.035),new Gr({color:1447446}));x.name=`mob-health-back`,x.position.set(0,2.28,0),t.add(x);let S=new V(new H(.76,.038,.04),new Gr({color:14176079}));S.name=`mob-health-fill`,S.position.set(0,2.28,-.004),t.add(S);let C=new Gr({color:16761415,transparent:!0,opacity:.9,depthWrite:!1}),w=new pn;w.name=`mob-bell-reveal-marker`,w.position.set(0,2.52,-.05),w.visible=!1;let T=new V(new H(.085,.34,.045),C);T.position.set(0,.08,0),w.add(T);let E=new V(new H(.1,.09,.045),C);E.position.set(0,-.17,0),w.add(E),t.add(w);let D=new pn;D.name=`mob-bell-reveal-ring`,D.position.set(0,.12,0),D.visible=!1;for(let e=0;e<4;e+=1){let t=new V(new H(.72,.035,.045),C);t.position.set(e<2?0:e===2?-.38:.38,0,e<2?e===0?-.38:.38:0),t.rotation.y=e<2?0:Math.PI/2,D.add(t)}return t.add(D),zv.set(e.id,t),Y.add(t),t}function NC(){let e=new Set;for(let t of Rv.projectiles){e.add(t.id);let n=Bv.get(t.id)??PC(t);n.position.set(t.position.x,t.position.y,t.position.z),n.quaternion.setFromUnitVectors(new R(0,0,1),new R(t.velocity.x,t.velocity.y,t.velocity.z).normalize())}for(let[t,n]of Bv)e.has(t)||(Y.remove(n),uw(n),Bv.delete(t))}function PC(e){let t=new pn;t.name=`hostile-projectile`,t.position.set(e.position.x,e.position.y,e.position.z);let n=new V(new H(.045,.045,.72),new Ji({color:6965805}));t.add(n);let r=new V(new H(.075,.075,.12),new Ji({color:13620441}));r.position.z=.42,t.add(r);let i=new V(new H(.16,.055,.12),new Ji({color:15263967}));return i.position.z=-.36,t.add(i),Bv.set(e.id,t),Y.add(t),t}function FC(){Rv.clear();for(let e of zv.values())Y.remove(e),uw(e);zv.clear();for(let e of Bv.values())Y.remove(e),uw(e);Bv.clear()}function IC(){Vv.clear();for(let e of Hv.values())Y.remove(e),uw(e);Hv.clear()}function LC(e){let t=new pn;t.name=`dropped-item`,t.position.set(e.position.x,e.position.y,e.position.z);let n=new Gr({color:new B(PT(e)),transparent:!0,opacity:.95}),r=new V(new H(.28,.28,.28),n);return r.name=`dropped-${e.label}`,t.add(r),Lv.set(e.id,t),Y.add(t),t}function RC(e,t,n){let r=Math.imul(Math.floor(e*97),73856093);return r^=Math.imul(Math.floor(t*97),19349663),r^=Math.imul(Math.floor(n*97),83492791),r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295}function zC(e,t,n){let r=Pg(e,t),i=xv.get(r);i&&(Y.remove(i),uw(i));let a=Jg(n,q);a.position.set(e*16,0,t*16),BC(a),xv.set(r,a),Y.add(a);let o=kv.get(r)??0,s=Um(n);kv.set(r,s),Jv+=s-o;let c=Av.get(r)??0,l=a.children.length;Av.set(r,l),Yv+=l-c}function BC(e){e.traverse(e=>{if(!(e instanceof V)||!e.name.startsWith(`chunk-layer-fluid`))return;let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e instanceof Gr&&jv.add(e)})}function VC(e=!1){let t=G(Math.floor(Z.state.position.x)),n=G(Math.floor(Z.state.position.z));!e&&t===my&&n===hy||(my=t,hy=n,GC(t,n),cw(t,n),lw(t,n),hw())}function HC(e,t,n){Fy+=n;let r=Math.hypot(e,t),i=G(Math.floor(Z.state.position.x)),a=G(Math.floor(Z.state.position.z)),o=UC(e,t,r),s=`${i},${a}:${o.chunkX},${o.chunkZ}`;s===Iy&&Fy<(r>0?.12:.5)||(Iy=s,Fy=0,WC(Z.state.position.x,Z.state.position.z,1),r>0&&WC(o.worldX,o.worldZ,1))}function UC(e,t,n){if(n<=0){let e=Z.state.position.x,t=Z.state.position.z;return{worldX:e,worldZ:t,chunkX:G(Math.floor(e)),chunkZ:G(Math.floor(t))}}let r=e/n,i=t/n,a=16*.9,o=Z.state.position.x+(i*Math.cos(vy)-r*Math.sin(vy))*a,s=Z.state.position.z+(-i*Math.sin(vy)-r*Math.cos(vy))*a;return{worldX:o,worldZ:s,chunkX:G(Math.floor(o)),chunkZ:G(Math.floor(s))}}function WC(e,t,n){let r=G(Math.floor(e)),i=G(Math.floor(t)),a=[];for(let e=-n;e<=n;e+=1)for(let t=-n;t<=n;t+=1)a.push({chunkX:r+t,chunkZ:i+e,distance:Math.hypot(t,e)});a.sort((e,t)=>e.distance-t.distance);let o=0;for(let e of a){let t=Pg(e.chunkX,e.chunkZ),n=J.getChunk(e.chunkX,e.chunkZ);if(!n&&Nv.length>0&&e.distance>0){!Sv.has(t)&&!Ov.has(t)&&Sv.set(t,{chunkX:e.chunkX,chunkZ:e.chunkZ}),Cv.has(t)||tw(t,e);continue}let r=n??J.getOrCreateChunk(e.chunkX,e.chunkZ);r.status!==`FULL`&&r.status!==`LIGHT_PENDING`&&r.status!==`LIT`&&o<1&&e.distance===0&&(ev.advanceGenerated(r),o+=1),!xv.has(t)&&!Sv.has(t)&&!Ov.has(t)&&Sv.set(t,{chunkX:e.chunkX,chunkZ:e.chunkZ})}}function GC(e,t){let n=new Set,r=[],i=-Math.sin(vy),a=-Math.cos(vy);for(let o=-5;o<=_v;o+=1)for(let s=-5;s<=_v;s+=1){let c=e+s,l=t+o,u=Pg(c,l);if(n.add(u),xv.has(u)||Sv.has(u)||Ov.has(u))continue;let d=Math.hypot(s,o),f=d===0?0:(s*i+o*a)/d;r.push({chunkX:c,chunkZ:l,priority:d*3-Math.max(0,f)*2})}for(let e of Sv.keys())n.has(e)||Sv.delete(e);for(let e of Ov.keys())n.has(e)||Ov.delete(e);r.sort((e,t)=>e.priority-t.priority);for(let e of r)Sv.set(Pg(e.chunkX,e.chunkZ),{chunkX:e.chunkX,chunkZ:e.chunkZ})}function KC(e=yv){let t=0,n=0,r=Sv.size;for(;t<e&&Sv.size>0&&n<r;){let e=Sv.entries().next().value;if(!e)break;n+=1;let[r,i]=e,a=Dv.get(r);if(a){Dv.delete(r),Ev.delete(r),ev.meshes.set(r,a),J.getChunk(i.chunkX,i.chunkZ)?.markStatusAtLeast(`FULL`),qC(i.chunkX,i.chunkZ,a,xv.has(r)),Sv.delete(r),t+=1;continue}if(Cv.has(r)){Sv.delete(r),Sv.set(r,i);continue}if(Ev.has(r)){if(Nv.length>0){let e=tw(r,i);if(Sv.delete(r),Sv.set(r,i),!e)break;t+=1;continue}let e=ev.remeshChunk(i.chunkX,i.chunkZ);Ev.delete(r),qC(i.chunkX,i.chunkZ,e,xv.has(r)),Sv.delete(r),t+=1;continue}if(xv.has(r)){Sv.delete(r);continue}if(Ov.has(r)){Sv.delete(r);continue}let o=J.getChunk(i.chunkX,i.chunkZ);if(!o&&Nv.length>0){let e=tw(r,i);if(Sv.delete(r),Sv.set(r,i),!e)break;t+=1;continue}let s=o??J.getOrCreateChunk(i.chunkX,i.chunkZ);if(s.status===`FULL`){let e=ev.meshes.get(r)??ev.remeshChunk(i.chunkX,i.chunkZ);qC(i.chunkX,i.chunkZ,e),Sv.delete(r)}else if(s.status===`LIGHT_PENDING`||s.status===`LIT`)if(Nv.length>0){let e=tw(r,i);if(Sv.delete(r),Sv.set(r,i),!e)break}else if(s.status===`LIGHT_PENDING`)ev.lightEngine.recomputeChunkLocal(s);else{let e=ev.mesher.buildChunkMesh(s,J);ev.meshes.set(r,e),s.advanceStatus(`FULL`),qC(i.chunkX,i.chunkZ,e),Sv.delete(r)}else ev.advanceGenerated(s);t+=1}}function qC(e,t,n,r=!1){let i=Pg(e,t);if(xv.has(i)&&!r){zC(e,t,n);return}Ov.set(i,{chunkX:e,chunkZ:t,mesh:n})}function JC(e){let t=0;for(;t<e&&Ov.size>0;){let e=YC();if(!e)break;let[n,r]=e;if(Ov.delete(n),!J.getChunk(r.chunkX,r.chunkZ)){ev.meshes.delete(n),Dv.delete(n);continue}let i=performance.now();zC(r.chunkX,r.chunkZ,r.mesh),Fx(ty,performance.now()-i),t+=1}}function YC(){let e=null,t=1/0,n=G(Math.floor(Z.state.position.x)),r=G(Math.floor(Z.state.position.z)),i=-Math.sin(vy),a=-Math.cos(vy);for(let o of Ov){let[,s]=o,c=s.chunkX-n,l=s.chunkZ-r,u=Math.hypot(c,l),d=u===0?0:(c*i+l*a)/u,f=u*4-Math.max(0,d)*2;f<t&&(e=o,t=f)}return e}function XC(e){return Sv.size===0||e>.026?0:yv}function ZC(e){return Ov.size===0?0:Cy?e>.028?0:Ov.size>16&&e<.017?2:1:3}function QC(){if(typeof Worker>`u`)return null;let e=new Worker(new URL(``+new URL(`chunkMeshWorker-Ck4wTzbj.js`,import.meta.url).href,``+import.meta.url),{type:`module`});return e.onmessage=e=>{let t=e.data;if(t.type===`jobFailed`){for(let[e,n]of Cv)if(n===t.id){Cv.delete(e),wv.delete(t.id),iw(t.id);break}console.warn(`chunk mesh worker failed: ${t.message}`);return}let n=Pg(t.chunkX,t.chunkZ);Cv.delete(n);let r=wv.get(t.id);r!==void 0&&(Fx(ny,performance.now()-r),wv.delete(t.id)),iw(t.id),(Sv.has(n)||xv.has(n))&&($C(t.chunkData),Dv.set(n,t.mesh))},e.onerror=e=>{console.warn(`chunk mesh worker error: ${e.message}`)},e}function $C(e){let t=J.getOrCreateChunk(e.chunkX,e.chunkZ);K_(t,e),X_.applyToChunk(t,q)}function ew(){let e=Math.max(1,Math.min(4,navigator.hardwareConcurrency??4)),t=[];for(let n=0;n<e;n+=1){let e=QC();e&&t.push(e)}return t}function tw(e,t){if(Nv.length===0||Cv.has(e)||Cv.size>=ow())return!1;let n=`mesh-${Mv}`;Mv+=1,Cv.set(e,n),wv.set(n,performance.now());let r=nw(t.chunkX,t.chunkZ),i=Nv[r];return Pv[r]=(Pv[r]??0)+1,Tv.set(n,r),i.postMessage({id:n,seed:J_,chunkX:t.chunkX,chunkZ:t.chunkZ,chunkDeltas:sw(t.chunkX,t.chunkZ)}),!0}function nw(e,t){if(Nv.length<=1)return 0;let n=aw(Math.floor(e/4),Math.floor(t/4))%Nv.length,r=rw();return(Pv[n]??0)<=(Pv[r]??0)+1?n:r}function rw(){let e=Fv%Math.max(1,Nv.length),t=Pv[e]??0;for(let n=0;n<Nv.length;n+=1){let r=Pv[n]??0;r<t&&(t=r,e=n)}return Fv=(e+1)%Math.max(1,Nv.length),e}function iw(e){let t=Tv.get(e);t!==void 0&&(Tv.delete(e),Pv[t]=Math.max(0,(Pv[t]??0)-1))}function aw(e,t){let n=Math.imul(e,2654435761)^Math.imul(t,2246822507);return n^=n>>>16,n>>>0}function ow(){return Nv.length===0?0:Cy?$v.last>24?Nv.length:$v.last>19?Nv.length+1:Nv.length*2:Nv.length*3}function sw(e,t){let n=[];for(let r=-1;r<=1;r+=1)for(let i=-1;i<=1;i+=1){let a=e+i,o=t+r,s=J.getChunk(a,o);if(s&&s.blockDeltas.size>0){n.push(zh(s));continue}let c=X_.get(a,o);c&&n.push(c)}return n}function cw(e,t){for(let[n,r]of xv){let[i,a]=n.split(`,`).map(Number);Math.max(Math.abs(i-e),Math.abs(a-t))<=6||(Y.remove(r),uw(r),xv.delete(n),Jv-=kv.get(n)??0,kv.delete(n),Yv-=Av.get(n)??0,Av.delete(n),Dv.delete(n),Ev.delete(n))}}function lw(e,t){for(let[n,r]of Array.from(J.chunks)){if(Math.max(Math.abs(r.chunkX-e),Math.abs(r.chunkZ-t))<=vv)continue;r.blockDeltas.size>0&&X_.capture(r),J.unloadChunk(r.chunkX,r.chunkZ),ev.meshes.delete(n),Dv.delete(n),Sv.delete(n),Ov.delete(n),Ev.delete(n);let i=Cv.get(n);i&&(wv.delete(i),Cv.delete(n))}}function uw(e){e.traverse(e=>{if(!(e instanceof V))return;e.geometry.dispose();let t=Array.isArray(e.material)?e.material:[e.material];for(let n of t)n.userData.sharedTerrainMaterial!==!0&&(n instanceof Gr&&(jv.delete(n),e.name.startsWith(`chunk-layer-fluid`)&&n.map?.dispose()),n.dispose())})}function dw(e){for(let t of jv)t.map&&(t.map.offset.set(e*.015%1,e*.009%1),t.opacity=.56+Math.sin(e*.8)*.025)}function fw(e){if(jy+=e,jy<.35||Sv.size>0||Ov.size>0||ey.last>28)return;jy=0;let t=P_(J,q,{centerX:Math.floor(Z.state.position.x),centerZ:Math.floor(Z.state.position.z),radiusChunks:1,maxEdits:8,maxColumnScans:96});if(t.length===0)return;let n=z_(J,t);for(let e of n){let[t,n]=e.split(`,`).map(Number);!xv.has(e)||!J.getChunk(t,n)||(ev.meshes.delete(e),Ev.add(e),Sv.set(e,{chunkX:t,chunkZ:n}))}}function pw(){if(Z.state.position.y>=-62)return;let e=Math.floor(Z.state.position.x),t=Math.floor(Z.state.position.z);WC(e,t,1);let n=J.getChunk(G(e),G(t));if(!n)return;let r=mw(e,16),i=mw(t,16),a=Math.max(n.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,r,i),Y_.sampleSurfaceHeight(e,t));Z.state.position={x:Z.state.position.x,y:a+1.02,z:Z.state.position.z},Z.state.velocity={x:0,y:0,z:0},Z.state.onGround=!0,_y=Z.state.position.y,gy=Z.eyePosition().y}function mw(e,t){return(e%t+t)%t}function hw(){Jv=0;for(let e of kv.values())Jv+=e;Yv=0;for(let e of Av.values())Yv+=e}function gw(e){if(My+=e,My<1.2)return;My=0;let t=Math.floor(Z.state.position.x),n=Math.floor(Z.state.position.z),r=Math.floor(Z.state.position.y);for(let e=0;e<10;e+=1){let i=t+Math.floor(RC(t,e,tv.timeOfDay)*25)-12,a=n+Math.floor(RC(n,tv.timeOfDay,e)*25)-12,o=J.getMotionBlockingHeightLoaded(i,a);if(o!=null)for(let e=Math.max(-64,Math.min(o+1,r+4));e>=Math.max(-64,r-8);--e){let t=J.getStateIdIfLoaded(i,e,a);if(t===null)continue;let n=q.getState(t);if(n.typeId!==`wheat`)continue;let r=typeof n.properties.age==`number`?n.properties.age:7;if(r>=7)break;let o=Ew(i,e-1,a)?.45:.16;RC(i,e+r,a+Math.floor(tv.timeOfDay))<o&&SS(i,e,a,q.resolveState(`wheat`,{age:r+1}));break}}}function _w(e){if(Ny+=e,Ny<Wy)return;Ny=0;let t=Uv.villagers.filter(e=>e.profession===`farmer`&&e.schedule===`work`&&e.health>0&&e.bellAlarmSeconds<=0);if(t.length===0)return;let n=t[Py%t.length];Py=(Py+1)%Math.max(1,t.length);let r=vw(n);if(r){if(r.distance>Ky){Sw(n,r);return}if(r.kind===`harvest`){Cw(n,r);return}ww(n,r)}}function vw(e){let t=[e.position,e.workstation,e.target,e.meetingPoint].filter(e=>e!==null),n=null;for(let r of t){let t=Math.floor(r.x),i=Math.floor(r.y),a=Math.floor(r.z);for(let r=-12;r<=Gy;r+=1)for(let o=-12;o<=Gy;o+=1){if(Math.hypot(o,r)>Gy)continue;let s=t+o,c=a+r,l=J.getMotionBlockingHeightLoaded(s,c),u=Math.max(-64,Math.min(i,l??i)-4),d=Math.max(i,l??i)+4;for(let t=d;t>=u;--t){let r=yw(e,s,t,c);if(r){(!n||bw(r)<bw(n))&&(n=r);break}}}}return n}function yw(e,t,n,r){let i=J.getStateIdIfLoaded(t,n,r);if(i===null)return null;let a=q.getState(i);return a.typeId===`wheat`?(typeof a.properties.age==`number`?a.properties.age:0)<7?null:{kind:`harvest`,cropX:t,cropY:n,cropZ:r,distance:xw(e,t,n,r)}:a.typeId!==`farmland`||J.getStateIdIfLoaded(t,n+1,r)!==0?null:{kind:`replant`,cropX:t,cropY:n+1,cropZ:r,distance:xw(e,t,n+1,r)}}function bw(e){return e.distance+(e.kind===`harvest`?0:1.2)}function xw(e,t,n,r){return Math.hypot(e.position.x-(t+.5),e.position.z-(r+.5))+Math.abs(e.position.y-n)*.45}function Sw(e,t){e.target={x:t.cropX+.5,y:t.cropY,z:t.cropZ+.5},e.path=[],e.pathTarget=null,e.activeGoal=`work`,e.idleSeconds=0}function Cw(e,t){let n=J.getStateIdIfLoaded(t.cropX,t.cropY,t.cropZ);if(n===null||q.getState(n).typeId!==`wheat`)return;let r={x:t.cropX+.5,y:t.cropY+.45,z:t.cropZ+.5};SS(t.cropX,t.cropY,t.cropZ,0),YS(`wheat`,r,1),Uf(e,`wheat`,1);let i=Math.floor(RC(t.cropX,t.cropY+Math.floor(tv.timeOfDay),t.cropZ)*2);i>0&&YS(`seeds`,r,i),q.getState(J.getStateIdIfLoaded(t.cropX,t.cropY-1,t.cropZ)??0).typeId===`farmland`&&SS(t.cropX,t.cropY,t.cropZ,q.resolveState(`wheat`,{age:0})),Tw(e,r,[14271850,7972932])}function ww(e,t){q.getState(J.getStateIdIfLoaded(t.cropX,t.cropY-1,t.cropZ)??0).typeId!==`farmland`||J.getStateIdIfLoaded(t.cropX,t.cropY,t.cropZ)!==0||(SS(t.cropX,t.cropY,t.cropZ,q.resolveState(`wheat`,{age:0})),Tw(e,{x:t.cropX+.5,y:t.cropY+.25,z:t.cropZ+.5},[8829271,13152602]))}function Tw(e,t,n){e.idleSeconds=Math.max(e.idleSeconds,.8),Math.hypot(Z.state.position.x-t.x,Z.state.position.z-t.z)<=20&&X.playPlace(`grass`),LS(t,4,n)}function Ew(e,t,n){for(let r=-4;r<=4;r+=1)for(let i=-4;i<=4;i+=1){let a=J.getStateIdIfLoaded(e+i,t,n+r);if(a!==null&&q.getState(a).typeId===`water`)return!0}return!1}function Dw(){Vb.forEach((e,t)=>{e.classList.toggle(`selected`,t===$.selectedIndex);let n=$.slots[t]??DT(`empty`,null,0),r=n.stateId;e.classList.toggle(`empty`,r===null&&!n.food&&!n.tool&&!n.armor),e.title=n.label,e.style.setProperty(`--slot-color`,MT(n)),e.style.setProperty(`--durability`,IT(n));let i=e.querySelector(`.hotbar-item`),a=e.querySelector(`.hotbar-count`);e.classList.toggle(`has-durability`,!!n.tool||!!n.armor),i&&(i.className=`hotbar-item ${NT(n)}`),a&&(a.textContent=n.count>1&&!n.tool&&!n.armor?String(n.count):``)}),_T(),Nw()}function Ow(){if(ab){kw({requestPointerLock:!0});return}Aw(`player`)}function kw(e={}){!ab&&Yy===null&&Jy===null||(ab=!1,Yy=null,Jy=null,Nw(),e.requestPointerLock&&Cy&&!Ty&&!Sy&&Jb())}function Aw(e){Ty||(e!==`chest`&&(Jy=null),e!==`trade`&&(Yy=null),ob=e,ab=!0,ab&&document.pointerLockElement===rv.domElement&&Xb(),US(),Nw())}function jw(e,t,n){Jy=qS(e,t,n),qy.has(Jy)||qy.set(Jy,ET(By)),Aw(`chest`)}function Mw(e){Yy=e,Aw(`trade`)}function Nw(){if(!Hb)return;Hb.classList.toggle(`visible`,ab),q_.classList.toggle(`crafting-open`,ab),Hb.replaceChildren(),Hb.classList.toggle(`workbench`,ob===`workbench`),Hb.classList.toggle(`furnace`,ob===`furnace`),Hb.classList.toggle(`chest`,ob===`chest`),Hb.classList.toggle(`trade`,ob===`trade`),Hb.classList.toggle(`inventory`,ob===`player`);let e=document.createElement(`div`);e.className=`crafting-header`;let t=document.createElement(`div`);t.className=`crafting-title`,t.textContent=Pw();let n=document.createElement(`button`);if(n.type=`button`,n.className=`crafting-close`,n.title=`閉じる`,n.textContent=`×`,n.addEventListener(`click`,()=>kw({requestPointerLock:!0})),e.append(t,n),Hb.appendChild(e),ob===`chest`){Hb.appendChild(Kw()),Hb.appendChild(Gw());return}if(ob===`trade`){Hb.appendChild(Fw()),Hb.appendChild(Gw());return}ob===`player`&&Hb.appendChild(Ww());let r=document.createElement(`div`);r.className=`crafting-workspace`;let i=ob===`workbench`?`grid-3`:ob===`furnace`?`grid-furnace`:`grid-2`,a=ob===`workbench`?9:ob===`furnace`?2:4;r.innerHTML=`
    <div class="crafting-grid ${i}">
      ${Array.from({length:a},(e,t)=>`<span class="crafting-cell ${ob===`furnace`&&t===1?`fuel-cell`:``}"></span>`).join(``)}
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result-slot"><span class="crafting-output-preview"></span></div>
  `,Hb.appendChild(r);let o=document.createElement(`div`);o.className=`crafting-hint`,o.textContent=ob===`furnace`?`鉱石素材と石炭を消費してインゴットへ精錬。`:ob===`workbench`?`3x3 レシピ`:`2x2 クラフトと装備。作業台を置いて右クリックすると3x3。`,Hb.appendChild(o),ob===`player`&&Hb.appendChild(Gw());for(let e of Qy.filter(sT)){let t=e.output(),n=oT(e,t),r=document.createElement(`button`);r.type=`button`,r.className=`crafting-recipe`,r.disabled=!n,r.classList.toggle(`locked`,!sT(e)),r.innerHTML=`
      <span class="crafting-output ${NT(t)}"></span>
      <span class="crafting-name">${e.label}</span>
      <span class="crafting-cost">${mT(e)}</span>
    `,r.addEventListener(`click`,()=>aT(e)),Hb.appendChild(r)}}function Pw(){if(ob===`chest`)return`チェスト`;if(ob===`furnace`)return`かまど`;if(ob===`workbench`)return`作業台`;if(ob===`trade`){let e=Iw();return e?`${Vw(e.profession)}との取引`:`取引`}return`インベントリ`}function Fw(){let e=document.createElement(`div`);e.className=`trade-panel`;let t=Iw();if(!t){let t=document.createElement(`div`);return t.className=`crafting-hint`,t.textContent=`村人が近くにいません。`,e.appendChild(t),e}let n=document.createElement(`div`);n.className=`trade-portrait profession-${t.profession}`,n.innerHTML=`
    <span class="trade-face"></span>
    <span class="trade-nose"></span>
    <span class="trade-eye left"></span>
    <span class="trade-eye right"></span>
  `;let r=document.createElement(`div`);r.className=`trade-intro`;let i=Vf(t),a=i===null?1:Math.max(0,Math.min(1,t.tradeXp/i)),o=t.reputation>0?`評判 +${t.reputation}`:`評判 ${t.reputation}`,s=Wf(t,`wheat`);r.innerHTML=`
    <strong>${Vw(t.profession)} Lv.${t.tradeLevel} ${Uw(t.tradeLevel)}</strong>
    <span>${Hw(t.profession)}</span>
    <span class="trade-xp"><i style="width: ${Math.round(a*100)}%"></i></span>
    <span class="trade-xp-label">${i===null?`最高レベル`:`経験値 ${t.tradeXp}/${i}`} / ${o}</span>
    ${s>0?`<span class="trade-carried">所持作物: 小麦 ${s}</span>`:``}
  `,e.append(n,r);let c=document.createElement(`div`);c.className=`trade-help`,c.textContent=`材料が揃った取引をクリック。売り切れは仕事場で補充されます。Esc / × / E / I で閉じます。`,e.appendChild(c);for(let n of $y.filter(e=>e.villager===t.profession)){let r=n.output(),i=Lw(n,t),a=If(t,n.id,n.maxUses),o=t.tradeLevel<n.requiredLevel,s=Rw(n,r),c=document.createElement(`button`);c.type=`button`,c.className=`trade-recipe ${a<=0?`sold-out`:``} ${o?`level-locked`:``}`,c.disabled=!s,c.innerHTML=`
      <span class="trade-cost">${hT(i)}</span>
      <span class="trade-arrow">→</span>
      <span class="crafting-output ${NT(r)}"></span>
      <span class="crafting-name">${n.label}</span>
      <span class="trade-stock">${o?`Lv.${n.requiredLevel}で解放`:a<=0?`売り切れ`:`在庫 ${a}/${n.maxUses}`}</span>
    `,c.addEventListener(`click`,()=>zw(n)),e.appendChild(c)}return e}function Iw(){return Uv.villagers.find(e=>e.id===Yy)??null}function Lw(e,t){let n=Kf(t.reputation);return e.ingredients.map(e=>({label:e.label,count:Math.max(1,Math.ceil(e.count*n))}))}function Rw(e,t=e.output()){let n=Iw();if(!n)return!1;let r=Lw(e,n);return n.tradeLevel>=e.requiredLevel&&Lf(n,e.id,e.maxUses)&&$.hasItems(r)&&lT(t)}function zw(e){let t=Iw();if(!t)return;let n=e.output(),r=Lw(e,t);if(!Rw(e,n)||!$.removeItems(r))return;if(!uT(n)){dT(r),Nw();return}Rf(t,e.id,e.maxUses);let i=t.tradeLevel;zf(t,e.xp),Hf(t,1),X.playPickup(),IS(`place`);let a=If(t,e.id,e.maxUses);yS(t.tradeLevel>i?`${Vw(t.profession)}がLv.${t.tradeLevel}になりました`:a>0?`取引しました`:`取引が売り切れました`),Dw(),Nw()}function Bw(e,t){for(let n of Uv.villagers)n.villageId===e&&Hf(n,t)}function Vw(e){switch(e){case`farmer`:return`農民`;case`librarian`:return`司書`;case`mason`:return`石工`}}function Hw(e){switch(e){case`farmer`:return`食べ物と木材を交換します。`;case`librarian`:return`探索に役立つ品を扱っています。`;case`mason`:return`石材なら任せてください。`}}function Uw(e){switch(e){case 1:return`新人`;case 2:return`見習い`;case 3:return`一人前`;case 4:return`熟練`;case 5:return`達人`}}function Ww(){let e=document.createElement(`div`);e.className=`equipment-panel`;let t=document.createElement(`div`);t.className=`equipment-armor-grid`;for(let e of[`helmet`,`chestplate`,`leggings`,`boots`]){let n=Zy[e],r=document.createElement(`button`);r.type=`button`,r.className=`equipment-slot ${n?`filled`:`empty`}`,r.title=n?`${rT(e)}を外す`:rT(e),r.innerHTML=n?`<span class="crafting-output item-armor item-${TS(e)}"></span><span class="equipment-durability">${Math.ceil(n.durability/n.maxDurability*100)}%</span>`:`<span class="equipment-placeholder">${iT(e)}</span>`,r.addEventListener(`click`,()=>nT(e)),t.appendChild(r)}let n=document.createElement(`div`);n.className=`equipment-avatar`,n.innerHTML=`
    <span class="avatar-head"></span>
    <span class="avatar-body"></span>
    <span class="avatar-arm left"></span>
    <span class="avatar-arm right"></span>
    <span class="avatar-leg left"></span>
    <span class="avatar-leg right"></span>
  `;let r=document.createElement(`div`);return r.className=`equipment-summary`,r.innerHTML=`
    <strong>Armor</strong>
    <span>${uC()} / 20</span>
    <small>防具を選んで右クリック、または下の所持品からクリックで装備</small>
  `,e.append(t,n,r),e}function Gw(){let e=document.createElement(`div`);e.className=`inventory-strip`;let t=document.createElement(`div`);t.className=`inventory-strip-title`,t.textContent=`所持品`,e.appendChild(t);let n=document.createElement(`div`);return n.className=`inventory-strip-grid`,$.slots.forEach((e,t)=>{let r=document.createElement(`button`),i=e.count<=0||!e.tool&&!e.armor&&!e.food&&!e.item&&e.stateId===null;r.type=`button`,r.className=`inventory-slot ${i?`empty`:``} ${t===$.selectedIndex?`selected`:``}`,r.style.setProperty(`--slot-color`,MT(e)),r.title=i?`スロット ${t+1}`:e.label,r.innerHTML=`
      <span class="inventory-key">${t+1}</span>
      <span class="hotbar-item ${i?``:NT(e)}"></span>
      <span class="inventory-count">${e.count>1&&!e.tool&&!e.armor?e.count:``}</span>
    `,r.addEventListener(`click`,()=>{Jw(t)}),n.appendChild(r)}),e.appendChild(n),e}function Kw(){let e=document.createElement(`div`);e.className=`chest-panel`;let t=document.createElement(`div`);t.className=`inventory-strip-title`,t.textContent=`チェスト`,e.appendChild(t);let n=Jy?qy.get(Jy)??ET(By):ET(By);Jy&&!qy.has(Jy)&&qy.set(Jy,n);let r=document.createElement(`div`);return r.className=`chest-grid`,n.forEach((e,t)=>{let n=document.createElement(`button`),i=pT(e);n.type=`button`,n.className=`inventory-slot chest-slot ${i?`empty`:``}`,n.style.setProperty(`--slot-color`,MT(e)),n.title=i?`チェスト ${t+1}`:e.label,n.innerHTML=`
      <span class="hotbar-item ${i?``:NT(e)}"></span>
      <span class="inventory-count">${e.count>1&&!e.tool&&!e.armor?e.count:``}</span>
    `,n.addEventListener(`click`,()=>qw(t)),r.appendChild(n)}),e.appendChild(r),e}function qw(e){if(!Jy)return;let t=qy.get(Jy),n=t?.[e];if(!(!t||!n||pT(n))){if(!Xw(n)){yS(`インベントリがいっぱいです`);return}t[e]=DT(`empty`,null,0),Dw(),Nw(),X.playPickup()}}function Jw(e){if(!Number.isInteger(e)||e<0||e>=$.slots.length)return;if(e<Ry){wT(e),$.selectedSlot().armor&&wS();return}let t=$.slots[e];if(pT(t))return;if(t.armor){tT(e);return}if(ob===`chest`&&Jy){Yw(e);return}let n=Math.max(0,Math.min(Ry-1,$.selectedIndex)),r=Uh([$.slots[n]])[0];$.slots[n]=Uh([t])[0],$.slots[e]=r,$.select(n),Dw(),Nw(),IS(`place`),X.playPickup()}function Yw(e){if(!Jy)return;let t=$.slots[e];if(pT(t))return;let n=qy.get(Jy)??ET(By);if(qy.set(Jy,n),!Zw(n,t)){yS(`チェストがいっぱいです`);return}$.slots[e]=DT(`empty`,null,0),e<Ry&&$.select(Math.max(0,Math.min(Ry-1,$.selectedIndex))),Dw(),Nw(),X.playPickup()}function Xw(e){return e.tool?$.addToolStack(e):e.armor?$.addArmorStack(e):e.food?$.addFoodStack(e.label,e.food,e.count,e.maxStackSize):e.item?$.addItemStack(e.label,e.count,e.maxStackSize):e.stateId===null?!0:$.addStack(e.stateId,e.label,e.count,e.maxStackSize)}function Zw(e,t){if(!Qw(e,t))return!1;if(t.tool||t.armor){let n=e.findIndex(pT);return n<0?!1:(e[n]=eT(t),!0)}let n=t.count;for(let r of e){if(!$w(r,t))continue;let e=Math.min(n,r.maxStackSize-r.count);if(r.count+=e,n-=e,n<=0)return!0}for(let r=0;r<e.length;r+=1){if(!pT(e[r]))continue;let i=Math.min(n,t.maxStackSize),a=eT(t);if(a.count=i,e[r]=a,n-=i,n<=0)return!0}return!1}function Qw(e,t){if(t.tool||t.armor)return e.some(pT);let n=0;for(let r of e)if($w(r,t)?n+=r.maxStackSize-r.count:pT(r)&&(n+=t.maxStackSize),n>=t.count)return!0;return!1}function $w(e,t){return e.count>=e.maxStackSize||e.maxStackSize!==t.maxStackSize||e.label!==t.label||e.stateId!==t.stateId?!1:e.item||t.item?e.item?.id===t.item?.id&&e.item?.kind===t.item?.kind:e.food||t.food?!!(e.food&&t.food)&&e.food.nutrition===t.food.nutrition&&e.food.saturationModifier===t.food.saturationModifier:e.stateId!==null}function eT(e){return Uh([e])[0]??DT(`empty`,null,0)}function tT(e){let t=$.slots[e].armor;if(!t)return;let n=Zy[t.slot];Zy[t.slot]={...t},$.slots[e]=n?AT(TS(n.slot),n.slot,n.points,n.maxDurability,n.durability):DT(`empty`,null,0),Tb=-1,Dw(),vT(),Nw(),IS(`place`),X.playPickup()}function nT(e){let t=Zy[e];if(t){if(!$.addArmorStack(AT(TS(e),e,t.points,t.maxDurability,t.durability))){yS(`防具を外す空きスロットがありません`);return}Zy[e]=null,Tb=-1,Dw(),vT(),Nw(),IS(`place`),X.playPickup()}}function rT(e){switch(e){case`helmet`:return`ヘルメット`;case`chestplate`:return`チェストプレート`;case`leggings`:return`レギンス`;case`boots`:return`ブーツ`}}function iT(e){switch(e){case`helmet`:return`◇`;case`chestplate`:return`▣`;case`leggings`:return`∥`;case`boots`:return`▔`}}function aT(e){let t=e.output();if(!(!oT(e,t)||!$.removeItems(e.ingredients))){if(!uT(t)){dT(e.ingredients),Nw();return}Dw(),Nw(),IS(`place`),X.playPickup()}}function oT(e,t=e.output()){return sT(e)&&$.hasItems(e.ingredients)&&lT(t)}function sT(e){return e.station?e.station===ob:ob!==`furnace`&&e.gridSize<=cT()}function cT(){return ob===`furnace`?0:ob===`workbench`?3:2}function lT(e){return e.tool||e.armor?$.slots.some(pT):e.item?$.slots.some(t=>t.item&&t.label===e.label&&t.count<t.maxStackSize||pT(t)):e.food?$.slots.some(t=>t.food&&t.label===e.label&&t.count<t.maxStackSize||pT(t)):e.stateId===null?!1:$.slots.some(t=>t.stateId===e.stateId&&t.count<t.maxStackSize||pT(t))}function uT(e){return e.tool?$.addToolStack(e):e.armor?$.addArmorStack(e):e.item?$.addItemStack(e.label,e.count,e.maxStackSize):e.food?$.addFoodStack(e.label,e.food,e.count,e.maxStackSize):e.stateId===null?!1:$.addStack(e.stateId,e.label,e.count,e.maxStackSize)}function dT(e){for(let t of e){let e=fT(t.label);e===null?$.addItemStack(t.label,t.count):$.addStack(e,t.label,t.count)}}function fT(e){switch(e){case`stone`:case`log`:case`planks`:case`crafting_table`:case`cobblestone`:case`furnace`:case`chest`:case`bed`:case`door`:case`composter`:case`lectern`:case`stonecutter`:return q.resolveState(e);default:return null}}function pT(e){return e.stateId===null&&!e.food&&!e.item&&!e.tool&&!e.armor&&e.count<=0}function mT(e){return hT(e.ingredients)}function hT(e){return e.map(e=>`${gT(e.label)} ${$.countItem(e.label)}/${e.count}`).join(`  `)}function gT(e){switch(e){case`log`:return`原木`;case`planks`:return`木材`;case`stick`:return`棒`;case`stone`:return`石`;case`cobblestone`:return`丸石`;case`coal`:return`石炭`;case`raw_iron`:return`原鉄`;case`raw_gold`:return`原金`;case`iron_ingot`:return`鉄`;case`gold_ingot`:return`金`;case`diamond`:return`ダイヤ`;case`emerald`:return`エメラルド`;case`wheat`:return`小麦`;case`seeds`:return`種`;case`bread`:return`パン`;case`raw_beef`:return`生の牛肉`;case`cooked_beef`:return`ステーキ`;case`raw_porkchop`:return`生の豚肉`;case`cooked_porkchop`:return`焼き豚`;case`wood_hoe`:return`木のクワ`;case`stone_hoe`:return`石のクワ`;case`iron_hoe`:return`鉄のクワ`;case`crafting_table`:return`作業台`;case`furnace`:return`かまど`;case`chest`:return`チェスト`;case`bed`:return`ベッド`;case`door`:return`ドア`;case`bell`:return`鐘`;case`composter`:return`コンポスター`;case`lectern`:return`書見台`;case`stonecutter`:return`石切台`;default:return e}}function _T(){let e=$.selectedSlot(),t=_b.querySelector(`.held-item-icon`);if(!t)return;let n=e.count<=0||!e.tool&&!e.armor&&!e.food&&!e.item&&e.stateId===null;_b.classList.toggle(`empty`,n),_b.style.setProperty(`--held-color`,MT(e)),t.className=`held-item-icon ${n?``:NT(e)}`}function vT(){if(yb){let e=Z.state.eyesInWater||py.state.airTicks<300;py.state.airTicks!==wb&&(yb.innerHTML=CT(py.state.airTicks),wb=py.state.airTicks),e!==Cb&&(yb.classList.toggle(`visible`,e),Cb=e)}if(xb&&py.state.health!==Eb&&(xb.innerHTML=ST(`heart`,py.state.health),Eb=py.state.health),bb){let e=uC();e!==Tb&&(bb.innerHTML=ST(`armor-pip`,e),Tb=e,bb.classList.toggle(`visible`,e>0))}Sb&&py.state.foodLevel!==Db&&(Sb.innerHTML=ST(`hunger-pip`,py.state.foodLevel),Db=py.state.foodLevel)}function yT(){xT(hb,`visible`),vb.classList.add(`fed`),window.setTimeout(()=>vb.classList.remove(`fed`),260)}function bT(){xT(mb,`visible`),vb.classList.add(`damaged`),window.setTimeout(()=>vb.classList.remove(`damaged`),320)}function xT(e,t){e.classList.remove(t),e.offsetWidth,e.classList.add(t)}function ST(e,t){let n=[];for(let r=0;r<10;r+=1){let i=t-r*2,a=i>=2?`full`:i>=1?`half`:`empty`;n.push(`<span class="${e} ${a}"></span>`)}return n.join(``)}function CT(e){let t=[];for(let n=0;n<10;n+=1){let r=e-n*30,i=r>=30?`full`:r>0?`half`:`empty`;t.push(`<span class="bubble ${i}"></span>`)}return t.join(``)}function wT(e){$.select(e),Dw()}function TT(){let e=[kT(`stone_sword`,`sword`,`stone`,7,1,131),kT(`stone_pickaxe`,`pickaxe`,`stone`,5,3.2,131),DT(`grass`,q.resolveState(`grass`),64),DT(`dirt`,q.resolveState(`dirt`),64),DT(`stone`,q.resolveState(`stone`),64),DT(`sand`,q.resolveState(`sand`),64),DT(`log`,q.resolveState(`log`),32),OT(`apple`,8,4,.3),DT(`torch`,q.resolveState(`torch`),16)];for(;e.length<zy;)e.push(DT(`empty`,null,0));return e}function ET(e){return Array.from({length:e},()=>DT(`empty`,null,0))}function DT(e,t,n){return{label:e,stateId:t,count:n,maxStackSize:64}}function OT(e,t,n,r){return{label:e,stateId:null,count:t,maxStackSize:64,food:{nutrition:n,saturationModifier:r}}}function kT(e,t,n,r,i,a){return{label:e,stateId:null,count:1,maxStackSize:1,tool:{kind:t,level:n,attackDamage:r,miningSpeed:i,durability:a,maxDurability:a}}}function AT(e,t,n,r,i=r){return{label:e,stateId:null,count:1,maxStackSize:1,armor:{slot:t,material:`iron`,points:n,durability:i,maxDurability:r}}}function jT(e,t){return{label:e,stateId:null,count:t,maxStackSize:64,item:{id:e,kind:`material`}}}function MT(e){return e.tool?e.tool.level===`iron`?`#d8dde0`:e.tool.level===`stone`?`#aeb5b9`:`#9a6a3e`:e.armor?`#d8dde0`:e.item?FT(e.item.id):e.food?e.label===`bread`?`#c99a4a`:e.label.startsWith(`cooked_`)?`#b86a36`:`#c9352b`:e.stateId===null?`transparent`:BT(e.stateId)}function NT(e){return e.tool?`item-tool item-${e.tool.level}-${e.tool.kind}`:e.armor?`item-armor item-${e.label}`:e.item?`item-material item-${e.item.id}`:e.food?`item-${e.label}`:e.stateId===null?``:`item-${q.getState(e.stateId).typeId}`}function PT(e){return e.tool?e.tool.level===`iron`?`#d8dde0`:e.tool.level===`stone`?`#aeb5b9`:`#9a6a3e`:e.armor?`#d8dde0`:e.item?FT(e.item.id):e.food?e.label===`bread`?`#c99a4a`:e.label.startsWith(`cooked_`)?`#b86a36`:`#c9352b`:e.stateId===null?`#ffffff`:BT(e.stateId)}function FT(e){switch(e){case`coal`:return`#202124`;case`raw_iron`:return`#c08b67`;case`raw_gold`:return`#d7a636`;case`iron_ingot`:return`#d8dde0`;case`gold_ingot`:return`#ffd166`;case`diamond`:return`#61d5d8`;case`emerald`:return`#39c978`;case`wheat`:return`#d9b64a`;case`seeds`:return`#8fa84f`;case`stick`:return`#9a6a3e`;default:return`#d9dee2`}}function IT(e){return e.tool?`${Math.max(0,Math.min(100,e.tool.durability/e.tool.maxDurability*100))}%`:e.armor?`${Math.max(0,Math.min(100,e.armor.durability/e.armor.maxDurability*100))}%`:`0%`}function LT(e){$.damageSelectedTool(e)}function RT(e){return q.getState(e).typeId}function zT(e){if(!e.startsWith(`Digit`))return null;let t=Number(e.slice(5));return!Number.isInteger(t)||t<1?null:t-1}function BT(e){switch(q.getState(e).typeId){case`grass`:return`#5f9f4a`;case`dirt`:return`#765039`;case`stone`:return`#858585`;case`gold_ore`:return`#d2a747`;case`diamond_ore`:return`#63cdd0`;case`sand`:return`#d7c37b`;case`gravel`:return`#7b7b75`;case`snow`:return`#e6edf1`;case`water`:return`#386ed8`;case`lava`:return`#ff6f1a`;case`log`:return`#7a5735`;case`planks`:return`#b7844e`;case`cobblestone`:return`#74746f`;case`leaves`:return`#3f8f43`;case`lamp`:return`#ffd166`;case`torch`:return`#ffc857`;case`crafting_table`:return`#9b6a3b`;case`furnace`:return`#5d5d58`;case`chest`:return`#a66d35`;case`bed`:return`#b73535`;case`door`:return`#9b6a3b`;case`bell`:return`#d9a640`;case`composter`:return`#8b5c31`;case`lectern`:return`#9a6a3e`;case`stonecutter`:return`#8b8a82`;case`farmland`:return`#6b4a2f`;case`wheat`:return`#d9b64a`;default:return`#eef4f8`}}function VT(){let e=J.getStateIdIfLoaded(Math.floor(Z.state.position.x),Math.floor(Z.state.position.y-.12),Math.floor(Z.state.position.z));return e===null?`grass`:HT(e)}function HT(e){return q.getDefinitionForState(e).soundGroup??`stone`}function UT(){let e=[];for(let t=-8;t<=24;t+=1)for(let n=-8;n<=24;n+=1)e.push({x:n,z:t,distance:Math.hypot(n-8,t-8)});e.sort((e,t)=>e.distance-t.distance);for(let t of e){let e=Math.floor(t.x/16),n=Math.floor(t.z/16),r=J.getChunk(e,n);if(!r)continue;let i=(t.x%16+16)%16,a=(t.z%16+16)%16,o=r.heightmaps.get(`MOTION_BLOCKING_NO_LEAVES`,i,a)+1.02,s=Math.floor(o);if(WT(t.x,s,t.z))return{x:t.x+.5,y:o,z:t.z+.5}}return{x:8.5,y:90,z:8.5}}function WT(e,t,n){for(let r=-1;r<=1;r+=1)for(let i=-1;i<=1;i+=1)for(let a=t;a<=t+2;a+=1)if(J.isSolidBlockLoaded(e+i,a,n+r))return!1;return!0}function GT(e){return Math.atan2(-e.x,-e.z)}function KT(e){return Math.max(-.45,Math.min(.45,Math.asin(e.y)))}window.addEventListener(`resize`,()=>{nv.aspect=window.innerWidth/window.innerHeight,nv.updateProjectionMatrix(),rv.setSize(window.innerWidth,window.innerHeight)}),rS(),Ox();