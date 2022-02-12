import React,{useRef, useState} from 'react';
import { View, Text,StatusBar, TouchableOpacity,ToastAndroid, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {getAuth} from 'firebase/auth';
import {getFirestore,collection,addDoc} from 'firebase/firestore/lite'
import { RNCamera } from 'react-native-camera';
import {CommonActions} from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';

const RNFS = require('react-native-fs');

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
const Camera=({navigation})=> {
    const db=getFirestore();
    const storage=getStorage();
    const auth=getAuth();

    const [hasPicture,setHasPicture]=useState(true);
    const [picture,setPicture]=useState(null);
    const [downloadedOnce,setDownloadedOnce]=useState(false);
    const camera=useRef(null);
    const [front,setFront]=useState(true);
    const downloadPicture=()=>{
        const newFilePath=RNFS.PicturesDirectoryPath+'/'+Date.now()+'.jpg';
        if(!downloadedOnce){
            RNFS.moveFile(picture,newFilePath)
            .then(()=>{
                ToastAndroid.show('Photo Downloaded',ToastAndroid.SHORT)
                setDownloadedOnce(!downloadedOnce)
            })
        }else{
            ToastAndroid.show('Already Downloaded',ToastAndroid.SHORT)

        }
    }
    const takePicture=async()=>{
        let options=null;
        try{
            if(front){
            options = { quality: 1, base64: true, mirrorImage:true,fixOrientation:true };
            }else{
            options = { quality: 1, base64: true,fixOrientation:true,orientation:'portrait' };
            }
            const data = await camera.current.takePictureAsync(options);
            setHasPicture(false);
            setPicture(data.uri);
            
        }catch{
            console.log('Error');
        }
    }
    const addStory=async()=>{
        const bigImageId=generateString(16);
        const smallImageId=generateString(16);
        ImageResizer.createResizedImage(picture,900,900,'JPEG',100)
            .then(async(response)=>{
            let imageUrl='storyImage/'+bigImageId+".jpg";
            const photoRef=ref(storage,imageUrl);
            const img=await fetch(response.uri);
            const bytes=await img.blob();
            
            await uploadBytes(photoRef,bytes).
            then(()=>{
                
            })
        })
        ImageResizer.createResizedImage(picture,300,300,'JPEG',80)
            .then(async(response)=>{
            let imageUrl='storyImage/'+smallImageId+".jpg";
            const photoRef=ref(storage,imageUrl);
            const img=await fetch(response.uri);
            const bytes=await img.blob();
            
            await uploadBytes(photoRef,bytes).
            then(async()=>{
                var col=[]
                const reference=ref(storage,'storyImage/'+smallImageId+".jpg");
                await getDownloadURL(reference)
                .then(url=>{
                    col.push(url)
                })
                const reference2=ref(storage,'storyImage/'+bigImageId+".jpg");
                await getDownloadURL(reference2)
                .then(url=>{
                    col.push(url)
                })
                console.log(col)
                const post={
                    userId:auth.currentUser.uid,
                    bigImageId:col[1],
                    smallImageId:col[0],
                    date:Date.now(),

                }
                let collectionDB=collection(db,'stories');
                addDoc(collectionDB,post)
                .then(()=>{
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
return (
<View style={styles.container}>

    {/*<Text onPress={logout}>MainSection</Text>*/}
    {hasPicture?
    <RNCamera
        ref={camera}
        type={front?'front':'back'}
        focusable={true}
        onDoubleTap={()=>{setFront(!front)}}
        style={{ flex: 1, alignItems: 'center' }}
    >
        <TouchableOpacity style={styles.clickButton} onPress={takePicture}>
            <Icon name='camera-outline' size={24} color={'#000'} />        
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipCamera} activeOpacity={0.7} onPress={()=>setFront(!front)}>
            <Icon name='restore' size={24} color={'#000'} />
        </TouchableOpacity>
       
    </RNCamera>
    :
    (picture!=null)?
    <>
        <Image source={{uri:picture}} style={{width:'100%',height:"100%"}}/>
        <TouchableOpacity opacity={0.8} style={styles.crossIcon} onPress={()=>{setHasPicture(true);setPicture(null)}}>
            <Icon name='arrow-left' size={24} color={'#000'} />        
        </TouchableOpacity>
        <TouchableOpacity opacity={0.8} style={[styles.downloadIcon]} onPress={downloadPicture}>
            <Icon name='download' size={24} color={'#000'} />        
        </TouchableOpacity>
        <TouchableOpacity opacity={0.8} style={[styles.postStory]} onPress={addStory}>
            <Text style={{fontSize:18,color:'#fff',marginRight:5,textAlign:'center',justifyContent:'center'}}>Add to Story </Text>
        </TouchableOpacity>
        <TouchableOpacity opacity={0.8} style={[styles.postIcon]} onPress={()=>navigation.navigate('UploadPhoto',{image:picture})}>
            <Text style={{fontSize:18,color:'#fff',marginRight:5,textAlign:'center',justifyContent:'center'}}>Post </Text>
            <Icon name='arrow-right' size={24} color={'#fff'} />        
        </TouchableOpacity>
    </>
        :
        null
}
</View>);
}

export default  Camera;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},

clickButton:{
    padding:25,
    borderColor:'#fff',
    borderWidth:4,
    borderRadius:50,
    alignItems:'center',
    position:'absolute',
    bottom:50,
    backgroundColor:"#797979",
    opacity:0.8,
},
flipCamera:{
    padding:10,
    backgroundColor:"#989898",
    position:'absolute',
    bottom:60,
    right:30,
    borderRadius:50,
    alignItems:'center',
},
crossIcon:{
    position:'absolute',
    top:30,
    left:30,
    backgroundColor:"#e9e9e9",
    borderRadius:50,
    padding:7,
    borderWidth:1,
    borderColor:"#989898",
    alignSelf:'center'
},
downloadIcon:{
    position:'absolute',
    top:30,
    right:30,
    backgroundColor:"#e9e9e9",
    borderRadius:50,
    padding:7,
    borderWidth:1,
    borderColor:"#989898",
    alignSelf:'center'
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
postStory:{
    position:'absolute',
    bottom:30,
    left:30,
    backgroundColor:"#1C9CEA",
    borderRadius:50,
    padding:7,
    borderWidth:1,
    borderColor:"#fff",
    alignSelf:'center',
    flexDirection:'row',
    paddingHorizontal:30,
    paddingVertical:15

}

  
});
