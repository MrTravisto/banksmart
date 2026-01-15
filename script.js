const ACCOUNTS = [
{bank:"TymeBank",account:"EveryDay",fee:0,minSalary:0},
{bank:"Bank Zero",account:"Personal",fee:0,minSalary:0},
{bank:"Capitec",account:"Global One",fee:7.5,minSalary:0},
{bank:"Absa",account:"Transact",fee:6.5,minSalary:0},
{bank:"FNB",account:"Easy Account",fee:69,minSalary:0},
{bank:"Nedbank",account:"MiGoals Plus",fee:99,minSalary:0},
{bank:"Standard Bank",account:"MyMo Plus",fee:115,minSalary:0},
{bank:"Discovery Bank",account:"Gold Suite",fee:234,minSalary:0},
{bank:"Investec",account:"Private Bank",fee:675,minSalary:80000}
];

document.getElementById("btnCompare").onclick = () => {
const salary = Number(document.getElementById("salary").value);
const feeCap = Number(document.getElementById("feeCap").value || Infinity);
const results = document.getElementById("results");

if(!salary){ alert("Please enter your salary"); return; }

const matches = ACCOUNTS.filter(a => a.minSalary <= salary && a.fee <= feeCap)
.sort((a,b)=>a.fee-b.fee);

if(!matches.length){
results.innerHTML = "<p>No matching accounts.</p>";
return;
}

const best = matches[0];

let html = `<div class="best"><h3>Best Match</h3>
<p><strong>${best.bank}</strong> – ${best.account}</p>
<p>Monthly fee: ${best.fee === 0 ? "FREE" : "R"+best.fee}</p></div>`;

matches.slice(1).forEach(a=>{
html += `<p>${a.bank} – ${a.account} – R${a.fee}</p>`;
});

results.innerHTML = html;
};
