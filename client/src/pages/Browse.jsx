import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileFilter from "../components/profile/ProfileFilter";
import { toast } from "react-toastify";
import { useQuery,useMutation } from "@tanstack/react-query";
import { getAllProfile } from "../api/profile";

const Browse = () => {
  const { isAuthenticated ,user} = useAuth();
  const [filters, setFilters] = useState({});
   const [page, setPage] = useState(1);

  // const {
  //   data: profiles,
  //   isLoading: loading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => getAllProfile(),
  // });

   const {
    data: profiles,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["profile", filters],
    queryFn: () => getAllProfile(filters),
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    toast.success("Filters applied successfully");
  };


  const handleSaveProfile = (profileId) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to save profiles");
      return;
    }

    toast.success("Profile saved successfully");
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-4">Browse Profiles</h1>
          <p className="text-lg text-neutral-600">
            Discover compatible matches and start your journey to finding a
            meaningful connection.
          </p>
        </div>

        <ProfileFilter onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles?.profiles?.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                // onInterest={() =>  handleInterest(profile.profile_id)}
                onSave={handleSaveProfile}
              />
            ))}
          </div>
        )}

        {!loading && profiles?.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-outline">Load More Profiles</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
