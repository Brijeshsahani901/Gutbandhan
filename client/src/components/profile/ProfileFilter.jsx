// import { useState } from 'react'
// import { motion } from 'framer-motion'

// const ProfileFilter = ({ onFilterChange }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [filters, setFilters] = useState({
//     ageRange: [25, 45],
//     distance: 50,
//     gender: 'all',
//     interests: [],
//     relationshipType: [],
//     hasPhoto: true,
//     onlineNow: false,
//     verified: false,
//   })
  
//   const relationshipTypes = [
//     'Marriage',
//     'Long-term relationship',
//     'Friendship first',
//     'Casual dating',
//   ]
  
//   const interestCategories = [
//     'Travel',
//     'Fitness',
//     'Reading',
//     'Cooking',
//     'Music',
//     'Art',
//     'Technology',
//     'Sports',
//     'Movies',
//     'Photography',
//     'Nature',
//     'Gaming',
//   ]
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
    
//     if (type === 'checkbox') {
//       setFilters({
//         ...filters,
//         [name]: checked,
//       })
//     } else if (name === 'interests' || name === 'relationshipType') {
//       // Handle multi-select
//       const currentValues = filters[name]
//       const newValues = currentValues.includes(value)
//         ? currentValues.filter(item => item !== value)
//         : [...currentValues, value]
        
//       setFilters({
//         ...filters,
//         [name]: newValues,
//       })
//     } else {
//       setFilters({
//         ...filters,
//         [name]: value,
//       })
//     }
//   }
  
//   const handleAgeChange = (index, value) => {
//     const newAgeRange = [...filters.ageRange]
//     newAgeRange[index] = parseInt(value)
//     setFilters({
//       ...filters,
//       ageRange: newAgeRange,
//     })
//   }
  
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onFilterChange(filters)
//     setIsOpen(false)
//   }
  
//   const handleReset = () => {
//     const defaultFilters = {
//       ageRange: [25, 45],
//       distance: 50,
//       gender: 'all',
//       interests: [],
//       relationshipType: [],
//       hasPhoto: true,
//       onlineNow: false,
//       verified: false,
//     }
    
//     setFilters(defaultFilters)
//     onFilterChange(defaultFilters)
//   }
  
//   return (
//     <div className="mb-8">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex items-center text-primary-600 font-medium hover:text-primary-700"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//           </svg>
//           {isOpen ? 'Hide Filters' : 'Show Filters'}
//         </button>
        
//         <div className="flex items-center space-x-2 text-sm">
//           <span className="text-neutral-600">Sort by:</span>
//           <select className="border border-neutral-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
//             <option>Relevance</option>
//             <option>Newest first</option>
//             <option>Recently active</option>
//           </select>
//         </div>
//       </div>
      
//       <motion.div
//         initial={false}
//         animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//         className="overflow-hidden"
//       >
//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Age Range */}
//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Age Range
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="number"
//                   min="18"
//                   max="80"
//                   value={filters.ageRange[0]}
//                   onChange={(e) => handleAgeChange(0, e.target.value)}
//                   className="w-16 p-2 border border-neutral-300 rounded-md"
//                 />
//                 <span className="text-neutral-500">to</span>
//                 <input
//                   type="number"
//                   min="18"
//                   max="80"
//                   value={filters.ageRange[1]}
//                   onChange={(e) => handleAgeChange(1, e.target.value)}
//                   className="w-16 p-2 border border-neutral-300 rounded-md"
//                 />
//               </div>
//             </div>
            
//             {/* Distance */}
//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Distance (km)
//               </label>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="range"
//                   min="5"
//                   max="300"
//                   step="5"
//                   value={filters.distance}
//                   onChange={(e) => handleChange({ target: { name: 'distance', value: e.target.value } })}
//                   className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <span className="text-sm font-medium w-10">{filters.distance}</span>
//               </div>
//             </div>
            
//             {/* Gender */}
//             <div>
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={filters.gender}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-neutral-300 rounded-md"
//               >
//                 <option value="all">All</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="non-binary">Non-binary</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
            
//             {/* Relationship Type */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Looking For
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {relationshipTypes.map((type) => (
//                   <label
//                     key={type}
//                     className={`cursor-pointer px-3 py-1.5 rounded-full text-sm ${
//                       filters.relationshipType.includes(type)
//                         ? 'bg-primary-100 text-primary-700 border border-primary-300'
//                         : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       name="relationshipType"
//                       value={type}
//                       checked={filters.relationshipType.includes(type)}
//                       onChange={handleChange}
//                       className="sr-only"
//                     />
//                     {type}
//                   </label>
//                 ))}
//               </div>
//             </div>
            
//             {/* Interests */}
//             <div className="lg:col-span-3">
//               <label className="block text-sm font-medium text-neutral-700 mb-2">
//                 Interests
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {interestCategories.map((interest) => (
//                   <label
//                     key={interest}
//                     className={`cursor-pointer px-3 py-1.5 rounded-full text-sm ${
//                       filters.interests.includes(interest)
//                         ? 'bg-primary-100 text-primary-700 border border-primary-300'
//                         : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200'
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       name="interests"
//                       value={interest}
//                       checked={filters.interests.includes(interest)}
//                       onChange={handleChange}
//                       className="sr-only"
//                     />
//                     {interest}
//                   </label>
//                 ))}
//               </div>
//             </div>
            
//             {/* Additional filters */}
//             <div className="lg:col-span-3 flex flex-wrap gap-6">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="hasPhoto"
//                   checked={filters.hasPhoto}
//                   onChange={handleChange}
//                   className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5"
//                 />
//                 <span className="ml-2 text-neutral-700">Has photo</span>
//               </label>
              
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="onlineNow"
//                   checked={filters.onlineNow}
//                   onChange={handleChange}
//                   className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5"
//                 />
//                 <span className="ml-2 text-neutral-700">Online now</span>
//               </label>
              
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="verified"
//                   checked={filters.verified}
//                   onChange={handleChange}
//                   className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 h-5 w-5"
//                 />
//                 <span className="ml-2 text-neutral-700">Verified profiles</span>
//               </label>
//             </div>
//           </div>
          
//           <div className="flex justify-end mt-6 space-x-4">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-4 py-2 text-neutral-700 hover:text-neutral-900 font-medium"
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="btn-primary"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

// export default ProfileFilter

import { useState } from 'react'
import { motion } from 'framer-motion'

const ProfileFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    // Basic filters
    first_name: '',
    last_name: '',
    religion: '',
    caste: '',
    sub_caste: '',
    minAge: 18,
    maxAge: 60,
    maritalStatus: '',
    residingCountry: '',
    residingState: '',
    residingCity: '',
    sex: '',

    // Education & Career
    education: '',
    occupation: '',
    working_with: '',
    professional_area: '',

    // Lifestyle
    eating_habit: '',
    smoking: '',
    drinking: '',

    // Physical attributes
    body_type: '',
    complexion: '',
    height_min: '',
    height_max: '',
    blood_group: '',

    // Family
    family_type: '',
    family_value: '',

    // Astrological
    star: '',
    raashi: '',
    manglik: '',

    // Pagination
    page: 1,
    limit: 10,

    // Text search
    searchText: '',
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert empty strings to undefined to avoid sending empty filters
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => 
        [key, value === '' ? undefined : value]
    ))
    onFilterChange(cleanedFilters);
    setIsOpen(false);
  }
  
  const handleReset = () => {
    const defaultFilters = {
      first_name: '',
      last_name: '',
      religion: '',
      caste: '',
      sub_caste: '',
      minAge: 18,
      maxAge: 60,
      maritalStatus: '',
      residingCountry: '',
      residingState: '',
      residingCity: '',
      sex: '',
      education: '',
      occupation: '',
      working_with: '',
      professional_area: '',
      eating_habit: '',
      smoking: '',
      drinking: '',
      body_type: '',
      complexion: '',
      height_min: '',
      height_max: '',
      blood_group: '',
      family_type: '',
      family_value: '',
      star: '',
      raashi: '',
      manglik: '',
      searchText: '',
    }
    
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-primary-600 font-medium hover:text-primary-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-neutral-600">Sort by:</span>
          <select className="border border-neutral-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Relevance</option>
            <option>Newest first</option>
            <option>Recently active</option>
          </select>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={filters.first_name}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={filters.last_name}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Religion
              </label>
              <input
                type="text"
                name="religion"
                value={filters.religion}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Caste
              </label>
              <input
                type="text"
                name="caste"
                value={filters.caste}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sub Caste
              </label>
              <input
                type="text"
                name="sub_caste"
                value={filters.sub_caste}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Age Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="minAge"
                  min="18"
                  max="80"
                  value={filters.minAge}
                  onChange={handleChange}
                  className="w-16 p-2 border border-neutral-300 rounded-md"
                />
                <span className="text-neutral-500">to</span>
                <input
                  type="number"
                  name="maxAge"
                  min="18"
                  max="80"
                  value={filters.maxAge}
                  onChange={handleChange}
                  className="w-16 p-2 border border-neutral-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="residingCountry"
                value={filters.residingCountry}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="residingState"
                value={filters.residingState}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="residingCity"
                value={filters.residingCity}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Gender
              </label>
              <select
                name="sex"
                value={filters.sex}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={filters.maritalStatus}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              >
                <option value="">All</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            
            {/* Education & Career */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Education
              </label>
              <input
                type="text"
                name="education"
                value={filters.education}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={filters.occupation}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            {/* Lifestyle */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Eating Habit
              </label>
              <select
                name="eating_habit"
                value={filters.eating_habit}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              >
                <option value="">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            
            {/* Height Range */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Height Range (cm)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="height_min"
                  placeholder="Min"
                  value={filters.height_min}
                  onChange={handleChange}
                  className="w-16 p-2 border border-neutral-300 rounded-md"
                />
                <span className="text-neutral-500">to</span>
                <input
                  type="number"
                  name="height_max"
                  placeholder="Max"
                  value={filters.height_max}
                  onChange={handleChange}
                  className="w-16 p-2 border border-neutral-300 rounded-md"
                />
              </div>
            </div>
            
            {/* Search Text */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                General Search
              </label>
              <input
                type="text"
                name="searchText"
                placeholder="Search across name, location, education, etc."
                value={filters.searchText}
                onChange={handleChange}
                className="w-full p-2 border border-neutral-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-neutral-700 hover:text-neutral-900 font-medium"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ProfileFilter