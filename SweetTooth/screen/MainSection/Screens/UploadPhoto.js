import React,{useState} from 'react';
import { View, Text,Dimensions, TouchableOpacity,Modal, StyleSheet, StatusBar,Image, TextInput } from 'react-native';
import {getStorage,ref,uploadBytes, getDownloadURL} from 'firebase/storage'
import {getAuth} from 'firebase/auth';
import {getFirestore,collection,getDocs,addDoc,where,query} from 'firebase/firestore/lite'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import AppLoader from "../../../resources/animation/AppLoader"

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  

function CameraNavigator({navigation,route}) {
    const [isLoading,setIsLoading]=useState(false);
    const db=getFirestore();
    const storage=getStorage();
    const auth=getAuth();

    
    const imageId=route.params;
    const [bio,setBio]=useState('');

    const publishPost=async()=>{
        setIsLoading(true)
        if(bio!=""){
            ImageResizer.createResizedImage(imageId.image,400,400,'JPEG',100)
            .then(async(response)=>{
                const photoUID=generateString(16)
                let imageUrl='postImage/'+photoUID+".jpg";
                const photoRef=ref(storage,imageUrl);
                const img=await fetch(response.uri);
                const bytes=await img.blob();
                
                await uploadBytes(photoRef,bytes).
                then(async()=>{
                    var col=[];
                    var username=[];
                    const reference=ref(storage,"postImage/"+photoUID+".jpg");
                    const collectionDB2=collection(db,'users');
                    const q=query(collectionDB2,where('uid', '==', auth.currentUser.uid));
                    await getDownloadURL(reference)
                    .then((url)=>{
                        col.push(url)
                    })
                    await getDocs(q)
                    .then((result)=>{
                        result.forEach(doc=>{
                            username.push(doc.data().username)
                        })
                    })
                    const post={
                        uid:auth.currentUser.uid,
                        bio:bio,
                        imageId:col[0],
                        username:username[0],
                        date:Date.now()
                    }
                    let collectionDB=collection(db,'posts');
                    addDoc(collectionDB,post)
                    .then(()=>{
                        setIsLoading(false)
                        navigation.dispatch(
                            CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'MaterialTopNavigator' }
                                
                            ],
                            })
                        );
                    })
                })
                
                })
                
            
        }
        
    }

return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Image source={{uri:imageId.image}} resizeMode='contain' style={{width:'95%',height:'50%',marginTop:-20,alignSelf:'center',margin:30}}/>
        <TextInput style={styles.inputField} placeholder='Enter A Bio' numberOfLines={5} placeholderTextColor={"#a9a9a9"} value={bio} onChangeText={text=>setBio(text)} />
        <TouchableOpacity opacity={0.8} style={[styles.postIcon]} onPress={publishPost}>
            <Text style={{fontSize:18,color:'#fff',marginRight:5,textAlign:'center',justifyContent:'center'}} >Publish </Text>
            <Icon name='arrow-right' size={24} color={'#fff'} />        
        </TouchableOpacity>
        {
       
       isLoading?
       <Modal visible={isLoading} >
           <View style={styles.modalContainer}>
               <AppLoader/>
           </View>
       </Modal>
       :null
   }
    </View>
)
}

export default  CameraNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
inputField: {
    padding:10,
    borderWidth:1,
    borderColor:'#b9b9b9',
    borderRadius:10,
    width:'80%',
    alignSelf:'center',
    marginVertical:10,
    textAlign:'left',
    textAlignVertical:'top',
},
postIcon:{
    position:'absolute',
    bottom:30,
    right:30,
    backgroundColor:"#1C9CEA",
    borderRadius:50,
    padding:7,
    borderWidth:1,
    borderColor:"#fff",
    alignSelf:'center',
    flexDirection:'row',
    paddingHorizontal:30,
    paddingVertical:15
},
modalContainer:{
    width:'100%',
    flex:1,
    padding:10,
    backgroundColor:"#000",
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0.9)'
},
});
