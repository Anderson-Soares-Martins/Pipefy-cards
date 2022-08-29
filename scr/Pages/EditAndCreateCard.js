import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { createCard } from '../API'
import { updateCard } from '../API'
import { Button } from 'react-native-elements'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().trim().required("Email is required").email("Email is invalid"),
})


export default function CreateEdit({ navigation, route }) {
  const [inputHeight, setInputHeight] = useState()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: route.params?.card?.id ?? "",
      title: route.params?.card?.title ?? "",
      description: route.params?.card?.subtitles?.filter(subtitle => subtitle.name === "Product description")?.[0]?.value ?? "",
      name: route.params?.card?.subtitles?.filter(subtitle => subtitle.name === "Suggester name")?.[0]?.value ?? "",
      email: route.params?.card?.subtitles?.filter(subtitle => subtitle.name === "Suggester email")?.[0]?.value ?? "",
      priority: route.params?.card?.labels?.[0]?.name === "Low" ? "307450584" : route.params?.card?.labels?.[0]?.name === "Medium" ? "307450583" : route.params?.card?.labels?.[0]?.name === "High" ? "307450582" : "",

    },
    resolver: yupResolver(schema)
  })


  const handleSignUp = data => {
    route.params !== undefined ? updateCard(data).then(() => {
      Alert.alert("Success", "Card edited successfully")
      navigation.goBack()
    }).catch(() => {
      Alert.alert("Error", "Something went wrong")
    }) : createCard(data).then(() => {
      Alert.alert("Success", "Card created successfully")
      navigation.goBack()
    }).catch(() => {
      Alert.alert("Error", "Something went wrong")
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params !== undefined ? "Edit your Card" : "Create your Card"}</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.title && 1,
                borderColor: errors.title && '#FF375b'
              }
            ]}
            placeholder="Card Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && <Text style={styles.laberError}>{errors.title.message}</Text>}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.inputDescription, {
                borderWidth: errors.description && 1,
                borderColor: errors.description && '#FF375b',
                height: inputHeight
              }
            ]}
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            onContentSizeChange={(event) => { setInputHeight(event.nativeEvent.contentSize.height + 20) }}
          />
        )}
      />
      {errors.description && <Text style={styles.laberError}>{errors.description.message}</Text>}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input, {
                borderWidth: errors.name && 1,
                borderColor: errors.name && '#FF375b'
              }
            ]}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.laberError}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            textContentType='emailAddress'
            style={[
              styles.input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#FF375b'
              }
            ]}
            placeholder="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.laberError}>{errors.email.message}</Text>}

      <Text style={{
        fontSize: 18,
        marginBottom: 10,
        color: '#121212',
        fontWeight: 'bold',
      }}>Priority</Text>

      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <View style={styles.priorities}>
            <Button
              title="Low"
              onPress={() => {
                value === "307450584" ? onChange("") : onChange('307450584')
              }}
              buttonStyle={value === '307450584' ? styles.selected : styles.option}
            />

            <Button
              title="Medium"
              onPress={() => {
                value === "307450583" ? onChange("") : onChange('307450583')
              }}
              buttonStyle={value === '307450583' ? styles.selected : styles.option}
            />
            <Button
              title="High"
              onPress={() => {
                value === "307450582" ? onChange("") : onChange('307450582')
              }}
              buttonStyle={value === '307450582' ? styles.selected : styles.option}
            />
          </View>
        )
        }
      />



      < TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignUp)} >
        <Text style={styles.buttonText}>{route.params !== undefined ? "Edit" : "Create"}</Text>
      </TouchableOpacity >
    </View >
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 34,
    marginBottom: 34,
    color: '#121212',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4,
    color: '#121212'
  },
  inputDescription: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4,
    color: '#121212'
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#8B18D3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  laberError: {
    alignSelf: 'flex-start',
    color: '#FF375b',
    marginBottom: 8,
  },
  priorities: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  option: {
    width: 70,
    height: 40,
    backgroundColor: '#C3D1E6',
    margin: 9,
    color: '#121212'
  },
  selected: {
    width: 70,
    height: 40,
    backgroundColor: '#8B18D3',
    margin: 9,
    color: '#FFFFFF'
  }
})