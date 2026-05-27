import { StyleSheet, 
    Text, TextInput, TouchableOpacity, View,
} from "react-native";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function FrmLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function login() {
        setLoading(true)
        
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        router.push("/(tabs)/explore");
        
        setLoading(false)
    }

    return (

        <View style={styles.container}>
            <Toast />
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={login} disabled={loading}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
    },
    input: {
        width: 256,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#d1d5db",
        padding: 8,
    },
    button: {
        borderRadius: 6,
        backgroundColor: "#3b82f6",
        padding: 8,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center",
    },
    buttonDisabled: {
        backgroundColor: "#9ca3af",
    },
});