import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import './csr_styles.css';

const fmt = (n) => `₹${(n || 0).toLocaleString('en-IN')}`;

export default function CorpCSRAccount({ csrAccount }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!csrAccount) return <div className="c-skeleton" style={{ height: 400 }} />;

  // Ledger Search and Pagination
  const filteredTxns = useMemo(() => {
    if (!csrAccount.transactions) return [];
    if (!searchTerm) return csrAccount.transactions;
    const lower = searchTerm.toLowerCase();
    return csrAccount.transactions.filter(t => 
      t.description.toLowerCase().includes(lower) || 
      t.category.toLowerCase().includes(lower) ||
      (t.reference && t.reference.toLowerCase().includes(lower))
    );
  }, [csrAccount.transactions, searchTerm]);

  const totalPages = Math.ceil(filteredTxns.length / itemsPerPage);
  const currentTxns = filteredTxns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff' }}>
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>{payload[0].name}</div>
          <div style={{ fontWeight: 'bold' }}>{fmt(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  const CustomAreaTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px', color: '#fff' }}>
          <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>{label}</div>
          <div style={{ fontWeight: 'bold', color: '#F54A4A' }}>Burn: {fmt(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="csr-grid">
      {/* Alerts */}
      {csrAccount.alerts && csrAccount.alerts.map((alert, i) => (
        <div className="csr-alert-banner" key={i}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {alert}
        </div>
      ))}

      {/* Top Header & Mandate */}
      <div className="csr-card csr-grid-top">
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '600' }}>Account Overview</h2>
          <div style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
            Account #: {csrAccount.account_number} • {csrAccount.fy_label}
            <span style={{ marginLeft: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', color: csrAccount.compliance_status === 'on_track' ? '#0CBEAA' : '#F0A500' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Compliance {csrAccount.compliance_status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="csr-stat-row">
            <div className="csr-stat-box">
              <div className="csr-stat-label">Total Received</div>
              <div className="csr-stat-value">{fmt(csrAccount.total_received)}</div>
            </div>
            <div className="csr-stat-box">
              <div className="csr-stat-label">Total Deployed</div>
              <div className="csr-stat-value">{fmt(csrAccount.total_deployed)}</div>
            </div>
            <div className="csr-stat-box">
              <div className="csr-stat-label">Current Balance</div>
              <div className="csr-stat-value" style={{ color: '#F0A500' }}>{fmt(csrAccount.balance)}</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#aaa' }}>
              <span>Mandate Progress</span>
              <span>{csrAccount.mandate_used_pct}% deployed of {fmt(csrAccount.mandate_amount)}</span>
            </div>
            <div className="csr-mandate-track">
              <div className="csr-mandate-fill" style={{ width: `${csrAccount.mandate_used_pct}%` }} />
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
          <button className="csr-btn-primary" onClick={() => alert('Top-up Modal trigger')}>
            + Add Funds / Top-up
          </button>
          <button className="csr-btn-secondary" onClick={() => window.open('/corporate/pdf-report?fy=2025-26', '_blank')}>
            Download Ledger (PDF)
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="csr-charts-grid">
        {/* Donut Chart: Spend by Category */}
        <div className="csr-card">
          <div className="c-card-title">Allocation by Category</div>
          <div style={{ height: '240px', marginTop: '16px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={csrAccount.spend_by_category}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                  nameKey="category"
                >
                  {csrAccount.spend_by_category.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            {csrAccount.spend_by_category.map((cat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#aaa' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color }} />
                {cat.category}
              </div>
            ))}
          </div>
        </div>

        {/* Area Chart: Monthly Burn */}
        <div className="csr-card">
          <div className="c-card-title">Monthly Burn Rate</div>
          <div style={{ height: '240px', marginTop: '16px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={csrAccount.monthly_burn} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F54A4A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F54A4A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickFormatter={(val) => `₹${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <RechartsTooltip content={<CustomAreaTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#F54A4A" strokeWidth={2} fillOpacity={1} fill="url(#colorBurn)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Disbursements */}
      {csrAccount.upcoming_disbursements && csrAccount.upcoming_disbursements.length > 0 && (
        <div className="csr-card">
          <div className="c-card-title" style={{ marginBottom: '16px' }}>Upcoming Scheduled Disbursements</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {csrAccount.upcoming_disbursements.map((d, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#fff' }}>{d.circle_name}</span>
                  <span style={{ color: '#F0A500', fontWeight: 'bold' }}>{fmt(d.amount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#aaa' }}>
                  <span>{d.tranche} • Due: {d.due_date}</span>
                  <span style={{ color: d.status === 'scheduled' ? '#4A72F5' : '#888' }}>{d.status.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ledger Table */}
      <div className="csr-card">
        <div className="csr-table-controls">
          <div className="c-card-title" style={{ margin: 0 }}>Transaction Ledger</div>
          <input 
            type="text" 
            className="csr-search-input" 
            placeholder="Search by ref, category or description..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="csr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Running Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentTxns.map((t, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{t.date}</td>
                  <td style={{ color: '#aaa', fontSize: '13px' }}>{t.reference || '—'}</td>
                  <td>
                    <div style={{ color: '#fff', fontWeight: '500' }}>{t.description}</div>
                    {t.circle && <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Circle: {t.circle}</div>}
                  </td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`csr-badge ${t.type}`}>
                      {t.type === 'credit' ? '+' : t.type === 'debit' ? '−' : '+'}{fmt(t.amount)}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#e8e8e4' }}>
                    {t.running_balance !== undefined ? fmt(t.running_balance) : '—'}
                  </td>
                </tr>
              ))}
              {currentTxns.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#aaa' }}>No transactions found for "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="csr-pagination">
            <button className="csr-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>&lsaquo;</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i} 
                className={`csr-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="csr-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>&rsaquo;</button>
          </div>
        )}
      </div>
    </div>
  );
}
