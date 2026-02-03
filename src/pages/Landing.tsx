import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeroBackgroundCarousel } from "@/components/layout/HeroBackgroundCarousel";

import {
  Wheat,
  Users,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react';

export const Landing: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const features = [
    {
      icon: Users,
      title: 'Connect Communities',
      description: 'Bridge the gap between farmers, salespersons, and agricultural suppliers.',
    },
    {
      icon: TrendingUp,
      title: 'Boost Productivity',
      description: 'Streamline operations with real-time inventory and sales tracking.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Transactions',
      description: 'Safe and transparent payment processing with multiple options.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with comprehensive analytics and reporting.',
    },
    {
      icon: CreditCard,
      title: 'Flexible Credit',
      description: 'Access credit facilities to grow your agricultural business.',
    },
    {
      icon: Globe,
      title: 'Market Access',
      description: 'Connect to wider markets and expand your customer base.',
    },
  ];

  const benefits = [
    'Real-time inventory management',
    'Automated transaction recording',
    'Commission tracking for salespersons',
    'Produce marketplace integration',
    'Mobile-friendly interface',
    'Multi-language support',
  ];
  const heroImages = [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
    "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1527847263472-aa5338d178b8",
  ];


  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Wheat className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-90">
                AgriLink360
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Background carousel */}
        <HeroBackgroundCarousel images={heroImages} />

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className='animate-pulse pulse-slow'> Empowering
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Agricultural
                </span>
                Communities
              </span>
            </h1>

            <p className="text-xl text-white mb-8 animate-slide-up">
              Connect, trade, and grow with AgriLink360's comprehensive platform for
              farmers and agribusinesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-primary">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools and features designed specifically
              for the agricultural sector.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-base hover:-translate-y-1 border-border/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-primary rounded-lg text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for Modern Agriculture
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                AgriLink360 combines cutting-edge technology with deep agricultural
                expertise to deliver a platform that truly understands your needs.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-accent opacity-20 rounded-2xl"></div>
              <Card className="relative p-8 bg-card/90 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Smartphone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile First</h3>
                      <p className="text-sm text-muted-foreground">Access anywhere, anytime</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Bank-Level Security</h3>
                      <p className="text-sm text-muted-foreground">Your data is always protected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <Globe className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Global Reach</h3>
                      <p className="text-sm text-muted-foreground">Connect with markets worldwide</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers and businesses already using AgriLink360
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="hover:opacity-90">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wheat className="h-6 w-6 text-primary" />
                <span className="font-bold">Loop Table</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering agricultural communities through technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground">About</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground">Help Center</Link></li>
                <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Loop Table. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};