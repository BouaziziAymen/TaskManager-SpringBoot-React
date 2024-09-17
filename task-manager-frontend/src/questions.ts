export const questions: Question[] = [
  {
    category: "Category 1",
    account: "Account 1",
    questionContent: [
      {
        parts: [
          "Question introduction it can be this long?",
          "- Question part 1",
          "- Question part 2",
          "- Question part 3",
        ],
      },
    ],
  },
  {
    category: "Category 1",
    account: "Account 2",
    questionContent: [
      {
        parts: [
          "Question B1 Part 1: Here is a long question part that should wrap correctly within the container provided by the styling. The content should extend across multiple lines if necessary, and the styling should adapt to accommodate this.",
          "Question B1 Part 2: Continuing with the long text to ensure it displays properly across multiple lines if needed. The purpose is to test how well the text wrapping works and ensure the document remains readable.",
        ],
      },
      {
        parts: [
          "Question B2 Part 1: This question part is very long and will be tested to ensure it does not break the layout of the PDF document. It should handle text wrapping gracefully and maintain a clean appearance.",
          "Question B2 Part 2: Further long content to evaluate text wrapping and space management. The layout should adapt to handle the lengthy content without truncating or distorting the information.",
        ],
      },
    ],
  },
  {
    category: "Category 2",
    account: "Account 1",
    questionContent: [
      {
        parts: [
          "Question C1 Part 1: This part includes an extensive amount of text, designed to test the ability of the document layout to handle very long content without truncation or layout issues. The content here should be fully visible and correctly formatted.",
          "Question C1 Part 2: Additional long text content to ensure comprehensive testing of the text wrapping and formatting capabilities within the document.",
        ],
      },
      {
        parts: [
          "Question C2 Part 1: Another long text example for further validation. This part should also wrap properly and maintain the layout integrity across different text lengths.",
          "Question C2 Part 2: Testing continues with this extended content to verify that the document handles even the most verbose entries effectively.",
        ],
      },
    ],
  },
  {
    category: "Category 3",
    account: "Account 1",
    questionContent: [
      {
        parts: [
          "Question D1 Part 1: Here we have another lengthy question part to ensure that the layout remains consistent and text does not overflow or disrupt the document formatting.",
          "Question D1 Part 2: Additional content for thorough testing, ensuring the document can handle various text lengths and maintain readability.",
        ],
      },
    ],
  },
  {
    category: "Category 3",
    account: "Account 2",
    questionContent: [
      {
        parts: [
          "Question E1 Part 1: This part is designed to push the boundaries of text wrapping and layout handling. The document should be able to manage this content effectively without any layout issues.",
          "Question E1 Part 2: Further text to test the handling of long content, ensuring that the PDF rendering accommodates all parts correctly.",
        ],
      },
    ],
  },
  {
    category: "Category 4",
    account: "Account 1",
    questionContent: [
      {
        parts: [
          "Question F1 Part 1: Testing with a new category and account to ensure that the layout is flexible and can adapt to different styles and content lengths. The aim is to confirm that the document renders correctly across various cases.",
          "Question F1 Part 2: Additional text for comprehensive testing of layout adaptability and content handling.",
        ],
      },
    ],
  },
  {
    category: "Category 4",
    account: "Account 2",
    questionContent: [
      {
        parts: [
          "Question G1 Part 1: Here’s another lengthy question to test the layout's ability to handle extensive content without any issues. This entry helps ensure consistency in rendering and formatting.",
          "Question G1 Part 2: Further content to verify that the PDF handles multiple lines and long text appropriately.",
        ],
      },
    ],
  },
  {
    category: "Category 5",
    account: "Account 1",
    questionContent: [
      {
        parts: [
          "Question H1 Part 1: Including a variety of content to thoroughly test the PDF rendering engine. This question part should demonstrate how well the document maintains its format with different types of content.",
          "Question H1 Part 2: Additional text to confirm the robustness of the document's layout and its ability to handle diverse content formats.",
        ],
      },
    ],
  },
  {
    category: "Category 5",
    account: "Account 2",
    questionContent: [
      {
        parts: [
          "Question I1 Part 1: A final entry to complete the diverse set of questions and ensure that all aspects of the layout and text rendering are thoroughly evaluated. This part should test the full extent of the document's formatting capabilities.",
          "Question I1 Part 2: More content to ensure comprehensive testing and verification of the document's ability to handle varied text lengths and styles.",
        ],
      },
    ],
  },
  // Add more questions as needed...
];

// Define types for questions and grouped questions
export interface Question {
  category: string;
  account: string;
  questionContent: {
    parts: string[];
  }[];
}

// Define the background colors for each category
export const categoryColors: { [key: string]: string } = {
  "Category 1": "#e0f7fa", // Light cyan
  "Category 2": "#ffecb3", // Light yellow
  "Category 3": "#c8e6c9", // Light green
  "Category 4": "#ffccbc", // Light coral
  "Category 5": "#c5cae9", // Light indigo
  "Category 6": "#f8bbd0", // Light pink
  "Category 7": "#dcedc8", // Light lime
  "Category 8": "#fff9c4", // Light amber
  "Category 9": "#e1bee7", // Light purple
  "Category 10": "#b3e5fc", // Light blue
  "Category 11": "#ffcdd2", // Light red
  "Category 12": "#d0f0c0", // Light green
  "Category 13": "#ffebee", // Light red pink
  "Category 14": "#e3f2fd", // Light sky blue
  "Category 15": "#ffeb3b", // Yellow
  "Category 16": "#cfd8dc", // Light grey blue
  "Category 17": "#f5f5f5", // Light grey
  "Category 18": "#dcedc8", // Light olive
  "Category 19": "#b9fbc0", // Light mint
  "Category 20": "#ffab91", // Light orange
};
