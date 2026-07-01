async function loadProject(){
  const res = await fetch('data/sample-project.json');
  const p = await res.json();
  document.getElementById('project-profile').innerHTML = `
    <h2>${p.projectName}</h2>
    <p><strong>Type:</strong> ${p.projectType}</p>
    <p><strong>Customer:</strong> ${p.customer}</p>
    <p><strong>Address:</strong> ${p.address}</p>
    <p><strong>Contractor:</strong> ${p.contractor}</p>
    <p><span class="badge warn">${p.status}</span></p>`;
  document.getElementById('ai-summary').innerHTML = `<h2>AI Summary</h2><p>${p.aiSummary}</p>`;
  document.getElementById('missing-flags').innerHTML = `<h2>Missing / Review Flags</h2><ul>${p.missingFlags.map(x=>`<li>${x}</li>`).join('')}</ul>`;
  document.getElementById('timeline').innerHTML = `<h2>Project Timeline</h2><ul>${p.timeline.map(x=>`<li><strong>${x.date}</strong> — ${x.event}</li>`).join('')}</ul>`;
  document.getElementById('documents').innerHTML = `
    <h2>Document Vault + Proof Metadata</h2>
    <table><thead><tr><th>File</th><th>Type</th><th>Status</th><th>SHA-256 Hash</th></tr></thead>
    <tbody>${p.documents.map(d=>`<tr><td>${d.file}</td><td>${d.type}</td><td>${d.status}</td><td><code>${d.sha256}</code></td></tr>`).join('')}</tbody></table>`;
}
loadProject().catch(err=>{document.body.insertAdjacentHTML('beforeend',`<pre>${err}</pre>`)});
