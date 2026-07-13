let projectData = null;
let selectedDocId = null;

async function loadProject() {
  const res = await fetch('data/sample-project.json');
  if (!res.ok) throw new Error('Failed to load project data');
  projectData = await res.json();
  renderProjectProfile();
  renderAISummary();
  renderChecklist();
  renderMissingFlags();
  renderDocuments();
  renderTimeline();
  renderProofManifest();
  renderExportPreview();
}

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusBadge(status) {
  const map = {
    'Present': 'badge-present',
    'Missing': 'badge-missing',
    'Needs Review': 'badge-review'
  };
  const cls = map[status] || 'badge-review';
  return `<span class="badge ${cls}">${esc(status)}</span>`;
}

function confirmationBadge(confirmed) {
  return confirmed
    ? '<span class="badge badge-human">Human-confirmed</span>'
    : '<span class="badge badge-ai">AI-suggested</span>';
}

function renderProjectProfile() {
  const p = projectData.projectProfile;
  const html = `
    <h2>Project Overview</h2>
    <div class="grid" style="margin-top:10px">
      <div>
        <p class="subtle">Project Name</p>
        <p><strong>${esc(p.projectName)}</strong></p>
      </div>
      <div>
        <p class="subtle">Address</p>
        <p>${esc(p.address)}</p>
      </div>
      <div>
        <p class="subtle">Customer</p>
        <p>${esc(p.customer)}</p>
      </div>
      <div>
        <p class="subtle">Contractor</p>
        <p>${esc(p.contractor)}</p>
      </div>
      <div>
        <p class="subtle">Type</p>
        <p>${esc(p.projectType)}</p>
      </div>
      <div>
        <p class="subtle">Status</p>
        <p>${statusBadge(p.status)}</p>
      </div>
      <div>
        <p class="subtle">Created</p>
        <p>${esc(p.createdDate)}</p>
      </div>
      <div>
        <p class="subtle">Target Completion</p>
        <p>${esc(p.targetCompletion)}</p>
      </div>
    </div>
  `;
  document.getElementById('project-profile').innerHTML = html;
}

function renderAISummary() {
  document.getElementById('ai-summary').innerHTML = `
    <h2>AI Summary</h2>
    <p>${esc(projectData.aiSummary)}</p>
  `;
}

function renderChecklist() {
  const items = projectData.checklist || [];
  const completed = items.filter(i => i.complete).length;
  const total = items.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const html = items.map(item => {
    const icon = item.complete ? '✅' : '❌';
    const req = item.required ? '<span class="badge badge-required">Required</span>' : '<span class="badge badge-ai">Optional</span>';
    return `
      <div class="checklist-item">
        <div class="checklist-check">${icon}</div>
        <div class="checklist-text">
          <div>${esc(item.item)} ${req}</div>
          <div class="checklist-cat">${esc(item.category)}</div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('checklist-content').innerHTML = html;
  document.getElementById('checklist-progress').style.width = percent + '%';
  document.getElementById('checklist-label').textContent = `${percent}% complete (${completed}/${total})`;
}

function renderMissingFlags() {
  const flags = projectData.missingFlags || [];
  const html = `
    <h2>Missing / Review Flags</h2>
    <ul>
      ${flags.map(f => `<li>${esc(f)}</li>`).join('')}
    </ul>
  `;
  document.getElementById('missing-flags').innerHTML = html;
}

function renderDocuments() {
  const docs = projectData.documents || [];
  const html = docs.map(d => {
    const hashDisplay = d.sha256
      ? `<code>${esc(d.sha256)}</code>`
      : '<em style="color:var(--text-secondary)">No hash (missing file)</em>';
    const confidence = d.status === 'Missing' ? 'N/A' : `${Math.round((d.confidence || 0) * 100)}%`;
    return `
      <div class="doc-row" data-id="${esc(d.id)}" onclick="toggleDocDetails('${esc(d.id)}')">
        <div class="doc-header">
          <div>
            <div class="doc-title">${esc(d.type)} — ${esc(d.file)}</div>
            <div class="doc-meta">Confidence: ${esc(confidence)} · ${statusBadge(d.status)}</div>
          </div>
          <div>
            <button class="btn" onclick="event.stopPropagation(); selectDocForMeta('${esc(d.id)}')">Review Metadata</button>
          </div>
        </div>
        <div class="doc-details" id="details-${esc(d.id)}">
          <p class="subtle">${esc(d.summary)}</p>
          <p class="subtle">SHA-256: ${hashDisplay}</p>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('documents-content').innerHTML = html;
}

function toggleDocDetails(id) {
  const el = document.getElementById(`details-${id}`);
  if (!el) return;
  el.classList.toggle('open');
  const row = document.querySelector(`.doc-row[data-id="${id}"]`);
  if (row) row.classList.toggle('active', el.classList.contains('open'));
}

function selectDocForMeta(id) {
  selectedDocId = id;
  renderMetadataPanel();
  // Scroll into view smoothly
  document.getElementById('metadata-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function toggleMetaConfirmation(docId, field) {
  const doc = (projectData.documents || []).find(d => d.id === docId);
  if (!doc || !doc.metadata || !doc.metadata[field]) return;
  const meta = doc.metadata[field];
  meta.humanConfirmed = !meta.humanConfirmed;
  if (meta.humanConfirmed && !meta.humanValue) {
    meta.humanValue = meta.aiExtracted;
  }
  renderMetadataPanel();
  renderDocuments();
}

function renderMetadataPanel() {
  const container = document.getElementById('metadata-content');
  if (!selectedDocId) {
    container.innerHTML = '<div class="empty-state">Select a document to view extracted metadata.</div>';
    return;
  }
  const doc = (projectData.documents || []).find(d => d.id === selectedDocId);
  if (!doc) {
    container.innerHTML = '<div class="empty-state">Document not found.</div>';
    return;
  }

  const fields = ['parties', 'dates', 'amounts', 'permitNumber'];
  const labels = { parties: 'Parties', dates: 'Dates', amounts: 'Amounts', permitNumber: 'Permit Number' };

  let rows = '';
  for (const key of fields) {
    const m = doc.metadata && doc.metadata[key];
    if (!m) continue;
    const confirmed = m.humanConfirmed;
    rows += `
      <tr>
        <td>${esc(labels[key])}</td>
        <td class="ai-value">${esc(m.aiExtracted)}</td>
        <td>${confirmationBadge(confirmed)}</td>
        <td class="human-value">${confirmed ? esc(m.humanValue || m.aiExtracted) : '<em style="color:var(--text-secondary)">Unconfirmed</em>'}</td>
        <td><button class="btn" onclick="toggleMetaConfirmation('${esc(doc.id)}','${esc(key)}')">${confirmed ? 'Unconfirm' : 'Confirm'}</button></td>
      </tr>
    `;
  }

  container.innerHTML = `
    <div style="margin-bottom:10px">
      <strong>${esc(doc.type)}</strong> — ${esc(doc.file)} ${statusBadge(doc.status)}
    </div>
    <table class="meta-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>AI Extracted</th>
          <th>Status</th>
          <th>Human Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderTimeline() {
  const items = projectData.timeline || [];
  const html = items.map(t => {
    const typeClass = t.type || 'milestone';
    return `
      <div class="tl-item ${esc(typeClass)}">
        <div class="tl-date">${esc(t.date)}</div>
        <div class="tl-event">${esc(t.event)}</div>
      </div>
    `;
  }).join('');
  document.getElementById('timeline-content').innerHTML = `<div class="timeline">${html}</div>`;
}

function renderProofManifest() {
  const docs = projectData.documents || [];
  const presentDocs = docs.filter(d => d.status === 'Present' && d.sha256);
  const html = presentDocs.map(d => `
    <div class="manifest-row">
      <div><strong>${esc(d.type)}</strong> <span class="subtle">${esc(d.file)}</span></div>
      <code style="max-width:55%;text-align:right">${esc(d.sha256)}</code>
    </div>
  `).join('');
  const missingCount = docs.filter(d => d.status === 'Missing' || !d.sha256).length;
  const summary = `
    <div class="subtle" style="margin-bottom:10px">
      ${presentDocs.length} file(s) hashed · ${missingCount} file(s) missing or incomplete · All hashes are SHA-256
    </div>
  `;
  document.getElementById('manifest-content').innerHTML = summary + (html || '<div class="empty-state">No present documents with hashes.</div>');
}

function renderExportPreview() {
  const docs = projectData.documents || [];
  const included = docs.filter(d => d.status === 'Present');
  const excluded = docs.filter(d => d.status !== 'Present');

  const includedList = included.map(d => `
    <div class="manifest-row">
      <div>${esc(d.type)} <span class="subtle">${esc(d.file)}</span></div>
      <span class="badge badge-present">Included</span>
    </div>
  `).join('');

  const excludedList = excluded.map(d => `
    <div class="manifest-row">
      <div>${esc(d.type)} <span class="subtle">${esc(d.file)}</span></div>
      <span class="badge badge-missing">Excluded</span>
    </div>
  `).join('');

  const packet = {
    watermark: projectData.watermark,
    exportedAt: new Date().toISOString(),
    projectProfile: projectData.projectProfile,
    includedDocuments: included.map(d => ({
      type: d.type,
      file: d.file,
      sha256: d.sha256,
      metadata: d.metadata
    })),
    checklist: projectData.checklist,
    timeline: projectData.timeline
  };

  document.getElementById('export-content').innerHTML = `
    <div class="subtle" style="margin-bottom:10px">
      Export packet would contain ${included.length} document(s). Missing items are listed for transparency but omitted from the portable packet.
    </div>
    <h3>Included</h3>
    ${includedList || '<div class="empty-state">None</div>'}
    <h3>Excluded (Missing / Needs Review)</h3>
    ${excludedList || '<div class="empty-state">None</div>'}
    <h3>Packet JSON Preview</h3>
    <pre style="background:#0b0f19;padding:14px;border-radius:10px;overflow:auto;font-size:12px;border:1px solid var(--border)"><code>${esc(JSON.stringify(packet, null, 2))}</code></pre>
  `;
}

loadProject().catch(err => {
  document.body.insertAdjacentHTML('beforeend', `<pre style="color:var(--danger);padding:20px">${esc(err.message || err)}</pre>`);
});
