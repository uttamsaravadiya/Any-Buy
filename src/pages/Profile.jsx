import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <p className="mt-1">{user.fullName}</p>
          </div>
          
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <p className="mt-1">{user.email}</p>
          </div>

          {(user.userType === 'shopkeeper' || user.userType === 'renowned') && (
            <>
              <div>
                <label className="font-medium text-gray-700">Phone</label>
                <p className="mt-1">{user.phone}</p>
              </div>
              
              <div>
                <label className="font-medium text-gray-700">Address</label>
                <p className="mt-1">{user.address}</p>
              </div>
            </>
          )}

          <div>
            <label className="font-medium text-gray-700">Account Type</label>
            <p className="mt-1 capitalize">{user.userType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;