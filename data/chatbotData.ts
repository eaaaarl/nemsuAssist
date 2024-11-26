export const chatbotData = {
  general_info: {
    administration: [
      {
        patterns: [
          "who is the campus director",
          "campus director",
          "school director",
          "who heads the campus",
        ],
        responses: [
          "The current Campus Director of NEMSU is Catherine P. Salomon, PhD(candidate). They can be reached at their office during regular office hours: 8:00 AM - 5:00 PM.",
        ],
      },
      {
        patterns: [
          "administrative office",
          "admin office",
          "where is admin",
          "admin office location",
        ],
        responses: [
          "The Administrative Office is located in Building A, Ground Floor. Office hours are from 8:00 AM to 5:00 PM, Monday to Friday.",
        ],
      },
      
    ],
    office_hours: [
      {
        patterns: [
          "office hours",
          "when offices open",
          "campus hours",
          "working hours",
        ],
        responses: [
          "Most offices are open from Monday to Friday, 7:30 AM to 5:00 PM. Offices are closed on weekends and holidays.",
        ],
      },
    ],
  },

  offices_and_departments: {
    registrar: {
      patterns: [
        "registrar office",
        "where is registrar",
        "registrar location",
        "how to get to registrar",
      ],
      responses: [
        "The Registrar's Office is located behind the Pearson Building, First Floor. They handle student records, enrollment, and documentation needs.",
        "Visit the Registrar's Office behind the Pearson Building for concerns about enrollment, grades, and official documents.",
      ],
      office_hours: "8:00 AM - 5:00 PM",
      contact: "555-1234",
      head: "Mr. Ronquillo",
    },
    cashier: {
      patterns: [
        "cashier office",
        "where to pay",
        "payment location",
        "cashier location",
      ],
      responses: [
        "The Cashier's Office is located beside the registrar office, Ground Floor. All payments should be made here during office hours.",
        "For payments and financial transactions, visit the Cashier's Office beside the registrar office.",
      ],
      office_hours: "8:00 AM - 3:00 PM",
      contact: "555-5678",
      head: "Mr. John Doe",
    },
  },

  academic_departments: {
    CS_department: {
      name: "Computer Science Department",
      location: "Third Floor New Academic Building",
      head: "Mrs. Christine W. Pitos, MSCS",
      patterns: [
        "CS department",
        "Computer Science department",
        "computer department",
        "where is CS office",
        "BSCS program chair",
      ],
      responses: [
        "The CS Department in the New 3-story academic building, Third Floor. The department head is Mrs. Christine W. Pitos, MSCS",
        "You can find the CS Department in the New 3-story academic building. They offer BSCS and other Computer-related courses. Lead by the department head is Mrs. Christine W. Pitos, MSCS",

      ],
      courses_offered: [
        "Certificate in Computer Science Program",
      ],
      faculty_rooms: ["ComSci Office","ComLab 1", "ComLab 2", "ComLab 3","IL 1", "IL 2",],
    },
    
    
    
    education_department: {
      name: "Education Department",
      location: "Building E",
      head: "Dr. Robert Lee",
      patterns: [
        "education department",
        "BEED department",
        "teaching department",
        "where is education department",
      ],
      responses: [
        "The Education Department is located in Building E, First Floor. The department head is Dr. Robert Lee.",
        "The Education Department can be found in Building E. They offer various education courses.",
      ],
      courses_offered: [
        "Bachelor of Elementary Education (BEED)",
        "Bachelor of Secondary Education (BSED)",
      ],
      faculty_rooms: ["Room 105", "Room 106"],
    },
  },
  

  facilities: {
    library: {
      patterns: [
        "library location",
        "where is library",
        "library hours",
        "when library open",
      ],
      responses: [
        "The Library is located in Building F, Ground Floor. It's open from 8:00 AM to 5:00 PM, Monday to Friday.",
        "You can find the Library in Building F. It houses our collection of books, journals, and digital resources.",
      ],
      hours: "8:00 AM - 5:00 PM",
      librarian: "Ms. Emily White",
      floors: [
        {
          level: "Ground Floor",
          sections: [
            "Circulation Area",
            "Reading Area",
            "Digital Resource Center",
          ],
        },
        {
          level: "Second Floor",
          sections: ["Research Section", "Thesis Section", "Quiet Study Area"],
        },
      ],
    },

    computer_laboratories: {
      patterns: [
        "computer lab",
        "where is computer laboratory",
        "PC lab location",
        "computer room",
        "comlab",
        "computer lab",
        "il",
        "il1",
        "il2",
        "internet lab",
      ],
      responses: [
        "Computer Laboratories and Internet Laboratories are located in the New Academic Building, third floor.",
        "We have multiple computer labs and internet labs in the New Academic Building (third floor), each equipped with modern facilities.",
      ],
      labs: [
        {
          name: "Computer Lab 1",
          room: "Room 301",
          capacity: "25 units",
          purpose: "Programming and Development",
        },
        {
          name: "Computer Lab 2",
          room: "Room 302",
          capacity: "30 units",
          purpose: "Networking and Systems Administration",
        },
      ],
    },
  },

  rooms: {
    lecture_rooms: [
      {
        room_number: "Room 101",
        building: "Building H",
        floor: "First Floor",
        capacity: "50 students",
        type: "Lecture Room",
      },
      {
        room_number: "Room 102",
        building: "Building H",
        floor: "First Floor",
        capacity: "50 students",
        type: "Lecture Room",
      },
    ],
    laboratories: [
      {
        room_number: "Lab 103",
        building: "Building I",
        floor: "Ground Floor",
        type: "Science Laboratory",
        capacity: "30 students",
      },
    ],
    faculty_rooms: [
      {
        room_number: "Faculty Room 104",
        building: "Building J",
        floor: "Second Floor",
        department: "Mathematics Department",
      },
    ],
  },

  contact_information: {
    patterns: [
      "contact numbers",
      "phone numbers",
      "how to contact",
      "email address",
    ],
    responses: [
      "Here are the contact details for NEMSU:\nMain Office: 555-0000\nEmail: info@nemsu.edu.ph\nWebsite: www.nemsu.edu.ph",
    ],
    emergency_contacts: {
      clinic: "555-1111",
      security: "555-2222",
      maintenance: "555-3333",
    },
  },
};
