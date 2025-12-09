// Carrega TMI.js
tmiScript=document.createElement('script');
tmiScript.src='tmi.min.js';
document.body.appendChild(tmiScript);

tmiScript.onload=()=>{
  const client=new tmi.Client({channels:['luyan_tamec']});
  client.connect();

  client.on('message',(channel,tags,message)=>{
    const serieNome=(localStorage.getItem('vaquinha_serie')||'').trim().toLowerCase();
    if(!serieNome) return;

    const regex=/R\$\s*(\d+)/i;
    const valorMatch=message.match(regex);
    if(!valorMatch) return;

    const valor=Number(valorMatch[1]);

    if(message.toLowerCase().includes(serieNome)){
      const atual=Number(localStorage.getItem('vaquinha_atual'))||0;
      const novoValor=atual+valor;
      localStorage.setItem('vaquinha_atual',novoValor);
    }
  });
};
