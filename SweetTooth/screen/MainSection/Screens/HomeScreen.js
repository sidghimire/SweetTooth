import React,{useState,useEffect,useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView,FlatList,Image, Modal } from 'react-native';
import {getAuth} from 'firebase/auth'
import {getDocs,doc,collection,getFirestore,query,where,getDoc} from 'firebase/firestore/lite'
import {getStorage} from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoader from "../../../resources/animation/AppLoader"

import avatar from "../../../resources/images/avatar/1.png"

function HomeScreen() {
    const [isLoading,setIsLoading]=useState(true);
    const db=getFirestore();
    const auth=getAuth();
    const storage=getStorage();
    const [storyData, setStoryData] = useState(null);
    const [postData, setPostData] = useState(null);
    useEffect(()=>{
        getStoryData();
        getPostData();
    },[])

    const getStoryData = async () => {
        const docDB=collection(db,'stories');
        const q=query(docDB);
        await getDocs(q)
        .then((result)=>{
            let col=[]
            result.forEach(doc=>{
                
                col.push([doc.id,doc.data()])
            })
            setStoryData(col);
        })
        
    }

    const getPostData = async () => {
        const docDB=collection(db,'posts');
        const q=query(docDB);
        await getDocs(q)
        .then((result)=>{
            let col=[]
            result.forEach(doc=>{
                
                col.push([doc.id,doc.data()]) 
            })
            setPostData(col);
        })
        setIsLoading(false);
    }

    const storyItem=({item})=>{
        
        return(
            <View style={{width:70,height:70,marginHorizontal:5,borderRadius:100,borderColor:"#218721",borderWidth:3}}>
                <Image source={{uri:item[1].smallImageId}} style={{width:60,height:60,borderRadius:100,alignSelf:'center',marginTop:'auto',marginBottom:'auto'}}/>
            </View>
        )
    }

    const postItem=({item})=>{        
        const date=new Date(item[1].date);
        var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return(
            <View>
                <View style={{flexDirection:'row',padding:7,borderTopColor:'#e9e9e9',borderTopWidth:1}}>
                    <Image source={avatar} style={{width:40,height:40,borderRadius:100,borderColor:"#218721",borderWidth:1,marginHorizontal:10}}/>
                    <Text style={{fontSize:14,color:'#000',fontWeight:'500',justifyContent:'center',textAlignVertical:'center'}}>{(item[1].username).toLowerCase()}</Text>
                    <Icon name='dots-vertical' size={24 } color={'#000'} style={{marginLeft:'auto',textAlignVertical:'center'}} />
                </View>
                <Image source={{uri:item[1].imageId}} style={{height: 400,flex: 1,width: null}}/>
                <View style={{flexDirection:'row',padding:10,paddingVertical:15,borderTopColor:'#c9c9c9',borderTopWidth:1}}>
                    <View style={{flex:2,flexDirection:'column'}}>
                        <Text style={{fontSize:15,color:'#000',fontWeight:'400',letterSpacing:1,justifyContent:'center',textAlign:'justify',textAlignVertical:'center'}}>{item[1].bio}</Text>
                        <Text style={{fontSize:12,color:'#585858',fontWeight:'400',justifyContent:'center',textAlign:'justify',textAlignVertical:'center',marginTop:10}}>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>

                    </View>
                    <View style={{flexDirection:'column',marginLeft:'auto',marginLeft:10}}>
                        <View style={{marginLeft:'auto',flexDirection:'row'}}>
                            <Icon name='heart-outline' size={27 } color={'#000'} style={{marginHorizontal:3}} />
                            <Icon name='comment-outline' size={27 } color={'#000'} style={{marginHorizontal:3}} />
                            <Icon name='share-outline' size={27 } color={'#000'} style={{marginHorizontal:3}} />
                        </View>

                    </View>
                </View>
            </View>
        )
    }


return (
<View style={styles.container}>
    <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />
    <View>
        {storyData==null?
        null
        :
        <FlatList data={storyData} renderItem={storyItem} showsHorizontalScrollIndicator={false} keyExtractor={(item)=>item[0]} horizontal={true} style={{paddingVertical:15}} nestedScrollEnabled/>
        }
    </View>
    <View>
        {postData==null?
        null
        :
        <FlatList data={postData} renderItem={postItem} showsVerticalScrollIndicator={false} keyExtractor={(item)=>item[0]} horizontal={false} nestedScrollEnabled/>
        }
    </View>
    {
        isLoading?
        <Modal visible={isLoading} >
            <View style={styles.modalContainer}>
                <AppLoader/>
            </View>
        </Modal>
        :null
    }
</View>);
}

export default  HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
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