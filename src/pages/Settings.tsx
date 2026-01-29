import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  Bell, 
  Globe, 
  Shield, 
  Palette, 
  Database, 
  Smartphone,
  Mail,
  MessageSquare,
  DollarSign,
  HelpCircle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your application preferences and configurations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Globe className="h-5 w-5 inline mr-2" />
                Language & Region
              </CardTitle>
              <CardDescription>Set your language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sw">Kiswahili</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="eat">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="kes">
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kes">KES (Kenyan Shilling)</SelectItem>
                    <SelectItem value="usd">USD (US Dollar)</SelectItem>
                    <SelectItem value="eur">EUR (Euro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Palette className="h-5 w-5 inline mr-2" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how Loop Table looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme across the application</p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing and padding in the UI</p>
                </div>
                <Switch id="compact" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Bell className="h-5 w-5 inline mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notif">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Get text messages for important updates</p>
                </div>
                <Switch id="sms-notif" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notif">
                    <Smartphone className="h-4 w-4 inline mr-2" />
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Enable browser push notifications</p>
                </div>
                <Switch id="push-notif" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Select which activities you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'New Orders', description: 'When you receive new orders', checked: true },
                { label: 'Payment Updates', description: 'Credit payments and transactions', checked: true },
                { label: 'Product Updates', description: 'New products and price changes', checked: false },
                { label: 'System Updates', description: 'Platform updates and maintenance', checked: false },
                { label: 'Marketing', description: 'Promotions and special offers', checked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`notif-${index}`}>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch id={`notif-${index}`} defaultChecked={item.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <DollarSign className="h-5 w-5 inline mr-2" />
                Billing Information
              </CardTitle>
              <CardDescription>Manage your billing and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Current Plan</p>
                <p className="text-2xl font-bold">Professional</p>
                <p className="text-sm text-muted-foreground">$29/month</p>
              </div>
              <Button variant="outline" className="w-full">Change Plan</Button>
              <Button variant="outline" className="w-full">Update Payment Method</Button>
              <Button variant="outline" className="w-full">Download Invoices</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Shield className="h-5 w-5 inline mr-2" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share usage data to improve services</p>
                </div>
                <Switch id="data-sharing" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help us understand how you use Loop Table</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              <Button variant="outline" className="w-full">Download My Data</Button>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Database className="h-5 w-5 inline mr-2" />
                Data Management
              </CardTitle>
              <CardDescription>Manage your application data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Export Data</Button>
              <Button variant="outline" className="w-full">Import Data</Button>
              <Button variant="outline" className="w-full">Clear Cache</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};