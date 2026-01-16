let ACCOUNTS=[];
fetch('fees.json').then(r=>r.json()).then(d=>ACCOUNTS=d);

function showResults(){
 const salary = Number(document.getElementById('salary').value)||0;
 const results = document.getElementById('results');
 const table = document.getElementById('compareTable');

 const filtered = ACCOUNTS.filter(a=>salary===0||salary>=a.minIncome);
 filtered.sort((a,b)=>a.fee-b.fee);

 if(!filtered.length){
  results.innerHTML='<p>No qualifying accounts for this salary.</p>';
  table.innerHTML='';
  return;
 }

 results.innerHTML = filtered.map((a,i)=>`
 <div class="card ${i===0?'best':''}">
  <h3>${i===0?'Best match: ':''}${a.bank} – ${a.account}</h3>
  <p>Monthly fee: R${a.fee}</p>
  <p>Own ATM: R${a.ownATM} | Other ATM: R${a.otherATM} | Cash@Till: R${a.cashAtTill}</p>
 </div>`).join('');

 table.innerHTML = '<table><tr><th>Bank</th><th>Account</th><th>Monthly</th><th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th></tr>' +
 filtered.map(a=>`<tr><td>${a.bank}</td><td>${a.account}</td><td>R${a.fee}</td><td>R${a.ownATM}</td><td>R${a.otherATM}</td><td>R${a.cashAtTill}</td></tr>`).join('')
 + '</table>';
}