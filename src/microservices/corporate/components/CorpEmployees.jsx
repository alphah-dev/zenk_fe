import React from 'react';
import { EmpHoursChart } from './CorpCharts';

export default function CorpEmployees({ employees }) {
  if (!employees) return (
    <div className="c-skeleton" style={{ height: 200 }} />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="c-metrics-grid">
        {employees.metrics.map((m, i) => (
          <div className="c-metric-card" key={i}>
            <div className="c-metric-value">{m.value}</div>
            <div className="c-metric-label">{m.label}</div>
            <div className={`c-metric-delta ${m.trend}`}>{m.delta}</div>
          </div>
        ))}
      </div>

      <div className="c-card">
        <div className="c-card-title">Monthly Volunteer Hours</div>
        <EmpHoursChart data={employees.monthly_hours} />
      </div>

      <div className="c-card">
        <div className="c-card-title">Top Contributors — {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        {employees.top_contributors.map((c, i) => (
          <div className="c-contributor-row" key={i}>
            <div className="c-contrib-avatar">{c.initials}</div>
            <div>
              <div className="c-contrib-name">{c.name}</div>
              <div className="c-contrib-dept">{c.department}</div>
            </div>
            <span className="c-contrib-hours">{c.hours}h</span>
            <div className="c-contrib-score">{c.impact_score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
