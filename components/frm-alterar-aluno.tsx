import { useFocusRefresh } from "@/hooks/use-focus-refresh";
import { db } from "@/lib/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function FrmAlterar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [nomeAluno, setNomeAluno] = useState("");
  const [idadeAluno, setIdadeAluno] = useState("");
  const [emailAluno, setEmailAluno] = useState("");
  const [loading, setLoading] = useState(false);

  const carregarAluno = useCallback(async () => {
    if (!id) return;
    const snap = await getDoc(doc(db, "alunos", id));
    if (snap.exists()) {
      const data = snap.data();
      setNomeAluno(data.nome ?? "");
      setIdadeAluno(String(data.idade ?? ""));
      setEmailAluno(data["e-mail"] ?? "");
    } else {
      Toast.show({ type: "error", text1: "Erro!", text2: "Aluno não encontrado." });
    }
  }, [id]);

  useFocusRefresh(carregarAluno);

  async function atualizarAluno() {
    if (!id) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "alunos", id), {
        nome: nomeAluno,
        idade: idadeAluno,
        "e-mail": emailAluno,
      });
      Toast.show({ type: "success", text1: "Sucesso!", text2: `Aluno ${nomeAluno} atualizado com sucesso!` });
    } catch (error: any) {
      Toast.show({ type: "error", text1: "Aluno não foi atualizado!", text2: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        <Ionicons name="create-outline" size={22} color="#ffffff" /> Atualização de Aluno
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
      <TouchableOpacity style={styles.Button} onPress={atualizarAluno} disabled={loading}>
        <Text style={styles.ButtonText}>
          <Ionicons name="save-outline" size={20} color="#0f172a" /> Alterar Aluno
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "green", alignItems: "center", justifyContent: "center", padding: 20 },
  Text: { fontSize: 24, color: "#ffffff", marginBottom: 20 },
  Input: { width: "100%", height: 40, backgroundColor: "#ffffff", marginBottom: 20, color: "#000000" },
  Button: { width: "100%", height: 40, backgroundColor: "#c2e015", alignItems: "center", justifyContent: "center" },
  ButtonText: { fontSize: 20, color: "#0f172a", fontWeight: "700" },
});
