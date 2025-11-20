import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Clock,
  Users,
  Globe,
  ExternalLink
} from "lucide-react";

export default function Analytics() {
  // Fetch analytics data
  const { data: analytics = [], isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => base44.entities.Analytics.list('-created_date', 1000),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.Lead.list('-created_date', 100),
  });

  // Calculate metrics
  const metrics = useMemo(() => {
    const pageViews = analytics.filter(a => a.event_type === 'page_view');
    const sessions = new Set(analytics.map(a => a.session_id)).size;
    const leadSubmissions = leads.length;

    // Page views by page
    const pageViewsByPage = pageViews.reduce((acc, view) => {
      acc[view.page_name] = (acc[view.page_name] || 0) + 1;
      return acc;
    }, {});

    // UTM source analysis
    const utmSources = analytics.reduce((acc, event) => {
      if (event.utm_source) {
        acc[event.utm_source] = (acc[event.utm_source] || 0) + 1;
      }
      return acc;
    }, {});

    // Language preferences
    const languages = pageViews.reduce((acc, view) => {
      const lang = view.language || 'unknown';
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

    // Calculate bounce rate (sessions with only 1 page view)
    const sessionPageCounts = pageViews.reduce((acc, view) => {
      acc[view.session_id] = (acc[view.session_id] || 0) + 1;
      return acc;
    }, {});
    
    const bouncedSessions = Object.values(sessionPageCounts).filter(count => count === 1).length;
    const bounceRate = sessions > 0 ? ((bouncedSessions / sessions) * 100).toFixed(1) : 0;

    // Conversion rate
    const conversionRate = sessions > 0 ? ((leadSubmissions / sessions) * 100).toFixed(1) : 0;

    // Average session duration
    const sessionEnds = analytics.filter(a => a.event_type === 'session_end' && a.time_on_page);
    const avgSessionDuration = sessionEnds.length > 0
      ? Math.floor(sessionEnds.reduce((sum, s) => sum + s.time_on_page, 0) / sessionEnds.length)
      : 0;

    return {
      totalPageViews: pageViews.length,
      totalSessions: sessions,
      totalLeads: leadSubmissions,
      bounceRate,
      conversionRate,
      avgSessionDuration,
      pageViewsByPage,
      utmSources,
      languages
    };
  }, [analytics, leads]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D3142] mb-2">SEO & Analytics Dashboard</h1>
          <p className="text-gray-600">Track website performance and lead generation metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#1F3A5F]/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-8 h-8 text-[#1F3A5F]" />
                <Badge className="bg-[#1F3A5F] text-white">Views</Badge>
              </div>
              <div className="text-3xl font-bold text-[#2D3142] mb-1">{metrics.totalPageViews}</div>
              <div className="text-sm text-gray-600">Total Page Views</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#1F3A5F]/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-[#1F3A5F]" />
                <Badge className="bg-[#1F3A5F] text-white">Sessions</Badge>
              </div>
              <div className="text-3xl font-bold text-[#2D3142] mb-1">{metrics.totalSessions}</div>
              <div className="text-sm text-gray-600">Unique Sessions</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MousePointerClick className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-600 text-white">{metrics.conversionRate}%</Badge>
              </div>
              <div className="text-3xl font-bold text-[#2D3142] mb-1">{metrics.totalLeads}</div>
              <div className="text-sm text-gray-600">Lead Submissions</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#C9A961]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-[#C9A961]" />
                <Badge className="bg-[#C9A961] text-[#2D3142]">{metrics.bounceRate}%</Badge>
              </div>
              <div className="text-3xl font-bold text-[#2D3142] mb-1">
                {Math.floor(metrics.avgSessionDuration / 60)}:{(metrics.avgSessionDuration % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Avg. Session Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="pages" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2D3142]">Page Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(metrics.pageViewsByPage)
                    .sort(([, a], [, b]) => b - a)
                    .map(([page, views]) => {
                      const percentage = ((views / metrics.totalPageViews) * 100).toFixed(1);
                      return (
                        <div key={page} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#1F3A5F]/10 rounded-lg flex items-center justify-center">
                              <Eye className="w-5 h-5 text-[#1F3A5F]" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#2D3142]">{page || 'Home'}</div>
                              <div className="text-sm text-gray-600">{views} views · {percentage}% of total</div>
                            </div>
                          </div>
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1F3A5F]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2D3142]">Traffic Sources (UTM)</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(metrics.utmSources).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(metrics.utmSources)
                      .sort(([, a], [, b]) => b - a)
                      .map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#C9A961]/20 rounded-lg flex items-center justify-center">
                              <ExternalLink className="w-5 h-5 text-[#C9A961]" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#2D3142]">{source}</div>
                              <div className="text-sm text-gray-600">{count} visits</div>
                            </div>
                          </div>
                          <Badge className="bg-[#1F3A5F] text-white">{count}</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ExternalLink className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No UTM tracking data yet</p>
                    <p className="text-sm mt-2">Add UTM parameters to your marketing links to track sources</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2D3142]">Language Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(metrics.languages)
                    .sort(([, a], [, b]) => b - a)
                    .map(([lang, count]) => {
                      const percentage = ((count / metrics.totalPageViews) * 100).toFixed(1);
                      return (
                        <div key={lang} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#1F3A5F]/10 rounded-lg flex items-center justify-center">
                              <Globe className="w-5 h-5 text-[#1F3A5F]" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#2D3142]">
                                {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang}
                              </div>
                              <div className="text-sm text-gray-600">{count} sessions · {percentage}%</div>
                            </div>
                          </div>
                          <Badge className="bg-[#C9A961] text-[#2D3142]">{percentage}%</Badge>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Performance Insights */}
        <Card className="mt-6 border-2 border-[#C9A961]/20">
          <CardHeader>
            <CardTitle className="text-[#2D3142] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#C9A961]" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-[#1F3A5F]/5 rounded-lg">
                <div className="w-2 h-2 bg-[#1F3A5F] rounded-full mt-2" />
                <div>
                  <div className="font-semibold text-[#2D3142]">Bounce Rate: {metrics.bounceRate}%</div>
                  <div className="text-sm text-gray-600">
                    {parseFloat(metrics.bounceRate) > 50 
                      ? 'Consider improving landing page content and CTAs'
                      : 'Good engagement - users are exploring multiple pages'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                <div>
                  <div className="font-semibold text-[#2D3142]">Conversion Rate: {metrics.conversionRate}%</div>
                  <div className="text-sm text-gray-600">
                    {parseFloat(metrics.conversionRate) > 5 
                      ? 'Excellent conversion rate for home services'
                      : 'Focus on optimizing lead forms and CTAs'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#C9A961]/10 rounded-lg">
                <div className="w-2 h-2 bg-[#C9A961] rounded-full mt-2" />
                <div>
                  <div className="font-semibold text-[#2D3142]">Session Duration: {Math.floor(metrics.avgSessionDuration / 60)}m {metrics.avgSessionDuration % 60}s</div>
                  <div className="text-sm text-gray-600">
                    {metrics.avgSessionDuration > 120 
                      ? 'Users are spending quality time on your site'
                      : 'Consider adding more engaging content'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}