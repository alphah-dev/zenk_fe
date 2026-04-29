import React from 'react';

export default function CorpCirclePerf({ circlesPerf }) {
  if (!circlesPerf) return (
    <div className="c-skeleton" style={{ height: 200 }} />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="c-card" style={{ padding: '10px 16px', fontSize: 13, color: '#0a8a7a', background: '#effaf7', border: '1px solid rgba(12,190,170,0.25)' }}>
        {circlesPerf.summary}
      </div>
      <div className="c-card">
        <div className="c-card-title">Per-Circle Performance Breakdown</div>
        <table className="c-table">
          <thead>
            <tr>
              <th>Circle</th>
              <th>Leader</th>
              <th>City</th>
              <th>ZenQ</th>
              <th>Rank</th>
              <th>Participation</th>
              <th>Members</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {circlesPerf.circles.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{c.circle_name}</td>
                <td style={{ color: '#888' }}>{c.leader}</td>
                <td style={{ color: '#888' }}>{c.city}</td>
                <td><span className="c-zenq-score">{c.zenq_score}</span></td>
                <td><span className="c-rank-pill">#{c.rank}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="c-bar-mini">
                      <div className="c-bar-mini-fill" style={{ width: `${c.participation_pct}%` }} />
                    </div>
                    <span style={{ color: '#888', fontSize: 12 }}>{c.participation_pct}%</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: '#4A72F5' }}>{c.members}</td>
                <td style={{ fontWeight: 600, color: '#0CBEAA' }}>{c.students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
