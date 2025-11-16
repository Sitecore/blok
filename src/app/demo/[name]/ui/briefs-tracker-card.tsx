import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import {
  mdiLightbulbOutline,
  mdiTrendingUp,
  mdiPackageVariant,
  mdiImageOutline,
  mdiTrophy,
} from "@mdi/js";

export function BriefsTrackerCard() {
  return (
    <Card style="outline" elevation="md" padding="lg" className="w-full max-w-6xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Briefs tracker</CardTitle>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-neutral ">
            View all briefs
          </span>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            …
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {/* New Column */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold ">New</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiLightbulbOutline} className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm ">Social Media Expansion Plan for Next Q...</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiTrendingUp} className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm ">Social Media Engagement Strategy for...</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiPackageVariant} className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm ">Comprehensive Social Media Strategy...</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiLightbulbOutline} className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm ">Audio Innovation Strategy Framework</span>
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold ">In progress</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiTrendingUp} className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm ">Q2 Social Media Growth Strategy</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiLightbulbOutline} className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm ">Creative Social Media Content Strategy</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiImageOutline} className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-sm ">Engagement and Outreach Plan</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiImageOutline} className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-sm ">Social Media Performance Enhancemen...</span>
              </div>
            </div>
          </div>

          {/* Approved Column */}
          <div className="space-y-3 bg-teal-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold ">Approved</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiLightbulbOutline} className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm ">Social Media Brand Awareness Initiative</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiLightbulbOutline} className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm ">Target Audience Engagement Strategy...</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiTrendingUp} className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm ">Social Media Analytics and Insights Plan</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Icon path={mdiTrophy} className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm">Social Media Growth and Development...</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

