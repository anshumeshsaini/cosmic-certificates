
import React, { useState } from 'react';
import { Cpu, Globe, Heart, LogIn, LogOut, Menu, User, UserPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-blue-900/20 bg-gradient-to-r from-blue-950 to-blue-900/90 backdrop-blur-md py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold tracking-wider text-white">
              CertiProX <span className="text-xs font-normal text-blue-300">Premium</span>
            </h1>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="md:hidden text-blue-200 hover:text-white hover:bg-blue-800/50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        )}

        {/* Desktop Navigation */}
        <div className={`md:flex items-center gap-6 ${isMobile ? 'hidden' : 'flex'}`}>
          <div className="hidden md:flex items-center gap-2 text-sm text-blue-300">
            <Cpu className="w-4 h-4" />
            <span>AI Powered</span>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-blue-200 hover:text-white hover:bg-blue-800/50 hidden md:inline-flex"
            size="sm"
          >
            <Globe className="w-4 h-4 mr-2" />
            Features
          </Button>
          
          {user ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="text-blue-200 hover:text-white hover:bg-blue-800/50 hidden md:inline-flex"
                size="sm"
              >
                <User className="w-4 h-4 mr-2" />
                {user.email}
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-blue-800/30 border-blue-400/30 text-blue-200 hover:text-white hover:bg-blue-700/50"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="bg-blue-800/30 border-blue-400/30 text-blue-200 hover:text-white hover:bg-blue-700/50"
                size="sm"
                asChild
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
              
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-500"
                size="sm"
                asChild
              >
                <Link to="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-900 shadow-lg py-4 z-50 flex flex-col gap-2 px-6">
            <div className="flex items-center gap-2 text-sm text-blue-300 py-2">
              <Cpu className="w-4 h-4" />
              <span>AI Powered</span>
            </div>

            <Button 
              variant="ghost" 
              className="text-blue-200 hover:text-white hover:bg-blue-800/50 justify-start"
              size="sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              Features
            </Button>
            
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-blue-200 hover:text-white hover:bg-blue-800/50 justify-start"
                  size="sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.email}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-blue-800/30 border-blue-400/30 text-blue-200 hover:text-white hover:bg-blue-700/50 justify-start"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="bg-blue-800/30 border-blue-400/30 text-blue-200 hover:text-white hover:bg-blue-700/50 justify-start w-full"
                  size="sm"
                  asChild
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                
                <Button 
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-500 justify-start w-full"
                  size="sm"
                  asChild
                >
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
