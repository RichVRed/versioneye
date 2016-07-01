!function(){"use strict";function t(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function e(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(r){function i(t){t=t||{};for(var e=t.newLine||!1,n=t.ignoreTags||[],r=0;r<n.length;r++)n[r]=n[r].toUpperCase();return{attributes:t.linkAttributes||null,defaultProtocol:t.defaultProtocol||"http",events:t.events||null,format:t.format||s,validate:t.validate||u,formatHref:t.formatHref||s,newLine:t.newLine||!1,nl2br:!!e||t.nl2br||!1,tagName:t.tagName||"a",target:t.target||l,linkClass:t.linkClass||"linkified",ignoreTags:n}}function o(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return"function"==typeof t?t.apply(void 0,n):t}function a(t,e){for(var n=0;n<t.length;n++)if(t[n]==e)return!0;return!1}function s(t){return t}function u(){return!0}function l(t,e){return"url"===e?"_blank":null}function c(t){return t instanceof d||t instanceof M}function p(t,e,n,r){for(var i=0,o=t.length,a=e,s=[],u=void 0;o>i&&(u=a.next(t[i]));)a=u,i++;if(i>=o)return[];for(;o-1>i;)u=new q(r),s.push(u),a.on(t[i],u),a=u,i++;return u=new q(n),s.push(u),a.on(t[o-1],u),s}var h=Object.freeze({normalize:i,resolve:o,contains:a}),f=function(){function t(e){n(this,t),this.v=e}return t.prototype.toString=function(){return this.v+""},t}(),d=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),m=function(r){function i(){return n(this,i),t(this,r.call(this,"@"))}return e(i,r),i}(f),g=function(r){function i(){return n(this,i),t(this,r.call(this,":"))}return e(i,r),i}(f),v=function(r){function i(){return n(this,i),t(this,r.call(this,"."))}return e(i,r),i}(f),y=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),b=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),w=function(r){function i(){return n(this,i),t(this,r.call(this,"\n"))}return e(i,r),i}(f),x=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),C=function(r){function i(){return n(this,i),t(this,r.call(this,"+"))}return e(i,r),i}(f),E=function(r){function i(){return n(this,i),t(this,r.call(this,"#"))}return e(i,r),i}(f),_=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),S=function(r){function i(){return n(this,i),t(this,r.call(this,"?"))}return e(i,r),i}(f),k=function(r){function i(){return n(this,i),t(this,r.call(this,"/"))}return e(i,r),i}(f),T=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),M=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),A=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i}(f),R=function(r){function i(){return n(this,i),t(this,r.call(this,"{"))}return e(i,r),i}(f),O=function(r){function i(){return n(this,i),t(this,r.call(this,"["))}return e(i,r),i}(f),D=function(r){function i(){return n(this,i),t(this,r.call(this,"("))}return e(i,r),i}(f),N=function(r){function i(){return n(this,i),t(this,r.call(this,"}"))}return e(i,r),i}(f),P=function(r){function i(){return n(this,i),t(this,r.call(this,"]"))}return e(i,r),i}(f),I=function(r){function i(){return n(this,i),t(this,r.call(this,")"))}return e(i,r),i}(f),j={Base:f,DOMAIN:d,AT:m,COLON:g,DOT:v,PUNCTUATION:y,LOCALHOST:b,NL:w,NUM:x,PLUS:C,POUND:E,QUERY:S,PROTOCOL:_,SLASH:k,SYM:T,TLD:M,WS:A,OPENBRACE:R,OPENBRACKET:O,OPENPAREN:D,CLOSEBRACE:N,CLOSEBRACKET:P,CLOSEPAREN:I},L=function(){function t(e){n(this,t),this.v=e,this.type="token",this.isLink=!1}return t.prototype.toString=function(){for(var t=[],e=0;e<this.v.length;e++)t.push(this.v[e].toString());return t.join("")},t.prototype.toHref=function(){return this.toString()},t.prototype.toObject=function(){var t=arguments.length<=0||void 0===arguments[0]?"http":arguments[0];return{type:this.type,value:this.toString(),href:this.toHref(t)}},t}(),$=function(r){function i(e){n(this,i);var o=t(this,r.call(this,e));return o.type="email",o.isLink=!0,o}return e(i,r),i.prototype.toHref=function(){return"mailto:"+this.toString()},i}(L),F=function(r){function i(e){n(this,i);var o=t(this,r.call(this,e));return o.type="text",o}return e(i,r),i}(L),B=function(r){function i(e){n(this,i);var o=t(this,r.call(this,e));return o.type="nl",o}return e(i,r),i}(L),U=function(r){function i(e){n(this,i);var o=t(this,r.call(this,e));return o.type="url",o.isLink=!0,o}return e(i,r),i.prototype.toHref=function(){for(var t=arguments.length<=0||void 0===arguments[0]?"http":arguments[0],e=!1,n=!1,r=this.v,i=[],o=0;r[o]instanceof _;)e=!0,i.push(r[o].toString().toLowerCase()),o++;for(;r[o]instanceof k;)n=!0,i.push(r[o].toString()),o++;for(;c(r[o]);)i.push(r[o].toString().toLowerCase()),o++;for(;o<r.length;o++)i.push(r[o].toString());return i=i.join(""),e||n||(i=t+"://"+i),i},i.prototype.hasProtocol=function(){return this.v[0]instanceof _},i}(L),z={Base:L,EMAIL:$,NL:B,TEXT:F,URL:U},H=function(){function t(e){n(this,t),this.j=[],this.T=e||null}return t.prototype.on=function(t,e){if(t instanceof Array){for(var n=0;n<t.length;n++)this.j.push([t[n],e]);return this}return this.j.push([t,e]),this},t.prototype.next=function(t){for(var e=0;e<this.j.length;e++){var n=this.j[e],r=n[0],i=n[1];if(this.test(t,r))return i}return!1},t.prototype.accepts=function(){return!!this.T},t.prototype.test=function(t,e){return t===e},t.prototype.emit=function(){return this.T},t}(),q=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i.prototype.test=function(t,e){return t===e||e instanceof RegExp&&e.test(t)},i}(H),V=function(r){function i(){return n(this,i),t(this,r.apply(this,arguments))}return e(i,r),i.prototype.test=function(t,e){return t instanceof e},i}(H),W="abogado|ac|academy|accountants|active|actor|ad|adult|ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|an|android|ao|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|band|bar|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cal|camera|camp|cancerresearch|capetown|capital|caravan|cards|care|career|careers|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|cheap|christmas|chrome|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cz|dad|dance|dating|day|de|deals|degree|delivery|democrat|dental|dentist|desi|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|domains|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fitness|fj|fk|flights|florist|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gbiz|gd|ge|gent|gf|gg|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|haus|healthcare|help|here|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kz|la|lacaixa|land|latrobe|lawyer|lb|lc|lds|lease|legal|lgbt|li|life|lighting|limited|limo|link|lk|loans|local|london|lotto|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|ong|onl|ooo|org|organic|otsuka|ovh|pa|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu|sa|saarland|sarl|sb|sc|sca|scb|schmidt|schule|science|scot|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|town|toys|tp|tr|trade|training|travel|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xxx|xyz|yachts|yandex|ye|yoga|yokohama|youtube|yt|za|zip|zm|zone|zw".split("|"),K=/[0-9]/,Q=/[a-z0-9]/,Y=":",X=[],G=function(t){return new q(t)},J=j.DOMAIN,Z=j.LOCALHOST,tt=j.NUM,et=j.PROTOCOL,nt=j.TLD,rt=j.WS,it=G(),ot=G(tt),at=G(J),st=G(),ut=G(rt);it.on("@",G(j.AT)).on(".",G(j.DOT)).on("+",G(j.PLUS)).on("#",G(j.POUND)).on("?",G(j.QUERY)).on("/",G(j.SLASH)).on(Y,G(j.COLON)).on("{",G(j.OPENBRACE)).on("[",G(j.OPENBRACKET)).on("(",G(j.OPENPAREN)).on("}",G(j.CLOSEBRACE)).on("]",G(j.CLOSEBRACKET)).on(")",G(j.CLOSEPAREN)).on(/[,;!]/,G(j.PUNCTUATION)),it.on(/\n/,G(j.NL)).on(/\s/,ut),ut.on(/[^\S\n]/,ut);for(var lt=0;lt<W.length;lt++){var ct=p(W[lt],it,nt,J);X.push.apply(X,ct)}var pt=p("file",it,J,J),ht=p("ftp",it,J,J),ft=p("http",it,J,J);X.push.apply(X,pt),X.push.apply(X,ht),X.push.apply(X,ft);var dt=pt.pop(),mt=ht.pop(),gt=ft.pop(),vt=G(J),yt=G(et);mt.on("s",vt).on(Y,yt),gt.on("s",vt).on(Y,yt),X.push(vt),dt.on(Y,yt),vt.on(Y,yt);var bt=p("localhost",it,Z,J);X.push.apply(X,bt),it.on(K,ot),ot.on("-",st).on(K,ot).on(Q,at),at.on("-",st).on(Q,at);for(var wt=0;wt<X.length;wt++)X[wt].on("-",st).on(Q,at);st.on("-",st).on(K,at).on(Q,at),it.on(/./,G(j.SYM));var xt=function(t){for(var e=t.replace(/[A-Z]/g,function(t){return t.toLowerCase()}),n=t.length,r=[],i=0;n>i;){for(var o=it,a=null,s=null,u=0,l=null,c=-1;n>i&&(s=o.next(e[i]));)a=null,o=s,o.accepts()?(c=0,l=o):c>=0&&c++,u++,i++;if(!(0>c)){i-=c,u-=c;var p=l.emit();r.push(new p(t.substr(i-u,u)))}}return r},Ct=it,Et=Object.freeze({State:q,TOKENS:j,run:xt,start:Ct}),_t=function(t){return new V(t)},St=j.DOMAIN,kt=j.AT,Tt=j.COLON,Mt=j.DOT,At=j.PUNCTUATION,Rt=j.LOCALHOST,Ot=j.NL,Dt=j.NUM,Nt=j.PLUS,Pt=j.POUND,It=j.PROTOCOL,jt=j.QUERY,Lt=j.SLASH,$t=j.SYM,Ft=j.TLD,Bt=j.OPENBRACE,Ut=j.OPENBRACKET,zt=j.OPENPAREN,Ht=j.CLOSEBRACE,qt=j.CLOSEBRACKET,Vt=j.CLOSEPAREN,Wt=z.EMAIL,Kt=z.NL,Qt=z.TEXT,Yt=z.URL,Xt=_t(),Gt=_t(),Jt=_t(),Zt=_t(),te=_t(),ee=_t(),ne=_t(Yt),re=_t(),ie=_t(Yt),oe=_t(Yt),ae=_t(),se=_t(),ue=_t(),le=_t(),ce=_t(Yt),pe=_t(Yt),he=_t(Yt),fe=_t(),de=_t(),me=_t(),ge=_t(),ve=_t(),ye=_t(Wt),be=_t(),we=_t(Wt),xe=_t(),Ce=_t(),Ee=_t(),_e=_t(Kt);Xt.on(Ot,_e).on(It,Gt).on(Lt,Jt),Gt.on(Lt,Jt),Jt.on(Lt,Zt),Xt.on(Ft,te).on(St,te).on(Rt,ne).on(Dt,te),Zt.on(Ft,oe).on(St,oe).on(Dt,oe).on(Rt,oe),te.on(Mt,ee),ge.on(Mt,ve),ee.on(Ft,ne).on(St,te).on(Dt,te).on(Rt,te),ve.on(Ft,ye).on(St,ge).on(Dt,ge).on(Rt,ge),ne.on(Mt,ee),ye.on(Mt,ve),ne.on(Tt,re).on(Lt,oe),re.on(Dt,ie),ie.on(Lt,oe),ye.on(Tt,be),be.on(Dt,we);var Se=[St,kt,Rt,Dt,Nt,Pt,It,Lt,Ft],ke=[Tt,Mt,jt,At,Ht,qt,Vt,Bt,Ut,zt,$t];oe.on(Bt,se).on(Ut,ue).on(zt,le),ae.on(Bt,se).on(Ut,ue).on(zt,le),se.on(Ht,oe),ue.on(qt,oe),le.on(Vt,oe),ce.on(Ht,oe),pe.on(qt,oe),he.on(Vt,oe),fe.on(Ht,oe),de.on(qt,oe),me.on(Vt,oe),se.on(Se,ce),ue.on(Se,pe),le.on(Se,he),se.on(ke,fe),ue.on(ke,de),le.on(ke,me),ce.on(Se,ce),pe.on(Se,pe),he.on(Se,he),ce.on(ke,ce),pe.on(ke,pe),he.on(ke,he),fe.on(Se,ce),de.on(Se,pe),me.on(Se,he),fe.on(ke,fe),de.on(ke,de),me.on(ke,me),oe.on(Se,oe),ae.on(Se,oe),oe.on(ke,ae),ae.on(ke,ae);var Te=[St,Dt,Nt,Pt,jt,$t,Ft];te.on(Te,xe).on(kt,Ce),ne.on(Te,xe).on(kt,Ce),ee.on(Te,xe),xe.on(Te,xe).on(kt,Ce).on(Mt,Ee),Ee.on(Te,xe),Ce.on(Ft,ge).on(St,ge).on(Rt,ye);var Me=function(t){for(var e=t.length,n=0,r=[],i=[];e>n;){for(var o=Xt,a=null,s=null,u=0,l=null,c=-1;e>n&&!(a=o.next(t[n]));)i.push(t[n++]);for(;e>n&&(s=a||o.next(t[n]));)a=null,o=s,o.accepts()?(c=0,l=o):c>=0&&c++,n++,u++;if(0>c)for(var p=n-u;n>p;p++)i.push(t[p]);else{i.length>0&&(r.push(new Qt(i)),i=[]),n-=c,u-=c;var h=l.emit();r.push(new h(t.slice(n-u,n)))}}return i.length>0&&r.push(new Qt(i)),r},Ae=z,Re=Xt,Oe=Object.freeze({State:V,TOKENS:Ae,run:Me,start:Re});Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var De=function(t){return Me(xt(t))},Ne=function(t){for(var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],n=De(t),r=[],i=0;i<n.length;i++)!n[i].isLink||e&&n[i].type!==e||r.push(n[i].toObject());return r},Pe=function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],n=De(t);return 1===n.length&&n[0].isLink&&(!e||n[0].type===e)};r.find=Ne,r.options=h,r.parser=Oe,r.scanner=Et,r.test=Pe,r.tokenize=De}(window.linkify=window.linkify||{})}();