import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import {
  mdiImageOutline,
  mdiLightbulbOutline,
  mdiPackageVariant,
  mdiTrendingUp,
  mdiTrophy,
} from "@mdi/js";

export default function CardStyledDemo() {
  return (
    <Card
      style="outline"
      elevation="md"
      padding="lg"
      className="w-full max-w-6xl"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Briefs tracker</CardTitle>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground wrap-break-word">
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
          <div className="space-y-3 bg-neutral-bg p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">New</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiLightbulbOutline}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Expansion Plan for Next Q...
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiTrendingUp}
                    className="w-5 h-5 text-blue-600 dark:text-blue-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Engagement Strategy for...
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiPackageVariant}
                    className="w-5 h-5 text-muted-foreground"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Comprehensive Social Media Strategy...
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiLightbulbOutline}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Audio Innovation Strategy Framework
                </span>
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-3 bg-info-bg p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">
              In progress
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiTrendingUp}
                    className="w-5 h-5 text-blue-600 dark:text-blue-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Q2 Social Media Growth Strategy
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiLightbulbOutline}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Creative Social Media Content Strategy
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiImageOutline}
                    className="w-5 h-5 text-pink-600 dark:text-pink-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Engagement and Outreach Plan
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiImageOutline}
                    className="w-5 h-5 text-pink-600 dark:text-pink-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Performance Enhancemen...
                </span>
              </div>
            </div>
          </div>

          {/* Approved Column */}
          <div className="space-y-3 bg-success-bg/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground">Approved</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiLightbulbOutline}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Brand Awareness Initiative
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiLightbulbOutline}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Target Audience Engagement Strategy...
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiTrendingUp}
                    className="w-5 h-5 text-blue-600 dark:text-blue-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Analytics and Insights Plan
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon
                    path={mdiTrophy}
                    className="w-5 h-5 text-orange-600 dark:text-orange-500"
                  />
                </div>
                <span className="text-sm text-foreground">
                  Social Media Growth and Development...
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
