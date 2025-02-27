
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    userType: 'farmer',
    phone: '',
    address: '',
    farmDetails: '',
    marketDetails: ''
  });
  
  React.useEffect(() => {
    if (isLoaded && user) {
      // Load user data
      const userMetadata = user.publicMetadata;
      setFormData({
        name: user.fullName || '',
        userType: (userMetadata.role as string) || 'farmer',
        phone: (userMetadata.phone as string) || '',
        address: (userMetadata.address as string) || '',
        farmDetails: (userMetadata.farmDetails as string) || '',
        marketDetails: (userMetadata.marketDetails as string) || '',
      });
    }
  }, [isLoaded, user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (user) {
        // In a real app, you would update the user's metadata
        // await user.update({
        //   firstName: formData.name.split(' ')[0],
        //   lastName: formData.name.split(' ').slice(1).join(' '),
        //   publicMetadata: {
        //     role: formData.userType,
        //     phone: formData.phone,
        //     address: formData.address,
        //     farmDetails: formData.userType === 'farmer' ? formData.farmDetails : '',
        //     marketDetails: formData.userType === 'vendor' ? formData.marketDetails : '',
        //   }
        // });
        
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        
        // Redirect to the appropriate dashboard based on user type
        setTimeout(() => {
          navigate(formData.userType === 'farmer' ? '/farmer/dashboard' : '/vendor/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold mb-4">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <h2 className="text-xl font-semibold">{user.fullName}</h2>
              <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
              
              <div className="mt-4 w-full">
                <div className="text-sm text-muted-foreground mb-1">Account Type</div>
                <div className="text-sm font-medium capitalize">
                  {formData.userType || 'Not specified'}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Your Information' : 'Your Information'}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? 'Update your profile information below' 
                  : 'View your profile details and settings'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup 
                      value={formData.userType} 
                      onValueChange={handleUserTypeChange}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="farmer" id="farmer" />
                        <Label htmlFor="farmer" className="cursor-pointer">Farmer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vendor" id="vendor" />
                        <Label htmlFor="vendor" className="cursor-pointer">Vendor/Buyer</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your contact number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your address"
                    />
                  </div>
                  
                  {formData.userType === 'farmer' && (
                    <div className="space-y-2">
                      <Label htmlFor="farmDetails">Farm Details</Label>
                      <Input 
                        id="farmDetails"
                        name="farmDetails"
                        value={formData.farmDetails}
                        onChange={handleInputChange}
                        placeholder="Describe your farm (size, crops grown, etc.)"
                      />
                    </div>
                  )}
                  
                  {formData.userType === 'vendor' && (
                    <div className="space-y-2">
                      <Label htmlFor="marketDetails">Market/Business Details</Label>
                      <Input 
                        id="marketDetails"
                        name="marketDetails"
                        value={formData.marketDetails}
                        onChange={handleInputChange}
                        placeholder="Describe your business (market location, products bought, etc.)"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                      <p>{formData.phone || 'Not provided'}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                      <p>{formData.address || 'Not provided'}</p>
                    </div>
                    
                    {formData.userType === 'farmer' && (
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Farm Details</h3>
                        <p>{formData.farmDetails || 'Not provided'}</p>
                      </div>
                    )}
                    
                    {formData.userType === 'vendor' && (
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Market/Business Details</h3>
                        <p>{formData.marketDetails || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
