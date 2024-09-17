import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { questions } from "./questions";

// Define styles using flexbox
const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fullWidthCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    width: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  grayContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  tableHeader: {
    padding: 5,
    fontSize: 14, // Larger font size for headers
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  categoryHeader: {
    padding: 10,
    fontSize: 18, // Largest font size for category headers
    fontWeight: "bold",
    backgroundColor: "#e0f7fa", // Light cyan for category headers
  },
  accountHeader: {
    padding: 8,
    fontSize: 16, // Slightly smaller font size for account headers
    fontWeight: "bold",
    backgroundColor: "#2196F3", // Blue background
    color: "#ffffff", // White text color
  },
  questionContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    marginBottom: 30, // Larger margin for more space between questions
  },
  questionText: {
    fontSize: 12, // Slightly larger font size for question text
    flexWrap: "wrap",
    textAlign: "left",
  },
  responseText: {
    fontSize: 12, // Consistent font size with question text
    color: "#333",
  },
  blankZone: {
    height: 10, // Adjust this height to control spacing between parts
  },
  questionBlankZone: {
    height: 30, // Larger blank zone between questions
  },
  partContainer: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  partText: {
    fontSize: 12, // Consistent font size with question and response text
    textAlign: "left",
  },
  infoBox: {
    width: "30%", // Fixed width of 30%
    padding: 10,
    border: "1px solid #bfbfbf",
    backgroundColor: "#ffffff",
    fontSize: 10,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  container: {
    marginTop: 20, // Space between the top of the page and the container
  },
  contentWrapper: {
    marginTop: 20, // Margin to push the table down
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end", // Align the content to the right
  },
});

// Define types for questions and grouped questions
interface Question {
  category: string;
  account: string;
  questionContent: {
    parts: string[];
  }[];
}

interface GroupedQuestions {
  [category: string]: {
    [account: string]: {
      questionContent: {
        parts: string[];
      }[];
    }[];
  };
}

// Define the background colors for each category
const categoryColors: { [key: string]: string } = {
  "Category 1": "#e0f7fa", // Light cyan
  "Category 2": "#ffecb3", // Light yellow
  "Category 3": "#c8e6c9", // Light green
};

// Helper function to group questions by category and account
const groupQuestionsByCategoryAndAccount = (
  questions: Question[]
): GroupedQuestions => {
  return questions.reduce((acc, question) => {
    const { category, account, questionContent } = question;

    if (!acc[category]) {
      acc[category] = {};
    }

    if (!acc[category][account]) {
      acc[category][account] = [];
    }

    acc[category][account].push({ questionContent });

    return acc;
  }, {} as GroupedQuestions);
};

// Component for rendering Category Header
const CategoryHeader: React.FC<{ category: string }> = ({ category }) => {
  const backgroundColor = categoryColors[category] || "#ffffff"; // Default color if not found

  return (
    <View style={[styles.tableRow, { backgroundColor }]}>
      <Text style={[styles.fullWidthCol, styles.categoryHeader]}>
        {category}
      </Text>
    </View>
  );
};

// Component for rendering Account Header
const AccountHeader: React.FC<{ account: string }> = ({ account }) => (
  <View style={styles.tableRow}>
    <Text style={[styles.fullWidthCol, styles.accountHeader]}>{account}</Text>
  </View>
);

// Component for rendering Question Row
const QuestionRow: React.FC<{
  question: { questionContent: { parts: string[] }[] };
}> = ({ question }) => (
  <>
    {question.questionContent.map((questionPart, partIndex) => (
      <React.Fragment key={partIndex}>
        {questionPart.parts.map((part, index) => (
          <React.Fragment key={index}>
            <View style={styles.tableRow}>
              <View style={styles.fullWidthCol}>
                <View style={styles.partContainer}>
                  <Text style={styles.partText}>{part}</Text>
                </View>
              </View>
              <View style={styles.fullWidthCol}>
                <View style={styles.partContainer}>
                  <Text style={styles.responseText}>response</Text>
                </View>
              </View>
            </View>
            {/* Blank zone between parts */}
            {index < questionPart.parts.length - 1 && (
              <View style={styles.blankZone} />
            )}
          </React.Fragment>
        ))}
        {/* Larger blank zone between questions */}
        {partIndex < question.questionContent.length - 1 && (
          <View style={styles.questionBlankZone} />
        )}
      </React.Fragment>
    ))}
  </>
);

const MyDocument: React.FC = () => {
  // Group questions by category and account
  const groupedQuestions = groupQuestionsByCategoryAndAccount(questions);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.infoBox}>
              <Text>Info Line 1</Text>
              <Text>Info Line 2</Text>
              <Text>Info Line 3</Text>
              {/* Add more lines as needed */}
            </View>
            <View style={styles.table}>
              {Object.keys(groupedQuestions).map((category) => (
                <View key={category}>
                  <CategoryHeader category={category} />
                  {Object.keys(groupedQuestions[category]).map((account) => (
                    <View key={account}>
                      <AccountHeader account={account} />
                      {groupedQuestions[category][account].map(
                        (question, index) => (
                          <View style={styles.questionContainer} key={index}>
                            <QuestionRow question={question} />
                          </View>
                        )
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
