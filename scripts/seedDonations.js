// seed-donations.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/donations';

// Sample donor names
const donorNames = [
  'John Smith', 'Jane Doe', 'Alex Johnson', 'Maria Garcia', 
  'David Lee', 'Sarah Williams', 'Robert Brown', 'Lisa Chen',
  'Michael Wilson', 'Emma Davis', 'James Miller', 'Olivia Jones',
  'William Taylor', 'Sophia Moore', 'Daniel Anderson', 'Ava Thomas'
];

// Sample messages
const messages = [
  'Keep up the great work!',
  'Happy to support your mission',
  'In memory of a loved one',
  'Thank you for all you do in our community',
  '',
  'Making a difference together',
  'For the children',
  'Supporting your environmental initiatives',
  'Looking forward to your next event!'
];

// Custom function to generate weighted random donation amount
const generateDonationAmount = () => {
  const rand = Math.random() * 100;
  
  if (rand < 50) {
    // 50% chance of donation under $50
    return Math.floor(Math.random() * 50) + 5;
  } else if (rand < 80) {
    // 30% chance of donation between $50-$100
    return Math.floor(Math.random() * 50) + 50;
  } else if (rand < 95) {
    // 15% chance of donation between $100-$500
    return Math.floor(Math.random() * 400) + 100;
  } else {
    // 5% chance of donation over $500
    return Math.floor(Math.random() * 500) + 500;
  }
};

// Create donations with dates spanning the last 12 months
const createTestDonations = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const donationsToCreate = 30; // Adjust the number as needed
  
  console.log(`Creating ${donationsToCreate} test donations...`);
  
  for (let i = 0; i < donationsToCreate; i++) {
    // Generate a random date within the last 12 months
    const monthsAgo = Math.floor(Math.random() * 12);
    const donationDate = new Date(currentYear, currentMonth - monthsAgo, 
                                Math.floor(Math.random() * 28) + 1);
    
    // Generate a random amount using weighted distribution
    const amount = generateDonationAmount();
    
    // Pick a random donor name and message
    const name = donorNames[Math.floor(Math.random() * donorNames.length)];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const donation = {
      name,
      email,
      amount,
      date: donationDate.toISOString(),
      message
    };
    
    try {
      await axios.post(API_URL, donation);
      console.log(`Created donation: $${amount} from ${name} on ${donationDate.toLocaleDateString()}`);
    } catch (error) {
      console.error(`Failed to create donation:`, error.message);
    }
  }
  
  console.log('Done creating test donations!');
};

// Run the function
createTestDonations();