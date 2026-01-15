console.log('BankSmart ATM Update Loaded');

let ACCOUNTS = [];
const LAST_UPDATED = "Jan 2026";

fetch('fees.json')
  .then(r => r.json())
  .then(data => {
    ACCOUNTS = data;
    document.getElementById('lastUpdated').textContent = "Fees last updated: " + LAST_UPDATED;
  });

function explainFit(a, salary) {
  if (a.minSalary === 0) return "No minimum salary required.";
  if (salary >= a.minSalary) return `Your salary qualifies for this account (min: R${a.minSalary}).`;
  return "Your salary does not meet the minimum requirement.";
}

function sortMatches(matches, key) {
  return matches.sort((a,b) => {
    if (key === "fee") return a.fee - b.fee;
    if (key === "bank") return a.bank.localeCompare(b.bank);
    if (key === "atm") return a.atmWithdrawalFee - b.atmWithdrawalFee;
    return 0;
  });
}

function showResults(salary, feeCap) {
  const results = document.getElementById('results');
  const status = document.getElementById('status');
  const tableDiv = document.getElementById('compareTable');

  let matches = ACCOUNTS.filter(a =>
    (a.minSalary || 0) <= salary &&
    a.fee <= feeCap
  );

  status.textContent = `Found ${matches.length} matching account(s)`;

  if (!matches.length) {
    results.innerHTML = '<p>No matches found.</p>';
    tableDiv.innerHTML = "";
    return;
  }

  matches = sortMatches(matches, "fee");

  results.innerHTML = matches.map((a,i) => `
    <div class="card ${i===0?'best':''}">
      <h3>${i===0?'Best match: ':''}${a.bank} – ${a.account}</h3>
      <p>Monthly fee: R${a.fee}</p>
      <p>ATM Withdrawal: R${a.atmWithdrawalFee.toFixed(2)}</p>
      <p>${a.notes}</p>
      <p><em>${explainFit(a, salary)}</em></p>
      <a href="${a.url}" target="_blank" rel="noopener">Apply →</a>
    </div>
  `).join('');

  tableDiv.innerHTML = `
    <div class="table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th onclick="reSort('bank')" style="cursor:pointer">Bank ↑</th>
            <th>Account</th>
            <th onclick="reSort('fee')" style="cursor:pointer">Monthly Fee ↑</th>
            <th onclick="reSort('atm')" style="cursor:pointer">ATM Withdrawal ↑</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody id="tbodyRows">
          ${matches.map(a => `
            <tr>
              <td>${a.bank}</td>
              <td>${a.account}</td>
              <td>R${a.fee}</td>
              <td>R${a.atmWithdrawalFee.toFixed(2)}</td>
              <td>${a.notes}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  window.currentMatches = matches;
}

window.reSort = function(type) {
  const sorted = sortMatches(window.currentMatches, type);
  document.getElementById('tbodyRows').innerHTML = sorted.map(a => `
    <tr>
      <td>${a.bank}</td>
      <td>${a.account}</td>
      <td>R${a.fee}</td>
      <td>R${a.atmWithdrawalFee.toFixed(2)}</td>
      <td>${a.notes}</td>
    </tr>
  `).join('');
}

document.getElementById('btnCompare').addEventListener('click', () => {
  const salary = Number(document.getElementById('salary').value) || 0;
  const feeCapInput = document.getElementById('feeCap').value;
  const feeCap = feeCapInput === "" ? Infinity : Number(feeCapInput);
  showResults(salary, feeCap);
});
