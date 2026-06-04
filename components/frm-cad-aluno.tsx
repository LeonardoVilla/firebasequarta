import { db } from "@/lib/firebase";
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function FrmAluno() {
  const [nomeAluno, setNomeAluno] = useState("");
  const [idadeAluno, setIdadeAluno] = useState("");
  const [emailAluno, setEmailAluno] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadAluno() {
    setLoading(true);

    // Supabase: const { data, error } = await supabase.from(...).insert([...]).select()
    // Firebase: não retorna { data, error } — usa try/catch no lugar
    try {
      const docRef = await addDoc(collection(db, "alunos"), {
        nome: nomeAluno,
        idade: idadeAluno,
        "e-mail": emailAluno,
      });

      // equivalente ao bloco "else" do Supabase (sem error)
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: `Aluno ${nomeAluno} cadastrado com sucesso!`,
      });

      setNomeAluno("");
      setIdadeAluno("");
      setEmailAluno("");
    } catch (error: any) {
      // equivalente ao bloco "if (error)" do Supabase
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        <Ionicons name="school-outline" size={22} color="#ffffff" /> Cadastro de Aluno
      </Text>

      <TextInput
        style={styles.Input}
        placeholder="Informe seu nome"
        value={nomeAluno}
        onChangeText={setNomeAluno}
      />

      <TextInput
        style={styles.Input}
        placeholder="Informe sua idade"
        keyboardType="numeric"
        value={idadeAluno}
        onChangeText={setIdadeAluno}
      />

      <TextInput
        style={styles.Input}
        placeholder="Informe seu e-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAluno}
        onChangeText={setEmailAluno}
      />

      <Toast />

      <TouchableOpacity style={styles.Button} onPress={cadAluno} disabled={loading}>
        <Text style={styles.ButtonText}>
          <Ionicons name="person-add-outline" size={20} color="#0f172a" /> Cadastrar Aluno
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  Text: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  Input: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    color: "#000000",
  },
  Button: {
    width: "100%",
    height: 40,
    backgroundColor: "#c2e015",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    fontSize: 20,
    color: "#0f172a",
    fontWeight: "700",
  },
});
