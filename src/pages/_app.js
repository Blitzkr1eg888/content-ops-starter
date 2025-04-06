import '../css/main.css';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `(function(){
      if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...arguments)=>{
          if(!window.chatbase.q){window.chatbase.q=[]}
          window.chatbase.q.push(arguments)
        };
        window.chatbase=new Proxy(window.chatbase,{
          get(target,prop){
            if(prop==="q"){return target.q}
            return(...args)=>target(prop,...args)
          }
        })
      }
      const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="LRVZeI0qaU6pyS_dqBE-W"; // 👈 double-check this ID is YOUR bot ID
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
      };
      if(document.readyState==="complete"){onLoad()}
      else{window.addEventListener("load",onLoad)}
    })();`;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}
