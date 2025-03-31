
import React from 'react';
import { Award, Download, FileText, HelpCircle, Home, Menu, Shield, Sparkles } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="border-b border-blue-400/20 bg-cyberpunk-black/90 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-wider neon-text">PROFESSIONAL CERTIFICATES</h1>
        </div>
        
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white"
                  href="/"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white">
                  <FileText className="w-4 h-4" />
                  <span>Templates</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {["Academic", "Professional", "Corporate", "Modern", "Classic", "Creative"].map((category) => (
                      <li key={category}>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category} certificate templates
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white"
                  href="#features"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Features</span>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white"
                  href="#faq"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
            <Shield className="w-4 h-4" />
            <span>Enterprise-Grade</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
            <Download className="w-4 h-4" />
            <span>Instant Downloads</span>
          </div>
          
          <button className="cyberpunk-button flex items-center gap-2">
            <span>Get Started</span>
          </button>

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
