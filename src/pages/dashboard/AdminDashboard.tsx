import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  X,
  FileText,
  FileJson,
  Check,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/* ── Export helpers ─────────────────────────────────────────────── */
function downloadFile(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportCSV(
  stats: { label: string; value: string; change: string }[],
  activities: { user: string; action: string; time: string }[]
): void {
  let csv = `Admin Dashboard Report — ${new Date().toLocaleDateString()}\n\n`;
  csv += 'SUMMARY STATS\nMetric,Value,Change vs Last Month\n';
  stats.forEach(s => { csv += `"${s.label}","${s.value}","${s.change}"\n`; });
  csv += '\nRECENT ACTIVITY\nUser,Action,Time\n';
  activities.forEach(a => { csv += `"${a.user}","${a.action}","${a.time}"\n`; });
  downloadFile(csv, `dashboard-report-${Date.now()}.csv`, 'text/csv');
}

function exportJSON(
  stats: { label: string; value: string; change: string; trend: string }[],
  activities: { user: string; action: string; time: string }[]
): void {
  const payload = { generatedAt: new Date().toISOString(), stats, recentActivities: activities };
  downloadFile(JSON.stringify(payload, null, 2), `dashboard-report-${Date.now()}.json`, 'application/json');
}

/* ── Export Modal ───────────────────────────────────────────────── */
interface ExportModalProps {
  stats: { label: string; value: string; change: string; trend: string }[];
  activities: { user: string; action: string; time: string }[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ stats, activities, onClose }) => {
  const [done, setDone] = useState<'csv' | 'json' | null>(null);

  function handle(type: 'csv' | 'json'): void {
    if (type === 'csv')  exportCSV(stats, activities);
    if (type === 'json') exportJSON(stats, activities);
    setDone(type);
    setTimeout(onClose, 900);
  }

  const options = [
    { type: 'csv'  as const, icon: <FileText className="h-5 w-5" />,  label: 'CSV Spreadsheet', desc: 'Stats + activity log as comma-separated values', accent: '#4ade80' },
    { type: 'json' as const, icon: <FileJson className="h-5 w-5" />, label: 'JSON Data',         desc: 'Structured machine-readable format',            accent: '#60a5fa' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-background border rounded-2xl w-[420px] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-0">
          <div>
            <p className="font-bold text-lg">Export Report</p>
            <p className="text-sm text-muted-foreground mt-1">Choose a format to download</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 flex flex-col gap-3">
          {options.map(({ type, icon, label, desc, accent }) => (
            <button
              key={type}
              onClick={() => handle(type)}
              className="flex items-center gap-4 p-4 rounded-xl border text-left transition-all hover:border-primary"
              style={{ borderColor: done === type ? accent : undefined, background: done === type ? `${accent}18` : undefined }}
            >
              <span style={{ color: accent }}>{done === type ? <Check className="h-5 w-5" /> : icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              {!done && <span className="text-xs font-bold" style={{ color: accent }}>↓</span>}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

/* ── AdminDashboard ─────────────────────────────────────────────── */
export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showExport, setShowExport] = useState(false);

  const stats = [
    {
      label: 'Total Revenue',
      value: 'ksh 125,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Active Users',
      value: '2,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Total Products',
      value: '486',
      change: '+15.3%',
      trend: 'up',
      icon: Package,
    },
    {
      label: 'Transactions',
      value: '8,745',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
    },
  ];

  const recentActivities = [
    { user: 'John Farmer', action: 'Listed 50kg of tomatoes', time: '2 minutes ago' },
    { user: 'Sarah Sales', action: 'Completed transaction #4521', time: '15 minutes ago' },
    { user: 'Mike Manager', action: 'Updated product inventory', time: '1 hour ago' },
    { user: 'Lisa Farmer', action: 'Requested credit increase', time: '2 hours ago' },
    { user: 'Tom Trader', action: 'Added new customer', time: '3 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {showExport && (
        <ExportModal
          stats={stats}
          activities={recentActivities}
          onClose={() => setShowExport(false)}
        />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90" onClick={() => setShowExport(true)}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-base">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Revenue chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users registered over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-secondary mx-auto mb-2" />
                <p className="text-muted-foreground">User growth chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Activities
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};