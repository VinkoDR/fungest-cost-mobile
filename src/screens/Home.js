import React, { useState, useContext } from 'react'
import { Text,TextInput,View } from 'react-native'
import Button from '../components/Button'
import CustomDropdown from '../components/CustomDropdown';

import MyModal from '../components/MyModal';

import { Context } from '../contexts.js/Context';


function Home() {

  const [titleCollection, setTitleCollection] = useState({});
  const { image  } = useContext(Context);


  const onValueChange = (e) =>{
    console.log("on value change")
    setTitleCollection((prev) => ({...prev, [titleCollection.collection]: e.target.value }))
    console.log(titleCollection)
}
  const createCollection = () =>{
    console.log("create collection")
  }
  // MediaLibrary.createAlbumAsync(albumName, asset, copyAsset)
  return (
    <View>
      <Text>Home</Text>
      <Text>Create Collection</Text>
      <TextInput name="collection" onChange = {(e)=> onValueChange(e)} value={titleCollection.collection}></TextInput>
      <Button title={"Create Collection"} onPress={createCollection}/>
      <MyModal source={image}/>
      <CustomDropdown label={'Select Provider'}/>
    </View>
  )
}

export default Home