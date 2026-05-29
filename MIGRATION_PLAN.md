# Campus Guide: Map-Centric Topic Migration Plan

This document provides a complete audit of all **30+ topics** from the outdated guide section, outlining what to keep, what to remove, and exactly how the necessary information will be migrated and rendered within the new Map-Centric Spatial Campus Assistant.

---

## 1. Topic Audit: Keep vs. Remove

| Outdated Guide Topic | Status | Migration Strategy / Reasoning |
| :--- | :--- | :--- |
| **Getting Started** | ❌ Remove | Redundant. Key dates and orientation are covered by the Academic Calendar widget on the Home page. |
| **Laptop Buying Guide** | ❌ Remove | Unnecessary. General tech specs that do not require app-space maintenance. |
| **Part-time Jobs / Gigs** | ❌ Remove | Unnecessary. Better suited for student forums/community section. |
| **Time Management** | ❌ Remove | Unnecessary. Generic self-help advice; not campus-specific. |
| **Study Techniques** | ❌ Remove | Unnecessary. Generic academic self-help advice. |
| **Common Mistakes (Freshers)** | ❌ Remove | Unnecessary. General advice easily consolidated into specific rules. |
| **Clubs & Societies** | ❌ Remove | General info better represented in the Community Section. |
| **Campus Map** | 👑 Keep | Becomes the main core application of the Guide section. |
| **Library Services** | 🟢 Keep | Map to **Sam Jonah Library** physical marker. |
| **Medicals & Health Center** | 🟢 Keep | Map to **University Hospital / HMS Clinic** physical marker. |
| **Banking & MoMo** | 🟢 Keep | Map to **ATM Farms / Commercial Bank** physical markers. |
| **Accommodation** | 🟢 Keep | Map to individual **Halls of Residence / Hostels** markers. |
| **Transportation** | 🟢 Keep | Map to **Main Shuttle Terminal / Taxi Ranks** markers. |
| **Security & Safety** | 🟢 Keep | Map to **Campus Police Station / Security Posts** markers. |
| **Labs & IT Services** | 🟢 Keep | Map to **ICT Center / Computer Science Block** markers. |
| **Student Portal** | 🟢 Keep | Map to **ICT Directorate** (Physical) + Virtual tag `"Portal"`. |
| **Wifi & Email** | 🟢 Keep | Map to **ICT Directorate** (Physical) + Virtual tag `"Wifi"`. |
| **Student ID Card** | 🟢 Keep | Map to **ID Card Office** (Physical) + Virtual tag `"ID Card"`. |
| **Course Registration** | 🟢 Keep | Map to **Registrar's Office** (Virtual Node) + Search tag `"Registration"`. |
| **Add/Drop Courses** | 🟢 Keep | Map to **Registrar's Office** (Virtual Node) + Search tag `"Add Drop"`. |
| **Exams & Rules** | 🟢 Keep | Map to **Exams Office** (Virtual Node) + Search tag `"Exams"`. |
| **Exams & Resits (Detailed)** | 🟢 Keep | Map to **Exams Office** (Virtual Node) + Search tag `"Resits"`. |
| **Attendance Regulations** | 🟢 Keep | Map to **Academic Affairs** (Virtual Node) + Search tag `"Attendance"`. |
| **Payments & Receipts** | 🟢 Keep | Map to **Cash Office / Finance Block** (Physical) + Search tag `"Fees"`. |
| **Student Loan Trust Fund** | 🟢 Keep | Map to **Financial Aid Office** (Physical) + Search tag `"Loan"`. |
| **Transcripts & Letters** | 🟢 Keep | Map to **Academic Affairs Office** (Physical) + Search tag `"Transcript"`. |
| **Contact Directory** | 🟢 Keep | Map to **Administration Block** (Physical) + Search tag `"Directory"`. |
| **FAQs & Troubleshooting** | 🟢 Keep | Map to **Help Desk** (Virtual Node) + Search tag `"Help"`. |
| **Academic Holidays** | 🟢 Keep | Consolidate into Academic Calendar widget + Virtual Academic Node. |

---

## 2. Migration Specs for Keeping Topics

### Group A: Anchored to Physical Buildings
These topics will reside inside the **Overview** or **Rules** drawer tabs of their respective physical map locations:

1.  **Sam Jonah Library** (`library-services`):
    *   **Overview Tab**: Library operating hours, study spaces.
    *   **Rules Tab**: Seating rules, booking study booths, bag deposit rules.
    *   **Resources Tab**: Link to catalog search portal and past questions repository.
2.  **University Hospital / HMS Clinic** (`medicals-health-center`):
    *   **Overview Tab**: Emergency contact lines, registration guides for freshers.
    *   **Rules Tab**: NHIS card registration and clinic attendance codes.
3.  **Halls of Residence** (`accommodation`):
    *   **Overview Tab**: Room pricing structures, porter contact numbers.
    *   **Rules Tab**: Hall visitation policies, electricity and cooking guidelines.
4.  **Main Shuttle Terminal** (`transportation`):
    *   **Overview Tab**: Fare charges, shuttle station schedules, and routes.
    *   **Transit Tab**: Interactive colored vector lines overlaying shuttle paths.

---

### Group B: Anchored to Virtual Nodes (Registrar / Academic Board)
Topics that do not have a single physical home will be mapped to "Virtual" offices at the **Administration Block**. When searched, they pop up immediately:

1.  **Registrar's Office / Academic Affairs** (`course-registration`, `add-drop-courses`, `printing-transcripts-letters`):
    *   **Concept Search Match**: Searching `"register"`, `"add course"`, or `"transcript"`.
    *   **Action Drawer**: Step-by-step instructions on course registration, minimum/maximum credit limits, transcript fee breakdown, and online application portal link.
2.  **Academic Board / Exams Office** (`exams-assessment-rules`, `exams-and-resits`, `attendance-regulations`):
    *   **Concept Search Match**: Searching `"exams"`, `"resit"`, `"grading"`, `"attendance"`.
    *   **Action Drawer**: Detail of the 75% lecture attendance policy, grading point weights (GPA scales), supplementary resit structures, and codes of conduct (e.g., cell phone bans in exam halls).
3.  **Cash Office / Student Accounts** (`payments-receipts`, `student-loan-trust-fund`):
    *   **Concept Search Match**: Searching `"fees"`, `"loan"`, `"sltf"`, `"payment"`.
    *   **Action Drawer**: Instructions on making bank/mobile money payments, downloading official receipts, and applying/finding guarantors for the Student Loan Trust Fund.

---

## 3. Data Structure Example (V1 Integration)

The migrated contents will be structured inside the data files like this:

```javascript
// Mapping of the regulations/handbooks into virtual office schema
export const VIRTUAL_OFFICES = [
  {
    id: "v-registrar-exams",
    name: "Exams Office & Academic Affairs",
    keywords: ["exams", "resit", "grading", "attendance", "rules"],
    context: {
      overview: "Manages all end-of-semester examination timetables, grading scales, and official transcript requests.",
      rules: [
        "75% Rule: You must attend at least 75% of lectures to write exams.",
        "Mobile Phones: Strictly banned. Having a phone during an exam is automatic expulsion.",
        "Resits: Supplementary resit registration costs GH₵50 per paper."
      ],
      handbooks: [
        { title: "Undergraduate Regulations Handbook (PDF)", url: "/docs/academic_handbook.pdf" }
      ]
    }
  }
];
```
