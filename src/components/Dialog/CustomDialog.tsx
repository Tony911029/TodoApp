import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import Dialog from "react-native-dialog";

interface CustomDialogProps {
  visible: boolean;
  handleCancel: () => void;
  handleConfirm: (inputValue: string) => void;
  cancelText?: string;
  actionText?: string;
  title?: string;
  description?: string;
  showInput?: boolean;
  inputPlaceholder?: string;
  defaultValue?: string;
}

export const CustomDialog = ({
  visible = false,
  handleCancel,
  handleConfirm,
  cancelText = 'Cancel',
  actionText = 'Confirm',
  title = '',
  description = '',
  showInput = false,
  inputPlaceholder = 'Enter text here',
  defaultValue =''
}: CustomDialogProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const onCancel = () => {
    setInputValue('');
    handleCancel();
  }

  const onConfirm = () => {
    handleConfirm(inputValue);
    setInputValue('');
  }

  // TODO: Handle missing title
  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Description>
          {description}
        </Dialog.Description>
        {showInput && (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={inputPlaceholder}
          />
        )}
        <Dialog.Button 
          label={cancelText} 
          onPress={onCancel} 
        />
        <Dialog.Button 
          label={actionText} 
          onPress={onConfirm} 
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginRight: 25,
    marginBottom: 20,
    marginLeft: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  }
});