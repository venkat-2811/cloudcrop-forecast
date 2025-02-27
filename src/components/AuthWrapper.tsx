
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthWrapperProps {
  children: React.ReactNode;
  userType?: 'farmer' | 'vendor';
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, userType }) => {
  const { user, isLoaded } = useUser();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isLoaded || !user) return;
    
    // If no specific user type is required, we just need authentication
    if (!userType) {
      setIsAuthorized(true);
      return;
    }
    
    // Check if the user has the required user type in public metadata
    // In a real app, this would be set during user creation or profile setup
    const userMetadata = user.publicMetadata;
    const userRole = userMetadata.role as string;
    
    if (userRole === userType) {
      setIsAuthorized(true);
    } else if (!userRole) {
      // If user has no role yet, might want to redirect to a profile setup page
      // For this demo, we'll simulate roles based on email
      const email = user.primaryEmailAddress?.emailAddress || '';
      
      // Simulate role assignment based on email for demo purposes
      if (email.includes('farmer') && userType === 'farmer') {
        setIsAuthorized(true);
      } else if (email.includes('vendor') && userType === 'vendor') {
        setIsAuthorized(true);
      } else {
        // Temporary authorization for demo - in practice, you'd have proper role checks
        // and redirect to a role selection page
        setIsAuthorized(true);
        
        // In a real app, you'd update the user's role:
        /*
        try {
          await user.update({
            publicMetadata: { role: userType }
          });
          setIsAuthorized(true);
        } catch (error) {
          console.error('Error updating user role:', error);
          toast.error('Failed to set user role');
        }
        */
      }
    } else {
      // User has a role, but it's not the required one
      toast.error(`Access denied. You must be a ${userType} to view this page.`);
    }
  }, [user, isLoaded, userType]);
  
  return (
    <>
      <SignedIn>
        {isAuthorized ? (
          children
        ) : (
          isLoaded && (
            userType ? (
              <Navigate to="/" replace />
            ) : (
              children // If no specific user type is required
            )
          )
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default AuthWrapper;
