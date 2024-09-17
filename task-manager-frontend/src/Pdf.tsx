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

// Définir les types pour les questions et les questions regroupées
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

// Définir les styles en utilisant Flexbox
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
    borderColor: "#bfbfbf",
    padding: 5,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 12,
    flexWrap: "wrap",
    textAlign: "left",
  },
  blankZone: {
    height: 1,
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
    margin: 2,
    padding: 5,
    border: "1px solid #bfbfbf",
    backgroundColor: "#ffffff",
  },
  logoAndInfoWrapper: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Space out logo and info box
    alignItems: "flex-start", // Align items to the start of the container
    width: "100%", // Ensure the wrapper uses the full width
    marginBottom: 20, // Margin at the bottom to separate from the following content
  },
  logo: {
    width: 100, // Width of the logo, adjust as needed
    height: 50, // Height of the logo, adjust as needed
    margin: 20,
  },
  infoBox: {
    width: "30%", // Fixed width of 30%
    padding: 10,
    border: "1px solid #bfbfbf",
    backgroundColor: "#ffffff",
    fontSize: 15,
    textAlign: "left", // Align text to the right
  },
});

// Définir les composants de réponse personnalisés
const ThreeBoxCustomResponse: React.FC = () => (
  <View style={styles.threeBoxResponse}>
    <View style={styles.responseBox}>
      <Text>Box 1</Text>
    </View>
    <View style={styles.responseBox}>
      <Text>Box 2</Text>
    </View>
    <View style={styles.responseBox}>
      <Text>Box 3</Text>
    </View>
  </View>
);

const CustomResponseComponent: React.FC = () => (
  <Text>Custom Response</Text> // Composant de réponse personnalisable
);

// Fonction d'aide pour regrouper les questions par catégorie et compte
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

// Méthode pour retourner le composant de réponse approprié en fonction des critères
const getResponseComponent = (category: string) => {
  // Exemple de logique : utiliser `ThreeBoxCustomResponse` pour "Category 1", sinon utiliser `CustomResponseComponent`
  return category === "Category 1"
    ? ThreeBoxCustomResponse
    : CustomResponseComponent;
};

// Composant pour rendre l'en-tête de catégorie
const CategoryHeader: React.FC<{ category: string }> = ({ category }) => {
  const backgroundColor = categoryColors[category] || "#ffffff"; // Couleur par défaut si non trouvée

  return (
    <View style={[styles.tableRow, { backgroundColor }]}>
      <Text style={[styles.fullWidthCol, styles.categoryAndAccountHeader]}>
        {category}
      </Text>
    </View>
  );
};

// Composant pour rendre l'en-tête de compte
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

// Définir un type pour le composant de réponse personnalisable
interface QuestionRowProps {
  question: { questionContent: { parts: string[] }[] };
  ResponseComponent: React.ComponentType; // Composant personnalisable pour les réponses
}

// Composant pour rendre la ligne de question avec le composant de réponse personnalisable
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
              <View style={styles.fullWidthCol}>
                <View style={styles.partContainer}>
                  <Text style={styles.partText}>{part}</Text>
                </View>
              </View>
              <View style={styles.fullWidthCol}>
                <View style={styles.partContainer}>
                  <ResponseComponent />{" "}
                  {/* Rendre le composant de réponse personnalisable */}
                </View>
              </View>
            </View>
            {/* Zone blanche entre les parties */}
            {index < questionPart.parts.length - 1 && (
              <View style={styles.blankZone} />
            )}
          </React.Fragment>
        ))}
        {/* Zone blanche plus grande entre les questions */}
        {partIndex < question.questionContent.length - 1 && (
          <View style={styles.questionBlankZone} />
        )}
      </React.Fragment>
    ))}
  </>
);

const MyDocument: React.FC = () => {
  // Regrouper les questions par catégorie et compte
  const groupedQuestions = groupQuestionsByCategoryAndAccount(questions);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.logoAndInfoWrapper}>
              <Image
                src="logo192.png" // Chemin du logo
                style={styles.logo} // Appliquer le style du logo
              />
              <View style={styles.infoBox}>
                <Text>Info Line 1</Text>
                <Text>Info Line 2</Text>
                <Text>Info Line 3</Text>
                {/* Ajouter plus de lignes si nécessaire */}
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
                              ResponseComponent={getResponseComponent(category)} // Passer le composant de réponse personnalisable
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
