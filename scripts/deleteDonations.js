// delete-donations.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/donations';

const deleteAllDonations = async () => {
  try {
    // First get all donations
    console.log('Fetching all donations...');
    const response = await axios.get(API_URL);
    const donations = response.data;
    
    console.log(`Found ${donations.length} donations to delete.`);
    
    // Delete each donation
    console.log('Deleting donations...');
    let deleteCount = 0;
    
    for (const donation of donations) {
      try {
        await axios.delete(`${API_URL}/${donation._id}`);
        deleteCount++;
        console.log(`Deleted donation: $${donation.amount} from ${donation.name}`);
      } catch (error) {
        console.error(`Failed to delete donation ${donation._id}:`, error.message);
      }
    }
    
    console.log(`Successfully deleted ${deleteCount} out of ${donations.length} donations.`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Run the function
deleteAllDonations();