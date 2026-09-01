// Mock data for demonstration (varied records instead of exact duplicates)

export const users = [
  // Admin accounts
  { id: 1, role: "admin", username: "admin1", password: "admin123" },
  { id: 2, role: "admin", username: "admin2", password: "admin123" },
  { id: 3, role: "admin", username: "monisha", password: "123" },

  // Owner (patient) accounts
  { id: 4, role: "owner", username: "jane.doe", password: "owner123" },
  { id: 5, role: "owner", username: "john.smith", password: "owner123" },
  { id: 8, role: "owner", username: "moni", password: "1234" },
];

export const pets = [
  // Pets for jane.doe (ID 4)
  { id: 1, ownerId: 4, name: "Bella", species: "Dog", breed: "Labrador", age: 3 },
  { id: 2, ownerId: 4, name: "Charlie", species: "Dog", breed: "Beagle", age: 1 },
  // Pets for john.smith (ID 5)
  { id: 3, ownerId: 5, name: "Milo", species: "Cat", breed: "Siamese", age: 2 },
  { id: 4, ownerId: 5, name: "Luna", species: "Cat", breed: "Persian", age: 4 },
  { id: 5, ownerId: 5, name: "Rocky", species: "Dog", breed: "Bulldog", age: 6 },
  
  // Pets for moni (ID 8)
  { id: 6, ownerId: 8, name: "Simba", species: "Cat", breed: "Maine Coon", age: 3 },
  { id: 7, ownerId: 8, name: "Daisy", species: "Dog", breed: "Poodle", age: 2 },
  { id: 8, ownerId: 8, name: "Max", species: "Dog", breed: "Pug", age: 5 },
  { id: 9, ownerId: 8, name: "Chloe", species: "Cat", breed: "Sphynx", age: 1 },
  { id: 10, ownerId: 8, name: "Buster", species: "Dog", breed: "Golden Retriever", age: 4 },
];

export const appointments = [
  // varied appointments
  { id: 1, petId: 1, ownerId: 4, date: "2024-09-15", time: "10:00", status: "Completed", reason: "Vaccination" },
  { id: 2, petId: 2, ownerId: 4, date: "2024-09-18", time: "09:00", status: "Scheduled", reason: "Grooming" },
  
  { id: 3, petId: 3, ownerId: 5, date: "2024-09-20", time: "14:30", status: "Completed", reason: "Check-up" },
  { id: 4, petId: 4, ownerId: 5, date: "2024-09-21", time: "11:00", status: "Scheduled", reason: "Vaccination" },
  { id: 5, petId: 5, ownerId: 5, date: "2024-09-25", time: "16:00", status: "Scheduled", reason: "Dental" },

  // Appointments for moni (ID 8)
  { id: 6, petId: 6, ownerId: 8, date: "2024-09-22", time: "10:30", status: "Completed", reason: "Check-up" },
  { id: 7, petId: 7, ownerId: 8, date: "2024-09-23", time: "08:30", status: "Scheduled", reason: "Surgery" },
  { id: 8, petId: 8, ownerId: 8, date: "2024-09-26", time: "12:00", status: "Scheduled", reason: "Vaccination" },
  { id: 9, petId: 9, ownerId: 8, date: "2024-09-27", time: "14:00", status: "Scheduled", reason: "Check-up" },
  { id: 10, petId: 10, ownerId: 8, date: "2024-09-28", time: "15:30", status: "Scheduled", reason: "Grooming" },
  { id: 11, petId: 6, ownerId: 8, date: "2024-10-05", time: "09:00", status: "Scheduled", reason: "Follow-up" },
  { id: 12, petId: 7, ownerId: 8, date: "2024-10-10", time: "10:00", status: "Scheduled", reason: "Follow-up" },
];

// Helper utilities
export function getPetsByOwner(ownerId) {
  return pets.filter((p) => p.ownerId === ownerId);
}

export function getAppointmentsByOwner(ownerId) {
  return appointments.filter((a) => a.ownerId === ownerId);
}
