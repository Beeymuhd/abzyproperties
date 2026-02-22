'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  TrendingUp,
  Users,
  Eye,
  Mouse,
  Calendar,
  Download,
} from 'lucide-react'

const analyticsData = {
  pageViews: [
    { date: 'Jan 1', views: 2400 },
    { date: 'Jan 8', views: 2210 },
    { date: 'Jan 15', views: 2290 },
    { date: 'Jan 22', views: 2000 },
    { date: 'Jan 29', views: 2181 },
    { date: 'Feb 5', views: 2500 },
    { date: 'Feb 12', views: 2100 },
  ],
  propertyViews: [
    { name: 'Modern Duplex', views: 1200 },
    { name: 'Office Space', views: 819 },
    { name: 'Land Plot', views: 450 },
    { name: 'Apartment', views: 221 },
  ],
  trafficSource: [
    { name: 'Organic Search', value: 45 },
    { name: 'Direct', value: 25 },
    { name: 'Social Media', value: 18 },
    { name: 'Referral', value: 12 },
  ],
  userMetrics: [
    { metric: 'Total Users', value: '1,234', change: '+12%' },
    { metric: 'Active Sessions', value: '456', change: '+8%' },
    { metric: 'Bounce Rate', value: '32%', change: '-5%' },
    { metric: 'Avg Duration', value: '4m 32s', change: '+15%' },
  ],
}

const COLORS = ['#3498DB', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6']

export default function AnalyticsPage() {
  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track visitor behavior and property performance
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Date Range and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="30days">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.userMetrics.map((metric) => (
          <Card key={metric.metric} className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{metric.metric}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{metric.value}</p>
                <span className="text-sm text-green-600 font-semibold">
                  {metric.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Views Trend */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold">Page Views Trend</h3>
            <p className="text-sm text-muted-foreground">
              Total page views over time
            </p>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.pageViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--primary)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Traffic Source */}
        <Card className="p-6">
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-bold">Traffic Source</h3>
            <p className="text-sm text-muted-foreground">
              Visitor origin breakdown
            </p>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.trafficSource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.trafficSource.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Property Performance */}
      <Card className="p-6">
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-bold">Top Properties by Views</h3>
          <p className="text-sm text-muted-foreground">
            Most viewed properties this month
          </p>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.propertyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="views" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Key Insights</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                Traffic Growth
              </p>
              <p className="text-xs text-blue-700">
                Page views increased by 23% compared to the previous period,
                showing strong visitor engagement.
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-900 flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4" />
                Top Properties
              </p>
              <p className="text-xs text-green-700">
                Modern Duplex and Office Space account for 65% of total
                property views this month.
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-semibold text-purple-900 flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                User Engagement
              </p>
              <p className="text-xs text-purple-700">
                Average session duration increased to 4m 32s with a 32%
                bounce rate, indicating quality traffic.
              </p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-semibold text-orange-900 flex items-center gap-2 mb-2">
                <Mouse className="w-4 h-4" />
                Organic Traffic
              </p>
              <p className="text-xs text-orange-700">
                Organic search drives 45% of traffic, demonstrating strong
                SEO performance and search visibility.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
