import React from 'react';

const fmt = n => `₹${(n || 0).toLocaleString('en-IN')}`;

export default function CorpCSRAccount({ csrAccount }) {
  if (!csrAccount) return (
    <div className="c-skeleton" style={{ height: 200 }} />
  );

  const colors = { 'Student Circles': '#4A72F5', 'Platform Fee': '#F0A500', 'Unallocated': '#e8e8e4' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="c-summary-strip">
        {[
          { label: 'Total Received', value: fmt(csrAccount.total_received), color: '#0CBEAA' },
          { label: 'Total Deployed', value: fmt(csrAccount.total_deployed), color: '#4A72F5' },
          { label: 'Balance', value: fmt(csrAccount.balance), color: '#F0A500' },
        ].map((m, i) => (
          <div className="c-summary-card" key={i}>
            <div className="c-summary-value" style={{ color: m.color }}>{m.value}</div>
            <div className="c-summary-label">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="c-card">
        <div className="c-card-title">Spend by Category — {csrAccount.fy_label}</div>
        {csrAccount.spend_by_category.map((cat, i) => (
          <div className="c-bar-row" key={i}>
            <div className="c-bar-label-row">
              <span className="c-bar-name">{cat.category}</span>
              <span className="c-bar-amount">{fmt(cat.amount)}</span>
            </div>
            <div className="c-bar-track">
              <div className="c-bar-fill" style={{
                width: `${(cat.amount / csrAccount.total_received) * 100}%`,
                background: cat.color || colors[cat.category] || '#4A72F5'
              }} />
            </div>
          </div>
        ))}
      </div>

      <div className="c-card">
        <div className="c-card-title">Transaction History</div>
        {csrAccount.transactions.map((t, i) => (
          <div className="c-txn-row" key={i}>
            <span className={`c-txn-dot ${t.type}`} />
            <span className="c-txn-desc">
              {t.description}
              {t.circle && <span className="c-txn-circle">• {t.circle}</span>}
            </span>
            <span className="c-txn-date">{t.date}</span>
            <span className="c-txn-cat">{t.category}</span>
            <span className={`c-txn-amount ${t.type}`}>
              {t.type === 'credit' ? '+' : '−'}{fmt(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
