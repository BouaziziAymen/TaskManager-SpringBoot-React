import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { categoryColors, questions } from "./questions";

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

const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fullWidthCol: {
    flex: 1,
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
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  categoryAndAccountHeader: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
  },
  accountHeader: {
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#2196F3",
    color: "#ffffff",
  },
  questionContainer: {
    padding: 5,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 12,
    flexWrap: "wrap",
    textAlign: "left",
  },
  questionBlankZone: {
    height: 30,
  },
  partContainer: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  partText: {
    fontSize: 12,
    textAlign: "left",
  },
  container: {
    marginTop: 20,
  },
  contentWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  threeBoxResponse: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  responseBox: {
    flex: 1,
    margin: 5,
    padding: 5,
    backgroundColor: "#ffffff",
    height: 30,
  },
  logoAndInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    margin: 20,
  },
  infoBox: {
    width: "30%",
    padding: 10,
    border: "1px solid #bfbfbf",
    backgroundColor: "#ffffff",
    fontSize: 15,
    textAlign: "left",
  },
  customBox: {
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #bfbfbf",
    backgroundColor: "#ffffff",
  },
  customBoxText: {
    fontSize: 12,
    textAlign: "center",
  },
});

const ThreeBoxCustomResponse: React.FC = () => (
  <View style={styles.threeBoxResponse}>
    <View style={styles.responseBox}></View>
    <View style={styles.responseBox}></View>
    <View style={styles.responseBox}></View>
  </View>
);

const CustomTextBox: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.customBox}>
    <Text style={styles.customBoxText}>{text}</Text>
  </View>
);

const EmptyCustomResponse: React.FC = () => <View />;

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

const getResponseComponent = (category: string) => {
  if (category === "Category 1") {
    return ThreeBoxCustomResponse;
  } else if (category === "Category 2") {
    return (props: any) => (
      <CustomTextBox text="/...../...../...../" {...props} />
    );
  } else {
    return EmptyCustomResponse;
  }
};

const CategoryHeader: React.FC<{ category: string }> = ({ category }) => {
  const backgroundColor = categoryColors[category] || "#ffffff";

  return (
    <View style={[styles.tableRow, { backgroundColor }]}>
      <Text style={[styles.fullWidthCol, styles.categoryAndAccountHeader]}>
        {category}
      </Text>
    </View>
  );
};

const AccountHeader: React.FC<{ account: string }> = ({ account }) => (
  <View style={styles.tableRow}>
    <Text
      style={[
        styles.fullWidthCol,
        styles.categoryAndAccountHeader,
        styles.accountHeader,
      ]}
    >
      {account}
    </Text>
  </View>
);

interface QuestionRowProps {
  question: { questionContent: { parts: string[] }[] };
  ResponseComponent: React.ComponentType;
}
const QuestionRow: React.FC<QuestionRowProps> = ({
  question,
  ResponseComponent,
}) => (
  <>
    {question.questionContent.map((questionPart, partIndex) => (
      <React.Fragment key={partIndex}>
        {questionPart.parts.map((part, index) => (
          <React.Fragment key={index}>
            <View style={styles.tableRow}>
              <View
                style={[
                  styles.fullWidthCol,
                  { borderRightWidth: 1, borderRightColor: "black" },
                ]}
              >
                <View style={styles.partContainer}>
                  <Text style={styles.partText}>{part}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.fullWidthCol,
                  { borderLeftWidth: 1, borderLeftColor: "black" },
                ]}
              >
                <View style={styles.partContainer}>
                  <ResponseComponent />
                </View>
              </View>
            </View>
          </React.Fragment>
        ))}
        {partIndex < question.questionContent.length - 1 && (
          <View style={styles.questionBlankZone} />
        )}
      </React.Fragment>
    ))}
  </>
);

const MyDocument: React.FC = () => {
  const groupedQuestions = groupQuestionsByCategoryAndAccount(questions);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.logoAndInfoWrapper}>
              <Image src="logo192.png" style={styles.logo} />
              <View style={styles.infoBox}>
                <Text>Info Line 1</Text>
                <Text>Info Line 2</Text>
                <Text>Info Line 3</Text>
              </View>
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
                            <QuestionRow
                              question={question}
                              ResponseComponent={getResponseComponent(category)}
                            />
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
