console.log('ATM breakdown loaded');

let ACCOUNTS=[];
fetch('fees.json').then(r=>r.json()).then(d=>ACCOUNTS=d);

function showResults(salary,feeCap){
 const r=document.getElementById('results');
 const t=document.getElementById('compareTable');
 const s=document.getElementById('status');

 let m=ACCOUNTS.filter(a=>(a.minSalary||0)<=salary&&a.fee<=feeCap);
 s.textContent=`Found ${m.length} matching account(s)`;

 if(!m.length){r.innerHTML='<p>No matches</p>';t.innerHTML='';return;}

 m.sort((a,b)=>a.fee-b.fee);

 r.innerHTML=m.map((a,i)=>`
 <div class="card ${i===0?'best':''}">
  <h3>${i===0?'Best match: ':''}${a.bank} – ${a.account}</h3>
  <p>Monthly: R${a.fee}</p>
  <p>Own ATM: R${a.ownATM} | Other ATM: R${a.otherATM} | Cash@Till: R${a.cashAtTill}</p>
  <a href="${a.url}" target="_blank">Apply →</a>
 </div>`).join('');

 t.innerHTML=`
 <div class="table-wrap">
 <table class="compare-table">
 <thead>
 <tr>
 <th>Bank</th><th>Account</th><th>Monthly</th><th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th>
 </tr>
 </thead>
 <tbody>
 ${m.map(a=>`
 <tr>
 <td>${a.bank}</td>
 <td>${a.account}</td>
 <td>R${a.fee}</td>
 <td>R${a.ownATM}</td>
 <td>R${a.otherATM}</td>
 <td>R${a.cashAtTill}</td>
 </tr>`).join('')}
 </tbody></table></div>`;
}

document.getElementById('btnCompare').addEventListener('click',()=>{
 const sal=Number(document.getElementById('salary').value)||0;
 const capInput=document.getElementById('feeCap').value;
 const cap=capInput===''?Infinity:Number(capInput);
 showResults(sal,cap);
});
