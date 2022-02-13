import React,{useEffect,useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Modal} from 'react-native';
import Background from '../../../resources/images/assetImages/BackgroundImage.jpg';
import Avatar from '../../../resources/images/avatar/1.png';
import {collection,getFirestore,query,where,getDocs} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AppLoader from "../../../resources/animation/AppLoader"


function Profile({navigation}) {
    const db=getFirestore();
    const auth=getAuth();
    const [username,setUsername]=useState("");
    const [isLoading,setIsLoading]=useState(true);
    const [postData,setPostData]=useState(null);
    const [profileImage,setProfileImage]=useState("../../../resources/images/avatar/1.png");
useEffect(()=>{
    getUsername();
    getPostData();
    getProfileImage();
},[])

    const getProfileImage=async()=>{
        const collectionDB=collection(db,'users');
        const q=query(collectionDB,where('uid','==',auth.currentUser.uid));
        await getDocs(q).then(async(data)=>{
            data.forEach(val=>{
                setProfileImage(val.data().bigImageId);
            })
        })
    }
    
    const getPostData = async () => {
        const docDB=collection(db,'posts');
        const q=query(docDB,where('uid','==',auth.currentUser.uid));
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


    const getUsername=async()=>{
        const collectionDB=collection(db,'users');
        const q=query(collectionDB,where('uid','==',auth.currentUser.uid));
        await getDocs(q)
        .then((result)=>{
            result.forEach(doc=>{
                setUsername(doc.data().username);
            })
        })
    }


    const postItem=({item})=>{        
        const date=new Date(item[1].date);
        var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return(
            <View style={{width:"33%",alignSelf:'center',padding:5}}>

                <Image source={{uri:item[1].imageId}} style={{height: 200,flex: 1,width: null}}/>
                
            </View>
        )
    }


  return (
    <View style={styles.container}>
        <View>
            <Image source={Background} resizeMode="cover" style={styles.backgroundImage} />
            <Image source={{uri:profileImage}} resizeMode="cover" style={styles.profileImage} />
            <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.editProfileView} onPress={()=>navigation.navigate("EditProfile")}>
                    <Text style={{color:'#fff',fontSize:16}}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal:20}}>
                <Text style={styles.textLabel1}>
                    @{(username).toLowerCase()}
                </Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={[styles.followersText,{borderRightWidth:1,borderRightColor:'#c9c9c9'}]}>
                    <Text style={styles.followerNumber}>150</Text>
                    <Text style={styles.followerLabel}>Posts</Text>
                </View>   
                <View style={[styles.followersText,{borderRightWidth:1,borderRightColor:'#c9c9c9'}]}>
                    <Text style={styles.followerNumber}>150</Text>
                    <Text style={styles.followerLabel}>Followers</Text>
                </View>   
                <View style={styles.followersText}>
                    <Text style={styles.followerNumber}>150</Text>
                    <Text style={styles.followerLabel}>Following</Text>
                </View>   
            </View>
        </View>
        {postData==null?
        null
        :
        <FlatList data={postData} renderItem={postItem} numColumns={3} showsVerticalScrollIndicator={false} keyExtractor={(item)=>item[0]} nestedScrollEnabled style={{flex:1}}/>
        }
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
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width:'100%',
    height:230
  },
  profileImage:{
    width:125,
    height:125,
    borderRadius:100,
    borderColor:'#218721',
    borderWidth:4,
    marginTop:-60,
    marginLeft:20,
    backgroundColor:'#fff'
  },
  editProfileView:{
    marginLeft:'auto',
    padding:15,
    paddingHorizontal:40,
    borderRadius:25,
    backgroundColor:'#4EA1D1',
    marginRight:30,
    marginTop:-30
  },
  textLabel1:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
  },
  followersText:{
    flex:1,
    textAlign:'center',
    padding:5,
    marginVertical:15
  },
  followerNumber:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    color:'#000'
  },
  followerLabel:{
    textAlign:'center',
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
