import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area,
} from 'recharts';

/* ── Shared Tooltip ─────────────────────────────────────────────────────── */
function CTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #e8e8e4', borderRadius: 8,
      padding: '10px 14px', fontSize: 12, color: '#444', boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: '#888', fontSize: 11 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#888' }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: p.color }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── ZenQ SVG Gauge ─────────────────────────────────────────────────────── */
export function ZenQGauge({ score = 78.4, size = 140 }) {
  const r = (size - 20) / 2;
  const circ = Math.PI * r;
  const fill = (score / 100) * circ;
  const cx = size / 2, cy = size / 2 + 10;
  return (
    <svg width={size} height={size * 0.75}>
      <defs>
        <linearGradient id="gG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0CBEAA" />
          <stop offset="100%" stopColor="#4A72F5" />
        </linearGradient>
      </defs>
      <path d={`M10 ${cy} A ${r} ${r} 0 0 1 ${size-10} ${cy}`} fill="none" stroke="#e8e8e4" strokeWidth="12" strokeLinecap="round" />
      <path d={`M10 ${cy} A ${r} ${r} 0 0 1 ${size-10} ${cy}`} fill="none" stroke="url(#gG)" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={`${fill} ${circ}`} />
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#4A72F5" fontSize="28" fontWeight="800" fontFamily="Inter">{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fill="#888" fontSize="10" fontFamily="Inter" letterSpacing="1.5" fontWeight="600">CORP ZENQ</text>
    </svg>
  );
}

/* ── ZenQ Trend Chart ───────────────────────────────────────────────────── */
export function ZenQTrendChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ee" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#b0b0b0', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: '#b0b0b0', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CTooltip />} />
        <Bar dataKey="corporate_score" name="Corp ZenQ" fill="#4A72F5" radius={[4,4,0,0]} maxBarSize={32}
          label={{ position: 'top', fontSize: 10, fill: '#888', formatter: v => v }} />
        <Line dataKey="national_avg" name="National Avg" type="monotone" stroke="#F0A500"
          strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/* ── Allocation Donut ───────────────────────────────────────────────────── */
export function AllocationDonut({ circles = [] }) {
  const data = circles.map(c => ({ name: c.circle_name, value: c.allocation_pct, color: c.color }));
  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
            paddingAngle={2} dataKey="value" strokeWidth={0}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{
            background: '#fff', border: '1px solid #e8e8e4', borderRadius: 8, fontSize: 12
          }} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: -10 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#F0A500' }}>₹1,00,000</div>
        <div style={{ fontSize: 10, color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total CSR</div>
      </div>
    </div>
  );
}

/* ── Employee Hours Chart ───────────────────────────────────────────────── */
export function EmpHoursChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
        <defs>
          <linearGradient id="eG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A72F5" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#4A72F5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ee" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#b0b0b0', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#b0b0b0', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CTooltip />} />
        <Area type="monotone" dataKey="hours" name="Volunteer Hours" stroke="#4A72F5" fill="url(#eG)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
